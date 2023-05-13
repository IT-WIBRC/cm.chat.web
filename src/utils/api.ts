import { OpenAPI } from "@/services";

export const getToken = async (): Promise<string> => {
  return localStorage.getItem("apiAccessToken") || "";
};

export const setApiRoute = (): void => {
  OpenAPI.BASE = import.meta.env.VITE_REST_API_BASE_URL + "/api/v1";
};

OpenAPI.TOKEN = getToken;
