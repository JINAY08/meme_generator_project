import torch
from diffusers import StableDiffusionPipeline


class MemeImageGenerator:
    def __init__(
        self,
        model_id="runwayml/stable-diffusion-v1-5",
        device=None
    ):
        """
        device:
          - "cuda" if GPU available
          - "cpu" otherwise
        """
        if device is None:
            device = "cuda" if torch.cuda.is_available() else "cpu"

        self.device = device

        self.pipe = StableDiffusionPipeline.from_pretrained(
            model_id,
            safety_checker=None  # allows NSFW if model supports it
        )

        self.pipe = self.pipe.to(self.device)

        # Reduce memory usage on CPU
        if self.device == "cpu":
            self.pipe.enable_attention_slicing()

    def build_prompt(self, topic, style, intensity):
      return (
          f"A humorous real-life situation involving people. "
          f"The situation visually represents: {topic}. "
          f"The mood is {style}, with exaggerated body language "
          f"and expressive gestures, intensity {intensity}. "
          f"Wide angle shot, full scene visible, contextual environment. "
          f"Everyday setting, candid moment, visual irony. "
          f"Photorealistic style, no text, no letters, no typography."
      )

    def generate(
        self,
        topic,
        style,
        intensity,
        steps=25,
        guidance_scale=7.5
    ):
        prompt = self.build_prompt(topic, style, intensity)

        image = self.pipe(
            prompt=prompt,
            negative_prompt=(
                "text, letters, words, typography, caption, logo, "
                "watermark, signage, symbols"
            ),
            num_inference_steps=steps,
            guidance_scale=guidance_scale
        ).images[0]

        output_path = "generated_meme_image.png"
        image.save(output_path)

        return output_path
