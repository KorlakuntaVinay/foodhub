export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-xl font-bold text-white">Food Hub</h2>
          <p className="text-sm mt-2">
            Taste that travels. Discover cuisines from around the world.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@foodhub.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center text-xs py-3">
        © {new Date().getFullYear()} Food Hub. All rights reserved.
      </div>
    </footer>
  );
}
