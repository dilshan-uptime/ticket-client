import axios, { AxiosError } from "axios";
import type { Ticket, InsertTicket } from "@shared/schema";
import { env } from "@/config/env";

const API_URL = env.apiUrl;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const ticketApi = {
  getAll: async (): Promise<Ticket[]> => {
    const response = await apiClient.get<Ticket[]>("/tickets");
    return response.data;
  },
  
  getById: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },
  
  create: async (ticket: InsertTicket): Promise<Ticket> => {
    const response = await apiClient.post<Ticket>("/tickets", ticket);
    return response.data;
  },
  
  update: async (id: string, ticket: Partial<InsertTicket>): Promise<Ticket> => {
    const response = await apiClient.put<Ticket>(`/tickets/${id}`, ticket);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tickets/${id}`);
  },
};
