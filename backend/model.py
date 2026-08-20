import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

class LegalModelManager:
    def __init__(self):
        self.model_name = "Ananya8154/Gemma-2-2B-Indian-Law"
        self.tokenizer = None
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.is_loaded = False

    def load_model(self):
        if self.is_loaded:
            return

        print(f"Loading tokenizer {self.model_name}...")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)

        print(f"Loading model {self.model_name} onto {self.device}...")
        # We load directly; on CPU this will use standard precision unless specified otherwise
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            device_map="auto" if self.device == "cuda" else None
        )
        if self.device == "cpu":
            self.model.to("cpu")
            
        self.model.eval()
        self.is_loaded = True
        print("Model loaded successfully.")

    def generate_answer(self, prompt: str, max_new_tokens: int = 256) -> str:
        if not self.is_loaded:
            raise RuntimeError("Model is not loaded.")

        # Move inputs to device
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)

        # Generate output
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                use_cache=True,
                temperature=0.3,
                top_p=0.9,
                do_sample=True,
                repetition_penalty=1.1,
                pad_token_id=self.tokenizer.eos_token_id
            )

        # Calculate input length to extract only newly generated tokens
        input_length = inputs["input_ids"].shape[1]
        generated_tokens = outputs[0][input_length:]

        # Decode newly generated tokens
        answer = self.tokenizer.decode(
            generated_tokens,
            skip_special_tokens=True
        )

        return answer.strip()

# Singleton instance for the application
model_manager = LegalModelManager()
