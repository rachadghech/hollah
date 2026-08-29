"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Product } from "../../productsData";

interface ProductGalleryProps {
  product: Product;
  selectedColor?: string; // "White" | "Black"
}

export default function ProductGallery({ product, selectedColor = "White" }: ProductGalleryProps) {
  const color = product.colors.find((c) => c.name === selectedColor) ?? product.colors[0];
  const images = color.images;

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square md:aspect-[3/4] bg-[#F5F5F5] overflow-hidden group rounded-xl">
        <img
          src={encodeURI(mainImage)}
          alt={`${product.name} - ${color.name}`}
          className="w-full h-full object-cover object-top transition-opacity duration-300"
        />
        {/* Zoom icon bottom right */}
        <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Search className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center transition-all hover:opacity-90 ${
              mainImage === img ? "ring-2 ring-[var(--brand-wine)]" : "opacity-80"
            }`}
          >
            <img
              src={encodeURI(img)}
              alt={`${product.name} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
