"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Punch-In / Punch-Out</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold">
            Good Morning, <span className="text-blue-600">Super Admin</span>
          </h2>
          <p className="text-gray-500">
            {time ? (
              <>
                It&apos;s {time.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })} (Asia/Calcutta)
              </>
            ) : (
              "Loading time..."
            )}
          </p>

          <div className="flex items-center justify-between mt-6">
            <div className="text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
                ⏩
              </div>
              <p className="mt-2 text-sm font-medium">Not Yet</p>
              <p className="text-xs text-gray-500">Punch in time</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xl">
                ⏪
              </div>
              <p className="mt-2 text-sm font-medium">Not Yet</p>
              <p className="text-xs text-gray-500">Punch out time</p>
            </div>
          </div>

          {/* Leave summary */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="font-semibold">0</p>
              <p className="text-xs text-gray-500">Total leave allowance</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="font-semibold">0</p>
              <p className="text-xs text-gray-500">Total leave taken</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="font-semibold">0</p>
              <p className="text-xs text-gray-500">Total leave available</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="font-semibold">0</p>
              <p className="text-xs text-gray-500">Leave request pending</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Time Log</h2>

          {/* Today */}
          <div className="mb-6">
            <h3 className="font-medium">Today</h3>
            <p className="text-gray-600 text-sm">Scheduled: 9h 0m 0s</p>
            <p className="text-gray-600 text-sm">Worked: 00:00</p>
            <p className="text-gray-600 text-sm">Break: 00:00</p>
          </div>

          {/* This Month */}
          <div>
            <h3 className="font-medium mb-3">This Month</h3>
            <div className="mb-3">
              <p className="text-sm">Worked time</p>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-1/2"></div>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm">Shortage time</p>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm">Over time</p>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}