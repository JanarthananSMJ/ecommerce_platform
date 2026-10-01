import { HousePlug } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left panel — espresso dark with ember accent */}
      <div className="hidden lg:flex items-center justify-center bg-espresso w-1/2 px-12 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-ember/10" />
        <div className="absolute bottom-10 right-[-3rem] w-56 h-56 rounded-full bg-ember/15" />

        <div className="relative max-w-md space-y-6 text-center text-ash z-10">
          <div className="flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-ember shadow-lg">
            <HousePlug className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ash">
            Welcome to ECommerce Shopping
          </h1>
          <div className="w-12 h-1 bg-ember mx-auto rounded-full" />
          <p className="text-mauve text-lg leading-relaxed">
            Trendy collections, premium quality, delivered to you.
          </p>
        </div>
      </div>

      {/* Right panel — ash background */}
      <div className="flex flex-1 items-center justify-center bg-ash px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
