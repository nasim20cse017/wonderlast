"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  DateField,
  Label,
} from "@heroui/react";

import {
  FiCalendar,
  FiMapPin,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [departureDate, setDepartureDate] =
    useState(null);

  const [isPending, setIsPending] =
    useState(false);

  const {
    price,
    _id,
    destinationName,
    imageUrl,
    country,
  } = destination;

  // Handle Booking
  const handleBooking = async () => {
    // Validation
    if (!user) {
      return toast.error("Please login first!");
    }

    if (!departureDate) {
      return toast.error(
        "Please select a departure date!"
      );
    }

    try {
      setIsPending(true);

      const bookingData = {
        userId: user?.id,
        userImage: user?.image,
        userName: user?.name,

        destinationId: _id,
        destinationName,
        price,
        imageUrl,
        country,

        departureDate: new Date(
          departureDate.toString()
        ),
      };

      const res = await fetch(
        "http://localhost:3001/booking",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      console.log(data);

      // Success
      if (data?.insertedId || data?.acknowledged) {
        toast.success(
          "Your booking has been confirmed 🎉"
        );

        // Redirect using router.push
        router.push("/my-bookings");
      } else {
        toast.error("Booking failed!");
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full lg:min-w-[420px] xl:min-w-[460px]">
      <Card className="sticky top-24 overflow-hidden rounded-[32px] border border-gray-200 bg-white p-6 shadow-2xl shadow-black/5 sm:p-8">
        {/* Top Badge */}
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600">
          <FiCheckCircle />
          Instant Booking Available
        </div>

        {/* Price */}
        <div className="border-b border-dashed border-gray-200 pb-6">
          <p className="text-sm text-gray-500">
            Starting from
          </p>

          <div className="mt-2 flex items-end gap-2">
            <h2 className="text-5xl font-extrabold tracking-tight text-cyan-500">
              ${price}
            </h2>

            <span className="mb-2 text-sm text-gray-500">
              / person
            </span>
          </div>
        </div>

        {/* Destination Info */}
        <div className="space-y-5 py-7">
          {/* Destination */}
          <div className="flex items-center gap-4 rounded-3xl bg-gray-50 p-5 transition-all duration-300 hover:bg-cyan-50">
            <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
              <FiMapPin size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {destinationName}
              </h3>

              <p className="text-sm text-gray-500">
                {country}
              </p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="rounded-3xl border border-gray-200 p-5">
            <div className="mb-4 flex items-center gap-2 text-gray-700">
              <FiCalendar className="text-cyan-500" />

              <span className="font-semibold">
                Select Departure Date
              </span>
            </div>

            <DateField
              onChange={setDepartureDate}
              className="w-full"
              name="date"
            >
              <Label className="hidden">
                Departure Date
              </Label>

              <DateField.Group className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 transition-all duration-300 hover:border-cyan-400 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200">
                <DateField.Input className="w-full text-gray-700">
                  {(segment) => (
                    <DateField.Segment
                      segment={segment}
                    />
                  )}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 border-t border-dashed border-gray-200 py-7">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Free Cancellation
            </span>

            <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-500">
              Available
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Secure Payment
            </span>

            <span className="rounded-full bg-cyan-50 px-3 py-1 font-medium text-cyan-500">
              Protected
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Customer Support
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              24/7 Available
            </span>
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={handleBooking}
          isDisabled={isPending}
          className="mt-3 h-16 w-full rounded-2xl bg-cyan-500 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-600"
        >
          <FiCreditCard size={20} />

          {isPending
            ? "Processing Booking..."
            : "Book Now"}
        </Button>

        {/* Footer Text */}
        <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
          By booking this destination you agree to our
          terms, refund and cancellation policy.
        </p>
      </Card>
    </div>
  );
};

export default BookingCard;