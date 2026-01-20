import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NativeAppProvider } from "@/contexts/NativeAppContext";
import { registerSW } from "virtual:pwa-register";

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // Automatically update when new version is available
    updateSW(true);
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
  immediate: true,
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="rihlatul-hudah-theme">
    <NativeAppProvider>
      <App />
    </NativeAppProvider>
  </ThemeProvider>
);
