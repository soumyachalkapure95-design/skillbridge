import csv
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from skill_extractor import extract_skills

app = FastAPI(
    title="SkillBridge API",
    description="API for industry opportunities and skill matching",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = Path(__file__).parent / "jobs.csv"


def load_jobs():
    with open(CSV_PATH, mode="r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        jobs = list(reader)

    formatted_jobs = []

    for index, job in enumerate(jobs):
        title = job.get("title", "")
        description = job.get("description", "")
        skills = extract_skills(title, description)

        formatted_jobs.append({
            "id": job.get("job_id") or str(index + 1),
            "title": title,
            "company": job.get("company", ""),
            "location": job.get("location", ""),
            "description": description,
            "category": job.get("category", ""),
            "url": job.get("url") or job.get("redirect_url", ""),
            "skills": skills
        })

    return formatted_jobs


@app.get("/")
def health_check():
    return {
        "message": "SkillBridge FastAPI backend is running"
    }


@app.get("/api")
def api_root():
    return {
        "message": "SkillBridge API root",
        "endpoints": ["/api/jobs", "/api/jobs/{job_id}"]
    }


@app.get("/api/jobs")
def get_jobs(
    search: str = "",
    location: str = "",
    limit: int = 50
):
    jobs = load_jobs()

    search = search.strip().lower()
    location = location.strip().lower()

    if search:
        jobs = [
            job for job in jobs
            if search in job["title"].lower()
            or search in job["company"].lower()
            or search in job["description"].lower()
            or search in " ".join(job["skills"]).lower()
        ]

    if location:
        jobs = [
            job for job in jobs
            if location in job["location"].lower()
        ]

    return {
        "total": len(jobs),
        "jobs": jobs[:limit]
    }


@app.get("/api/jobs/{job_id}")
def get_job_by_id(job_id: str):
    jobs = load_jobs()

    for job in jobs:
        if str(job["id"]) == str(job_id):
            return job

    raise HTTPException(status_code=404, detail="Job not found")