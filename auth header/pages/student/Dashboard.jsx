import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchJobs = async (searchQuery = "") => {
        setLoading(true);
        setError("");
        try {
            const response = await api.get(`/jobs?limit=20&search=${encodeURIComponent(searchQuery)}`);
            setJobs(response.data.jobs || []);
        } catch (err) {
            console.error(err);
            setError("Unable to load live opportunities. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(search);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Recommended Opportunities</h1>
                <p style={styles.subtitle}>Explore live industry jobs & skill match analysis</p>
                
                <form onSubmit={handleSearch} style={styles.searchForm}>
                    <input 
                        type="text" 
                        placeholder="Search by job title, company, or skill..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>Search</button>
                </form>
            </header>

            {loading ? (
                <div style={styles.centerText}>
                    <p style={styles.loadingText}>Loading live opportunities...</p>
                </div>
            ) : error ? (
                <div style={styles.errorBox}>
                    <p>{error}</p>
                    <button onClick={() => fetchJobs(search)} style={styles.retryButton}>Retry Connection</button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {jobs.map((job) => (
                        <div key={job.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.jobTitle}>{job.title}</h3>
                                <span style={styles.companyBadge}>{job.company}</span>
                            </div>
                            
                            <p style={styles.location}>📍 {job.location || "Remote / Unspecified"}</p>
                            
                            <p style={styles.description}>
                                {job.description?.length > 120 ? job.description.slice(0, 120) + "..." : job.description}
                            </p>

                            <div style={styles.skillsContainer}>
                                <strong>Required Skills:</strong>
                                <div style={styles.tags}>
                                    {job.skills?.length > 0 ? (
                                        job.skills.map((skill, index) => (
                                            <span key={index} style={styles.tag}>{skill}</span>
                                        ))
                                    ) : (
                                        <span style={styles.noTag}>Skill analysis in progress</span>
                                    )}
                                </div>
                            </div>

                            {job.url && (
                                <a href={job.url} target="_blank" rel="noreferrer" style={styles.applyBtn}>
                                    View and Apply →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    header: {
        marginBottom: "30px",
        textAlign: "center"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: "6px"
    },
    subtitle: {
        fontSize: "1rem",
        color: "#64748b",
        marginBottom: "20px"
    },
    searchForm: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        maxWidth: "600px",
        margin: "0 auto"
    },
    searchInput: {
        flex: 1,
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        fontSize: "0.95rem",
        outline: "none"
    },
    searchButton: {
        padding: "12px 24px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px"
    },
    card: {
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
    },
    cardHeader: {
        marginBottom: "10px"
    },
    jobTitle: {
        fontSize: "1.15rem",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 6px 0"
    },
    companyBadge: {
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#2563eb",
        backgroundColor: "#eff6ff",
        padding: "4px 8px",
        borderRadius: "4px"
    },
    location: {
        fontSize: "0.88rem",
        color: "#64748b",
        margin: "8px 0"
    },
    description: {
        fontSize: "0.9rem",
        color: "#475569",
        lineHeight: "1.4",
        marginBottom: "14px"
    },
    skillsContainer: {
        fontSize: "0.85rem",
        marginBottom: "16px"
    },
    tags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginTop: "6px"
    },
    tag: {
        fontSize: "0.78rem",
        backgroundColor: "#f1f5f9",
        color: "#334155",
        padding: "3px 8px",
        borderRadius: "12px"
    },
    noTag: {
        fontSize: "0.8rem",
        color: "#94a3b8",
        fontStyle: "italic"
    },
    applyBtn: {
        display: "block",
        textAlign: "center",
        backgroundColor: "#0f172a",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "0.9rem"
    },
    centerText: {
        textAlign: "center",
        padding: "40px"
    },
    loadingText: {
        fontSize: "1.1rem",
        color: "#64748b"
    },
    errorBox: {
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#991b1b",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center"
    },
    retryButton: {
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#dc2626",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }
};