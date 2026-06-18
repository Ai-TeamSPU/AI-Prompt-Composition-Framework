import axios from "axios";
import type { OfficeCanvasJson } from "../types/officeBuilder";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api",
  timeout: 10_000
});

export interface CompiledPromptResponse {
  id: string;
  project_id: string;
  master_prompt: string;
  blueprint: {
    departments: string[];
    tools: string[];
    workflows: string[];
    architecture: string[];
    execution_plan: string[];
  };
  created_at: string;
}

export const compilerApi = {
  async compileCanvas(canvas: OfficeCanvasJson) {
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD as string | undefined;

    if (!demoPassword) {
      throw new Error("VITE_DEMO_PASSWORD is required to compile from the demo UI");
    }

    const login = await api.post<{ token: string }>("/auth/login", {
      email: import.meta.env.VITE_DEMO_EMAIL ?? "admin@example.com",
      password: demoPassword
    });

    const authHeader = { Authorization: `Bearer ${login.data.token}` };
    const project = await api.post<{ project: { id: string } }>(
      "/projects",
      {
        name: canvas.organization.name,
        industry: canvas.organization.industry,
        scale: canvas.organization.scale,
        system_level: canvas.organization.system_level,
        canvas
      },
      { headers: authHeader }
    );

    await api.put(`/projects/${project.data.project.id}/canvas`, canvas, { headers: authHeader });

    const compiled = await api.post<CompiledPromptResponse>(
      `/projects/${project.data.project.id}/compile`,
      {},
      { headers: authHeader }
    );

    return compiled.data;
  }
};
