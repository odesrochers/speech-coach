import { useState } from "react";

function LogSession({ onSessionLogged }) {
  const [type, setType] = useState("CALL");
  const [date, setDate] = useState("");
  const [successRating, setSuccessRating] = useState(3);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        date,
        successRating,
        notes,
        skillResults: [],
      }),
    });
    const data = await response.json();
    setLoading(false);
    onSessionLogged(data);
  }

  return (
    <div>
      <h1>Log a Session</h1>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="CALL">Call</option>
          <option value="MEETING">Meeting</option>
          <option value="PRESENTATION">Presentation</option>
          <option value="REGULAR_CONVERSATION">Regular Conversation</option>
          <option value="CRUCIAL_CONVERSATION">Crucial Conversation</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Success Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={successRating}
          onChange={(e) => setSuccessRating(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Log Session"}
      </button>
    </div>
  );
}

export default LogSession;
