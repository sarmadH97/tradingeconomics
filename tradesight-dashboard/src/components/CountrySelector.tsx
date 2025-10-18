import React from "react";

interface Props {
  countries: string[];
  onSelect: (index: number, value: string) => void;
}

const CountrySelector: React.FC<Props> = ({ countries, onSelect }) => (
  <div className="flex gap-2 my-4">
    {["Country A", "Country B"].map((label, i) => (
      <select
        key={label}
        onChange={(e) => onSelect(i, e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">Select {label}</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    ))}
  </div>
);

export default CountrySelector;
