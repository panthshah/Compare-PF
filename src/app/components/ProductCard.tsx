"use client";

import Image from "next/image";
import { formatPrice, type Product } from "../data/specs";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const savings = product.wasPrice - product.price;

  return (
    <article
      aria-label={product.title}
      className="flex h-full w-full flex-col items-center gap-[24px] p-[16px]"
    >
      {/* Product image */}
      <div className="flex h-[280px] w-full items-center justify-center md:h-[300px]">
        <Image
          src={product.image}
          alt={product.title}
          width={240}
          height={280}
          className="h-full w-auto object-contain"
          priority
        />
      </div>

      {/* "Best for" pill */}
      <span className="font-samsung-one inline-flex items-center whitespace-nowrap rounded-full bg-[#EEF3F8] px-[14px] py-[6px] text-[13px] font-semibold leading-[16px] text-[#1F4E79]">
        {product.badge}
      </span>

      {/* Description */}
      <p className="font-samsung-one max-w-[300px] text-center text-[14px] leading-[20px] text-zinc-800 sm:text-[15px]">
        {product.description}
      </p>

      {/* Price: the loudest text on the card; savings always on its own row so cards align */}
      <div className="flex flex-col items-center gap-[4px]">
        <div className="font-samsung-one flex items-baseline justify-center gap-x-[8px]">
          <span className="text-[24px] font-bold leading-[28px] text-zinc-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-[14px] text-zinc-500">
            was <s>{formatPrice(product.wasPrice)}</s>
          </span>
        </div>
        <span className="font-samsung-one min-h-[20px] text-[14px] font-semibold leading-[20px] text-[#1F8A3A]">
          {savings > 0 ? `Save ${formatPrice(savings)}` : ""}
        </span>
      </div>

      {/* Actions, pinned to the bottom so Buy lines up across columns */}
      <div className="font-samsung-one mt-auto flex items-center gap-[20px]">
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
