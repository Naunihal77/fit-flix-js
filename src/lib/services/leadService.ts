// src/lib/services/leadService.ts
// Keeps same public API but safer for client-side usage

// If you still have a local config file for server code, keep it but do not rely on it for client runtime.
// import { config } from "../config"; // optional - only use for server environment

export interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  source: string;
  interest?: string;
  gymId?: number | null;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
}

/** Helper: get API base URL in a client-safe way */
function getBaseUrl(): string {
  // Preferred: public env var for client builds
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv;

  // Fallback: if you have a server-side config available at build time
  // try to read it safely (do not include secrets in frontend)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require("../config").config;
    if (cfg?.api?.baseUrl) return cfg.api.baseUrl;
  } catch (_) {
    // ignore - config may not be available in client bundles
  }

  // Default to same origin api route
  return "";
}

/** Helper: fetch with timeout using AbortController */
async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(input, { ...init, signal: controller.signal });
    clearTimeout(timer);
    return resp;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

class LeadService {
  private baseUrl: string;
  constructor() {
    const base = getBaseUrl();
    // if base is empty string -> we'll post to relative /api/leads
    this.baseUrl = base ? `${base.replace(/\/$/, "")}/api/leads` : `/api/leads`;
  }

  private async parseJsonSafe(res: Response) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  async submitLead(leadData: LeadSubmission, timeoutMs = 10000): Promise<LeadResponse> {
    try {
      const response = await fetchWithTimeout(this.baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }, timeoutMs);

      const result = await this.parseJsonSafe(response);
      if (!response.ok) {
        return {
          success: false,
          message: result?.message ?? `Request failed with status ${response.status}`,
          data: result,
          status: response.status,
        };
      }

      return {
        success: true,
        message: result?.message ?? "Lead submitted",
        data: result?.data ?? result ?? null,
        status: response.status,
      };
    } catch (err: any) {
      console.error("Error submitting lead:", err);
      // Network/abort errors: rethrow or return consistent error object — choose one
      // I return a structured error so UI can show friendly message without try/catch,
      // but rethrow for AbortError if you want to handle specially client side.
      if (err.name === "AbortError") {
        return { success: false, message: "Request timed out", data: null };
      }
      return { success: false, message: err?.message ?? "Network error", data: null };
    }
  }

  async getLeads(page = 1, limit = 20, status?: string, source?: string, timeoutMs = 10000): Promise<LeadResponse> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status && status !== "all") params.append("status", status);
      if (source && source !== "all") params.append("source", source);

      const url = `${this.baseUrl}?${params.toString()}`;
      const response = await fetchWithTimeout(url, { method: "GET" }, timeoutMs);
      const result = await this.parseJsonSafe(response);

      if (!response.ok) {
        return { success: false, message: result?.message ?? `Request failed ${response.status}`, data: result, status: response.status };
      }
      return { success: true, message: result?.message ?? "Fetched leads", data: result?.data ?? result, status: response.status };
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      if (err.name === "AbortError") return { success: false, message: "Request timed out", data: null };
      return { success: false, message: err?.message ?? "Network error", data: null };
    }
  }

  async updateLeadStatus(leadId: string, status: string, notes?: string, timeoutMs = 10000): Promise<LeadResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/${encodeURIComponent(leadId)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      }, timeoutMs);

      const result = await this.parseJsonSafe(response);
      if (!response.ok) {
        return { success: false, message: result?.message ?? `Failed status ${response.status}`, data: result, status: response.status };
      }
      return { success: true, message: result?.message ?? "Status updated", data: result?.data ?? result, status: response.status };
    } catch (err: any) {
      console.error("Error updating lead status:", err);
      if (err.name === "AbortError") return { success: false, message: "Request timed out", data: null };
      return { success: false, message: err?.message ?? "Network error", data: null };
    }
  }

  async deleteLead(leadId: string, timeoutMs = 10000): Promise<LeadResponse> {
    try {
      const response = await fetchWithTimeout(`${this.baseUrl}/${encodeURIComponent(leadId)}`, { method: "DELETE" }, timeoutMs);
      const result = await this.parseJsonSafe(response);
      if (!response.ok) {
        return { success: false, message: result?.message ?? `Failed to delete ${response.status}`, data: result, status: response.status };
      }
      return { success: true, message: result?.message ?? "Lead deleted", data: result?.data ?? result, status: response.status };
    } catch (err: any) {
      console.error("Error deleting lead:", err);
      if (err.name === "AbortError") return { success: false, message: "Request timed out", data: null };
      return { success: false, message: err?.message ?? "Network error", data: null };
    }
  }
}

export const leadService = new LeadService();
export default leadService;
