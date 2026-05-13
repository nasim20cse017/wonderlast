
import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import Image from "next/image";

import {
  FaRegCalendarAlt,
  FaPlaneDeparture,
} from "react-icons/fa";

import {
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `http://localhost:3001/booking/${user?.id}`,
    {
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700">
              <FaPlaneDeparture />
              Travel Dashboard
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
              My Bookings
            </h1>

            <p className="mt-3 text-base text-gray-500">
              Manage your upcoming adventures and travel
              experiences.
            </p>
          </div>

          {/* Stats */}
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Bookings
            </p>

            <h2 className="mt-1 text-4xl font-extrabold text-cyan-500">
              {bookings.length}
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <div className="mb-5 rounded-full bg-cyan-100 p-6 text-cyan-600">
              <FaPlaneDeparture size={40} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              No Bookings Yet
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              You haven&apos;t booked any destinations yet.
              Start exploring amazing places around the
              world.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative lg:w-[380px] xl:w-[420px]">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.destinationName}
                      width={500}
                      height={500}
                      className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Price */}
                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-3 shadow-xl backdrop-blur">
                      <p className="text-xs font-medium text-gray-500">
                        Total Price
                      </p>

                      <h2 className="text-3xl font-extrabold text-cyan-600">
                        ${booking.price}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    {/* Top */}
                    <div>
                      {/* Country */}
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600">
                        <FiMapPin />
                        {booking.country}
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl font-extrabold leading-tight text-gray-800">
                        {booking.destinationName}
                      </h1>

                      {/* Booking Info */}
                      <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        {/* Departure Date */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                          <div className="mb-3 flex items-center gap-2 text-cyan-600">
                            <FaRegCalendarAlt />
                            <span className="font-semibold">
                              Departure Date
                            </span>
                          </div>

                          <p className="text-lg font-bold text-gray-800">
                            {new Date(
                              booking.departureDate
                            ).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        {/* Booking ID */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                          <div className="mb-3 flex items-center gap-2 text-cyan-600">
                            <FiCreditCard />
                            <span className="font-semibold">
                              Booking ID
                            </span>
                          </div>

                          <p className="break-all text-sm font-medium text-gray-700">
                            {booking._id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-8 flex flex-col gap-4 border-t border-dashed border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      {/* Status */}
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        Booking Confirmed
                      </div>

                      {/* Cancel Button */}
                      <div className="w-full sm:w-auto">
                        <BookingCancelAlert
                          bookingId={booking._id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;