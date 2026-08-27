"use client";

import React from "react";
import { useLanguage } from "../../LanguageContext";
import { User, Phone, MapPin, Map } from "lucide-react";

export default function OrderForm() {
  const { t } = useLanguage();

  return (
    <div className="mt-4 md:mt-0 flex flex-col gap-6">
      <h2 className="text-2xl md:text-3xl font-serif-brand text-[var(--brand-wine)] text-center mb-2">
        {t('product.fillInformation')}
      </h2>

      <form className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        {/* Name Field */}
        <div 
          className="h-14 w-full flex items-center px-8 gap-4 bg-transparent"
          style={{ backgroundImage: "url('/svgs/Group-1.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          <User className="w-5 h-5 text-[var(--brand-wine)]" />
          <input 
            type="text" 
            placeholder={t('product.name')}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 font-medium"
          />
        </div>

        {/* Phone Field */}
        <div 
          className="h-14 w-full flex items-center px-8 gap-4 bg-transparent"
          style={{ backgroundImage: "url('/svgs/Group-1.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          <Phone className="w-5 h-5 text-[var(--brand-wine)]" />
          <input 
            type="tel" 
            placeholder={t('product.phone')}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 font-medium"
          />
        </div>

        {/* Wilaya Field */}
        <div 
          className="h-14 w-full flex items-center px-8 gap-4 bg-transparent"
          style={{ backgroundImage: "url('/svgs/Group-1.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          <MapPin className="w-5 h-5 text-[var(--brand-wine)]" />
          <input 
            type="text" 
            placeholder={t('product.wilaya')}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 font-medium"
          />
        </div>

        {/* Commune Field */}
        <div 
          className="h-14 w-full flex items-center px-8 gap-4 bg-transparent"
          style={{ backgroundImage: "url('/svgs/Group-1.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          <Map className="w-5 h-5 text-[var(--brand-wine)]" />
          <input 
            type="text" 
            placeholder={t('product.commune')}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500 font-medium"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="button"
          className="h-14 mt-4 text-xl md:text-2xl font-serif-brand transition-colors text-white hover:opacity-90 flex items-center justify-center"
          style={{ backgroundImage: "url('/svgs/Group.svg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          {t('product.buy')}
        </button>
      </form>
    </div>
  );
}
