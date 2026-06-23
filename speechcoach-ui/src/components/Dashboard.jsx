import SkillRankingChart from "./SkillRankingChart";

export default function Dashboard() {
  return (
    <div className="p-8 bg-stone-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold text-teal-400 mb-8">Insights</h2>
      <SkillRankingChart />
    </div>
  );
}
