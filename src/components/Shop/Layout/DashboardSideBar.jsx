import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const menuItems = [
  { id: 1, label: "Dashboard", icon: RxDashboard, link: "/dashboard" },
  {
    id: 2,
    label: "All Orders",
    icon: FiShoppingBag,
    link: "/dashboard-orders",
  },
  {
    id: 3,
    label: "All Products",
    icon: FiPackage,
    link: "/dashboard-products",
  },
  {
    id: 4,
    label: "Create Product",
    icon: AiOutlineFolderAdd,
    link: "/dashboard-create-product",
  },
  {
    id: 5,
    label: "All Events",
    icon: MdOutlineLocalOffer,
    link: "/dashboard-events",
  },
  {
    id: 6,
    label: "Create Event",
    icon: VscNewFile,
    link: "/dashboard-create-event",
  },
  {
    id: 7,
    label: "Withdraw Money",
    icon: CiMoneyBill,
    link: "/dashboard-withdraw-money",
  },
  {
    id: 8,
    label: "Shop Inbox",
    icon: BiMessageSquareDetail,
    link: "/dashboard-messages",
  },
  {
    id: 9,
    label: "Discount Codes",
    icon: AiOutlineGift,
    link: "/dashboard-coupons",
  },
  {
    id: 10,
    label: "Refunds",
    icon: HiOutlineReceiptRefund,
    link: "/dashboard-refunds",
  },
  { id: 11, label: "Settings", icon: CiSettings, link: "/settings" },
];

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10 scrollbar-thin scrollbar-thumb-gray-300">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <Link
            key={item.id}
            to={item.link}
            className={`flex items-center p-4 transition-colors ${
              isActive ? "bg-crimson/10" : "hover:bg-gray-100"
            }`}
          >
            <Icon size={26} color={isActive ? "crimson" : "#555"} />
            <h5
              className={`hidden md:block pl-2 text-[16px] font-medium ${
                isActive ? "text-crimson" : "text-[#555]"
              }`}
            >
              {item.label}
            </h5>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardSideBar;
