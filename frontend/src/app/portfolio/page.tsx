"use client";

import { AddTransactionModal } from "@/components/custom/addTransactionModal";
import Sidebar from "@/components/custom/sidebar";
import { Toaster } from "sonner";
import Loading from "@/components/custom/loader";
import { useState } from "react";
import AppHeader from "@/components/custom/appHeader";
import MaintenancePage from "@/components/custom/maintenanceComponent";


export default function Portfolio() {
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className="flex min-h-[1024px] bg-gray-50">
            {/* Fullscreen Loading Overlay */}
            <Loading isLoading={isLoading} />
            {/* Slide in Modal Btn */}
            <AddTransactionModal />
            {/* Toast */}
            <Toaster richColors />

            <Sidebar currentPage="portfolio" setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

            {/* Main Content Area */}
            <div className="flex-1">
                <AppHeader title="Portfolio" isMenuOpen={isMenuOpen} />

                <div className="p-6">
                    {/* to center maintenance */}
                    <div className="flex items-center justify-center w-full h-full">
                        <MaintenancePage />
                    </div>

                </div>
            </div>
        </div>
    )
}