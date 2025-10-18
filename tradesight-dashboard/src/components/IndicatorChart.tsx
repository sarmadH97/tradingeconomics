import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import type { IndicatorData } from "../types";

interface Props {
  title: string;
  dataA: IndicatorData[];
  dataB: IndicatorData[];
  countryA: string;
  countryB: string;
}

const IndicatorChart: React.FC<Props> = ({ title, dataA, dataB, countryA, countryB }) => {
  const formatted = dataA.map((d, i) => ({
    date: d.DateTime.slice(0, 10),
    [countryA]: d.Value,
    [countryB]: dataB[i]?.Value ?? null,
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={countryA} stroke="#2563eb" />
          <Line type="monotone" dataKey={countryB} stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndicatorChart;
