"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { FaBars, FaTimes, FaBed, FaHospital } from "react-icons/fa";

interface Bed {
  id: string;
  status: string;
}

const categorizeBed = (id: string) => {
  const bedNumber = parseInt(id.split("_")[2]);
  if (bedNumber <= 5) return "Private";
  if (bedNumber <= 10) return "Semi-Private";
  return "General";
};

const Beds: React.FC = () => {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedWard, setSelectedWard] = useState<"Private" | "Semi-Private" | "General">("Private");

  useEffect(() => {
    const bedsRef = ref(database, "beds");

    const unsubscribe = onValue(
      bedsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updatedBeds = Object.keys(data).map((key) => ({
            id: key,
            status: data[key].status || "unoccupied",
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

  const groupedBeds = {
    Private: beds.filter((bed) => categorizeBed(bed.id) === "Private"),
    "Semi-Private": beds.filter((bed) => categorizeBed(bed.id) === "Semi-Private"),
    General: beds.filter((bed) => categorizeBed(bed.id) === "General"),
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-300 transition-all duration-300 ease-in-out shadow-md ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
       
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          {sidebarOpen && (
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <FaHospital className="text-blue-600" /> Hospital Admin
            </h2>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900 transition">
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

       
        <nav className="flex-1 p-3">
          {["Private", "Semi-Private", "General"].map((ward) => (
            <div
              key={ward}
              onClick={() => setSelectedWard(ward as "Private" | "Semi-Private" | "General")}
              className={`flex items-center gap-3 p-3 my-2 rounded-md cursor-pointer transition-all ${
                selectedWard === ward
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              <FaBed className="text-blue-500" />
              {sidebarOpen && <span>{ward} Ward</span>}
            </div>
          ))}
        </nav>
      </aside>

     
      <main className={`flex-1 p-6 transition-all ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedWard} Ward - Bed Availability</h2>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupedBeds[selectedWard].map((bed) => (
            <div
              key={bed.id}
              className={`p-4 border rounded-lg shadow-sm text-center transition-all ${
                bed.status === "occupied" ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
              }`}
            >
              <h4 className="text-lg font-semibold text-gray-700">{bed.id.replace("_", " ")}</h4>
              <p className={`font-medium ${bed.status === "occupied" ? "text-red-700" : "text-green-700"}`}>
                {bed.status === "occupied" ? "Occupied" : "Available"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Beds;
