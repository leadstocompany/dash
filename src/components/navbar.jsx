import { logout } from "@/store/slice/user";
import { Bell, Mail, MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LOCAL_STORAGE_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_KEY;
const LOCAL_STORAGE_USER_KEY = import.meta.env.VITE_LOCAL_STORAGE_USER_KEY;

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const userInitials =
    user?.name
      .split(" ")
      .map((name) => name[0])
      .join("") || "A";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    dispatch(logout());
    // navigate("/auth/signin");
  };
  return (
    <div className="max-w-screen-2xl px-5 md:mx-auto py-5 flex justify-between items-center gap-5">
      <div className="flex items-center gap-5">
        <div className="w-60">
          <h1 className="text-2xl font-bold">E-CAB</h1>
        </div>
        {/* <div className="flex space-x-5 items-center">
          <Link to="/dashboard" className="text-gray-800 hover:text-gray-900">
            <MenuIcon size={24} />
          </Link>
          <Input placeholder="Search" className="rounded-3xl" />
        </div> */}
      </div>

      <div className="flex space-x-5 items-center">
        <Link to="?notification" className="text-gray-800 hover:text-gray-900">
          <Bell size={24} />
        </Link>
        <Link to="?email" className="text-gray-800 hover:text-gray-900">
          <Mail size={24} />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-8 w-8 rounded-full">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-xs font-semibold bg-gradient-to-l from-indigo-600 to-purple-600 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[800] w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.phone}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/update-profile">
                <DropdownMenuItem>Update Profile</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
