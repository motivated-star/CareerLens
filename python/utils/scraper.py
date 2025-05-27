import requests
from bs4 import BeautifulSoup

def scrape_job_description(url: str) -> str:
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")

        # Generic approach - works for many sites
        job_text = ""
        for tag in soup.find_all(['p', 'li']):
            job_text += tag.get_text(separator=" ", strip=True) + " "

        return job_text.strip()
    except Exception as e:
        return f"Could not fetch job description from the link: {url}\\nError: {e}"
