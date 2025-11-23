import React, { useState } from "react";
import { Sun, ShieldCheck, Zap, Smartphone, Leaf, Factory } from "lucide-react";
import { Link } from 'react-router-dom';

const Amplink = () => {
  const products = [
    {
      id: 1,
      name: "AmpLink Elite",
      subtitle: "Supports 7.4 kW (single-phase), 11 kW & 22 kW (three-phase) charging options",
      basePrice: "Starting At Just £475.00",
      images: [
        "src/assets/1Layer.png",
        "src/assets/4Layer.png",
        "src/assets/5Layer.png",
        "src/assets/3Layer.png",
        "src/assets/2Layer.png",
        "src/assets/6Layer.png",
      ],
      colors: [
        { id: "white", label: "Crimson", class: "bg-white-600", imageIndex: 0 },
        { id: "orange", label: "Green", class: "bg-yellow-400", imageIndex: 1 },
        { id: "green", label: "Amber", class: "bg-green-400", imageIndex: 2 },
        { id: "blue", label: "Violet", class: "bg-blue-400", imageIndex: 3 },
        { id: "red", label: "Black", class: "bg-red-400", imageIndex: 4 },
        { id: "pink", label: "Black", class: "bg-pink-400", imageIndex: 5 }
      ],
      shortDescription:
        "Smart, Connected EV charging with optional WIFI, 4G & RFID control.",
      technical: [
        "Up to 7.4 KW single-phase 32A.",
        "WIFI Ethernet / LAN Standard: 4G & RFID Optional.",
        "OCPP 1.6.1 OTA frimware updates, dynamic charging modes.",
        "Two bose / rear cable entry, no earth rod required.",
      ],
      features: [
        "Smart app monitoring",
        "Auto-switch to battery backup",
        "Overload protection",
        "2-year warranty",
      ],
    },
  ];

  const product = products[0];
  const [activeColor, setActiveColor] = useState(product.colors[0].id);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header / hero */}
        <div className="flex flex-col md:flex-row items-start gap-8">

          {/* Left Section – Product Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full bg-gray-50 rounded-2xl p-6 flex items-center justify-center shadow">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "/assets/placeholder-800x600.png";
                }}
                className="max-w-full max-h-[420px] object-contain rounded-lg"
              />
            </div>

            { }
            <div className="mt-5 w-full flex flex-col items-center">
              { }
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveColor(c.id);
                      setActiveImage(c.imageIndex);
                    }}
                    aria-label={`Select ${c.label}`}
                    className={`w-10 h-10 rounded-full ring-2 ring-offset-1 ring-gray-200 flex items-center justify-center ${activeColor === c.id ? "ring-4 ring-offset-2" : ""
                      }`}
                  >
                    <span className={`${c.class} w-8 h-8 block rounded-full`} />
                  </button>
                ))}
              </div>

              {/* Image thumbnails */}
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border ${activeImage === i ? "border-black" : "border-gray-200"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`thumbnail-${i}`}
                      onError={(e) =>
                        (e.target.src = "/assets/placeholder-thumb.png")
                      }
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section – Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-extrabold tracking-tight text-red-700">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{product.subtitle}</p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-bold">{product.basePrice}</div>
                <div className="text-sm text-gray-500">
                  Installation requirements may apply.
                </div>
              </div>

              <div className="flex gap-3">
                <Link to="/contact"
                  className="bg-red-700 text-white fonts-bold px-4 py-2 rounded-lg shadow hover:opacity-95 inline-block"
                >
                  Enquire Now
                </Link>
              </div>
            </div>

            <p className="mt-6 text-gray-700">{product.shortDescription}</p>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold">Installation Pricing Notice</h3>
              <p className="mt-2 text-sm text-gray-600">
                We would like to inform you that our installation services for the AmpLink
                start at £475. Please note that the total cost may vary based on the specific requirements
                and complexity of your installation. We are committed to transparency,
                and you will receive a details quote before any work begins to ensure there are no unexpected charges.
                If you have any questions, please don't hesitate to reach out.
              </p>
            </div>

            {/* Tech section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Technical features</h4>
                <ul className="mt-2 list-disc list-outside pl-5 text-sm text-gray-700 space-y-1">
                  {product.technical.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/layer11.png"   // <-- change to your actual image path
                    alt="Technical diagram"
                    className="w-full h-full object-contain"
                    onError={(e) => (e.target.src = "/assets/placeholder-800x600.png")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white text-black">
          {/* SECTION 1 — INTRO */}
          <section className="py-16 px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-red-600">
              AmpLink Elite X
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 max-w-3xl">
              At Syntrad, we believe in building a cleaner, smarter future with every charge.
              Our passion for innovation and quality engineering is reflected in every
              product we create. The AmpLink Elite X is our latest leap in user-focused
              EV charging designed to empower your journey.
            </p>
          </section>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-200" />

          {/* SECTION 2 — FEATURES & BENEFITS */}
          <section className="py-14 px-6 md:px-20 bg-gray-50">
            <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
              Features & Benefits
            </h2>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Card 1 */}
              <div className="p-7 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <Smartphone className="w-10 h-10 text-red-600" />
                <h3 className="text-xl font-semibold mt-3">App Control</h3>
                <p className="text-gray-600 mt-2">
                  Monitor, schedule, and manage charging anytime from any device.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-7 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <Zap className="w-10 h-10 text-red-600" />
                <h3 className="text-xl font-semibold mt-3">High-Speed Charging</h3>
                <p className="text-gray-600 mt-2">
                  Reliable, fast power delivery with advanced power optimization.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-7 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <ShieldCheck className="w-10 h-10 text-red-600" />
                <h3 className="text-xl font-semibold mt-3">Advanced Safety</h3>
                <p className="text-gray-600 mt-2">
                  Multi-layered protection and secure smart-grid capability.
                </p>
              </div>
            </div>

            {/* UTILITY FEATURES */}
            <div className="mt-16 p-10 bg-white rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">Automatic Utility Communication</h3>

              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  <strong className="text-red-600">Demand Response:</strong>
                  EV charging adapts during peak grid demand to reduce energy load.
                </li>
                <li>
                  <strong className="text-red-600">Dynamic Tariffs:</strong>
                  Automatically charges during low-price hours to maximise savings.
                </li>
                <li>
                  <strong className="text-red-600">Green Energy Integration:</strong>
                  Automatically prioritises renewable grid energy.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 3 — SOLAR COMPATIBLE */}
          <section className="py-16 px-6 md:px-20 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-center">
              Greener Than Ever — <span className="text-red-600">PV Compatible</span>
            </h2>

            <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
              {/* Left text */}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Connect the Syntrad AmpLink Elite X to your solar PV system and charge
                  using the power of the sun! The charger automatically uses surplus
                  solar energy whenever available with no manual switching required.
                </p>

                <h3 className="text-xl font-bold mt-6">Smart Solar Integration</h3>

                <p className="text-gray-700 mt-2 leading-relaxed">
                  The Syntrad App intelligently detects when your home’s solar PV is
                  generating excess power and routes it directly to your EV helping you
                  charge greener and save more automatically. Track solar charging inside
                  your app dashboard.
                </p>
              </div>

              {/* Right panel */}
              <div className="flex justify-center">
                <Leaf className="w-40 h-40 text-green-600 opacity-80" />
              </div>
            </div>
          </section>
        </div>

        {/* Price Table */}
        <table className="w-full mt-32 table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Details</th>
              <th className="text-left p-3">Price</th>
            </tr>
          </thead>

          <tbody>

            {/* Residential / Domestic */}
            <tr className="bg-gray-100">
              <td className="p-3 font-semibold" colSpan="3">
                Residential / Domestic Installations
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Dwelling installation ≤ 10m cable run</td>
              <td className="p-3">Fixed standard install</td>
              <td className="p-3">£275</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Dwelling installation ≥ 10m cable run</td>
              <td className="p-3">Per metre</td>
              <td className="p-3">£22.50 / metre</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Wall penetration</td>
              <td className="p-3">Standard masonry</td>
              <td className="p-3">Included</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Loft / underfloor cable routing</td>
              <td className="p-3">Depending on access</td>
              <td className="p-3">£45–£85</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Surface trunking</td>
              <td className="p-3">Per metre</td>
              <td className="p-3">£12.50</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">EV “Ready” Socket Only Installation</td>
              <td></td>
              <td className="p-3">£145</td>
            </tr>

            {/* Commercial */}
            <tr className="bg-gray-100">
              <td className="p-3 font-semibold" colSpan="3">
                Commercial Installations
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">1-Phase ≤ 10m</td>
              <td className="p-3">Commercial install</td>
              <td className="p-3">£265</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">3-Phase ≤ 10m</td>
              <td className="p-3">Commercial install</td>
              <td className="p-3">£525</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">3-Phase ≥ 10m cable run</td>
              <td className="p-3">Per metre</td>
              <td className="p-3">£42 / metre</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">External trenching / groundworks</td>
              <td></td>
              <td className="p-3">£85 per metre</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Load management / CT clamps</td>
              <td></td>
              <td className="p-3">£75</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Multi-charger setup</td>
              <td className="p-3">Per charger</td>
              <td className="p-3">£45</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Emergency stop button installation</td>
              <td></td>
              <td className="p-3">£55–£95</td>
            </tr>

            {/* Add Ons */}
            <tr className="bg-gray-100">
              <td className="p-3 font-semibold" colSpan="3">
                Optional Add-Ons
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Wi-Fi extender / mesh</td>
              <td></td>
              <td className="p-3">£45–£65</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">AmpLink Elite X colour customisation</td>
              <td></td>
              <td className="p-3">£35</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Backplate / stand / pedestal</td>
              <td></td>
              <td className="p-3">£95–£245</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Extended warranty (3 years)</td>
              <td></td>
              <td className="p-3">£65</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Remote monitoring setup</td>
              <td></td>
              <td className="p-3">£35</td>
            </tr>

            {/* Special Conditions */}
            <tr className="bg-gray-100">
              <td className="p-3 font-semibold" colSpan="3">
                Special Conditions
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Limited access areas</td>
              <td></td>
              <td className="p-3">TBA</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Listed buildings / conservation restrictions</td>
              <td></td>
              <td className="p-3">TBA</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Complex meter separation (HMO / flats)</td>
              <td></td>
              <td className="p-3">TBA</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Shared car parks & steel-frame units</td>
              <td></td>
              <td className="p-3">TBA</td>
            </tr>

          </tbody>
        </table>

        {/* Metered EV Charging Section */}
<section className="mt-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* Text Content */}
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-5">
        Metered EV Charging – Card & App Payments Enabled
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Offer your customers a seamless charging experience with our metered EV
        charger options, fully compatible with debit/credit card payments or
        mobile app billing. Ideal for residential blocks, commercial sites,
        rental properties and workplaces, these chargers provide accurate energy
        metering, transparent pricing, and automated revenue collection.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Whether you manage a single property or an entire fleet of chargers,
        our payment-enabled systems ensure secure transactions, usage reports,
        and plug-and-charge convenience for all drivers.
      </p>
    </div>

    {/* Image + Heading */}
    <div className="flex flex-col items-center md:items-end text-center md:text-right">
      <p className="text-xl font-semibold text-gray-900 mb-3">
        Smart metering for your customer
      </p>
      <p className="text-xl font-semibold text-gray-900 mb-3">Get paid to charge</p>

      <img
        src="/assets/car.jpeg"
        alt="EV charging station"
        className="rounded-xl shadow-lg w-full md:max-w-md object-cover"
      />
    </div>

  </div>
</section>



        {/* CTA */}
        <div className="mt-18 flex items-center justify-center">
          <Link to="/contact"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-95 inline-block"
          >
            Book your install
          </Link>
        </div>

        {/* Logo Section */}
        <section className="mt-16 py-12 bg-gray-50 rounded-2xl shadow-inner">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Trusted, Certified, Globally Manufactured.
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center px-6">

            {/* OZEV Installer Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/zero.png"
                alt="OZEV Approved Installer"
                className="h-20 object-contain"
              />
            </div>

            {/* Octopus Energy Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/octopus.png"
                alt="Octopus Energy"
                className="h-20 object-contain"
              />
            </div>

            {/* Designed & Manufactured in UK Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/unnamed.png"
                alt="Designed & Manufactured in the UK"
                className="h-20 object-contain"
              />
            </div>

            {/* Made in Turkey Logo */}
            <div className="flex justify-center">
              <img
                src="/assets/turkey.png"
                alt="Made in Turkey"
                className="h-16 object-contain"
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Amplink;
