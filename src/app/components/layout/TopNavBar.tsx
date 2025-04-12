"use client";

import Link from "next/link";
import { ThemeModeToggle } from "@/app/components/ThemeModeToggle"

const TopNavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left: App Name or Logo */}
      <Link href="/" className="text-xl font-bold">
        AI Portfolio Tracker
      </Link>

      {/* Center: Navigation Links */}
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Dashboard
        </Link>
      </div>

      <div className="space-x-4">
        <Link href="/portfolio" className="hover:text-gray-400">
          Portfolio
        </Link>
      </div>

      <div className="space-x-4">
        <p className="hover:text-gray-400">
          {new Date().toLocaleString('es-AR')}
        </p>
      </div>

      {/* Right: Dark Mode Toggle + Profile Placeholder */}
      <div className="flex items-center space-x-4">
        <ThemeModeToggle></ThemeModeToggle>
      </div>
    </nav>
  );
};

export default TopNavBar;