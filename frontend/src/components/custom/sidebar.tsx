// export to smaller components later in the stage
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faWallet,
  faExchangeAlt,
  faChartPie,
  faCog,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import * as echarts from "echarts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
    currentPage: string;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function Sidebar({currentPage, isMenuOpen, setIsMenuOpen}: SidebarProps) {
    const router = useRouter();

    const navItems = [
      { id: "dashboard", icon: faChartLine, label: "Dashboard", url: "/dashboard" },
      { id: "portfolio", icon: faWallet, label: "Portfolio", url: "/portfolio" },
      { id: "transactions", icon: faExchangeAlt, label: "Transactions", url: "/transactions" },
      { id: "analytics", icon: faChartPie, label: "Analytics", url: "/analytics" },
      { id: "settings", icon: faCog, label: "Settings", url: "/settings" },
    ];

    return (
      <div className={`${isMenuOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <span className={`h-8 text-xl font-bold text-blue-500 pl-3 ${!isMenuOpen && "hidden"}`}>
            CryptoTrack
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer whitespace-nowrap !rounded-button"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faChevronLeft : faChevronRight} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer whitespace-nowrap
                ${currentPage === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
              `}
              onClick={() => router.push(item.url)}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              {isMenuOpen && <span className="ml-3">{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-background z-50">
          <div className="flex items-center">
            <Avatar className="cursor-pointer whitespace-nowrap !rounded-button">
              <AvatarImage src="https://public.readdy.ai/ai/img_res/5909056f9b5bbcbeca9d5131171c1877.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isMenuOpen && (
              <div className="ml-3">
                <div className="font-medium">James Davidson</div>
                <div className="text-sm text-gray-500">Premium User</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}