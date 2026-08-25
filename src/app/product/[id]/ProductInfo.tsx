"use client";

import { useState } from "react";
import { useLanguage } from "../../LanguageContext";
import { Star } from "lucide-react";
import { Product } from "../../productsData";

const sizes = ["S", "M", "L", "XL"];

interface ProductInfoProps {
  product: Product;
  onColorChange?: (color: string) => void;
}

export default function ProductInfo({ product, onColorChange }: ProductInfoProps) {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "White");
  const [selectedSize, setSelectedSize] = useState("S");

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    onColorChange?.(colorName);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Price Section */}
      <div>
        <p className="text-sm font-semibold tracking-wider text-gray-500 mb-2 uppercase">{t('product.collection')}</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif-brand text-[var(--brand-wine)] leading-tight mb-4">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
          <span className="text-xl md:text-2xl font-bold text-[var(--brand-wine)]">{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg md:text-xl text-gray-400 line-through">{product.originalPrice}</span>
          )}
          {product.originalPrice && (
            <span
              className="text-white text-xs md:text-sm px-4 py-1.5 font-semibold whitespace-nowrap flex items-center justify-center"
              style={{ backgroundImage: "url('/svgs/Shapes-03.png')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            >
              {t('product.off')}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
          {product.descriptionKey ? t(product.descriptionKey) : t('product.desc.moa002')} <a href="#" className="text-[var(--brand-wine)] underline underline-offset-2 font-medium">{t('product.learnMore')}</a>
        </p>

        <div className="flex items-center gap-2">
          <div className="flex text-[#D4AF37]">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold text-[var(--brand-wine)]">{product.reviews} {t('product.review')}</span>
        </div>
      </div>

      {/* Selectors */}
      <div className="flex flex-col gap-6 mt-4 border-t border-gray-200 pt-6">

        {/* Color */}
        <div>
          <p className="text-[var(--brand-wine)] font-medium mb-3">{t('product.color')}: {t('color.' + selectedColor)}</p>
          <div className="flex gap-4">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.name)}
                className={`w-16 h-20 sm:w-20 sm:h-24 transition-all flex items-center justify-center border-2 ${
                  selectedColor === color.name ? "border-[var(--brand-wine)]" : "border-transparent"
                }`}
                style={{
                  backgroundImage: `url('${selectedColor === color.name ? "/svgs/Group%20534.png" : "/svgs/Group22222.svg"}')`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "6px"
                }}
                title={color.name}
              >
                <img
                  src={encodeURI(color.images[0])}
                  alt={color.name}
                  className="w-full h-full object-cover"
                  style={{
                    maskImage: "url('/svgs/leaf-mask.svg')",
                    WebkitMaskImage: "url('/svgs/leaf-mask.svg')",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat"
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="text-[var(--brand-wine)] font-medium mb-3">{t('product.size')}: {selectedSize}</p>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-14 flex items-center justify-center text-lg font-medium transition-all
                  ${selectedSize === size
                    ? 'text-[var(--brand-wine)]'
                    : 'text-gray-600 hover:text-[var(--brand-wine)]'
                  }`}
                style={{
                  backgroundImage: `url('${selectedSize === size ? "/svgs/Group%20534.png" : "/svgs/Group22222.svg"}')`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
