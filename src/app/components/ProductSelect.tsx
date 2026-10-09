"use client";

import { ListBox, Select } from "@heroui/react";
import { products, type Product } from "../data/specs";

interface ProductSelectProps {
  slot: number;
  selected: Product;
  onSelect: (productId: number) => void;
}

/**
 * Column header: the product name rendered as a dropdown so any slot can be
 * switched to a different product. Picking a product already shown elsewhere
 * swaps the two columns so the comparison never shows a duplicate.
 */
export default function ProductSelect({
  slot,
  selected,
  onSelect,
}: ProductSelectProps) {
  return (
    <Select
      aria-label={`Product in column ${slot + 1}`}
      selectedKey={String(selected.id)}
      onSelectionChange={(key) => {
        if (key != null) onSelect(Number(key));
      }}
      className="w-full font-sharp-sans"
    >
      <Select.Trigger className="group flex h-auto w-full cursor-pointer items-center justify-between gap-3 rounded-none border-0 border-b border-zinc-900 bg-transparent px-0 pb-[10px] pt-0 shadow-none outline-none transition-colors hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 data-[focus-visible]:ring-2 data-[focus-visible]:ring-zinc-900 data-[focus-visible]:ring-offset-4">
        <Select.Value className="truncate text-left text-[18px] font-bold leading-tight text-zinc-900 sm:text-[20px]" />
        <Select.Indicator className="h-5 w-5 shrink-0 text-zinc-900 transition-transform duration-200 data-[open=true]:rotate-180">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Select.Indicator>
      </Select.Trigger>

      <Select.Popover className="min-w-(--trigger-width) rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <ListBox
          aria-label="Products"
          className="flex flex-col gap-1 outline-none"
        >
          {products.map((product) => (
            <ListBox.Item
              key={product.id}
              id={String(product.id)}
              textValue={product.title}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 text-[16px] text-zinc-900 outline-none transition-colors data-[hovered]:bg-zinc-100 data-[focus-visible]:bg-zinc-100 data-[selected]:font-bold"
            >
              <span className="font-sharp-sans">{product.title}</span>
              <ListBox.ItemIndicator className="text-zinc-900">
                {product.id === selected.id ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4 10.5l4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </ListBox.ItemIndicator>
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
