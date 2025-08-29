import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // escucha en todas las interfaces de red
    port: 8080, // cambia si quieres otro puerto
  },
});
