'use client';

import { Separator } from "@heroui/react";
import Link from "next/link";

import {
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiSearch,
} from "react-icons/fi";

const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="relative h-[100vh] min-h-[700px] w-full">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/banner.png')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>

              <p className="text-sm font-medium tracking-wide text-white/90">
                Explore The World With Wanderlast
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Discover Your
              <span className="block text-cyan-400">
                Next Adventure
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg md:text-xl">
              Explore breathtaking destinations and create unforgettable
              memories with curated travel experiences designed for dreamers,
              adventurers, and explorers.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-cyan-500 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-cyan-600 hover:shadow-cyan-500/40">
                Explore Now
              </button>

             <Link href="/destinations"> <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-gray-900">
                View Destinations
              </button></Link>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-16 w-full">
            <div className="grid grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-2xl shadow-2xl md:grid-cols-2 xl:grid-cols-5">
              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">
                <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
                  <FiMapPin size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Location
                  </h3>

                  <p className="text-xs text-gray-300">
                    Address, city or zip
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">
                <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
                  <FiCalendar size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Date / Duration
                  </h3>

                  <p className="text-xs text-gray-300">
                    Anytime / 3 Days
                  </p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">
                <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
                  <FiDollarSign size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Budget
                  </h3>

                  <p className="text-xs text-gray-300">
                    $0 - $3000
                  </p>
                </div>
              </div>

              {/* People */}
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">
                <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
                  <FiUsers size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    People
                  </h3>

                  <p className="text-xs text-gray-300">
                    5 - 10 Persons
                  </p>
                </div>
              </div>

              {/* Search Button */}
              <button className="flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-6 py-5 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-500/40">
                <FiSearch size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Blur Effect */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </section>
  );
};

export default Banner;