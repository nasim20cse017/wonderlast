// src/components/DestinationCard.jsx
'use client';

import { Button } from "@heroui/react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const { _id, imageUrl, price, destinationName, duration, country } =
    destination;

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          width={500}
          height={500}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Price Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 shadow-md backdrop-blur">
          <h3 className="text-lg font-bold text-cyan-600">${price}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Country */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LuMapPin className="text-cyan-500" />
          <span>{country}</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-cyan-600">
            {destinationName}
          </h2>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaRegCalendar className="text-cyan-500" />
          <span>{duration}</span>
        </div>

        {/* Button */}
        <Link href={`/destinations/${_id}`}>
          <Button
            variant="solid"
            className="mt-2 w-full rounded-xl bg-cyan-500 font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
          >
            <FiExternalLink size={18} />
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;