import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/",
  define: {
    global: "window",
  },
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        // 프록시할 경로
        target: "http://localhost:8080/", // 대상 서버
        changeOrigin: true, // 대상 서버의 호스트 헤더 변경 여부
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws": {
        target: "http://localhost:8080", // WebSocket용 타겟
        ws: true, // WebSocket 프록시 활성화
        changeOrigin: true,
      },
    },
  },
});
