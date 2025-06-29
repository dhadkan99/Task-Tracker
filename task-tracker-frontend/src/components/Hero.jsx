import React, { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

// assuming you save the chart in a separate file

function Hero() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      {/* left side */}
      <section className="absolute top-[100px] left-[80px] w-72 h-[228px] rounded-[16px] overflow-hidden shadow-md border-2 border-gray-300 bg-white flex items-center justify-center">
        {/* Simple Line Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={[
              { name: "16", value: 88 },
              { name: "17", value: 30 },
              { name: "18", value: 50 },
              { name: "19", value: 30 },
              { name: "20", value: 80 },
              { name: "21", value: 50 },
              { name: "22", value: 60 },
            ]}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide={true} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
      <section className="absolute top-[35%] left-[80px] w-72 h-[545px] rounded-[16px] overflow-hidden shadow-md border-2 border-gray-300 bg-white p-4">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 text-gray-600 rounded hover:text-gray-800 hover:bg-gray-100"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {getMonthName(currentDate)}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-1 text-gray-600 rounded hover:text-gray-800 hover:bg-gray-100"
          >
            →
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-2 text-sm font-medium text-center text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`h-8 flex items-center justify-center text-sm rounded cursor-pointer transition-colors ${
                day === null
                  ? "text-gray-300"
                  : isToday(day)
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Footer */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <div className="flex items-center mb-2">
              <div className="mr-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Today</span>
            </div>
            <div className="text-xs text-gray-500">
              Click on any date to view tasks
            </div>
          </div>
        </div>
      </section>
      <section className="absolute top-[100px] right-[80px] w-72 h-[228px] rounded-[16px] overflow-hidden shadow-md border-2 border-gray-300 bg-white p-6 flex flex-col items-center justify-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <img
            src="https://i.pinimg.com/736x/da/f1/c2/daf1c203bf5890ab63ea7d9fad476910.jpg"
            alt="Profile"
            className="object-cover w-20 h-20 rounded-full border-4 border-blue-100 shadow-lg"
          />
        </div>

        {/* User Name */}
        <h3 className="mb-1 text-xl font-bold text-gray-800">Dhadkan</h3>
        {/* User Role */}

        <p className="mb-3 text-sm text-gray-600">Web Developer</p>
      </section>
      <section className="absolute top-[35%] right-[80px] w-72 h-[545px] rounded-[16px] overflow-hidden shadow-md border-2 border-gray-300">
        <img
          src="https://i.pinimg.com/736x/b1/bd/9e/b1bd9ef6d2de4aff119e3b7102aff339.jpg"
          alt="image"
          className="object-cover w-full h-full"
        />
        <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-40">
          <h3 className="text-lg font-semibold text-white">Hello User</h3>
        </div>
      </section>
    </div>
  );
}

export default Hero;
// absolute top-[85px] left-[600px] right-[51px] h-[800px] bg-white rounded-[16px] border-2 border-[#dadada] shadow-md p-6 flex flex-col z-[50]
//flex h-[228px] pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[24px] items-start flex-nowrap  border-solid border-2 border-[#dadada] absolute top-[85px] right-[1148px] left-[11px]  z-[64]
