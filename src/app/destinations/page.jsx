// src/app/destinations/page.jsx

import DestinationCard from "@/components/DestinationCard";

const DestinationPage = async () => {
  const res = await fetch("http://localhost:3001/destination", {
    cache: "no-store",
  });

  const destinations = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-cyan-500">
            Explore The World
          </p>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Discover Beautiful Destinations For Your Next Journey
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-500 sm:text-lg">
            Find breathtaking places, unforgettable experiences, and plan your
            perfect adventure with ease.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;