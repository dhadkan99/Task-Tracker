import React from "react";

export default function SummaryCards({ summaryData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {summaryData.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">{item.title}</span>
            <span className="text-2xl">{item.icon}</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{item.value}</div>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <span>{item.change}</span>
            <span className="text-gray-400">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
