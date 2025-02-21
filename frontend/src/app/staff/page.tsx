"use client";
import { useState } from "react";
import axios from "axios";

const StaffReassignment = () => {
  const [alerts, setAlerts] = useState<{ message: string; id: number }[]>([]);

  const handleEmergencyReassign = async (emergencyType: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/staff/reassign",
        { emergencyType }
      );

      setAlerts((prevAlerts) => [
        { message: response.data.message, id: Date.now() },
        ...prevAlerts,
      ]);
    } catch (error) {
      console.error("❌ Error in AI reassignment:", error);
      setAlerts((prevAlerts) => [
        { message: "⚠️ AI could not process reassignment.", id: Date.now() },
        ...prevAlerts,
      ]);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* 🚑 AI Emergency Reassignment Section */}
      <h3 className="font-bold text-2xl mb-6 text-gray-800 dark:text-gray-200">
        🚑 AI Emergency Response
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => handleEmergencyReassign("ICU Critical Shortage")}
          className="px-6 py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          ICU Emergency 🚨
        </button>
        <button
          onClick={() => handleEmergencyReassign("Surgery Assistance Needed")}
          className="px-6 py-3 text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          Surgery Backup 🏥
        </button>
        <button
          onClick={() => handleEmergencyReassign("General Ward Overload")}
          className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          General Ward 🏨
        </button>
      </div>

      {/* 🔴 Live AI Alerts Section */}
      <div className="mt-8">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">🔴 Live AI Alerts</h3>
        <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          {alerts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No emergency alerts yet.</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-white dark:bg-gray-700 shadow-md my-2 rounded-lg border-l-4 border-red-500"
              >
                {alert.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffReassignment;
