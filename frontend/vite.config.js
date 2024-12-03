import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 2200 },
  server: {
    port: 7101,
  },
  preview: {
    port: 7101,
  },
});
