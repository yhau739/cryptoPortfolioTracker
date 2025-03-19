"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">CryptoTrack</h2>
          <p className="mt-2 text-gray-400">
            Your smart crypto tracking companion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <Link href="/features">
            <span className="hover:text-white cursor-pointer">Features</span>
          </Link>
          <Link href="/pricing">
            <span className="hover:text-white cursor-pointer">Pricing</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-white cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-white cursor-pointer">Contact</span>
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-start gap-4">
          <Link href="https://twitter.com">
            <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-white" />
          </Link>
          <Link href="https://facebook.com">
            <FontAwesomeIcon icon={faFacebook} className="text-xl hover:text-white" />
          </Link>
          <Link href="https://instagram.com">
            <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-white" />
          </Link>
          <Link href="https://linkedin.com">
            <FontAwesomeIcon icon={faLinkedin} className="text-xl hover:text-white" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 text-sm">
        &copy; {new Date().getFullYear()} CryptoTrack. All Rights Reserved.
      </div>
    </footer>
  );
}
