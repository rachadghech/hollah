"use client";

import { use, useRef, useState } from "react";
import { useLanguage } from "../../LanguageContext";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import OrderForm from "./OrderForm";
import RelatedProducts from "./RelatedProducts";
import FloatingActions from "./FloatingActions";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import { getProduct, Product, ColorVariant } from "../../productsData";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";
  const { id } = use(params);

  const product = getProduct(Number(id));

  const [cart, setCart] = useState<Array<{ product: Product; selectedColor: ColorVariant; quantity: number }>>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? "White");
  const [selectedSize, setSelectedSize] = useState("S");

  // Ref for the order form — used by the "Buy Now" bottom bar to scroll to it
  const orderFormRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    orderFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className={`min-h-screen bg-[var(--brand-cream)] font-sans flex flex-col ${dir === 'rtl' ? 'font-arabic' : ''}`} dir={dir}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-6 bg-burgundy text-white px-5 py-3 rounded-xl shadow-2xl z-[999] flex items-center gap-3 animate-bounce border border-gold/20">
          <div className="w-2 h-2 rounded-full bg-gold animate-ping"></div>
          <span className="font-sans text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER / NAVBAR ================= */}
      <Navbar cart={cart} setCart={setCart} triggerToast={triggerToast} />

      {/* Main Content — extra bottom padding to clear the fixed Buy Now bar */}
      <main className="flex-1 px-4 md:px-8 max-w-5xl mx-auto w-full pb-24 relative">
        {!product ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <h1 className="text-2xl font-serif-brand text-[var(--brand-wine)]">{t('product.notFound')}</h1>
            <Link href="/" className="text-[var(--brand-wine)] underline underline-offset-2 font-medium">
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <>
            {/*
              Layout:
              - Mobile  → Gallery first (order-1), then Info + Form below (order-2)
              - Desktop → Form+Info first / left column (md:order-1), Gallery right (md:order-2)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

              {/* Desktop LEFT / Mobile SECOND: Info + Form */}
              <div className="flex flex-col gap-8 pt-4 order-2 md:order-1">
                <div>
                  <ProductInfo 
                    product={product} 
                    selectedColor={selectedColor} 
                    onColorChange={setSelectedColor} 
                    selectedSize={selectedSize} 
                    onSizeChange={setSelectedSize} 
                  />
                </div>
                <div ref={orderFormRef} className="pt-2 border-t border-gray-200">
                  <OrderForm product={product} selectedColor={selectedColor} selectedSize={selectedSize} />
                </div>
              </div>

              {/* Desktop RIGHT / Mobile FIRST: Gallery */}
              <div className="order-1 md:order-2">
                <ProductGallery key={`${product.id}-${selectedColor}`} product={product} selectedColor={selectedColor} />
              </div>

            </div>

            {/* Related Products */}
            <div className="mt-16">
              <RelatedProducts currentId={product.id} />
            </div>

            {/* Floating Actions (side buttons) */}
            <FloatingActions triggerToast={triggerToast} />
          </>
        )}
      </main>

      {/* ═══════════ FIXED BUY NOW BOTTOM BAR ═══════════ */}
      {product && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[var(--brand-burgundy)]/20 shadow-[0_-4px_24px_rgba(126,42,76,0.15)] px-4 py-2.5 md:py-3.5">
          <div className="max-w-xl mx-auto w-full flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
            {/* Price summary */}
            <div className="flex flex-col sm:flex-row items-center sm:gap-2.5 leading-tight shrink-0 text-start">
              <span className="text-base sm:text-lg md:text-xl font-bold text-[var(--brand-wine)]">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm md:text-base text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Buy Now button — scrolls to the order form */}
            <button
              onClick={scrollToForm}
              className="btn-rich-gold flex-1 flex items-center justify-center font-serif-brand text-base sm:text-lg md:text-xl py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl md:rounded-2xl cursor-pointer font-bold tracking-wide shadow-md"
            >
              {t('product.buy')}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
           <img src="/assets/logo.png" alt="Hollah" className="h-16 mb-6 object-contain" />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[var(--foreground)] mb-8">
              <div className="flex items-center justify-center md:justify-end gap-2">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                 <span>652 755 4546</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                 <span>info@yoursite.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                 <span>123 Road State, Country</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                 <span>www.yoursiteurl.com</span>
              </div>
           </div>

           {/* Social Links */}
           <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium border-t border-[var(--brand-burgundy)] pt-6 w-full max-w-2xl">
              <Link href="#" className="flex items-center gap-2 hover:text-[var(--brand-wine)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                /facebookname
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-[var(--brand-wine)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                /twittername
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-[var(--brand-wine)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                /instagramname
              </Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
