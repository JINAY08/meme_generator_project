# Perplexity metric
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
model.eval()

def perplexity(texts):
    losses = []
    for t in texts:
        inputs = tokenizer(t, return_tensors="pt")
        with torch.no_grad():
            loss = model(**inputs, labels=inputs["input_ids"]).loss
        losses.append(loss.item())
    return torch.exp(torch.tensor(losses)).mean().item()
