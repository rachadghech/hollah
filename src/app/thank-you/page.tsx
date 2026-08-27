"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Package, MapPin, Phone, ShieldCheck, ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";
import * as fpixel from "@/lib/fpixel";

interface OrderData {
  orderId?: string;
  productName: string;
  productPrice: string;
  totalAmount: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  productImage?: string;
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
  createdAt: string;
}

export default function ThankYouPage() {
  const { t, language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lastOrder");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
      }
    } catch {}

    // Track pageview
    fpixel.pageview();
  }, []);

  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className={`min-h-screen bg-[var(--brand-cream)] font-sans flex flex-col ${dir === 'rtl' ? 'font-arabic' : ''}`} dir={dir}>
      {/* Header */}
      <Navbar cart={[]} setCart={() => {}} triggerToast={() => {}} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
        
        {/* Success Header Box */}
        <div className="w-full bg-white rounded-3xl shadow-xl border border-[var(--brand-burgundy)]/10 p-6 md:p-10 text-center relative overflow-hidden mb-8">
          {/* Top Decorative Banner Pattern */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[var(--brand-burgundy)] via-[#D4AF37] to-[var(--brand-burgundy)]"></div>
          
          {/* Animated Check Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-emerald-50 border-2 border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-emerald-600 animate-bounce" />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--brand-burgundy)]/10 text-[var(--brand-wine)] text-xs md:text-sm font-bold tracking-wide uppercase mb-3">
            {t("thankyou.badge")}
          </span>

          <h1 className="text-2xl md:text-4xl font-serif-brand text-[var(--brand-wine)] mb-3 leading-tight">
            {t("thankyou.title")}
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-6">
            {t("thankyou.subtitle")}
          </p>

          {/* Reference Pill */}
          {order?.orderId && (
            <div className="inline-flex items-center gap-2 bg-[#F9F6F0] px-5 py-2.5 rounded-2xl border border-gray-200 text-xs md:text-sm">
              <span className="text-gray-500 font-medium">{t("thankyou.orderNumber")}:</span>
              <span className="font-mono font-bold text-[var(--brand-wine)]">{order.orderId}</span>
            </div>
          )}
        </div>

        {/* Order Details & Summary Card */}
        {order && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Product Summary */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[var(--brand-wine)] font-serif-brand text-xl mb-4 border-b border-gray-100 pb-3">
                  <Package className="w-5 h-5 text-[#D4AF37]" />
                  <h2>{t("thankyou.orderSummary")}</h2>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  {order.productImage && (
                    <img 
                      src={order.productImage} 
                      alt={order.productName} 
                      className="w-20 h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif-brand text-lg text-[var(--brand-wine)] leading-tight mb-2">
                      {order.productName}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                      {order.selectedColor && (
                        <span className="bg-gray-100 px-2.5 py-1 rounded-lg">
                          {t("product.color")}: <strong>{t("color." + order.selectedColor) || order.selectedColor}</strong>
                        </span>
                      )}
                      {order.selectedSize && (
                        <span className="bg-gray-100 px-2.5 py-1 rounded-lg">
                          {t("product.size")}: <strong>{order.selectedSize}</strong>
                        </span>
                      )}
                      <span className="bg-gray-100 px-2.5 py-1 rounded-lg">
                        {t("product.quantity")}: <strong>{order.quantity}</strong>
                      </span>
                    </div>
                    <div className="text-base font-bold text-[var(--brand-wine)]">
                      {order.productPrice}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-600 font-medium text-sm">{t("product.total")}:</span>
                <span className="text-xl md:text-2xl font-bold text-[var(--brand-wine)]">
                  {order.totalAmount || order.productPrice}
                </span>
              </div>
            </div>

            {/* Customer & Delivery Information */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[var(--brand-wine)] font-serif-brand text-xl mb-4 border-b border-gray-100 pb-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <h2>{t("thankyou.customerInfo")}</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      {t("thankyou.fullName")}
                    </span>
                    <span className="font-semibold text-gray-800">{order.fullName}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {t("thankyou.phone")}
                    </span>
                    <span className="font-mono font-semibold text-gray-800" dir="ltr">{order.phone}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-700">
                    <span className="text-gray-400">{t("thankyou.location")}</span>
                    <span className="font-semibold text-gray-800">{order.wilaya} {order.commune ? `- ${order.commune}` : ''}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-700 pt-2 border-t border-gray-50">
                    <span className="text-gray-400">{t("thankyou.paymentMethod")}</span>
                    <span className="font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs">
                      {t("thankyou.cod")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality Guarantee badge */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>{t("thankyou.guarantee")}</span>
              </div>
            </div>

          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--brand-wine)] text-white font-serif-brand text-lg flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[var(--brand-wine)]/20"
          >
            <span>{t("thankyou.backToHome")}</span>
            <ArrowIcon className="w-5 h-5" />
          </Link>

          <a
            href="https://wa.me/213652755454"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 text-white font-medium text-base flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t("thankyou.whatsapp")}</span>
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto text-center text-xs text-gray-500">
        <p>{t("footer.copyright")}</p>
      </footer>
    </div>
  );
}
