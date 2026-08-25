"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import { Product } from "../app/productsData";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, colorName: string) => void;
  onToggleWishlist: (id: number) => void;
  wishlist: number[];
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileShowAlt, setMobileShowAlt] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setMobileShowAlt((prev) => !prev), 1500);
    return () => clearInterval(interval);
  }, []);

  const activeColor = product.colors[selectedColorIndex];
  const showAltImage = isHovered || (isMobile && mobileShowAlt);
  const isBlack = activeColor.name === "Black";
  const cardImage1 = encodeURI(
    activeColor.cardImages?.[0] ?? product.cardImages?.[0] ?? activeColor.images[0]
  );
  const cardImage2 = encodeURI(
    activeColor.cardImages?.[1] ?? product.cardImages?.[1] ?? activeColor.images[1] ?? activeColor.images[0]
  );

  return (
    <div
      className="group flex flex-col gap-3.5 relative w-full max-w-xs sm:max-w-sm transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern Card Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" />

        {/* Main Product Image */}
        <img
          src={cardImage1}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            transform: isBlack ? "scale(1.05) translateX(-4%)" : undefined,
          }}
        />

        {/* Hover / Alternate Product Image */}
        <img
          src={cardImage2}
          alt={`${product.name} alternate`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out ${
            showAltImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isBlack ? "scale(1.05) translateX(-4%)" : undefined,
          }}
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-burgundy shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Add to wishlist"
        >
          <Icons.Heart filled={wishlist.includes(product.id)} />
        </button>

        {/* Quick Add Bag Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product, activeColor.name);
          }}
          className="absolute bottom-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-burgundy hover:bg-wine-hover text-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Add to cart"
        >
          <Icons.BagSmall />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col items-center text-center gap-2 px-1">
        {/* Color Swatches */}
        <div className="flex gap-2.5 my-1">
          {product.colors.map((color, idx) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColorIndex(idx)}
              className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                selectedColorIndex === idx
                  ? "ring-2 ring-burgundy ring-offset-2 scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="z-10">
          <h3 className="text-sm font-semibold tracking-wide text-burgundy leading-snug line-clamp-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-gold font-serif-brand text-base tracking-wide">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through tracking-wider">{product.originalPrice}</span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icons.Star key={i} filled={i < product.rating} />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium tracking-wide">
            {product.reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
}
