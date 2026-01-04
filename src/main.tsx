import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NativeAppProvider } from "@/contexts/NativeAppContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="rihlatul-hudah-theme">
    <NativeAppProvider>
      <App />
    </NativeAppProvider>
  </ThemeProvider>
);
