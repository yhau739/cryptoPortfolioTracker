"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Show these links only on the home page (`/`)
    const isHomePage = pathname === "/";


    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold text-blue-700 cursor-pointer">
                        CryptoTrack
                    </span>
                </Link>



                {/* Desktop Navigation */}
                <nav className="hidden md:block flex-grow flex justify-start ml-12 space-x-6">
                    {isHomePage ? (
                        <>
                            <Link href="#stats" className="text-gray-700 hover:text-blue-700 cursor-pointer">Stats</Link>
                            <Link href="#features" className="text-gray-700 hover:text-blue-700 cursor-pointer">Features</Link>
                        </>
                    ) : (
                        <Link href="/" className="hover:text-gray-300 cursor-pointer hidden">
                            Home
                        </Link>
                    )}
                </nav>

                {/* Buttons */}
                <div className="hidden md:flex gap-4">
                    <Link href="/login">
                        <Button variant="outline" className="hover:cursor-pointer border-blue-600 text-blue-600">
                            Log In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="hover:cursor-pointer bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap">
                            Start Free Trial
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl text-blue-700" />
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full py-4">
                    <nav className="flex flex-col items-center gap-4">
                        {isHomePage ? (
                            <>
                                <Link href="/#stats" className="text-gray-700 hover:text-blue-700 cursor-pointer">
                                    <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Stats</span>
                                </Link>
                                <Link href="/#features">
                                    <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Features</span>
                                </Link>
                            </>
                        ) : (
                            <Link href="/" className="hover:text-gray-300 cursor-pointer hidden">
                                Home
                            </Link>
                        )}

                        <Link href="/login">
                            <Button variant="outline" className="border-blue-600 text-blue-600 w-full">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap">
                                Start Free Trial
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
