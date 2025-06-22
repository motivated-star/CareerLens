from langchain.chat_models import init_chat_model
from langchain.schema import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("TOGETHER_API_KEY")

llm = init_chat_model(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    model_provider="together", 
    model_kwargs={"together_api_key": api_key}
)

def analyze_resume(resume_text: str, job_desc: str) -> str:
    prompt = (
        "You are a resume reviewer. Analyze the following resume and job description.\n"
        "Return a match score out of 100, missing skills from resume and 3-5 suggestions to improve the resume.\n\n"
        f"Resume:\n{resume_text}\n\n"
        f"Job Description:\n{job_desc}\n"
    )
    response = llm([HumanMessage(content=prompt)])
    return response.content
