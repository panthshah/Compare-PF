"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SpecTabsV6 from "./SpecTabsV6";
import SpecificationTabs from "./SpecificationTabs";
import { products } from "../data/specs";

export default function ComparePageV6() {
  const [activeTab, setActiveTab] = useState("key-specs");
  const [showDifferences, setShowDifferences] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Sticky tab bar — slides in from top on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ${
          isSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1600px] overflow-x-auto px-4 py-3 sm:px-8 lg:px-16 xl:px-[128px] xl:py-[24px]">
          <SpecificationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      <h1
        className="px-4 pt-8 text-center text-[28px] font-bold leading-tight text-zinc-900 sm:pt-[48px] sm:text-[32px]"
        style={{ fontFamily: "var(--font-sharp-sans)" }}
      >
        Find what product is best for you
      </h1>

      <section className="mx-auto mt-8 max-w-[1600px] px-4 sm:mt-[48px] sm:px-8 lg:px-16 xl:px-[128px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 xl:gap-[91px]">
          {products.map((product) => (
            <div key={product.id} className="flex-1">
              <div className="h-[304px] min-[1441px]:h-[334px] min-[1600px]:h-[368px] rounded-[7px] bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={240}
                  height={280}
                  className="object-contain h-auto w-auto max-h-[280px] min-[1441px]:max-h-[308px] min-[1600px]:max-h-[336px]"
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

                <a
                  href="https://www.samsung.com/us/home-appliances/refrigerators/"
                  className="mt-[24px] rounded-full bg-zinc-900 px-8 py-3 text-[18px] font-bold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                  style={{ fontFamily: "var(--font-samsung-one)" }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-[64px]">
        <SpecTabsV6
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showDifferences={showDifferences}
          setShowDifferences={setShowDifferences}
          isSticky={isSticky}
        />
      </div>

      <div className="mt-[64px]" />

      <footer className="mt-auto border-t border-zinc-200 bg-[#FAFAFA] py-[48px]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-4 text-center sm:px-8 lg:flex-row lg:px-16 lg:text-left xl:px-[128px]">
          <p
            className="text-[14px] font-bold text-zinc-900"
            style={{ fontFamily: "var(--font-sharp-sans)" }}
          >
            Samsung
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <a href="https://www.samsung.com/us/account/privacy-policy/" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Privacy</a>
            <a href="https://www.samsung.com/us/common/legal.html" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Terms</a>
            <a href="https://www.samsung.com/us/accessibility/" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Accessibility</a>
            <a href="https://www.samsung.com/us/support/contact/" className="text-[14px] text-zinc-500 hover:text-zinc-900" style={{ fontFamily: "var(--font-samsung-one)" }}>Contact Us</a>
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
