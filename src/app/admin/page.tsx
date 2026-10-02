import React from "react";
import AdminPortal from "@/components/admin/AdminPortal";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إدارة المنصة | CyberX Admin Command Center",
  description: "Secure Command & Control Portal for Eng. Ahmed Omar - CyberX",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRoutePage() {
  return <AdminPortal />;
}
