"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  FiHome,
  FiMap,
  FiBookOpen,
  FiPlusCircle,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome size={18} />,
    },
    {
      name: "Destinations",
      path: "/destinations",
      icon: <FiMap size={18} />,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <FiBookOpen size={18} />,
    },
    {
      name: "Add Destination",
      path: "/add-destination",
      icon: <FiPlusCircle size={18} />,
    },
  ];

  const authLinks = [
    {
      name: "Profile",
      path: "/profile",
      icon: <FiUser size={18} />,
    },
    {
      name: "Login",
      path: "/login",
      icon: <FiLogIn size={18} />,
    },
    {
      name: "Sign Up",
      path: "/signup",
      icon: <FiUserPlus size={18} />,
    },
  ];

  const linkStyle = (path) =>
    pathname === path
      ? "bg-cyan-500 text-white shadow-md"
      : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/Wanderlast.png"
            width={150}
            height={150}
            alt="Logo"
            className="h-auto w-[120px] md:w-[140px]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-3">
          {/* Navigation Links */}
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${linkStyle(
                    link.path
                  )}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Links */}
          <div className="ml-4 flex items-center gap-2 border-l border-gray-200 pl-4">
            {authLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${linkStyle(
                  link.path
                )}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet Nav */}
        <div className="hidden md:flex xl:hidden items-center gap-2">
          {/* Quick Links */}
          <Link
            href="/destinations"
            className={`rounded-xl p-3 transition-all duration-300 ${linkStyle(
              "/destinations"
            )}`}
          >
            <FiMap size={20} />
          </Link>

          <Link
            href="/bookings"
            className={`rounded-xl p-3 transition-all duration-300 ${linkStyle(
              "/bookings"
            )}`}
          >
            <FiBookOpen size={20} />
          </Link>

          <Link
            href="/profile"
            className={`rounded-xl p-3 transition-all duration-300 ${linkStyle(
              "/profile"
            )}`}
          >
            <FiUser size={20} />
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-gray-200 p-3 text-gray-700 transition-all duration-300 hover:bg-gray-100"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-gray-200 p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile + Tablet Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 xl:hidden ${
          menuOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="space-y-6 border-t border-gray-100 bg-white px-4 py-5 md:px-6">
          {/* Main Nav */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${linkStyle(
                  link.path
                )}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Auth Nav */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {authLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center md:justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${linkStyle(
                  link.path
                )}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;