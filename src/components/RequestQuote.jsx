import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  Clock4,
  MapPin,
  Send,
  Layers,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import toast from "react-hot-toast";
import { getApiUrl } from "../getApiUrl";

export default function RequestQuote({
  isModal = false,
  onClose,
  initialService,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService || "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl("/api/appointments"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isQuoteRequest: true,
          date: formData.preferredDate,
          time: formData.preferredTime,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Quote request sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: initialService || "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
        if (isModal && onClose) {
          onClose();
        }
      } else {
        toast.error(
          data.message || "Failed to send quote request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isModal && !initialService) return null;

  return (
    <div
      className={`${
        isModal
          ? "p-6"
          : "min-h-screen bg-gradient-to-br from-black via-[#1a0000] to-black flex flex-col items-center justify-center text-white font-sans p-6"
      }`}
    >
      <div
        className={`${
          isModal
            ? "w-full"
            : "w-full max-w-4xl bg-white rounded-2xl p-8 shadow-xl"
        }`}
      >
        {isModal && (
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Request a Quote
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={`${isModal ? "space-y-4" : "space-y-6"}`}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              isModal ? "gap-4" : "gap-6"
            }`}
          >
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={isModal ? 14 : 16} className="text-red-600" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full ${
                  isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900`}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail size={isModal ? 14 : 16} className="text-red-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${
                  isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900`}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone size={isModal ? 14 : 16} className="text-red-600" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full ${
                  isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900`}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare
                  size={isModal ? 14 : 16}
                  className="text-red-600"
                />
                Service
              </label>
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full ${
                    isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                  } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900 appearance-none pr-8`}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Coffee Machine Service">
                    Coffee Machine Service
                  </option>
                  <option value="Gym Equipment Repair">
                    Gym Equipment Repair
                  </option>
                  <option value="Catering Equipment Service">
                    Catering Equipment Service
                  </option>
                  <option value="Medical Equipment Service">
                    Medical Equipment Service
                  </option>
                  <option value="Electromechanical">Electromechanical</option>
                  <option value="Clocks">Clocks</option>
                  <option value="Network Service">Network Service</option>
                  <option value="Smart Home System">Smart Home System</option>
                  <option value="EV Charger">EV Charger</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className={`${
                      isModal ? "h-4 w-4" : "h-5 w-5"
                    } text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={isModal ? 14 : 16} className="text-red-600" />
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className={`w-full ${
                  isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900`}
                required
              />
            </div>
            <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={isModal ? 14 : 16} className="text-red-600" />
                Preferred Time
              </label>
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className={`w-full ${
                  isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
                } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900`}
                required
              />
            </div>
          </div>
          <div className={`${isModal ? "space-y-1" : "space-y-2"}`}>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare
                size={isModal ? 14 : 16}
                className="text-red-600"
              />
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={isModal ? 3 : 4}
              className={`w-full ${
                isModal ? "px-3 py-2 text-sm" : "px-4 py-3"
              } border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-900 resize-none`}
              placeholder="Enter your message"
              required
            />
          </div>
          {!isModal && (
            <>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Clock4 className="text-red-600" size={20} />
                  Working Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Monday - Friday</p>
                    <p className="text-sm font-medium text-gray-800">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Saturday</p>
                    <p className="text-sm font-medium text-gray-800">
                      9:00 AM - 2:00 PM
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sunday</p>
                    <p className="text-sm font-medium text-gray-800">Closed</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Emergency Service</p>
                    <p className="text-sm font-medium text-gray-800">
                      24/7 Available
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <MapPin className="text-red-600" size={20} />
                    Our Location
                  </h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=7,+Bell+Yard,+WC2A+2JR,+Greater+London,+London,+United+Kingdom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600"
                  >
                    Location: 7, Bell Yard, WC2A 2JR, Greater London, London,
                    United Kingdom
                  </a>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <Send className="text-red-600" size={20} />
                    Contact Info
                  </h3>
                  <p className="text-sm text-gray-600">
                    <a
                      href="mailto:hello@syntradltd.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Email: hello@syntradltd.co.uk
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <a
                      href="tel:+442071125377"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Phone: +44 20 7112 5377
                    </a>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href="https://www.facebook.com/kazmoorjani/"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Facebook size={16} />
                    </a>
                    <a
                      href="https://www.instagram.com/syntradltd/"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Instagram size={16} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Twitter size={16} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kaz-moorjani/"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className={`w-full bg-red-600 text-white ${
              isModal ? "py-2 px-4 text-sm" : "py-3 px-6 text-lg"
            } rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform ${
              isModal ? "mt-4" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
