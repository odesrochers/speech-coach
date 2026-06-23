import { useState } from "react";
import LogSession from "./components/LogSession";
import SessionFeedback from "./components/SessionFeedback";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [currentScreen, setCurrentScreen] = useState("log");
  const [sessionResult, setSessionResult] = useState(null);

  function handleSessionLogged(result) {
    setSessionResult(result);
    setCurrentScreen("feedback");
  }

  function handleBack() {
    setCurrentScreen("log");
    setSessionResult(null);
  }

  return (
    <div>
      <Navbar onNavigate={setCurrentScreen} />
      {currentScreen === "log" && (
        <LogSession onSessionLogged={handleSessionLogged} />
      )}
      {currentScreen === "feedback" && (
        <SessionFeedback session={sessionResult} onBack={handleBack} />
      )}
      {currentScreen === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
