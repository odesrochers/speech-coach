import ReactMarkdown from "react-markdown";

function SessionFeedback({ session, onBack }) {
  return (
    <div>
      <h1>Session Feedback</h1>

      <div>
        <p>
          <strong>Type:</strong> {session.type}
        </p>
        <p>
          <strong>Date:</strong> {session.date}
        </p>
        <p>
          <strong>Success Rating:</strong> {session.successRating}/5
        </p>
        <p>
          <strong>Notes:</strong> {session.notes}
        </p>
      </div>

      <div>
        <h2>Feedback</h2>
        <ReactMarkdown>{session.aiFeedback}</ReactMarkdown>
      </div>

      <div>
        <h2>Pattern</h2>
        <ReactMarkdown>{session.aiPattern}</ReactMarkdown>
      </div>

      <div>
        <h2>Summary</h2>
        <ReactMarkdown>{session.aiSummary}</ReactMarkdown>
      </div>

      <button onClick={onBack}>Log Another Session</button>
    </div>
  );
}

export default SessionFeedback;
