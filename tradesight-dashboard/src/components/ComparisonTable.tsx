import React from "react";

interface Props {
  indicators: string[];
  data: Record<string, { a?: number; b?: number }>;
}

const ComparisonTable: React.FC<Props> = ({ indicators, data }) => (
  <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 text-left">Indicator</th>
        <th className="p-2">Country A</th>
        <th className="p-2">Country B</th>
      </tr>
    </thead>
    <tbody>
      {indicators.map(ind => (
        <tr key={ind} className="border-t">
          <td className="p-2">{ind}</td>
          <td className="p-2">{data[ind]?.a ?? "—"}</td>
          <td className="p-2">{data[ind]?.b ?? "—"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);


export default ComparisonTable;
