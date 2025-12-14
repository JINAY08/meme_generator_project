# Diversity metric
def distinct_n(texts, n=2):
    ngrams = set()
    total = 0
    for t in texts:
        words = t.split()
        total += max(len(words) - n + 1, 0)
        for i in range(len(words) - n + 1):
            ngrams.add(tuple(words[i:i+n]))
    return len(ngrams) / max(total, 1)
