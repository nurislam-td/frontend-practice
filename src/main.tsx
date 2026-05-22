import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import App from "@/app/App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
