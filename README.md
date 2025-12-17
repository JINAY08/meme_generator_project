
# 🎭 Controllable Meme Generator

End-to-end meme generator with controllable humor style, intensity,
multi-caption ranking, evaluation metrics, and Gradio UI.

# Part-1 (Meme Generator built upon Google Gemini API): Nanomeme
🚀 **Live Demo:**  
👉 https://nanomeme-544080524340.us-west1.run.app/

# Part-2 (Meme Generator built using Diffusion(image)+GPT2(caption) models)

The Controllable Meme Generator is designed to automatically generate memes while allowing users to control:

- Humor style (witty, sarcastic, wholesome, etc.)
- Expressiveness / intensity
- Caption selection and ranking

The system combines image templates, caption generation, ranking logic, and rendering to produce high-quality memes via web interfaces or programmatic access.

---

## 📌 Key Features

- Automatic meme generation  
- Controlled meme generation (style & intensity)  
- Multiple caption candidates with ranking  
- Meme evaluation framework  
- Web interfaces using **Gradio**
- Modular and extensible architecture  

---

## 📁 Repository Structure

```
meme_generator_project/
├── data/                  # Meme templates, captions, datasets
├── generation/            # Caption & meme generation logic
├── evaluation/            # Evaluation metrics and scripts
├── model/                 # Models, weights, training utilities
├── rendering/             # Text overlay and image rendering
├── app.py                 # Gradio-based UI
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── .DS_Store
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.8 or higher  
- `pip` installed  
- (Recommended) Virtual environment  

### 📦 Installation

```bash
git clone https://github.com/JINAY08/meme_generator_project.git
cd meme_generator_project
pip install -r requirements.txt
```

---

## 🖼️ Running the Application

### ▶️ Gradio Interface

```bash
python app.py
```

Open the URL shown in your terminal (typically `http://127.0.0.1:7860`).

---
