import { useState, useEffect } from "react";

function LogSession({ onSessionLogged }) {
  const [type, setType] = useState("CALL");
  const [date, setDate] = useState("");
  const [successRating, setSuccessRating] = useState(3);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillSelections, setSkillSelections] = useState({});
  const [myIntention, setMyIntention] = useState(null);
  const [interlocutorState, setInterlocutorState] = useState(null);
  const intentionOptions = [
    "INFORM",
    "CLARIFY",
    "PERSUADE",
    "DECIDE",
    "PLAN",
    "NEGOTIATE",
    "CONNECT",
    "LEARN",
    "SET_BOUNDARY",
  ];
  const stateOptions = [
    "VENTING",
    "SOLUTION_SEEKING",
    "DEFENSIVE",
    "ANXIOUS",
    "DISTRACTED",
    "CRITICAL",
    "RUSHED",
    "ENGAGED",
    "OVERWHELMED",
    "CONFUSED",
    "UNINTERESTED",
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  function cycleSkill(skillId) {
    setSkillSelections((prev) => {
      const current = prev[skillId];
      if (!current) return { ...prev, [skillId]: "USED_WELL" };
      if (current === "USED_WELL") return { ...prev, [skillId]: "STRUGGLED" };
      const next = { ...prev };
      delete next[skillId];
      return next;
    });
  }

  function getSkillLabel(skillId) {
    const state = skillSelections[skillId];
    if (!state) return null;
    return state === "USED_WELL" ? "✓" : "✗";
  }

  function toggleSelection(value, current, setter) {
    setter(current === value ? null : value);
  }

  async function handleSubmit() {
    setLoading(true);
    const skillResults = Object.entries(skillSelections).map(
      ([skillId, result]) => ({
        skillId: Number(skillId),
        result,
      }),
    );

    const response = await fetch("http://localhost:8080/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        date,
        successRating,
        notes,
        skillResults,
        myIntention,
        interlocutorState,
      }),
    });
    const data = await response.json();
    setLoading(false);
    console.log(data);
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

      <div>
        <label>Skills</label>
        <div>
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => cycleSkill(skill.id)}
              style={{ margin: "4px" }}
            >
              {skill.name} {getSkillLabel(skill.id)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>My Intention</label>
        <div>
          {intentionOptions.map((option) => (
            <button
              key={option}
              onClick={() =>
                toggleSelection(option, myIntention, setMyIntention)
              }
              style={{
                margin: "4px",
                fontWeight: myIntention === option ? "bold" : "normal",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Interlocutor State</label>
        <div>
          {stateOptions.map((option) => (
            <button
              key={option}
              onClick={() =>
                toggleSelection(option, interlocutorState, setInterlocutorState)
              }
              style={{
                margin: "4px",
                fontWeight: interlocutorState === option ? "bold" : "normal",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Log Session"}
      </button>
    </div>
  );
}

export default LogSession;
