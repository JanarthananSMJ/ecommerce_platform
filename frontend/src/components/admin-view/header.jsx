import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-espresso border-b border-bark/30 shadow-sm">
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden bg-bark/30 hover:bg-bark/50 text-ash border-0"
        variant="outline"
        size="icon"
      >
        <AlignJustify className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center bg-ember hover:bg-ember/85 text-white text-sm font-medium shadow-md transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
