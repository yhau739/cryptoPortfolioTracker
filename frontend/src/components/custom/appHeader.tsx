"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  title: string;
  isMenuOpen: boolean;
}

export default function AppHeader({ title, isMenuOpen }: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 hover:text-bold mr-4 transition cursor-pointer"
          aria-label="Logout"
          title="Logout"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {isMenuOpen && <span className="ml-2">Logout</span>}
        </button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer whitespace-nowrap !rounded-button"
        >
          <FontAwesomeIcon icon={faBell} className="text-gray-600" />
        </Button>
      </div>
    </header>
  );
}
