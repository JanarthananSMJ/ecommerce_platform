import {
  BadgeCheck,
  ChartNoAxesCombined,
  ShoppingBasket,
  Users,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "members",
    label: "Members",
    path: "/admin/members",
    icon: <Users />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-1">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;

        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex cursor-pointer text-base items-center gap-3 rounded-lg px-4 py-3 transition-all duration-150 ${
              isActive
                ? "bg-ember text-white shadow-sm"
                : "text-mauve hover:bg-bark/20 hover:text-ash"
            }`}
          >
            <span className="w-5 h-5">{menuItem.icon}</span>
            <span className="font-medium">{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-espresso border-bark/30 p-0">
          <div className="flex flex-col h-full p-6">
            <SheetHeader className="border-b border-bark/30 pb-5">
              <SheetTitle className="flex gap-2 items-center">
                <ChartNoAxesCombined size={28} className="text-ember" />
                <h1 className="text-xl font-extrabold text-ash">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-silver/30 bg-espresso p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/products")}
          className="flex cursor-pointer items-center gap-2 mb-2"
        >
          <ChartNoAxesCombined size={28} className="text-ember" />
          <h1 className="text-xl font-extrabold text-ash">Admin Panel</h1>
        </div>
        <div className="w-8 h-0.5 bg-ember rounded-full mb-2" />
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
