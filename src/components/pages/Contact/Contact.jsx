import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" py-10 px-4">
        <div className=" text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">
            We're here to help and answer any questions you might have. Let's
            connect!
          </p>
        </div>
      </section>

      {/* conatct form */}
      <section className="pb-10 px-4">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* contact form */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#9ACBD0] text-white py-3 rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* contact info */}
          <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Our Contact Details</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-red-600 text-xl" />
                <p className="text-gray-700">
                  123 Lost & Found Ave, Bhola Sadar, BD
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-red-600 text-xl" />
                <p className="text-gray-700">+880 1319 697 765</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-red-600 text-xl" />
                <p className="text-gray-700">support@lostfound.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
