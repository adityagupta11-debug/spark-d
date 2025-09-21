
  import { createRoot } from "react-dom/client";
  import AppRoot from "./AppRoot.tsx";
  import { AuthProvider } from "./contexts/AuthContext";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
  