"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../LanguageContext";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { PRODUCTS } from "../../productsData";

interface RelatedProductsProps {
  currentId?: number;
}

export default function RelatedProducts({ currentId }: RelatedProductsProps) {
  const { t } = useLanguage();

  const products = PRODUCTS.filter((p) => p.id !== currentId).map((p) => {
    const firstColor = p.colors[0];
    return {
      id: p.id,
      title: p.name,
      price: p.price,
      oldPrice: p.originalPrice ?? null,
      rating: p.rating,
      reviews: p.reviews,
      image: p.cardImages?.[0] ?? firstColor.images[0],
      colors: p.colors.map((c) => c.hex),
    };
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-brand text-[var(--brand-wine)] text-center mb-10">
        {t('product.youMayAlsoLike')}
      </h2>

      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 w-full max-w-5xl">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="flex flex-col items-center w-full max-w-[320px]">
            {/* Modern Card Image Container */}
            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <img
                src={encodeURI(product.image)}
                alt={product.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Heart Icon */}
              <button
                onClick={(e) => e.preventDefault()}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[var(--brand-wine)] shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20"
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>

              {/* Floating Cart Icon */}
              <button
                onClick={(e) => e.preventDefault()}
                className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full bg-[var(--brand-wine)] hover:bg-[var(--brand-wine-hover)] text-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2 mb-3 mt-2">
              {product.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-sm rotate-45 border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Title & Price */}
            <h3 className="text-lg font-serif-brand text-[var(--brand-wine)] text-center font-medium line-clamp-1 mb-1 px-4">
              {product.title}
            </h3>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-[var(--brand-wine)]">{product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#D4AF37]">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[var(--brand-wine)]">{product.reviews} Review</span>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}
