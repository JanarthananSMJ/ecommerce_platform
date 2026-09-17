import { Button } from "@/components/ui/button";
import { CompassIcon } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CompassIcon className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      <Button asChild>
        <Link to="/shop/home">Back to Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
