import os

from llama_index import ServiceContext
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

def create_base_context():
    # model = os.getenv("MODEL", "gpt-3.5-turbo")
    return ServiceContext.from_defaults(
        llm=Gemini(),
        embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)
        
        
    )
