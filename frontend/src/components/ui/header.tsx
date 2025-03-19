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
                <nav className="flex-grow flex justify-start ml-12 space-x-6">
                    {isHomePage ? (
                        <>
                            <a href="#features" className="text-gray-700 hover:text-blue-700 cursor-pointer">Features</a>
                            {/* <a href="#" className="text-gray-700 hover:text-blue-700 cursor-pointer">Pricing</a> */}
                            {/* <a href="#" className="text-gray-700 hover:text-blue-700 cursor-pointer">About</a> */}
                            <a href="#contactMe" className="text-gray-700 hover:text-blue-700 cursor-pointer">Contact</a>
                        </>
                    ) : (
                        <Link href="/" className="hover:text-gray-300 cursor-pointer hidden">
                            Home
                        </Link>
                    )}
                    {/* <Link href="/">
                        <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Features</span>
                    </Link>
                    <Link href="/">
                        <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Pricing</span>
                    </Link>
                    <Link href="/">
                        <span className="text-gray-700 hover:text-blue-700 cursor-pointer">About</span>
                    </Link> */}
                    {/* <Link href="/contactMe">
                        <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Contact</span>
                    </Link> */}
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
                        <Link href="/features">
                            <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Features</span>
                        </Link>
                        <Link href="/pricing">
                            <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Pricing</span>
                        </Link>
                        <Link href="/about">
                            <span className="text-gray-700 hover:text-blue-700 cursor-pointer">About</span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-gray-700 hover:text-blue-700 cursor-pointer">Contact</span>
                        </Link>
                        <Button variant="outline" className="border-blue-600 text-blue-600 w-full">
                            Log In
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap">
                            Start Free Trial
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
