import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "@/app/App.tsx";
import { PostPage } from "@/pages/PostPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUpPage } from "./pages/SignUpPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="posts" element={<PostPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
