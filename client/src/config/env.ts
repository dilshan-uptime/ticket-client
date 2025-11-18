// Environment configuration helper
// This file validates that all required environment variables are present

interface EnvironmentConfig {
  clientId: string;
  tenantId: string;
  redirectUri: string;
  apiUrl: string;
  httpTimeout: number;
  version: string;
  isProduction: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    return "";
  }
  return value;
}

export const env: EnvironmentConfig = {
  clientId: getEnvVar("VITE_CLIENT_ID"),
  tenantId: getEnvVar("VITE_TENANT_ID"),
  redirectUri: getEnvVar("VITE_REDIRECT_URI", window.location.origin + "/home"),
  apiUrl: getEnvVar("VITE_API_URL"),
  httpTimeout: parseInt(getEnvVar("VITE_HTTP_REQUEST_TIMEOUT", "5000")),
  version: getEnvVar("VITE_VERSION", "v1.0.0"),
  isProduction: getEnvVar("VITE_IS_PRODUCTION", "false") === "true",
};

// Validate required variables on app load
export function validateEnvironment(): boolean {
  const required = ["clientId", "tenantId", "apiUrl"];
  const missing = required.filter((key) => !env[key as keyof EnvironmentConfig]);
  
  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    return false;
  }
  
  return true;
}
