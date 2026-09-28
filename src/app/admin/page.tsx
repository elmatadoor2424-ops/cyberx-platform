import React from "react";
import AdminPortal from "@/components/admin/AdminPortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberX Admin Login",
  description: "Restricted Area - Eng. Ahmed Omar",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRoutePage() {
  return <AdminPortal />;
}
