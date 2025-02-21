import { PatientDetails } from "@/app/flow/page";
import type { NextConfig } from "next";
import { ReactNode } from "react";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
export interface QueueSlot {
  [x: string]: ReactNode;
  id: string;
  patient: PatientDetails;
  estimatedTime: string;
  actualStartTime?: string;
  status: "Waiting" | "In-Progress" | "Completed" | "Cancelled";
  priority: number;
  assignedDoctor: string;
}
