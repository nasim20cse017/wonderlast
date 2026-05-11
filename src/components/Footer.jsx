import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiSend,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050816] text-gray-300">
      {/* Background Glow */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* Brand Section */}
          <div>
            {/* Logo */}
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
              Wander
              <span className="text-cyan-400">last</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400">
              Your gateway to extraordinary travel experiences around the world.
              Discover breathtaking destinations, luxury adventures, and
              unforgettable journeys crafted for explorers.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-4">
              {[
                {
                  icon: <FiFacebook size={20} />,
                },
                {
                  icon: <FiInstagram size={20} />,
                },
                {
                  icon: <FiTwitter size={20} />,
                },
                {
                  icon: <FiLinkedin size={20} />,
                },
              ].map((social, index) => (
                <button
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white">
              Join Our Newsletter
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Subscribe for exclusive travel deals, destination inspiration, and
              exciting updates from Wanderlast.
            </p>

            {/* Input */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <FiMail className="text-cyan-400" size={20} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-500/40">
                Subscribe
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px w-full bg-white/10"></div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {[
                "Home",
                "Destinations",
                "My Bookings",
                "Add Destination",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Support
            </h3>

            <ul className="space-y-4">
              {[
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "FAQs",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Popular Tours
            </h3>

            <ul className="space-y-4">
              {[
                "Bali Paradise",
                "Swiss Alps",
                "Dubai Luxury",
                "Maldives Escape",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <FiPhone size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <h4 className="font-medium text-white">
                    +880 1234 567890
                  </h4>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <FiMail size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>

                  <h4 className="font-medium text-white">
                    info@wanderlast.com
                  </h4>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <FiMapPin size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>

                  <h4 className="font-medium text-white">
                    Barishal, Bangladesh
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 Wanderlast. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Terms
            </Link>

            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;