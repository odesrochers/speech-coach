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
  const typeOptions = [
    { value: "CALL", label: "Call" },
    { value: "MEETING", label: "Meeting" },
    { value: "PRESENTATION", label: "Presentation" },
    { value: "REGULAR_CONVERSATION", label: "Regular conversation" },
    { value: "CRUCIAL_CONVERSATION", label: "Crucial conversation" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "OTHER", label: "Other" },
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

  function toggleSelection(value, current, setter) {
    setter(current === value ? null : value);
  }

  function formatLabel(option) {
    return option
      .toLowerCase()
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  }

  async function handleSubmit() {
    setLoading(true);
    const skillResults = Object.entries(skillSelections).map(
      ([skillId, result]) => ({ skillId: Number(skillId), result }),
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
    onSessionLogged(data);
  }

  const ratingLabels = ["Rough", "Below par", "Okay", "Good", "Excellent"];

  return (
    <div className="min-h-screen bg-stone-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-teal-400 uppercase mb-1">
            Speech Coach
          </p>
          <h1 className="text-3xl font-serif text-stone-100">Log a session</h1>
          <p className="text-stone-400 text-sm mt-1">
            Capture how it went while it's still fresh.
          </p>
        </header>

        <div className="bg-stone-900 rounded-2xl shadow-sm border border-stone-800 divide-y divide-stone-800">
          {/* Basics */}
          <section className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-1.5">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-300 mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </section>

          {/* Success rating */}
          <section className="p-6">
            <label className="block text-sm font-medium text-stone-300 mb-3">
              How did it go?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSuccessRating(n)}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-medium border transition-colors ${
                    successRating === n
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-stone-800 text-stone-300 border-stone-700 hover:border-teal-500"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-2">
              {ratingLabels[successRating - 1]}
            </p>
          </section>

          {/* Notes */}
          <section className="p-6">
            <label className="block text-sm font-medium text-stone-300 mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="What happened? What would you change next time?"
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
            />
          </section>

          {/* Skills */}
          <section className="p-6">
            <label className="block text-sm font-medium text-stone-300 mb-1">
              Skills practiced
            </label>
            <p className="text-xs text-stone-500 mb-3">
              Tap once for used well, twice for struggled, again to clear.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const state = skillSelections[skill.id];
                const styles =
                  state === "USED_WELL"
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : state === "STRUGGLED"
                      ? "bg-rose-950 text-rose-300 border-rose-700"
                      : "bg-stone-800 text-stone-300 border-stone-700 hover:border-teal-500";
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => cycleSkill(skill.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${styles}`}
                  >
                    {skill.name}
                    {state === "USED_WELL" && <span>✓</span>}
                    {state === "STRUGGLED" && <span>✗</span>}
                  </button>
                );
              })}
              {skills.length === 0 && (
                <p className="text-sm text-stone-500">No skills set up yet.</p>
              )}
            </div>
          </section>

          {/* Intention */}
          <section className="p-6">
            <label className="block text-sm font-medium text-stone-300 mb-3">
              Your intention going in
            </label>
            <div className="flex flex-wrap gap-2">
              {intentionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    toggleSelection(option, myIntention, setMyIntention)
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    myIntention === option
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-stone-800 text-stone-300 border-stone-700 hover:border-teal-500"
                  }`}
                >
                  {formatLabel(option)}
                </button>
              ))}
            </div>
          </section>

          {/* Interlocutor state */}
          <section className="p-6">
            <label className="block text-sm font-medium text-stone-300 mb-3">
              The other person's state
            </label>
            <div className="flex flex-wrap gap-2">
              {stateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    toggleSelection(
                      option,
                      interlocutorState,
                      setInterlocutorState,
                    )
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    interlocutorState === option
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500"
                  }`}
                >
                  {formatLabel(option)}
                </button>
              ))}
            </div>
          </section>

          {/* Submit */}
          <section className="p-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-teal-600 text-white font-medium py-3 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Analyzing…" : "Log session"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LogSession;
