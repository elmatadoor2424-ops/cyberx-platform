import React from "react";
import AdminPortal from "@/components/admin/AdminPortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberX Command Center | Restricted Portal",
  description: "Secure Command & Control Portal for Eng. Ahmed Omar - CyberX",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CyberxAdminPage() {
  return <AdminPortal />;
}
