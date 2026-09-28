"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CYBER_SERVICES,
  CYBER_TEAM,
  PROOF_CASES,
  CYBER_CONTACTS,
  ServiceItem,
} from "@/lib/cyberData";

interface CyberConfigContextType {
  services: ServiceItem[];
  team: typeof CYBER_TEAM;
  proofCases: typeof PROOF_CASES;
  contacts: typeof CYBER_CONTACTS;
  refreshConfig: () => Promise<void>;
  isLoading: boolean;
}

const defaultContextValue: CyberConfigContextType = {
  services: CYBER_SERVICES,
  team: CYBER_TEAM,
  proofCases: PROOF_CASES,
  contacts: CYBER_CONTACTS,
  refreshConfig: async () => {},
  isLoading: false,
};

const CyberConfigContext = createContext<CyberConfigContextType>(defaultContextValue);

export function CyberConfigProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<ServiceItem[]>(CYBER_SERVICES);
  const [team, setTeam] = useState<typeof CYBER_TEAM>(CYBER_TEAM);
  const [proofCases, setProofCases] = useState<typeof PROOF_CASES>(PROOF_CASES);
  const [contacts, setContacts] = useState<typeof CYBER_CONTACTS>(CYBER_CONTACTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/config", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.config) {
        if (data.config.services) setServices(data.config.services);
        if (data.config.team) setTeam(data.config.team);
        if (data.config.proofCases) setProofCases(data.config.proofCases);
        if (data.config.contacts) {
          setContacts({
            ...CYBER_CONTACTS,
            ...data.config.contacts,
            copyrightNotice: "جميع الحقوق محفوظة © CyberX | Eng. Ahmed Omar",
          });
        }
      }
    } catch (err) {
      // Fallback silently to static cyberData
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <CyberConfigContext.Provider
      value={{
        services,
        team,
        proofCases,
        contacts,
        refreshConfig: fetchConfig,
        isLoading,
      }}
    >
      {children}
    </CyberConfigContext.Provider>
  );
}

export function useCyberConfig() {
  return useContext(CyberConfigContext);
}
