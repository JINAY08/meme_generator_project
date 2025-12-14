import gradio as gr
import torch
from PIL import Image

from generation.generate import generate_caption
from generation.ranker import rank_captions
from generation.image_generator import MemeImageGenerator
from rendering.render import render_meme


# ----------------------------
# Load Image Generator (cached)
# ----------------------------
image_generator = MemeImageGenerator()


# ----------------------------
# Core inference function
# ----------------------------
def generate_meme(
    topic,
    style,
    intensity,
    temperature,
    top_p,
    num_candidates
):
    # 1. Generate caption candidates
    captions = [
        generate_caption(
            topic=topic,
            style=style,
            intensity=intensity,
            temperature=temperature,
            top_p=top_p
        )
        for _ in range(num_candidates)
    ]

    best_caption, all_captions, scores = rank_captions(captions)

    # 2. Generate image
    image_path = image_generator.generate(
        topic=topic,
        style=style,
        intensity=intensity
    )

    # 3. Render final meme
    final_meme_path = render_meme(
        caption=best_caption,
        image_path=image_path
    )

    # Format ranking output
    ranking_text = "\n".join(
        [f"{s:.2f} → {c}" for c, s in zip(all_captions, scores)]
    )

    return (
        Image.open(final_meme_path),
        best_caption,
        ranking_text
    )


# ----------------------------
# Gradio UI
# ----------------------------
with gr.Blocks(title="🎭 Controllable Meme Generator") as demo:
    gr.Markdown(
        """
        # 🎭 Controllable Meme Generator  
        Generate **memes from scratch** with controllable humor style,  
        intensity, creativity, and caption ranking.
        """
    )

    with gr.Row():
        with gr.Column():
            topic = gr.Textbox(
                label="📝 Meme Topic",
                value="Monday mornings"
            )

            style = gr.Dropdown(
                label="🎭 Humor Style",
                choices=["sarcastic", "wholesome", "genz", "dark", "corporate"],
                value="sarcastic"
            )

            intensity = gr.Slider(
                label="🔥 Humor Intensity",
                minimum=0.1,
                maximum=1.0,
                value=0.7,
                step=0.05
            )

            temperature = gr.Slider(
                label="🎨 Caption Creativity (temperature)",
                minimum=0.5,
                maximum=1.5,
                value=0.9,
                step=0.05
            )

            top_p = gr.Slider(
                label="🔀 Caption Diversity (top-p)",
                minimum=0.5,
                maximum=1.0,
                value=0.9,
                step=0.05
            )

            num_candidates = gr.Slider(
                label="🏆 Caption Candidates (Ranking)",
                minimum=1,
                maximum=8,
                value=5,
                step=1
            )

            generate_btn = gr.Button("🚀 Generate Meme")

        with gr.Column():
            meme_image = gr.Image(
                label="🎉 Generated Meme",
                type="pil"
            )

            best_caption = gr.Textbox(
                label="🏆 Selected Caption",
                interactive=False
            )

            ranking_box = gr.Textbox(
                label="📋 All Caption Candidates & Scores",
                lines=8,
                interactive=False
            )

    generate_btn.click(
        fn=generate_meme,
        inputs=[
            topic,
            style,
            intensity,
            temperature,
            top_p,
            num_candidates
        ],
        outputs=[
            meme_image,
            best_caption,
            ranking_box
        ]
    )

    gr.Markdown(
        """
        ---
        🧠 **Powered by** GPT-2 (captions) + Diffusion (images)  
        Built as a fully controllable generative meme system.
        """
    )


if __name__ == "__main__":
    demo.launch()
