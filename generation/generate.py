# Caption generation
from model.model import MemeGeneratorModel

generator = MemeGeneratorModel()

def generate_caption(topic, style, intensity, temperature, top_p):
    return generator.generate(
        topic=topic,
        style=style,
        intensity=intensity,
        temperature=temperature,
        top_p=top_p
    )
