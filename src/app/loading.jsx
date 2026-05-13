import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-white to-cyan-50">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30 blur-2xl"></div>

          <div className="relative rounded-full bg-white p-6 shadow-2xl">
            <Image
              src="/assets/Wanderlast.png"
              alt="Wanderlust Logo"
              width={180}
              height={180}
              priority
              className="h-auto w-[140px] sm:w-[180px]"
            />
          </div>
        </div>

        {/* Loader */}
        <div className="mt-10 flex items-center gap-3">
          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]"></span>

          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.15s]"></span>

          <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"></span>
        </div>

        {/* Text */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          Loading Your Adventure...
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Please wait while we prepare your travel
          experience.
        </p>
      </div>
    </div>
  );
};

export default Loading;