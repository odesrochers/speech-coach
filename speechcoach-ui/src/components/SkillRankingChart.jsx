import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const skill = payload[0].payload;
  return (
    <div className="bg-stone-800 border border-stone-600 rounded p-3 text-sm max-w-xs">
      <p className="text-white font-semibold mb-1">{skill.skillName}</p>
      <p className="text-stone-300">{skill.skillDescription}</p>
      <p className="text-teal-400 mt-1">Score: {skill.score}</p>
    </div>
  );
}

export default function SkillRankingChart() {
  const [top3, setTop3] = useState([]);
  const [bottom3, setBottom3] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/insights/skill-ranking")
      .then((res) => res.json())
      .then((data) => {
        setTop3(data.slice(0, 3));
        setBottom3(data.slice(-3));
      });
  }, []);

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <h3 className="text-teal-400 font-semibold mb-2">Top Skills</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={top3} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="skillName" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#2dd4bf" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <h3 className="text-amber-400 font-semibold mb-2">Needs Work</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={bottom3} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="skillName" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
