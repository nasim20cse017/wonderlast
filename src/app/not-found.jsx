"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { FiArrowLeft, FiHome } from "react-icons/fi";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center  justify-center bg-gradient-to-b from-slate-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-3xl my-20 rounded-[40px] border border-gray-200 bg-white p-8 text-center shadow-2xl shadow-black/5 sm:p-14">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="rounded-full bg-cyan-50 p-6 shadow-inner">
            <Image
              src="/assets/Wanderlast.png"
              alt="Wanderlust Logo"
              width={180}
              height={180}
              priority
              className="h-auto w-[130px] sm:w-[170px]"
            />
          </div>
        </div>

        {/* 404 */}
        <h1 className="mt-10 text-7xl font-extrabold tracking-tight text-cyan-500 sm:text-8xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-5 text-3xl font-bold text-gray-800 sm:text-4xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
          The page you are looking for might have been
          removed, renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-600"
          >
            <FiHome size={20} />
            Back To Home
          </Link>

          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
          >
            <FiArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;