import ReactMarkdown from "react-markdown";

function SessionFeedback({ session, onBack }) {
  const typeLabels = {
    CALL: "Call",
    MEETING: "Meeting",
    PRESENTATION: "Presentation",
    REGULAR_CONVERSATION: "Regular conversation",
    CRUCIAL_CONVERSATION: "Crucial conversation",
    INTERVIEW: "Interview",
    OTHER: "Other",
  };

  const ratingLabels = ["Rough", "Below par", "Okay", "Good", "Excellent"];

  return (
    <div className="min-h-screen bg-stone-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-teal-400 uppercase mb-1">
            Speech Coach
          </p>
          <h1 className="text-3xl font-serif text-stone-100">
            Session feedback
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Here's what came out of this one.
          </p>
        </header>

        <div className="bg-stone-900 rounded-2xl shadow-sm border border-stone-800 divide-y divide-stone-800">
          {/* Session details */}
          <section className="p-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide">
                  Type
                </span>
                <p className="text-stone-100 font-medium">
                  {typeLabels[session.type] || session.type}
                </p>
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide">
                  Date
                </span>
                <p className="text-stone-100 font-medium">{session.date}</p>
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide">
                  Rating
                </span>
                <p className="text-stone-100 font-medium">
                  {session.successRating}/5
                  <span className="text-stone-400 font-normal text-sm ml-1.5">
                    ({ratingLabels[session.successRating - 1]})
                  </span>
                </p>
              </div>
            </div>
            {session.notes && (
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide">
                  Notes
                </span>
                <p className="text-stone-300 mt-1 whitespace-pre-wrap">
                  {session.notes}
                </p>
              </div>
            )}
          </section>

          {/* Feedback */}
          {session.aiFeedback && (
            <section className="p-6">
              <h2 className="text-sm font-semibold text-teal-400 uppercase tracking-wide mb-2">
                Feedback
              </h2>
              <div className="text-sm text-stone-300 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-stone-100 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1 [&_h1]:text-stone-100 [&_h2]:text-stone-100 [&_h3]:text-stone-100 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_a]:text-teal-400 [&_a]:underline">
                <ReactMarkdown>{session.aiFeedback}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* Pattern */}
          {session.aiPattern && (
            <section className="p-6">
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-2">
                Pattern
              </h2>
              <div className="text-sm text-stone-300 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-stone-100 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1 [&_h1]:text-stone-100 [&_h2]:text-stone-100 [&_h3]:text-stone-100 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_a]:text-teal-400 [&_a]:underline">
                <ReactMarkdown>{session.aiPattern}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* Summary */}
          {session.aiSummary && (
            <section className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide">
                  Summary
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(session.aiSummary)
                  }
                  className="text-xs text-stone-400 hover:text-teal-400 transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-sm text-stone-300 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-stone-100 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2 [&_li]:mb-1 [&_h1]:text-stone-100 [&_h2]:text-stone-100 [&_h3]:text-stone-100 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_a]:text-teal-400 [&_a]:underline">
                <ReactMarkdown>{session.aiSummary}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* Action */}
          <section className="p-6">
            <button
              onClick={onBack}
              className="w-full rounded-lg bg-teal-600 text-white font-medium py-3 hover:bg-teal-500 transition-colors"
            >
              Log another session
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SessionFeedback;
