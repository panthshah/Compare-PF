"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { products } from "../data/specs";

export default function ProductHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 transition-transform duration-300 ${
          isSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-[128px] py-[12px]">
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

      <section className="mt-[48px] px-[128px]">
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
    </>
  );
}
