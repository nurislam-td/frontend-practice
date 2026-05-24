import { LoginPage } from "@/pages/LoginPage";
import { PostPage } from "@/pages/PostPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { routes } from "@/shared/services/router";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();
function App() {
  return (
    <StrictMode>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.posts}
                element={
                  <ProtectedRoute>
                    <PostPage />
                  </ProtectedRoute>
                }
              />
              <Route path={routes.signup} element={<SignUpPage />} />
              <Route path={routes.login} element={<LoginPage />} />
              <Route path="/" element={<div>Test</div>} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
