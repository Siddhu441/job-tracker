"use client";

import { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavBar";

// Simple navbar component
function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Job Tracker</div>
      <div>
        <span style={{ marginRight: "1rem" }}>Dashboard</span>
        <span>Profile</span>
      </div>
    </nav>
  );
}

export default function JobPortal() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    appliedDate: "",
    scheduledEventDateTime: "",
    status: "Applied",
  });

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const apiUrl = "http://localhost:8080/api/jobs";

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const uid = Number.parseInt(storedUserId);
      setUserId(uid);
      fetchJobsByUserId(uid);
    } else {
      setError("User not logged in. Please log in to continue.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const clearForm = () => {
    setJob({
      title: "",
      company: "",
      appliedDate: "",
      scheduledEventDateTime: "",
      status: "Applied",
    });
    setEditingJobId(null);
  };

  const validateForm = () => {
    if (!job.title.trim()) {
      setError("Job title is required");
      return false;
    }
    if (!job.company.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!job.appliedDate) {
      setError("Application date is required");
      return false;
    }
    return true;
  };

  const createOrUpdateJob = async () => {
    if (!validateForm()) return;
    if (!userId) {
      setError("User not logged in");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        title: job.title,
        company: job.company,
        appliedDate: job.appliedDate,
        scheduledEventDateTime: job.scheduledEventDateTime || null,
        status: job.status,
        user: { id: userId },
      };

      if (editingJobId) {
        await fetch(`${apiUrl}/${editingJobId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        setSuccess("✏ Job updated successfully!");
      } else {
        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        setSuccess("✅ Job created successfully!");
      }

      clearForm();
      fetchJobsByUserId(userId);
    } catch (err) {
      console.error(err);
      setError("Failed to save job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsByUserId = async (uid = userId) => {
    if (!uid) return;
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/user/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching jobs. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");

      setJobs(jobs.filter((job) => job.id !== id));
      setSuccess("Job deleted successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to delete job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const editJob = (jobData) => {
    setJob({
      title: jobData.title,
      company: jobData.company,
      appliedDate: jobData.appliedDate || "",
      scheduledEventDateTime: jobData.scheduledEventDateTime || "",
      status: jobData.status,
    });
    setEditingJobId(jobData.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const analyzeJobStatus = () => {
    return jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = analyzeJobStatus();
  const filteredJobs = filterStatus === "All" ? jobs : jobs.filter((job) => job.status === filterStatus);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
  };

  const statusOptions = ["Applied", "Interview Scheduled", "Rejected", "Offer Received", "Joined"];

  return (
    <>
      <UserNavbar />
      <div className="container" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>📝 Job Application Tracker</h1>

        {error && (
          <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "4px", marginBottom: "20px" }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "10px", borderRadius: "4px", marginBottom: "20px" }}>
            {success}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {/* Job Form */}
          <section style={{ backgroundColor: "#f5f5f5", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>{editingJobId ? "✏ Edit Job Application" : "➕ Add New Job Application"}</h2>

            {/* Inputs */}
            <InputField label="Job Title*" name="title" value={job.title} onChange={handleInputChange} placeholder="e.g. Frontend Developer" />
            <InputField label="Company Name*" name="company" value={job.company} onChange={handleInputChange} placeholder="e.g. Acme Inc." />
            <InputField label="Application Date*" name="appliedDate" value={job.appliedDate} onChange={handleInputChange} type="datetime-local" />
            <InputField label="Interview/Event Date" name="scheduledEventDateTime" value={job.scheduledEventDateTime} onChange={handleInputChange} type="datetime-local" />

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="status" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Status
              </label>
              <select
                id="status"
                name="status"
                value={job.status}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={createOrUpdateJob}
                disabled={loading}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : editingJobId ? "Update Job" : "Create Job"}
              </button>

              {editingJobId && (
                <button
                  onClick={clearForm}
                  style={{ padding: "0.5rem 1rem", backgroundColor: "#f5f5f5", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </section>

          {/* Job Status */}
          <section style={{ backgroundColor: "#f5f5f5", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>📊 Application Status</h2>
            {jobs.length > 0 ? (
              <>
                <div>
                  <h3>Summary</h3>
                  <p>Total Applications: <strong>{jobs.length}</strong></p>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <StatusCount key={status} status={status} count={count} />
                  ))}
                </div>

                <div>
                  <h3>Status Distribution</h3>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <ProgressBar key={status} status={status} count={count} total={jobs.length} />
                  ))}
                </div>
              </>
            ) : (
              <p>No job applications yet. Add your first job to see statistics.</p>
            )}
          </section>
        </div>

        {/* Job List */}
        <section style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2>📄 My Job Applications</h2>

            <div>
              <label htmlFor="filterStatus" style={{ marginRight: "0.5rem" }}>Filter by status:</label>
              <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}>
                <option value="All">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && jobs.length === 0 ? (
            <p>Loading your job applications...</p>
          ) : (
            <JobList jobs={filteredJobs} editJob={editJob} deleteJob={deleteJob} />
          )}
        </section>
      </div>
    </>
  );
}

// Helper Components

function InputField({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />
    </div>
  );
}

function StatusCount({ status, count }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #e0e0e0" }}>
      <span>{status}:</span>
      <span><strong>{count}</strong> job{count !== 1 ? "s" : ""}</span>
    </div>
  );
}

function ProgressBar({ status, count, total }) {
  const percentage = Math.round((count / total) * 100);
  const colors = {
    Applied: "#2196f3",
    "Interview Scheduled": "#ff9800",
    Rejected: "#f44336",
    "Offer Received": "#4caf50",
    Joined: "#9c27b0",
  };
  const color = colors[status] || "#757575";

  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
        <span>{status}</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ height: "10px", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}

function JobList({ jobs, editJob, deleteJob }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
      {jobs.map((job) => (
        <div key={job.id} style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "1rem", position: "relative" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{job.title}</div>
          <div style={{ marginBottom: "0.5rem" }}>{job.company}</div>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>Applied: {new Date(job.appliedDate).toLocaleDateString()}</div>

          <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-between" }}>
            <button onClick={() => editJob(job)} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Edit
            </button>
            <button onClick={() => deleteJob(job.id)} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
