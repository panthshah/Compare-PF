"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice, type Product } from "../data/specs";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const activeColor = product.colors[colorIndex] ?? product.colors[0];
  const savings = product.wasPrice - product.price;

  return (
    <article
      aria-label={product.title}
      className="flex w-full flex-col items-center gap-[24px] rounded-[16px] p-[16px] transition-colors hover:bg-[#FAFAFA]"
    >
      {/* Badge: left aligned, dark slate pill */}
      <div className="flex w-full justify-start">
        <span className="font-samsung-one inline-flex items-center whitespace-nowrap rounded-[3px] bg-[#4F787F] px-[16px] py-[4px] text-[13px] font-semibold leading-[17px] text-white">
          {product.badge}
        </span>
      </div>

      {/* Product image */}
      <div className="flex h-[240px] w-full items-center justify-center md:h-[260px] xl:h-[280px]">
        <Image
          src={product.image}
          alt={product.title}
          width={240}
          height={280}
          className="h-full w-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.08)]"
          priority
        />
      </div>

      {/* Color swatches */}
      <div className="flex flex-col items-center gap-[16px]">
        <p className="font-samsung-one text-[14px] font-bold leading-[16px] text-zinc-900">
          {activeColor.name}
        </p>
        <div role="radiogroup" aria-label={`${product.title} color`} className="flex items-center gap-[16px]">
          {product.colors.map((color, i) => {
            const isActive = i === colorIndex;
            return (
              <button
                key={color.name}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={color.name}
                onClick={() => setColorIndex(i)}
                className={`relative flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2189FF] ${
                  isActive ? "border-[#2189FF]" : "border-transparent hover:scale-110"
                }`}
              >
                <span
                  className="block h-[16px] w-[16px] rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <p className="font-samsung-one max-w-[300px] text-center text-[14px] leading-[20px] text-zinc-800 sm:text-[15px]">
        {product.description}
      </p>

      {/* Price */}
      <div className="flex flex-col items-center gap-[6px]">
        <div className="font-samsung-one flex flex-wrap items-baseline justify-center gap-x-[8px]">
          <span className="text-[16px] font-bold text-zinc-900">{formatPrice(product.price)}</span>
          <span className="text-[12px] text-zinc-500">
            was: <s>{formatPrice(product.wasPrice)}</s>
          </span>
        </div>
        {savings > 0 && (
          <span className="font-samsung-one text-[13px] font-semibold text-[#1F8A3A]">
            Save {formatPrice(savings)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="font-samsung-one flex items-center gap-[20px]">
        <a
          href={product.learnMoreHref}
          className="text-[14px] font-semibold text-zinc-900 underline decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
        >
          Learn more
        </a>
        <a
          href={product.buyHref}
          className="inline-flex h-[36px] items-center justify-center rounded-full bg-zinc-900 px-[22px] text-[14px] font-bold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Buy
        </a>
      </div>
    </article>
  );
}
