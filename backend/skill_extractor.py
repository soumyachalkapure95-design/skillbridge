import re

SKILL_ALIASES = {
    "python": "Python",
    "java": "Java",
    "c++": "C++",
    "c#": "C#",
    "javascript": "JavaScript",
    "typescript": "TypeScript",

    "react.js": "React",
    "reactjs": "React",
    "react": "React",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "node": "Node.js",

    "html": "HTML",
    "css": "CSS",
    "fastapi": "FastAPI",
    "django": "Django",
    "flask": "Flask",

    "sql": "SQL",
    "mysql": "MySQL",
    "postgresql": "PostgreSQL",
    "mongodb": "MongoDB",

    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "artificial intelligence": "Artificial Intelligence",
    "data science": "Data Science",
    "data analysis": "Data Analysis",
    "data engineering": "Data Engineering",
    "data visualization": "Data Visualization",

    "pandas": "Pandas",
    "numpy": "NumPy",
    "scikit-learn": "Scikit-learn",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",

    "aws": "AWS",
    "azure": "Azure",
    "gcp": "GCP",
    "google cloud": "GCP",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "mlops": "MLOps",
    "ci/cd": "CI/CD",
    "git": "Git",

    "embedded c": "Embedded C",
    "microcontroller": "Microcontrollers",
    "rtos": "RTOS",
    "iot": "IoT",
    "vlsi": "VLSI",
    "verilog": "Verilog",

    "autocad": "AutoCAD",
    "solidworks": "SolidWorks",
    "catia": "CATIA",
    "ansys": "ANSYS",
    "matlab": "MATLAB",

    "communication": "Communication",
    "problem solving": "Problem Solving",
    "teamwork": "Teamwork",
}


def extract_skills(title: str = "", description: str = "") -> list[str]:
    text = f"{title} {description}".lower()
    found_skills = set()

    for keyword, skill in SKILL_ALIASES.items():
        pattern = r"(?<!w)" + re.escape(keyword.lower()) + r"(?!w)"

        if re.search(pattern, text):
            found_skills.add(skill)

    return sorted(found_skills)