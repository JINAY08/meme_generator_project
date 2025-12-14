# Style-conditioned generator
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class MemeGeneratorModel:
    def __init__(self, model_name="gpt2"):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)

    def build_prompt(self, topic, style, intensity):
        return (
            f"Humor style: {style}. "
            f"Humor intensity: {intensity}. "
            f"Topic: {topic}. "
            f"Meme caption:"
        )

    def generate(
        self,
        topic,
        style,
        intensity,
        temperature=0.9,
        top_p=0.9,
        max_length=40
    ):
        prompt = self.build_prompt(topic, style, intensity)
        inputs = self.tokenizer(prompt, return_tensors="pt")

        outputs = self.model.generate(
            **inputs,
            max_length=max_length,
            temperature=temperature,
            top_p=top_p,
            do_sample=True,
            pad_token_id=self.tokenizer.eos_token_id
        )

        text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return text.split("Meme caption:")[-1].strip()
