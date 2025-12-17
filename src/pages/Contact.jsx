import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Contact <span className="text-orange-600">FoodHub</span>
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="border p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
