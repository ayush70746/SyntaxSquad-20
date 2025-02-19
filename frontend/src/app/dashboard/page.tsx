"use client";

import { FaBed, FaUserMd, FaHeartbeat } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <main className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time overview of hospital resources and staff.</p>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Available Beds" icon={<FaBed className="text-blue-600 text-3xl" />} />
        <StatCard title="On-Duty Staff" icon={<FaUserMd className="text-green-600 text-3xl" />} />
        <StatCard title="Equipment Usage" icon={<FaHeartbeat className="text-red-600 text-3xl" />} />
      </section>

      {/* Detailed Info Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card title="Recent Patient Admissions">
          <Table headers={["Patient", "Department", "Status"]} />
        </Card>

        <Card title="Upcoming Staff Shifts">
          <Table headers={["Name", "Role", "Shift Time"]} />
        </Card>
      </section>
    </main>
  );
}

// Reusable Card Component
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// Reusable Stat Card (User will input values dynamically)
function StatCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-5 flex items-center justify-between rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <input
          type="text"
          placeholder="Enter value..."
          className="mt-1 w-full border border-gray-300 rounded p-2 text-gray-700"
        />
      </div>
      {icon}
    </div>
  );
}

// Reusable Table Component (User will input rows)
function Table({ headers }: { headers: string[] }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          {headers.map((header, idx) => (
            <th key={idx} className="py-2 text-gray-700 font-semibold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td colSpan={headers.length} className="py-2 text-gray-500 text-center">
            Add details...
          </td>
        </tr>
      </tbody>
    </table>
  );
}
