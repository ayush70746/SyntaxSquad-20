"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Bell, Users, ClipboardList, RotateCw, Activity,
  Clock, UserPlus, CalendarDays, BarChart2, Stethoscope 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";

interface PatientDetails {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  contact: string;
  email?: string;
  address: string;
  symptoms: string[];
  appointmentType: "Regular" | "Emergency" | "Follow-up";
  preferredDoctor?: string;
  previousVisits?: number;
  vitalSigns?: {
    bloodPressure: string;
    temperature: number;
    heartRate: number;
  };
}

interface DoctorMetrics {
  totalPatients: number;
  averageConsultationTime: number;
  patientSatisfaction: number;
  successfulTreatments: number;
}

interface QueueSlot {
  id: string;
  patient: PatientDetails;
  estimatedTime: string;
  actualStartTime?: string;
  status: "Waiting" | "In-Progress" | "Completed" | "Cancelled";
  priority: number;
  assignedDoctor: string;
}


const generateWeeklyData = (doctorId: string) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const basePatients = Math.floor(Math.random() * 10) + 15;
  
  return days.map(day => ({
    day,
    patients: basePatients + Math.floor(Math.random() * 10),
    waitTime: Math.floor(Math.random() * 30) + 10,
    satisfaction: Math.floor(Math.random() * 20) + 80,
  }));
};

const HospitalDashboard = () => {
  const [patientQueue, setPatientQueue] = useState<QueueSlot[]>([]);
  const [newPatient, setNewPatient] = useState<Partial<PatientDetails>>({});
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [doctorMetrics, setDoctorMetrics] = useState<Record<string, DoctorMetrics>>({});
  const [queueRotationSpeed, setQueueRotationSpeed] = useState<number>(15000); // 15 seconds
  const [availableDoctors] = useState([
    { id: "D1", name: "Dr. Ravindra", specialization: "General Medicine" },
    { id: "D2", name: "Dr. Virender", specialization: "Cardiology" },
    { id: "D3", name: "Dr. Suman", specialization: "Pediatrics" }
  ]);

  
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setPatientQueue(prevQueue => {
        if (prevQueue.length <= 1) return prevQueue;
        
        const [current, ...rest] = prevQueue;
        const updatedCurrent = {
          ...current,
          status: "Completed" as const
        };
        
        
        setDoctorMetrics(prev => ({
          ...prev,
          [updatedCurrent.assignedDoctor]: {
            ...prev[updatedCurrent.assignedDoctor],
            totalPatients: (prev[updatedCurrent.assignedDoctor]?.totalPatients || 0) + 1
          }
        }));

        return [...rest, updatedCurrent];
      });
    }, queueRotationSpeed);

    return () => clearInterval(rotationInterval);
  }, [queueRotationSpeed]);

  
  useEffect(() => {
    const statsInterval = setInterval(() => {
      availableDoctors.forEach(doctor => {
        const newData = generateWeeklyData(doctor.id);
        setWeeklyStats(prev => ({
          ...prev,
          [doctor.id]: newData
        }));
      });
    }, 30000); 

    return () => clearInterval(statsInterval);
  }, []);

  
  const handlePatientBooking = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPatient.name || !newPatient.age) return;

    const patientId = `P${Date.now()}`;
    const assignedDoctor = availableDoctors[Math.floor(Math.random() * availableDoctors.length)];
    
    const newSlot: QueueSlot = {
      id: patientId,
      patient: {
        id: patientId,
        name: newPatient.name!,
        age: newPatient.age!,
        gender: newPatient.gender || "Other",
        contact: newPatient.contact || "",
        address: newPatient.address || "",
        symptoms: newPatient.symptoms || [],
        appointmentType: newPatient.appointmentType || "Regular",
        vitalSigns: {
          bloodPressure: "120/80",
          temperature: 98.6,
          heartRate: 72
        }
      } as PatientDetails,
      estimatedTime: new Date(Date.now() + patientQueue.length * 15 * 60000).toLocaleTimeString(),
      status: "Waiting",
      priority: newPatient.appointmentType === "Emergency" ? 1 : 3,
      assignedDoctor: assignedDoctor.id
    };

    setPatientQueue(prev => {
     
      const updatedQueue = [...prev, newSlot].sort((a, b) => a.priority - b.priority);
      return updatedQueue;
    });

    setNewPatient({});
  }, [newPatient, patientQueue]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-blue-600">
            <Users size={20} />
            <h3 className="font-semibold">Active Patients</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{patientQueue.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-green-600">
            <Activity size={20} />
            <h3 className="font-semibold">Average Wait Time</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {Math.round(patientQueue.length * 15)} mins
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-purple-600">
            <Stethoscope size={20} />
            <h3 className="font-semibold">Available Doctors</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{availableDoctors.length}</p>
        </div>
      </div>

      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="text-blue-600" />
          New Patient Registration
        </h2>
        <form onSubmit={handlePatientBooking} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            className="p-2 border rounded-lg"
            value={newPatient.name || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Age"
            className="p-2 border rounded-lg"
            value={newPatient.age || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, age: parseInt(e.target.value) }))}
          />
          <select
            className="p-2 border rounded-lg"
            value={newPatient.gender || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, gender: e.target.value as "Male" | "Female" | "Other" }))}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="tel"
            placeholder="Contact Number"
            className="p-2 border rounded-lg"
            value={newPatient.contact || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, contact: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Address"
            className="p-2 border rounded-lg"
            value={newPatient.address || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
          />
          <select
            className="p-2 border rounded-lg"
            value={newPatient.appointmentType || ''}
            onChange={e => setNewPatient(prev => ({ ...prev, appointmentType: e.target.value as "Regular" | "Emergency" | "Follow-up" }))}
          >
            <option value="">Appointment Type</option>
            <option value="Regular">Regular</option>
            <option value="Emergency">Emergency</option>
            <option value="Follow-up">Follow-up</option>
          </select>
          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register Patient
          </button>
        </form>
      </div>

     
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ClipboardList className="text-blue-600" />
            Current Queue
          </h2>
          <button
            onClick={() => setQueueRotationSpeed(prev => prev > 5000 ? prev - 5000 : prev)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
          >
            <RotateCw size={16} />
            Rotate queue
          </button>
        </div>
        <div className="space-y-3">
          {patientQueue.map((slot, index) => (
            <div 
              key={slot.id}
              className={`p-4 rounded-lg border-l-4 ${
                slot.status === "Waiting" ? "border-l-yellow-500 bg-yellow-50" :
                slot.status === "In-Progress" ? "border-l-blue-500 bg-blue-50" :
                "border-l-green-500 bg-green-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{slot.patient.name}</h3>
                  <p className="text-sm text-gray-600">
                    {slot.patient.age} years • {slot.patient.gender} • 
                    
                  </p>
                  <p className="text-sm text-gray-600">
                    Assigned: {availableDoctors.find(d => d.id === slot.assignedDoctor)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{slot.estimatedTime}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    slot.status === "Waiting" ? "bg-yellow-200 text-yellow-700" :
                    slot.status === "In-Progress" ? "bg-blue-200 text-blue-700" :
                    "bg-green-200 text-green-700"
                  }`}>
                    {slot.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="text-blue-600" />
          Real-time Analytics
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Object.values(weeklyStats).flat()}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorPatients)" 
              />
              <Area 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorPatients)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;