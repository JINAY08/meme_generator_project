# Multi-caption ranking
import numpy as np

def punch_score(text):
    length_score = -abs(len(text.split()) - 10)
    emphasis = text.count("!") + text.count("?")
    return length_score + 0.5 * emphasis

def rank_captions(captions):
    scores = [punch_score(c) for c in captions]
    best_idx = int(np.argmax(scores))
    return captions[best_idx], captions, scores
