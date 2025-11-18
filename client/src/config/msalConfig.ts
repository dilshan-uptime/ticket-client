import { Configuration, PopupRequest } from "@azure/msal-browser";
import { env } from "./env";

export const msalConfig: Configuration = {
  auth: {
    clientId: env.clientId || "",
    authority: `https://login.microsoftonline.com/${env.tenantId || "common"}`,
    redirectUri: env.redirectUri,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
  prompt: "select_account",
};
