from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_parser import extract_text_from_pdf
from utils.scraper import scrape_job_description
from llm_utils import analyze_resume

import os
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(resume: UploadFile = File(...), job_link: str = Form(...),job_description: str = Form(...)):
    resume_bytes = await resume.read()
    resume_text = extract_text_from_pdf(resume_bytes)

    if job_description:
        job_desc = job_description
    elif job_link:
        job_desc = scrape_job_description(job_link)
    else:
        return {"error": "Provide either a job link or job description"}
    
    result = analyze_resume(resume_text, job_desc)

    return {"result": result}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000)) 
    uvicorn.run("main:app", host="0.0.0.0", port=port)
