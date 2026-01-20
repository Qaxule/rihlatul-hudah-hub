import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NativeAppProvider } from "@/contexts/NativeAppContext";
import { registerSW } from "virtual:pwa-register";
import { toast } from "sonner";

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // Show toast and update
    toast.success("App updated!", {
      description: "A new version has been installed.",
      duration: 4000,
    });
    updateSW(true);
  },
  onOfflineReady() {
    toast.info("Ready for offline use", {
      description: "The app can now work without internet.",
      duration: 3000,
    });
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
