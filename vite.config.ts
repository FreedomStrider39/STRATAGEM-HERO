import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  // Using relative base path so it works on GitHub Pages subfolders and the preview
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Explicitly alias react and react-dom to the project's node_modules
      // to prevent multiple versions from being loaded by dependencies
      "react": path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
    // Force deduplication of React to prevent "useState" null errors
    dedupe: ["react", "react-dom"],
  },
}));