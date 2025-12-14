# Ranking gain metric
def ranking_gain(scores):
    return max(scores) - sum(scores) / len(scores)
