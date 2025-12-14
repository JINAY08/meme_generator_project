import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import easyocr
import os

# Initialize OCR reader once
reader = easyocr.Reader(["en"], gpu=False)


def remove_text_regions(pil_img):
    """
    Detects text-like regions using OCR and removes them by blurring.
    """
    img = np.array(pil_img)
    results = reader.readtext(img)

    for (bbox, text, prob) in results:
        if prob < 0.4:
            continue

        # Bounding box
        pts = np.array(bbox).astype(int)
        x_min, y_min = pts.min(axis=0)
        x_max, y_max = pts.max(axis=0)

        # Expand box slightly
        pad = 10
        x_min = max(0, x_min - pad)
        y_min = max(0, y_min - pad)
        x_max = min(img.shape[1], x_max + pad)
        y_max = min(img.shape[0], y_max + pad)

        region = img[y_min:y_max, x_min:x_max]

        if region.size > 0:
            blurred = cv2.GaussianBlur(region, (31, 31), 0)
            img[y_min:y_max, x_min:x_max] = blurred

    return Image.fromarray(img)


def render_meme(
    caption,
    image_path,
    output_path="final_meme.png"
):
    # Load image
    img = Image.open(image_path).convert("RGB")

    # 🔥 STEP 1: Auto-clean hallucinated text
    img = remove_text_regions(img)

    draw = ImageDraw.Draw(img)

    # Font (Impact-style preferred)
    try:
        font = ImageFont.truetype("Impact.ttf", 42)
    except:
        font = ImageFont.load_default()

    # Multiline wrapping
    max_width = int(img.width * 0.9)
    words = caption.split()
    lines = []
    line = ""

    for word in words:
        test = f"{line} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] <= max_width:
            line = test
        else:
            lines.append(line)
            line = word

    lines.append(line)

    # Calculate total text height
    line_height = draw.textbbox((0, 0), "Ay", font=font)[3]
    total_height = line_height * len(lines)

    y = img.height - total_height - 30

    # 🔥 STEP 2: Draw caption cleanly
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        text_w = bbox[2] - bbox[0]
        x = (img.width - text_w) // 2

        draw.text(
            (x, y),
            line,
            fill="white",
            font=font,
            stroke_width=3,
            stroke_fill="black"
        )
        y += line_height

    img.save(output_path)
    return output_path
