import React from "react";

interface Props {
  insights: string[];
}

const InsightCard: React.FC<Props> = ({ insights }) => (
  <div className="bg-blue-50 p-4 rounded-lg shadow mt-4">
    <h4 className="font-semibold mb-2">Insights</h4>
    <ul className="list-disc pl-5 space-y-1">
      {insights.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  </div>
);

export default InsightCard;
