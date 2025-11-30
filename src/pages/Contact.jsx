import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from 'react-hot-toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  User,
  Layers,
  ChevronDown,
  Calendar,
  MessageSquare
} from "lucide-react";
import { getApiUrl } from '../getApiUrl';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    service: "",
    date: "",
    time: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
          duration: 0.6
        }
      });

      tl.from('.contact-section', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all"
      });

      ScrollTrigger.create({
        trigger: '.contact-section',
        start: "top bottom-=50",
        end: "bottom top+=50",
        toggleActions: "play none none reverse",
        animation: tl,
        markers: false
      });

      gsap.set('.contact-section', { 
        opacity: 0, 
        y: 30,
        willChange: "transform, opacity"
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/appointments'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isQuoteRequest: false,
          date: formData.date,
          time: formData.time
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Message sent successfully!');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
          service: "",
          date: "",
          time: ""
        });
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Contact Us | Syntrad Ltd - Expert Equipment Repair Services</title>
      <meta name="description" content="Get in touch with Syntrad Ltd for professional equipment repair and maintenance services in Greater London. Contact us today for quick support or to schedule an appointment." />
      <meta name="keywords" content="Syntrad,Kaz Moorjani, contact, equipment repair, London services, electrical service, electronic repair, catering equipment, coffee machine service, schedule appointment" />
      <meta name="author" content="Kaz Moorjani" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Contact Syntrad Ltd | Equipment Repair Services in London" />
      <meta property="og:description" content="Reach out to Syntrad Ltd for fast and reliable repair services across electrical, electronics, medical, catering and more." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://syntradltd.co.uk/contact" />
      <meta property="og:image" content="https://syntradltd.co.uk/assets/contact-meta.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact Syntrad Ltd | Equipment Repair Services in London" />
      <meta name="twitter:description" content="Need expert repair services? Contact Syntrad Ltd today for quick support and appointments." />
      <meta name="twitter:image" content="https://syntradltd.co.uk/assets/contact-meta.jpg" />

      <link rel="canonical" href="https://syntradltd.co.uk/contact" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Syntrad Ltd",
          "description": "Get in touch with Syntrad Ltd for professional equipment repair and maintenance services in Greater London.",
          "url": "https://syntradltd.co.uk/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Syntrad Ltd",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+44XXXXXXXXXX",
              "contactType": "customer service",
              "areaServed": "GB",
              "availableLanguage": ["English"]
            }
          }
        })}
      </script>
    </Helmet>

    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0000] to-black" ref={containerRef}>
      {/* Header Section */}
      <div className="relative py-16 sm:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/50 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Get in Touch with Our <span className="text-red-600">Experts</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or need assistance? Our team of professionals is here to help you with all your service needs.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <div className="contact-section space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 rounded-full p-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                    <p className="text-gray-300">7, Bell Yard, WC2A 2JR, Greater London, London, United Kingdom</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 rounded-full p-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-300">+44 20 7112 5377</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 rounded-full p-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300">hello@syntradltd.co.uk</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 rounded-full p-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Working Hours</h3>
                    <p className="text-gray-300">Monday - Saturday: 11:00 AM - 17:00 PM</p>
                    <p className="text-gray-300">Sunday: 08:30 AM - 20:00 PM</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-4 pt-4">
                  <a href="#" className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Our Location</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-sm sm:text-base text-gray-300">7, Bell Yard, WC2A 2JR, Greater London, London, United Kingdom</span>
                </div>
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/50 z-10" />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7226740000003!2d-0.1134!3d51.5154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sBell%20Yard%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-0"
                  ></iframe>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-white">Mon-Fri: 9:00 AM - 6:00 PM</span>
                      </div>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=7+Bell+Yard+London+WC2A+2JR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-red-600 hover:text-red-500 transition-colors"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-section">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Schedule an Appointment</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">Service</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 appearance-none"
                      required
                    >
                      <option value="" className="bg-black text-white">Select a service</option>
                      <option value="Electrical Engineering" className="bg-black text-white">Electrical Engineering</option>
                      <option value="Electronics" className="bg-black text-white">Electronics</option>
                      <option value="Coffee Machine Service" className="bg-black text-white">Coffee Machine Service</option>
                      <option value="Gym Equipment Repair" className="bg-black text-white">Gym Equipment Repair</option>
                      <option value="Catering Equipment Service" className="bg-black text-white">Catering Equipment Service</option>
                      <option value="Medical Equipment Service" className="bg-black text-white">Medical Equipment Service</option>
                      <option value="Electromechanical" className="bg-black text-white">Electromechanical</option>
                      <option value="Clocks" className="bg-black text-white">Clocks</option>
                      <option value="Network Service" className="bg-black text-white">Network Service</option>
                      <option value="Smart Home System" className="bg-black text-white">Smart Home System</option>
                      <option value="EV Charger" className="bg-black text-white">EV Charger</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-medium text-gray-300">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-medium text-gray-300">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-medium text-gray-300">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 h-32"
                      placeholder="Your message"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 text-sm sm:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}