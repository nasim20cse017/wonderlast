// src/app/destinations/[id]/page.jsx

import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineTravelExplore } from "react-icons/md";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:3001/destination/${id}`, {
    cache: "no-store",
  });

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Actions */}
        <div className="mb-5 flex justify-end gap-3">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Hero Image */}
          <div className="relative">
            <Image
              src={imageUrl}
              alt={destinationName}
              width={1400}
              height={700}
              className="h-[250px] w-full object-cover sm:h-[400px] lg:h-[550px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Content on Image */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-white/90">
                    <LuMapPin className="text-cyan-400" size={20} />
                    <span className="text-sm sm:text-base">{country}</span>
                  </div>

                  <h1 className="max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">
                    {destinationName}
                  </h1>

                  <div className="mt-4 flex items-center gap-2 text-white/90">
                    <FaRegCalendar className="text-cyan-400" />
                    <span>{duration}</span>
                  </div>
                </div>

                {/* Price Card */}
                <div className="w-fit rounded-2xl bg-white/95 px-6 py-4 shadow-2xl backdrop-blur">
                  <p className="text-sm font-medium text-gray-500">
                    Starting From
                  </p>

                  <h2 className="text-3xl font-extrabold text-cyan-600">
                    ${price}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-10 p-6 lg:grid-cols-3 lg:p-10">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-cyan-100 p-3 text-cyan-600">
                  <MdOutlineTravelExplore size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Destination Overview
                  </h2>

                  <p className="text-sm text-gray-500">
                    Everything you need to know about this place
                  </p>
                </div>
              </div>

              <p className="leading-8 text-gray-600">{description}</p>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="mb-6 text-2xl font-bold text-gray-800">
                  Quick Info
                </h3>

                <div className="space-y-5">
                  {/* Country */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-gray-500">Country</span>

                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <LuMapPin className="text-cyan-500" />
                      {country}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="text-gray-500">Duration</span>

                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <FaRegCalendar className="text-cyan-500" />
                      {duration}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Price</span>

                    <span className="text-2xl font-bold text-cyan-600">
                      ${price}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-8 w-full rounded-2xl bg-cyan-500 px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg">
                  Book Your Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;