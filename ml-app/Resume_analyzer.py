# resume_analyzer.py
import os
import re
import fitz  # PyMuPDF
from docx import Document
import requests
from bs4 import BeautifulSoup
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, List, Set
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import nltk
from pathlib import Path
import tempfile

# Initialize FastAPI app
app = FastAPI(title="Resume Analyzer API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------- Initialization --------------------------
# Download NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

# Load Spacy model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

# -------------------------- Skills Database --------------------------
SKILLS_DATABASE = {
    'programming_languages': [
        'Python', 'Java', 'JavaScript', 'C++', 'C#', 'R', 'Go', 'Rust', 'Swift', 'Kotlin',
        'PHP', 'Ruby', 'Scala', 'MATLAB', 'SQL', 'TypeScript', 'Dart', 'Perl', 'Shell'
    ],
    'web_technologies': [
        'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django',
        'Flask', 'Spring Boot', 'Laravel', 'Bootstrap', 'jQuery', 'SASS', 'LESS'
    ],
    'databases': [
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Cassandra',
        'Neo4j', 'DynamoDB', 'Firebase', 'Elasticsearch'
    ],
    'cloud_platforms': [
        'AWS', 'Azure', 'Google Cloud', 'GCP', 'Heroku', 'DigitalOcean', 'IBM Cloud'
    ],
    'data_science': [
        'Machine Learning', 'Deep Learning', 'Data Analysis', 'Data Visualization',
        'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras',
        'Tableau', 'Power BI', 'Apache Spark', 'Hadoop'
    ],
    'devops_tools': [
        'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab', 'CI/CD',
        'Terraform', 'Ansible', 'Chef', 'Puppet', 'Nginx', 'Apache'
    ],
    'soft_skills': [
        'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
        'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'
    ],
    'methodologies': [
        'Agile', 'Scrum', 'Kanban', 'DevOps', 'Waterfall', 'Lean', 'Six Sigma'
    ]
}

# -------------------------- Resume Processing Functions --------------------------
def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from a PDF resume."""
    try:
        doc = fitz.open(pdf_path)
        text = "\n".join(page.get_text() for page in doc)
        doc.close()
        return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting PDF: {e}")

def extract_text_from_docx(docx_path: str) -> str:
    """Extract text from a DOCX resume."""
    try:
        doc = Document(docx_path)
        text = "\n".join(para.text for para in doc.paragraphs)
        return text.strip()
    except Exception as e:
        raise Exception(f"Error extracting DOCX: {e}")

def extract_skills_from_text(text: str) -> List[str]:
    """Extract relevant skills from text."""
    text_lower = text.lower()
    extracted_skills = []
    
    for category, skills in SKILLS_DATABASE.items():
        for skill in skills:
            if skill.lower() in text_lower:
                extracted_skills.append(skill)
    
    return list(set(extracted_skills))

# -------------------------- Job Description Processing --------------------------
def fetch_job_description(url: str) -> str:
    """Extract job description text from URL."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        for script in soup(["script", "style"]):
            script.decompose()
            
        job_text = soup.get_text()
        return ' '.join(job_text.split())
    except Exception as e:
        raise Exception(f"Error fetching job description: {e}")

# -------------------------- Analysis Functions --------------------------
def get_similarity_score(resume_skills: List[str], job_skills: List[str]) -> float:
    """Calculate similarity score between resume and job description."""
    if not resume_skills or not job_skills:
        return 0.0
    
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        resume_text = " ".join(resume_skills)
        job_text = " ".join(job_skills)
        
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_text])
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    except:
        return 0.0

def analyze_skill_gaps(resume_skills: List[str], job_skills: List[str]) -> Dict:
    """Analyze missing skills."""
    resume_set = set(skill.lower() for skill in resume_skills)
    job_set = set(skill.lower() for skill in job_skills)
    
    return {
        'missing_skills': list(job_set - resume_set),
        'matching_skills': list(resume_set & job_set),
        'coverage_percentage': len(resume_set & job_set) / len(job_set) * 100 if job_set else 0
    }

# -------------------------- API Endpoint --------------------------
@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_link: str = Form(...)
):
    try:
        # Save uploaded file temporarily
        print(f"Received file: {resume.filename}")  # Debug log
        print(f"Job link: {job_link}")
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(resume.filename).suffix) as temp_file:
            content = await resume.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        # Extract text based on file type
        if resume.filename.lower().endswith('.pdf'):
            resume_text = extract_text_from_pdf(temp_path)
        elif resume.filename.lower().endswith('.docx'):
            resume_text = extract_text_from_docx(temp_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Process job description
        job_text = fetch_job_description(job_link)
        
        # Extract skills
        resume_skills = extract_skills_from_text(resume_text)
        job_skills = extract_skills_from_text(job_text)
        
        # Perform analysis
        similarity_score = get_similarity_score(resume_skills, job_skills)
        gap_analysis = analyze_skill_gaps(resume_skills, job_skills)
        
        # Clean up
        os.unlink(temp_path)
        
        return {
            "match_score": round(similarity_score * 100, 1),
            "missing_skills": gap_analysis['missing_skills'],
            "matching_skills": gap_analysis['matching_skills'],
            "coverage_percentage": round(gap_analysis['coverage_percentage'], 1)
        }
        
    except Exception as e:
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.unlink(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------- Main Execution --------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)