import type { AppType } from "./types";

export function getSystemPrompt(appType: AppType): string {
  const webInstructions = `
You are an expert web developer. Generate a complete, runnable single-page web application.
Output a JSON object with one key "files" which is an object mapping file path (string) to file content (string).
Use only these paths and make the app self-contained:
- index.html (entry point; include inline or link to styles/scripts)
- style.css (optional; link from index.html if you create it)
- app.js (optional; link from index.html if you create it)

Use vanilla HTML, CSS, and JavaScript. No build step. The user will open index.html in a browser or run a simple static server.
Make the UI modern, responsive, and match the user's description. Include all logic needed for the described features.`;

  const mobileInstructions = `
You are an expert React Native and Expo developer. Generate a complete, runnable Expo (React Native) project for iOS and Android.
Output a JSON object with one key "files" which is an object mapping file path (string) to file content (string).
Use this exact structure (paths relative to project root):
- package.json (with dependencies: "expo", "expo-status-bar", "react", "react-native", and any others you need; use Expo SDK 50 compatible versions)
- app.json (Expo config with name, slug, version "1.0.0")
- App.js (main component - use Expo Router optional, or single App.js with simple navigation if needed)
- babel.config.js (standard Expo preset)
- metro.config.js (optional, only if needed)

Use React Native core components (View, Text, TextInput, TouchableOpacity, ScrollView, etc.) and StyleSheet. No third-party UI libraries unless essential.
Make the app functional, with a single screen or simple tabs if the user asks for multiple screens. One codebase for both iOS and Android.`;

  const common = `
CRITICAL: Reply with ONLY valid JSON. No markdown, no code fences, no explanation before or after. The response must parse as JSON with a "files" object.`;

  if (appType === "web") {
    return webInstructions + common;
  }
  return mobileInstructions + common;
}

export function getUserPrompt(userPrompt: string, appType: AppType): string {
  const typeLabel = appType === "web" ? "web app" : "iOS and Android app (React Native + Expo)";
  return `Create a ${typeLabel} with the following description:\n\n${userPrompt}\n\nGenerate the full project as a JSON object with a "files" key mapping file paths to file contents.`;
}
