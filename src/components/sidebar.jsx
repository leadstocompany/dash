import { cn } from "@/lib/utils";
import { logout } from "@/store/slice/user";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  CarTaxiFront,
  ChevronRight,
  CircleDollarSign,
  LayoutPanelLeft,
  Mail,
  Power,
  Tags,
  User,
  User2,
  UserCheck,
  CalendarClock,
  Wallet,
  FileText,
} from "lucide-react";
import { GiNotebook } from "react-icons/gi";
import { HiBellAlert } from "react-icons/hi2";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCarOn } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaRegAddressCard } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";

const LOCAL_STORAGE_TOKEN_KEY = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_KEY;
const LOCAL_STORAGE_USER_KEY = import.meta.env.VITE_LOCAL_STORAGE_USER_KEY;

const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  const userInitials = user?.name.split(" ").map((name) => name[0]) || "A";
  const [sideBarStates, setSideBarStates] = useState({
    email: true,
    trip: true,
    driver: true,
    vehicle: true,
    coupons: true,
    fareManagement: true,
    support: true,
    subscription: true,
    feedback: true,
    Wallet: true,
    sos: true,
    document: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    dispatch(logout());
    navigate("/auth/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token || token === "undefined" || token === "null") {
      navigate("/auth/signin");
    }
  }, [user]);

  return (
    <div className="w-60 min-w-[240px] min-h-screen overflow-hidden flex flex-col">
      <div className="flex justify-start items-center gap-3 py-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="text-2xl font-semibold bg-gradient-to-l from-indigo-600 to-purple-600 text-white">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <h1 className="text-xs">{user?.phone}</h1>
          <div className="flex gap-2 items-center border p-0.5 border-slate-200 bg-white rounded-3xl">
            <Link
              to="?email"
              className="px-1.5 py-1 rounded-xl hover:bg-gray-200 text-gray-800 hover:text-gray-900"
            >
              <Mail size={16} />
            </Link>
            <Link
              to="?account"
              className="px-1.5 py-1 rounded-xl hover:bg-gray-200 text-gray-800 hover:text-gray-900"
            >
              <User size={16} />
            </Link>
            <button
              onClick={handleSignOut}
              className="px-1.5 py-1 rounded-xl hover:bg-gray-200 text-gray-800 hover:text-gray-900"
            >
              <Power size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Link
          to="/dashboard"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <LayoutPanelLeft size={18} />{" "}
          <span className="text-sm">Dashboard</span>
        </Link>
        <CollapseableLink
          buttonIcon={<Mail size={18} />}
          buttonContent={"Email"}
          state={sideBarStates.email}
        >
          <Link
            to="/?=true&inbox=true"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Inbox
          </Link>
          <Link
            to="/?=true&inbox=true"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            View Mail
          </Link>
          <Link
            to="/?=true&inbox=true"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Compose Mail
          </Link>
        </CollapseableLink>
        <CollapseableLink
          buttonIcon={<CarTaxiFront size={18} />}
          buttonContent={"Trip"}
          state={sideBarStates.trip}
        >
          <Link
            to="/trips/active"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Active Trips
          </Link>
          <Link
            to="/trips/completed"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Completed Trips
          </Link>
          <Link
            to="/trips/booked"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Booked Trips
          </Link>
        </CollapseableLink>

        <CollapseableLink
          buttonIcon={<FaRegAddressCard size={18} />}
          buttonContent={"Driver"}
          state={sideBarStates.driver}
        >
          <Link
            to="/drivers/all"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            All Driver
          </Link>
          <Link
            to="/drivers/new_request_driver"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            New Driver Request
          </Link>
          <Link
            to="/drivers/reject_driver"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Rejected Driver
          </Link>
          <Link
            to="/drivers/suspend_driver"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Supendend Driver
          </Link>
        </CollapseableLink>

        {/* <Link
          to="drivers/all"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <User size={18} /> <span className="text-sm">Driver</span>
        </Link> */}
        <Link
          to="passengers/all"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <User2 size={18} /> <span className="text-sm">All Passengers</span>
        </Link>
        <Link
          to="city/list"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <GiModernCity size={18} /> <span className="text-sm">City</span>
        </Link>
        <CollapseableLink
          buttonIcon={<Car size={18} />}
          buttonContent={"Vehicle"}
          state={sideBarStates.vehicle}
        >
          {/* <Link
            to="vehicles/view/all"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            View Vehicles
          </Link> */}
          <Link
            to="vehicles/view/type"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle types
          </Link>
          <Link
            to="vehicles/view/class"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle Classes
          </Link>
          <Link
            to="vehicles/view/manufacturer"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle Manufacturers
          </Link>
          <Link
            to="vehicles/view/model"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle Models
          </Link>
        </CollapseableLink>
        <Link
          to="/coupons/all"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <Tags size={18} /> <span className="text-sm">Coupons List</span>
        </Link>
        <Link
          to="fares/all"
          className="px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2"
        >
          <CircleDollarSign size={18} />{" "}
          <span className="text-sm">Fare Management</span>
        </Link>

        <CollapseableLink
          buttonIcon={<CalendarClock size={18} />}
          buttonContent={"Subscription"}
          state={sideBarStates.subscription}
        >
          <Link
            to="/subscription/plans"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Plans
          </Link>
          <Link
            to="/subscription/active_subscription_list"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Active subscription list
          </Link>
          <Link
            to="/subscription/expire_subscription_list"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Expire subscription list
          </Link>
          {/* <Link
            to="/subscription/driver_subscription_list"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Driver Subscription Plans
          </Link> */}
        </CollapseableLink>

        <CollapseableLink
          buttonIcon={<Wallet size={18} />}
          buttonContent={"Wallet"}
          state={sideBarStates.Wallet}
        >
          <Link
            to="/wallet/customer_wallet"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Customers
          </Link>
          <Link
            to="/wallet/driver_wallet"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Drivers
          </Link>
        </CollapseableLink>

        <CollapseableLink
          buttonIcon={<GiNotebook size={18} />}
          buttonContent={"Feedback"}
          state={sideBarStates.feedback}
        >
          <Link
            to="/feedback/user"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            User
          </Link>
          <Link
            to="/feedback/driver"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Driver
          </Link>
        </CollapseableLink>

        <CollapseableLink
          buttonIcon={<FileText size={18} />}
          buttonContent={"Document For Driver"}
          state={sideBarStates.document}
        >
          <Link
            to="/document/personal_document"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Personal Document
          </Link>
          <Link
            to="/document/vehicle_photos"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle Photos
          </Link>
          <Link
            to="/document/vehicle_document"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Vehicle Document
          </Link>
        </CollapseableLink>

        <CollapseableLink
          buttonIcon={<UserCheck size={18} />}
          buttonContent={"Support"}
          state={sideBarStates.support}
        >
          <Link
            to="support/driver"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Driver Support
          </Link>
          <Link
            to="support/customer"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Customer Support
          </Link>
        </CollapseableLink>
        <CollapseableLink
          buttonIcon={<HiBellAlert size={18} color="#F5004F" />}
          buttonContent={"SOS"}
          state={sideBarStates.sos}
        >
          <Link
            to="sos/active"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Active
          </Link>
          <Link
            to="sos/completed"
            className="p-2 rounded-md text-black flex items-center gap-2"
          >
            Completed
          </Link>
        </CollapseableLink>
      </div>
    </div>
  );
};

const CollapseableLink = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(props.state);
  return (
    <>
      <motion.div
        className={cn(
          "flex flex-col rounded-md duration-100",
          collapsed ? "bg-transparent" : ""
        )}
      >
        <button
          className={cn(
            "px-2 py-3 rounded-md border border-transparent hover:border-slate-100 hover:bg-white text-black flex items-center gap-2 text-sm justify-between duration-100 text-left",
            collapsed ? "" : "border-slate-100 bg-white"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <p className="flex items-center gap-2">
            {props.buttonIcon} <span>{props.buttonContent}</span>{" "}
          </p>
          <ChevronRight
            style={{
              transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",
            }}
            className="transition-transform duration-100"
            size={18}
          />
        </button>

        <CollapsableContainer isVisible={!collapsed}>
          {children}
        </CollapsableContainer>
      </motion.div>
    </>
  );
};

const CollapsableContainer = ({ isVisible, children }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.8,
          opacity: 0.5,
        }}
        transition={{
          duration: 0.1,
          ease: "linear",
        }}
        className="flex flex-col text-sm pl-7 bg-white origin-top"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

CollapsableContainer.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node,
};

CollapseableLink.propTypes = {
  children: PropTypes.node,
  buttonIcon: PropTypes.element,
  buttonContent: PropTypes.string,
  state: PropTypes.bool,
};

SideBar.displayName = "SideBar";

export default SideBar;
