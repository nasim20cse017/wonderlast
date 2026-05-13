// src/app/destinations/[id]/page.jsx

import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";

import Image from "next/image";

import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineTravelExplore } from "react-icons/md";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3001/destination/${id}`,
    {
      cache: "no-store",
    }
  );

  const destination = await res.json();

  const {
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
  } = destination;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Actions */}
        <div className="mb-5 flex flex-wrap items-center justify-end gap-3">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>

        {/* Main Container */}
        <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl shadow-black/5">
          {/* Hero Section */}
          <div className="relative">
            <Image
              src={imageUrl}
              alt={destinationName}
              width={1400}
              height={700}
              priority
              className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[600px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                {/* Left */}
                <div className="max-w-3xl">
                  {/* Country */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                    <LuMapPin className="text-cyan-400" />
                    {country}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                    {destinationName}
                  </h1>

                  {/* Duration */}
                  <div className="mt-5 flex items-center gap-2 text-base text-white/90">
                    <FaRegCalendar className="text-cyan-400" />
                    <span>{duration}</span>
                  </div>
                </div>

                {/* Price Card */}
                <div className="w-full max-w-[260px] rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
                  <p className="text-sm font-medium text-white/70">
                    Starting From
                  </p>

                  <h2 className="mt-2 text-5xl font-extrabold text-cyan-300">
                    ${price}
                  </h2>

                  <p className="mt-1 text-sm text-white/70">
                    per person
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid gap-8 p-5 lg:grid-cols-[1fr_460px] lg:gap-10 lg:p-10">
            {/* Left Content */}
            <div>
              {/* Overview Header */}
              <div className="mb-8 flex items-start gap-4">
                <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600 shadow-sm">
                  <MdOutlineTravelExplore size={28} />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Destination Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Discover everything about this incredible
                    travel experience.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-6 sm:p-8">
                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  {description}
                </p>
              </div>

              {/* Extra Info Cards */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                    <LuMapPin size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    Amazing Location
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Explore breathtaking views and unforgettable
                    experiences in {country}.
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                    <FaRegCalendar size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    Flexible Duration
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Enjoy a comfortable and well-planned journey
                    for {duration}.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full">
              <BookingCard destination={destination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;