import { useEffect, useState } from "react";
import axios from "axios";

export default function ChecklistForm({ jobId }) {
  const [checklist, setChecklist] = useState({
    aptitudeCleared: false,
    codingCleared: false,
    interviewCleared: false,
    offerReceived: false,
    remarks: ""
  });

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/checklists/job/${jobId}`);
        if (res.data) {
          setChecklist(res.data);
        }
      } catch (err) {
        console.error("Checklist not found yet.");
      }
    };
    fetchChecklist();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setChecklist((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/checklists", {
        ...checklist,
        job: { id: jobId }
      });
      alert("✅ Checklist saved!");
    } catch (err) {
      console.error("Error saving checklist", err);
      alert("❌ Failed to save checklist");
    }
  };

  return (
    <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h4>🧾 Checklist</h4>
      <label>
        <input
          type="checkbox"
          name="aptitudeCleared"
          checked={checklist.aptitudeCleared}
          onChange={handleChange}
        />
        Aptitude Cleared
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="codingCleared"
          checked={checklist.codingCleared}
          onChange={handleChange}
        />
        Coding Cleared
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="interviewCleared"
          checked={checklist.interviewCleared}
          onChange={handleChange}
        />
        Interview Cleared
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="offerReceived"
          checked={checklist.offerReceived}
          onChange={handleChange}
        />
        Offer Received
      </label>
      <br />
      <textarea
        name="remarks"
        placeholder="Remarks..."
        value={checklist.remarks}
        onChange={handleChange}
        rows={3}
        cols={30}
      />
      <br />
      <button onClick={handleSubmit}>Save Checklist</button>
    </div>
  );
}
