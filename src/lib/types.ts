export type AppType = "web" | "mobile";

export type GenerationState = "idle" | "generating" | "done" | "error";

export interface GenerateRequest {
  prompt: string;
  appType: AppType;
}

export interface GenerateResponse {
  projectName: string;
  downloadUrl: string;
  files?: Record<string, string>;
}
