import { defineConfig } from "vite";

export default defineConfig({
  root: "./", // Carpeta raíz del proyecto
  build: {
    outDir: "dist", // Carpeta donde se generará el build
    emptyOutDir: true, // Limpia la carpeta antes de cada build
  },
  server: {
    historyApiFallback: true, // Permite que la URL se mantenga en la barra de direcciones
  
  },
});
