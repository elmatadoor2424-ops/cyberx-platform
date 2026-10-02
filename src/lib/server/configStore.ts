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
const TMP_CONFIG_FILE = path.join("/tmp", "cyberx_site_config.json");

const globalStore = globalThis as unknown as { _cyberxConfig?: SiteConfiguration };

function tryWriteFile(filePath: string, data: string): boolean {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, data, "utf-8");
    return true;
  } catch {
    return false;
  }
}

function tryReadFile(filePath: string): string | null {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch {}
  return null;
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
  if (globalStore._cyberxConfig) {
    return globalStore._cyberxConfig;
  }

  // 1. Try /tmp
  const tmpContent = tryReadFile(TMP_CONFIG_FILE);
  if (tmpContent) {
    try {
      const parsed = JSON.parse(tmpContent);
      if (parsed && parsed.services) {
        globalStore._cyberxConfig = parsed;
        return parsed;
      }
    } catch {}
  }

  // 2. Try src/data/site-config.json
  const fileContent = tryReadFile(CONFIG_FILE);
  if (fileContent) {
    try {
      const parsed = JSON.parse(fileContent);
      if (parsed && parsed.services) {
        globalStore._cyberxConfig = parsed;
        return parsed;
      }
    } catch {}
  }

  // 3. Fallback to default
  const initial = getDefaultConfig();
  globalStore._cyberxConfig = initial;
  saveConfig(initial);
  return initial;
}

function saveConfig(config: SiteConfiguration): boolean {
  globalStore._cyberxConfig = config;
  const dataStr = JSON.stringify(config, null, 2);
  tryWriteFile(CONFIG_FILE, dataStr);
  tryWriteFile(TMP_CONFIG_FILE, dataStr);
  return true;
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
  saveConfig(merged);
  return merged;
}

export function resetSiteConfigToDefaults(): SiteConfiguration {
  const initial = getDefaultConfig();
  saveConfig(initial);
  return initial;
}
