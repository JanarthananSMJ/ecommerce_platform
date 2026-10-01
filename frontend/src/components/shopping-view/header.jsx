import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-semibold cursor-pointer text-bark hover:text-ember transition-colors duration-150 uppercase tracking-wide"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative border-silver bg-ash hover:bg-silver/40 text-bark"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-white">
              {cartItems.items.length}
            </span>
          )}
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer ring-2 ring-ember/30 hover:ring-ember/70 transition-all">
            <AvatarFallback className="bg-espresso text-ash font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white border-silver shadow-lg">
          <DropdownMenuLabel className="text-bark font-semibold">
            Logged in as <span className="text-espresso">{user?.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-silver/50" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="text-bark hover:text-espresso cursor-pointer"
          >
            <UserCog className="mr-2 h-4 w-4 text-ember" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-silver/50" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-bark hover:text-espresso cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 text-ember" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-silver bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ember group-hover:bg-ember/85 transition-colors">
            <HousePlug className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-espresso tracking-tight text-lg">
            Ecommerce
          </span>
        </Link>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-silver text-bark hover:bg-silver/30"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-ash border-silver">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop nav */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Right actions */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
