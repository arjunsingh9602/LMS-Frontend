'use client';

import { useState, useEffect } from "react";
// Layout component ko yahan wapas jod diya gaya hai.
import Layout from "@/components/Layout"; 

export default function PunchInOutPage() {
  const [time, setTime] = useState(null);
  // New States for Punch In/Out logic
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  useEffect(() => {
    // Current running clock
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to handle Punch In/Out button click
  const handlePunchToggle = () => {
    const currentTime = new Date();
    
    if (!isPunchedIn) {
      // PUNCH IN Logic
      setPunchInTime(currentTime);
      setPunchOutTime(null); // Clear previous punch out time
      setIsPunchedIn(true);
      alert(`Punched In at: ${currentTime.toLocaleTimeString()}`); // Using alert temporarily for demonstration
    } else {
      // PUNCH OUT Logic
      setPunchOutTime(currentTime);
      setIsPunchedIn(false);
      alert(`Punched Out at: ${currentTime.toLocaleTimeString()}`); // Using alert temporarily for demonstration
    }
  };
  
  // Helper function to format time display
  const formatTime = (date) => {
    if (!date) return 'Not Yet';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getButtonClass = () => {
      return isPunchedIn
          ? "bg-red-600 hover:bg-red-700" // Red for Punch Out
          : "bg-green-600 hover:bg-green-700"; // Green for Punch In
  };


  return (
    // Page content ko Layout component se wrap karein
    <Layout>
      <div className="p-6"> 
        {/* Header with Title + Punch In Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Punch-In / Punch-Out</h1>
          <button 
            className={`${getButtonClass()} text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition duration-150 transform hover:scale-105`}
            onClick={handlePunchToggle} // Added onClick handler
          >
            {isPunchedIn ? 'Punch Out' : 'Punch In'} {/* Dynamic Button Text */}
          </button>
        </div>

        {/* Main Grid: Left is 1 column (Summary), Right is 2 columns (Time Log) */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Panel - Current Status and Leave Summary (col-span-1) */}
          <div className="col-span-1 flex flex-col gap-6">
              
              {/* Current Status Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md flex-shrink-0">
                  <h2 className="text-lg font-semibold">
                      Good Morning, <span className="text-blue-600">Super Admin</span>
                  </h2>
                  <p className="text-gray-500 mb-6">
                      {time
                          ? `It's ${time.toLocaleTimeString("en-US", {
                              timeZone: "Asia/Kolkata",
                          })} (Asia/Calcutta)`
                          : "Loading time..."}
                  </p>

                  {/* Punch In / Out Status - Updated to show live state */}
                  <div className="flex items-center justify-between">
                      <div className="text-center">
                          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl mx-auto">
                              ⏩
                          </div>
                          <p className="mt-2 text-sm font-medium">{formatTime(punchInTime)}</p>
                          <p className="text-xs text-gray-500">Punch in time</p>
                      </div>
                      <div className="text-center">
                          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xl mx-auto">
                              ⏪
                          </div>
                          <p className="mt-2 text-sm font-medium">{formatTime(punchOutTime)}</p>
                          <p className="text-xs text-gray-500">Punch out time</p>
                      </div>
                  </div>
              </div>

              {/* Leave Summary Card (New Single Card Structure) */}
              <div className="bg-white rounded-2xl p-6 shadow-md flex-grow">
                  <h2 className="text-lg font-semibold mb-4">Leave Summary</h2>

                  {/* Leave Summary Grid */}
                  <div className="grid grid-cols-2 gap-4">
                      
                      {/* Total leave allowance */}
                      <div className="bg-gray-100 rounded-xl p-3">
                          <p className="font-semibold text-xl">0</p>
                          <p className="text-xs text-gray-500 mb-1">Total leave allowance</p>
                          <div className="flex justify-between text-xs text-gray-600">
                              <span className="font-medium">CL - 0</span>
                              <span className="font-medium">SL - 0</span>
                          </div>
                      </div>

                      {/* Total leave taken */}
                      <div className="bg-gray-100 rounded-xl p-3">
                          <p className="font-semibold text-xl">0</p>
                          <p className="text-xs text-gray-500 mb-1">Total leave taken</p>
                          <div className="flex justify-between text-xs text-gray-600">
                              <span className="font-medium">Paid - 0</span>
                              <span className="font-medium">Unpaid - 0</span>
                          </div>
                      </div>

                      {/* Total leave available */}
                      <div className="bg-gray-100 rounded-xl p-3">
                          <p className="font-semibold text-xl">0</p>
                          <p className="text-xs text-gray-500 mb-1">Total leave available</p>
                          <div className="flex justify-between text-xs text-gray-600">
                              <span className="font-medium">CL - 0</span>
                              <span className="font-medium">SL - 0</span>
                          </div>
                      </div>

                      {/* Leave request pending */}
                      <div className="bg-gray-100 rounded-xl p-3">
                          <p className="font-semibold text-xl">0</p>
                          <p className="text-xs text-gray-500 mb-1">Leave request pending</p>
                          <div className="flex justify-between text-xs text-gray-600">
                              <span className="font-medium">Paid - 0</span>
                              <span className="font-medium">Unpaid - 0</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Big Card - Time Log (col-span-2) */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Time Log</h2>

            <div className="mb-6 border-b pb-4">
              <h3 className="font-medium mb-2 text-lg">Today</h3>
              <div className="grid grid-cols-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Scheduled: 9h 0m 0s</span>
                <span>Worked: 00:00</span>
                <span>Break: 00:00</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-lg">This Month</h3>
              {/* Progress Bar 1: Worked time */}
              <div className="mb-4">
                <p className="text-sm flex justify-between">Worked time <span className="font-medium"></span></p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full w-1/2"></div>
                </div>
              </div>
              {/* Progress Bar 2: Shortage time */}
              <div className="mb-4">
                <p className="text-sm flex justify-between">Shortage time <span className="font-medium"></span></p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-1/3"></div>
                </div>
              </div>
              {/* Progress Bar 3: Over time */}
              <div className="mb-4">
                <p className="text-sm flex justify-between">Over time <span className="font-medium"></span></p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}