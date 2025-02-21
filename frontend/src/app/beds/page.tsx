"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

interface Bed {
  id: string; // Firebase keys are strings ("Bed_Number_1", etc.)
  status: string; // "occupied" or "unoccupied"
}

const Beds: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([]);

  useEffect(() => {
    const bedsRef = ref(database, "beds");

    const unsubscribe = onValue(
      bedsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updatedBeds = Object.keys(data).map((key) => ({
            id: key, // Firebase key ("Bed_Number_1", "Bed_Number_2", etc.)
            status: data[key].status || "unoccupied", // Default to "unoccupied" if missing
          }));
          setBeds(updatedBeds);
        }
      },
      (error) => {
        console.error("Firebase error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Bed Availability</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="py-4 px-6">Bed Number</th>
            <th className="py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {beds.map((bed) => (
            <tr key={bed.id} className="border-t border-gray-200">
              <td className="py-4 px-6">{bed.id.replace("_", " ")}</td>
              <td
                className={`py-4 px-6 font-medium ${
                  bed.status === "occupied" ? "text-red-600" : "text-green-600"
                }`}
              >
                {bed.status === "occupied" ? "Occupied" : "Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Beds;
