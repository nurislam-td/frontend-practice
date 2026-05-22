import { PostPage } from "@/pages/PostPage";
import { SignUpPage } from "@/pages/SignUpPage";
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
              <Route path="/posts" element={<PostPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<div>Test</div>} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
