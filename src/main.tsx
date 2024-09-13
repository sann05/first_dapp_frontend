import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestURL =
  "https://raw.githubusercontent.com/markokhman/func-course-chapter-5-code/master/public/manifest.json";

createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
  </TonConnectUIProvider>
);
