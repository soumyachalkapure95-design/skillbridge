import requests
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

APP_ID = os.getenv("APP_ID")
APP_KEY = os.getenv("APP_KEY")

url = "https://api.adzuna.com/v1/api/jobs/in/search/1"

params = {
    "app_id": APP_ID,
    "app_key": APP_KEY,
    "results_per_page": 50,
    "what": "machine learning",
    "where": "Bangalore",
}

response = requests.get(url, params=params)

print("Status Code:", response.status_code)

data = response.json()

jobs = data.get("results", [])

print("Jobs received:", len(jobs))

job_list = []

for job in jobs:
    job_list.append({
        "title": job.get("title"),
        "company": job.get("company", {}).get("display_name"),
        "location": job.get("location", {}).get("display_name"),
        "description": job.get("description"),
        "url": job.get("redirect_url"),
    })

df = pd.DataFrame(job_list)

print("\nDataFrame:")
print(df.head())

df.to_csv("jobs.csv", index=False)

print("\nSaved successfully to jobs.csv")