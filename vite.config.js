import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This enables listening on all available IPv4 addresses (0.0.0.0)
    port: 5174, // You can change the port if needed
  },
});
