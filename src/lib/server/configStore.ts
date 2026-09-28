import fs from "fs";
import path from "path";
import {
  CYBER_SERVICES,
  CYBER_TEAM,
  PROOF_CASES,
  CYBER_CONTACTS,
  ServiceItem,
} from "@/lib/cyberData";

export interface SiteConfiguration {
  services: ServiceItem[];
  team: typeof CYBER_TEAM;
  proofCases: typeof PROOF_CASES;
  contacts: typeof CYBER_CONTACTS;
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const CONFIG_FILE = path.join(DATA_DIR, "site-config.json");

function ensureDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDefaultConfig(): SiteConfiguration {
  return {
    services: CYBER_SERVICES,
    team: CYBER_TEAM,
    proofCases: PROOF_CASES,
    contacts: CYBER_CONTACTS,
    lastUpdated: new Date().toISOString(),
  };
}

export function getSiteConfig(): SiteConfiguration {
  try {
    ensureDirExists();
    if (!fs.existsSync(CONFIG_FILE)) {
      const initial = getDefaultConfig();
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading config file:", error);
    return getDefaultConfig();
  }
}

export function updateSiteConfig(newConfig: Partial<SiteConfiguration>): SiteConfiguration {
  const current = getSiteConfig();
  const merged: SiteConfiguration = {
    ...current,
    ...newConfig,
    contacts: {
      ...current.contacts,
      ...(newConfig.contacts || {}),
      // Enforce strict copyright
      copyrightNotice: "جميع الحقوق محفوظة © CyberX | Eng. Ahmed Omar",
    },
    lastUpdated: new Date().toISOString(),
  };
  ensureDirExists();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}

export function resetSiteConfigToDefaults(): SiteConfiguration {
  const initial = getDefaultConfig();
  ensureDirExists();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(initial, null, 2), "utf-8");
  return initial;
}
