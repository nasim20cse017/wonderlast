"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

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
  FiLogOut,
} from "react-icons/fi";

import { toast } from "react-toastify";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const pathname = usePathname();

  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation Links
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
      path: "/my-bookings",
      icon: <FiBookOpen size={18} />,
    },
    {
      name: "Add Destination",
      path: "/add-destination",
      icon: <FiPlusCircle size={18} />,
    },
  ];

  // Active Link Style
  const linkStyle = (path) =>
    pathname === path
      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
      : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600";

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logout successful 👋", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Logout failed!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/Wanderlast.png"
            width={160}
            height={160}
            alt="Wanderlust Logo"
            className="h-auto w-[120px] md:w-[150px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Main Nav */}
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

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Info */}
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50"
              >
                {/* User Image */}
                {user.image ? (
                  <Image referrerPolicy="no-referrer"
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold uppercase text-white">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                {/* Name */}
                <div className="hidden 2xl:block">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    View Profile
                  </p>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login */}
              <Link
                href="/login"
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${linkStyle(
                  "/login"
                )}`}
              >
                <FiLogIn size={18} />
                Login
              </Link>

              {/* Signup */}
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-600"
              >
                <FiUserPlus size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Tablet Actions */}
        <div className="hidden md:flex xl:hidden items-center gap-2">
          {/* Quick Nav */}
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

          {/* User/Profile */}
          {user ? (
            <Link
              href="/profile"
              className="overflow-hidden rounded-full border border-gray-200"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={42}
                  height={42}
                  className="h-11 w-11 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center bg-cyan-500 text-sm font-bold uppercase text-white">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className={`rounded-xl p-3 transition-all duration-300 ${linkStyle(
                "/login"
              )}`}
            >
              <FiLogIn size={20} />
            </Link>
          )}

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
          {/* User Section */}
          {user && (
            <div className="flex items-center gap-4 rounded-3xl bg-cyan-50 p-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={55}
                  height={55}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold uppercase text-white">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          )}

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

          {/* Auth Section */}
          {user ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${linkStyle(
                  "/profile"
                )}`}
              >
                <FiUser size={18} />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${linkStyle(
                  "/login"
                )}`}
              >
                <FiLogIn size={18} />
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-cyan-600"
              >
                <FiUserPlus size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;