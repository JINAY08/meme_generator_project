# Style accuracy metric
def style_keyword_accuracy(captions, target_style):
    keywords = {
        "sarcastic": ["sure", "yeah", "perfect"],
        "wholesome": ["you", "got", "best"],
        "genz": ["literally", "bestie", "nah"],
        "dark": ["never", "end", "death"],
        "corporate": ["leverage", "optimize", "synergy"]
    }

    hits = 0
    for c in captions:
        if any(k in c.lower() for k in keywords[target_style]):
            hits += 1
    return hits / len(captions)
