import { HousePlug } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <HousePlug className="mx-auto h-12 w-12" />
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Trendy collections, premium quality, delivered to you.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
