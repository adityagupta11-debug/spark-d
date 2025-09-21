
 import { createRoot } from "react-dom/client";
 import "./index.css";
 import AppRoot from "./AppRoot.tsx";
 import { AuthProvider } from "./contexts/AuthContext";

 createRoot(document.getElementById("root")!).render(
   <AuthProvider>
     <AppRoot />
   </AuthProvider>
 );
  