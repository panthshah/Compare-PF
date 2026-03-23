"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SpecTabs from "./SpecTabs";

const products = [
  {
    id: 1,
    title: "Bespoke AI 4-Door French",
    badge: "Best for smart home",
    badgeColor: "text-blue-600 bg-blue-50",
    description: "Smarter cooling, seamless connectivity, engineered for modern living",
    price: "$3149",
    image: "/products/fridge-1.png",
  },
  {
    id: 2,
    title: "4-Door French",
    badge: "Best for value",
    badgeColor: "text-green-600 bg-green-50",
    description: "Dependable performance for every family, every day.",
    price: "$1099",
    image: "/products/fridge-2.png",
  },
  {
    id: 3,
    title: "Bespoke AI 4-Door Flex",
    badge: "Best for large families",
    badgeColor: "text-orange-600 bg-orange-50",
    description: "More storage options. More ways to make it yours",
    price: "$3149",
    image: "/products/fridge-3.png",
  },
];

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState("key-specs");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Sticky bar: product titles + buy now */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 transition-transform duration-300 ${
          isSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-[128px] py-[12px]">
          <div className="flex gap-[91px]">
            {products.map((product) => (
              <div key={product.id} className="flex-1 flex items-center justify-between">
                <h2
                  className="text-[16px] font-bold text-zinc-900"
                  style={{ fontFamily: "var(--font-sharp-sans)" }}
                >
                  {product.title}
                </h2>
                <button
                  className="rounded-full bg-zinc-900 px-5 py-2 text-[14px] font-bold text-white transition-colors hover:bg-zinc-800"
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1
        className="pt-[48px] text-center font-bold text-[32px] leading-tight text-zinc-900"
        style={{ fontFamily: "var(--font-sharp-sans)" }}
      >
        Find what product is best for you
      </h1>

      <section className="mt-[48px] max-w-[1440px] mx-auto px-[128px]">
        <div className="flex gap-[91px]">
          {products.map((product) => (
            <div key={product.id} className="flex-1">
              <div className="h-[304px] rounded-[7px] bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={240}
                  height={280}
                  className="object-contain h-auto w-auto max-h-[280px]"
                />
              </div>

              <div className="mt-[32px] text-center flex flex-col items-center">
                <h2
                  className="text-[24px] font-bold text-zinc-900"
                  style={{ fontFamily: "var(--font-sharp-sans)" }}
                >
                  {product.title}
                </h2>

                <span
                  className={`mt-[16px] inline-block rounded-full px-3 py-1 text-[14px] font-semibold ${product.badgeColor}`}
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  {product.badge}
                </span>

                <p
                  className="mt-[16px] text-[18px] font-normal leading-relaxed text-zinc-600"
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  {product.description}
                </p>

                <p
                  className="mt-[16px] text-[18px] font-bold text-zinc-900"
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  From {product.price}
                </p>

                <button
                  className="mt-[24px] rounded-full bg-zinc-900 px-8 py-3 text-[18px] font-bold text-white transition-colors hover:bg-zinc-800"
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-[64px]">
        <SpecTabs activeTab={activeTab} onTabChange={setActiveTab} isSticky={isSticky} />
      </div>

      <div className="mt-[64px]" />

      <footer className="mt-auto border-t border-zinc-200 bg-[#FAFAFA] py-[48px]">
        <div className="max-w-[1440px] mx-auto px-[128px] flex items-center justify-between">
          <p
            className="text-[14px] font-bold text-zinc-900"
            style={{ fontFamily: "var(--font-sharp-sans)" }}
          >
            Samsung
          </p>
          <div className="flex gap-[32px]">
            <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Privacy</a>
            <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Terms</a>
            <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Accessibility</a>
            <a href="#" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Contact Us</a>
          </div>
          <p
            className="text-[14px] text-zinc-400"
            style={{ fontFamily: "var(--font-samsung-one)" }}
          >
            © 2026 Samsung. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
