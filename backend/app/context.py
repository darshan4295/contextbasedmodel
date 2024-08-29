import os

from llama_index import ServiceContext
from llama_index.llms.gemini import Gemini


def create_base_context():
    model = os.getenv("MODEL", "gpt-3.5-turbo")
    return ServiceContext.from_defaults(
        llm=Gemini(),
    )
