import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: `next build` genera la carpeta `out/`, que Amplify Hosting sirve tal cual.
  output: "export",
  // /miembros/ -> out/miembros/index.html (mismas URLs que el sitio WordPress original).
  trailingSlash: true,
  // El optimizador de imágenes necesita servidor. En su lugar, un loader propio elige entre el original y
  // una variante de 1280 px preparada de antemano (ver src/lib/image-loader.ts).
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  // Solo en `next dev`: permite abrir el sitio desde un túnel (ngrok) o el celular.
  // Sin esto, Next bloquea los recursos de desarrollo de orígenes distintos a localhost.
  // Oculta la burbuja "N" de desarrollo: en el celular tapaba el contenido al previsualizar.
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.io"],
};

export default nextConfig;
