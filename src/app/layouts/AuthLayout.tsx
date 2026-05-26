import { AuthDIProvider } from "@/features/auth/ui/providers/ioc/AuthDIProvider";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <AuthDIProvider>
      <Outlet />
    </AuthDIProvider>
  );
}
