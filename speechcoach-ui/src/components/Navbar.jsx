export default function Navbar({ onNavigate }) {
  return (
    <nav className="flex gap-4 p-4 bg-stone-900 border-b border-stone-700">
      <button
        onClick={() => onNavigate("log")}
        className="text-teal-400 hover:text-teal-300 font-semibold"
      >
        Log Session
      </button>
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-teal-400 hover:text-teal-300 font-semibold"
      >
        Dashboard
      </button>
    </nav>
  );
}
