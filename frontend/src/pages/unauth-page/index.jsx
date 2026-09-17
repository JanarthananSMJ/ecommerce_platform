import { Button } from "@/components/ui/button";
import { ShieldAlertIcon } from "lucide-react";
import { Link } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <ShieldAlertIcon className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-extrabold">Access Denied</h1>
      <p className="text-muted-foreground">
        You don&apos;t have access to view this page.
      </p>
      <Button asChild>
        <Link to="/shop/home">Back to Home</Link>
      </Button>
    </div>
  );
}

export default UnauthPage;
