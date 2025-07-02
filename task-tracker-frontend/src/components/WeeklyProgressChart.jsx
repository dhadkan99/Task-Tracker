import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 16 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 25 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 24 },
];

export default function TaskProgress() {
  return (
    <div className="bg-white rounded-xl shadow p-6 col-span-2 w-full max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-purple-700 mb-1 flex items-center gap-2">
        ● Weekly Progress
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Track your task completion trends over the week
      </p>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#a78bfa", fontWeight: 500 }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                background: "#fff",
                border: "1px solid #a78bfa",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#a78bfa"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={3}
              dot={{ r: 5, fill: "#a78bfa", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
