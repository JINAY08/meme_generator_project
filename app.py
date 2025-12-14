import streamlit as st
import torch

from generation.generate import generate_caption
from generation.ranker import rank_captions
from generation.image_generator import MemeImageGenerator
from rendering.render import render_meme

# ----------------------------
# Streamlit Page Config
# ----------------------------
st.set_page_config(
    page_title="Controllable Meme Generator",
    page_icon="🎭",
    layout="centered"
)

st.title("🎭 Controllable Meme Generator")
st.write(
    "Generate **memes from scratch** with controllable humor style, "
    "intensity, creativity, and ranking."
)

# ----------------------------
# Safety Check (GPU)
# ----------------------------
# if not torch.cuda.is_available():
#     st.error(
#         "❌ GPU not detected.\n\n"
#         "This app requires a GPU for image generation.\n"
#         "Please run on Google Colab or a GPU-enabled machine."
#     )
#     st.stop()

# ----------------------------
# User Controls
# ----------------------------
topic = st.text_input("📝 Meme Topic", "Monday mornings")

style = st.selectbox(
    "🎭 Humor Style",
    ["sarcastic", "wholesome", "genz", "dark", "corporate"]
)

intensity = st.slider(
    "🔥 Humor Intensity",
    min_value=0.1,
    max_value=1.0,
    value=0.7,
    step=0.05
)

temperature = st.slider(
    "🎨 Caption Creativity (temperature)",
    min_value=0.5,
    max_value=1.5,
    value=0.9,
    step=0.05
)

top_p = st.slider(
    "🔀 Caption Diversity (top-p)",
    min_value=0.5,
    max_value=1.0,
    value=0.9,
    step=0.05
)

num_candidates = st.slider(
    "🏆 Caption Candidates (Ranking)",
    min_value=1,
    max_value=8,
    value=5
)

# ----------------------------
# Initialize Image Generator
# ----------------------------
@st.cache_resource
def load_image_generator():
    return MemeImageGenerator()

image_generator = load_image_generator()

# ----------------------------
# Generate Meme
# ----------------------------
if st.button("🚀 Generate Meme"):
    with st.spinner("Generating captions..."):
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

    with st.spinner("Generating image from scratch..."):
        image_path = image_generator.generate(
            topic=topic,
            style=style,
            intensity=intensity
        )

    with st.spinner("Rendering final meme..."):
        final_meme_path = render_meme(
            caption=best_caption,
            image_path=image_path
        )

    # ----------------------------
    # Display Output
    # ----------------------------
    st.image(final_meme_path, caption="🎉 Generated Meme", use_container_width=True)

    st.subheader("🏆 Selected Caption")
    st.success(best_caption)

    with st.expander("📋 All Caption Candidates & Scores"):
        for c, s in zip(all_captions, scores):
            st.write(f"**{s:.2f}** → {c}")

# ----------------------------
# Footer
# ----------------------------
st.markdown("---")
st.caption(
    "🧠 Powered by GPT-2 (captions) + Stable Diffusion (images)\n\n"
    "Built as a fully controllable generative meme system."
)
