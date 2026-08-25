"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

import { Icons } from "../components/Icons";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, Product, ColorVariant } from "./productsData";

interface CartItem {
  product: Product;
  selectedColor: ColorVariant;
  quantity: number;
}

// Products shown on the home page (from public/products assets)
const PRODUCTS_NEW_ARRIVALS: Product[] = PRODUCTS;

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Newsletter Email State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  // Helper: Trigger toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart
  const addToCart = (product: Product, colorName: string) => {
    const color = product.colors.find(c => c.name === colorName) ?? product.colors[0];
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedColor.hex === color.hex);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedColor.hex === color.hex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedColor: color, quantity: 1 }];
    });
    triggerToast(t("toast.addedToCart", { product: product.name, color: color.name }));
  };

  // Toggle Wishlist
  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast(t("toast.removedWishlist"));
        return prev.filter(w => w !== id);
      } else {
        triggerToast(t("toast.addedWishlist"));
        return [...prev, id];
      }
    });
  };


  // Action: Newsletter sign up
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus(t("newsletter.subscribing"));
    setTimeout(() => {
      setNewsletterStatus(t("newsletter.thankYou"));
      setNewsletterEmail("");
      triggerToast(t("toast.subscriptionSuccess"));
    }, 1000);
  };


  return (
    <div className="w-full min-h-screen bg-white relative flex flex-col font-sans select-none antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 bg-burgundy text-white px-5 py-3 rounded-xl shadow-2xl z-[999] flex items-center gap-3 animate-bounce border border-gold/20">
          <div className="w-2 h-2 rounded-full bg-gold animate-ping"></div>
          <span className="font-sans text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Button (Loyalty & Support) */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button 
          onClick={() => triggerToast(t("toast.loyalty"))}
          className="cursor-pointer w-12 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group animate-pulse"
          title={t("tooltip.loyalty")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="463"
            height="603"
            fill="none"
            viewBox="0 0 463 603"
            className="w-full h-full"
          >
            <path
              fill="#7E2A4C"
              d="M231.157 592.17c-2.75 0-5.49-1.05-7.58-3.14l-160-160c-34.08-34.08-52.85-79.39-52.85-127.58s18.77-93.5 52.85-127.58l160-160a10.7 10.7 0 0 1 7.58-3.14 10.7 10.7 0 0 1 7.58 3.14l160 160c70.35 70.35 70.35 184.82 0 255.17l-160 160a10.7 10.7 0 0 1-7.58 3.14z"
            ></path>
            <path
              fill="#28161D"
              d="m231.16 21.45 160 160c66.27 66.27 66.27 173.73 0 240l-160 160-160-160c-66.27-66.27-66.27-173.73 0-240zm0-21.45c-5.49 0-10.98 2.09-15.17 6.28l-160 160C37.75 184.52 23.62 205.8 14 229.53c-9.29 22.91-14 47.1-14 71.92s4.71 49.01 14 71.92c9.62 23.73 23.75 45 41.99 63.25l160 160c4.19 4.19 9.68 6.28 15.17 6.28s10.98-2.09 15.17-6.28l160-160c18.24-18.24 32.37-39.52 41.99-63.25 9.29-22.91 14-47.1 14-71.92s-4.71-49.01-14-71.92c-9.62-23.73-23.75-45-41.99-63.25l-160-160A21.38 21.38 0 0 0 231.16 0"
            ></path>
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="17.55"
              d="M231.156 290.718c23.687 0 42.89-19.203 42.89-42.89s-19.203-42.89-42.89-42.89-42.89 19.202-42.89 42.89 19.202 42.89 42.89 42.89M281.185 397.956c16.75 0 28.53-17.29 21.59-32.53-12.37-27.2-39.79-46.11-71.62-46.11s-59.24 18.91-71.62 46.11c-6.94 15.24 4.84 32.53 21.59 32.53h100.06"
            ></path>
          </svg>
        </button>
        <button 
          onClick={() => triggerToast(t("toast.support"))}
          className="cursor-pointer w-12 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          title={t("tooltip.support")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="463"
            height="603"
            fill="none"
            viewBox="0 0 463 603"
            className="w-full h-full"
          >
            <path
              fill="#7E2A4C"
              d="M231.157 592.17c-2.75 0-5.49-1.049-7.58-3.139l-160-160.001c-34.08-34.08-52.85-79.39-52.85-127.58s18.77-93.5 52.85-127.58l160-160a10.7 10.7 0 0 1 7.58-3.14 10.7 10.7 0 0 1 7.58 3.14l160 160c70.35 70.35 70.35 184.82 0 255.17l-160 160.001a10.7 10.7 0 0 1-7.58 3.139z"
            ></path>
            <path
              fill="#28161D"
              d="m231.16 21.45 160 160c66.27 66.27 66.27 173.73 0 240l-160 160-160-160c-66.27-66.27-66.27-173.73 0-240zm0-21.45c-5.49 0-10.98 2.09-15.17 6.28l-160 160C37.75 184.52 23.62 205.8 14 229.53c-9.29 22.91-14 47.1-14 71.92s4.71 49.01 14 71.92c9.62 23.73 23.75 45 41.99 63.25l160 160c4.19 4.19 9.68 6.28 15.17 6.28s10.98-2.09 15.17-6.28l160-160c18.24-18.24 32.37-39.52 41.99-63.25 9.29-22.91 14-47.1 14-71.92s-4.71-49.01-14-71.92c-9.62-23.73-23.75-45-41.99-63.25l-160-160A21.38 21.38 0 0 0 231.16 0"
            ></path>
            <path
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="17.23"
              d="M327.656 269.278v32.17c0 53.27-43.25 96.51-96.51 96.51h-32.17c-35.51 0-64.34-28.831-64.34-64.341v-64.339c0-35.51 28.83-64.34 64.34-64.34h64.34c35.51 0 64.34 28.83 64.34 64.34Z"
            ></path>
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="17.23"
              d="M185.734 282.148h46.7M185.734 320.75h90.82"
            ></path>
          </svg>
        </button>
      </div>

      {/* ================= HEADER / NAVBAR ================= */}
      <Navbar 
        cart={cart} 
        setCart={setCart} 
        triggerToast={triggerToast} 
        products={PRODUCTS_NEW_ARRIVALS} 
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[65vh] md:h-[85vh] bg-burgundy overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/cover.jpeg" 
            alt={t("alt.heroBackground")} 
            className="w-full h-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-burgundy/20 to-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl flex flex-col items-center gap-6 md:gap-8 mt-12 md:mt-24">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            {t("hero.tagline")}
          </p>
          <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-wide text-white drop-shadow-md select-none max-w-2xl">
            {t("hero.title")}
          </h1>
          
          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 sm:gap-6 mt-2 md:mt-4 w-full justify-center">
            <button 
              onClick={() => {
                document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
                triggerToast(t("toast.scrollNewArrivals"));
              }}
              className=" cursor-pointer px-8 sm:px-10 py-3.5 bg-burgundy/90 hover:bg-wine text-white font-bold text-sm tracking-widest rounded-full transition-all duration-300 shadow-2xl active:scale-[0.98] border border-white/10 hover:border-gold/30 hover:scale-105"
            >
              {t("hero.buyNow")}
            </button>
            <button 
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                triggerToast(t("toast.scrollBrandStory"));
              }}
              className="btn-frosted-glass backdrop-blur-md px-8 sm:px-10 py-3.5 text-white font-bold text-sm tracking-widest rounded-full"
            >
              {t("hero.discover")}
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE ================= */}
      <section id="new-arrivals" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center gap-3">
          <h2 className="font-serif-brand text-3xl sm:text-5xl text-burgundy tracking-wide font-normal">
            {t("section.newArrivals")}
          </h2>
          <div className="w-12 h-[1px] bg-gold"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14 max-w-4xl mx-auto place-items-center">
          {PRODUCTS_NEW_ARRIVALS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      </section>

      {/* ================= ABOUT / BRAND VISION ================= */}
      <section id="about" className="py-16 md:py-24 bg-cream/35 border-t border-b border-cream">
        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold">{t("about.philosophy")}</span>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-burgundy leading-tight">
            {t("about.title")}
          </h2>
          <p className="text-sm sm:text-base text-burgundy/80 leading-relaxed font-light max-w-2xl">
            {t("about.description")}
          </p>
        </div>
      </section>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="relative py-24 md:py-32 w-full flex items-center justify-center bg-burgundy overflow-hidden min-h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/Generate_image_without_elements_2K_202607081158.jpeg" 
            alt={t("alt.newsletterBg")} 
            className="w-full h-full object-cover object-center brightness-[0.45] saturate-[0.8]"
          />
        </div>

{/* Newsletter Arch Container */}
<div className="relative z-10 max-w-xl w-full mx-auto flex flex-col items-center justify-center min-h-[460px] sm:min-h-[560px]">
  
  {/* الـ SVG الذكي - يحتوي على الضباب والإطار معاً لضمان التطابق الكامل */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1500 1500"
    className="absolute inset-0 w-full h-full drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] pointer-events-none"
    preserveAspectRatio="none"
  >
    <defs>
      {/* تعريف مسار القص الخاص بالانحناءات داخل نظام الـ SVG */}
      <clipPath id="arch-glass-clip">
        <path d="M1450 750.03 1422.94 777c-31.14 31.06-39.56 82.94-50.21 148.67-5.33 32.8-10.84 66.73-19.92 101.34-16.65 63.59-52.55 105.29-98.48 114.46a96.6 96.6 0 0 1-18.91 1.86c-32.52 0-65.03-16.16-90.27-44.3-16.45 27.65-41.13 44.72-67.81 44.72H422.66c-26.68 0-51.31-17.07-67.76-44.72-25.24 28.13-57.75 44.3-90.27 44.3-6.32 0-12.64-.61-18.91-1.86-45.98-9.17-81.88-50.87-98.53-114.46-9.03-34.61-14.55-68.54-19.87-101.34C116.62 859.94 108.2 808.06 77.1 777L50 750.03l27.1-27.04c31.1-31.06 39.52-82.94 50.22-148.6 5.32-32.87 10.84-66.8 19.87-101.41 16.65-63.59 52.55-105.29 98.53-114.46a96 96 0 0 1 18.87-1.86c32.53 0 65.05 16.21 90.31 44.3 16.45-27.58 41.08-44.71 67.76-44.71h654.68c26.68 0 51.36 17.13 67.81 44.71 25.25-28.09 57.78-44.3 90.31-44.3 6.31 0 12.61.61 18.87 1.86 45.93 9.17 81.83 50.87 98.48 114.46 9.08 34.61 14.59 68.54 19.92 101.41 10.65 65.66 19.07 117.54 50.21 148.6z" />
      </clipPath>
    </defs>

    {/* إدخال عنصر الضباب والشفافية وتطبيق القص عليه داخلياً ليتناسب مع التمدد تلقائياً */}
    <foreignObject
      x="0"
      y="0"
      width="1500"
      height="1500"
      clipPath="url(#arch-glass-clip)"
    >
      <div 
        className="w-full h-full backdrop-blur-[24px] bg-white/[0.07]"
      />
    </foreignObject>

    {/* رسم الإطار اللامع الخارجي فوق الضباب مباشرة بدقة متناهية */}
    <path
      fill="none"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeOpacity="0.45"
      d="M1450 750.03 1422.94 777c-31.14 31.06-39.56 82.94-50.21 148.67-5.33 32.8-10.84 66.73-19.92 101.34-16.65 63.59-52.55 105.29-98.48 114.46a96.6 96.6 0 0 1-18.91 1.86c-32.52 0-65.03-16.16-90.27-44.3-16.45 27.65-41.13 44.72-67.81 44.72H422.66c-26.68 0-51.31-17.07-67.76-44.72-25.24 28.13-57.75 44.3-90.27 44.3-6.32 0-12.64-.61-18.91-1.86-45.98-9.17-81.88-50.87-98.53-114.46-9.03-34.61-14.55-68.54-19.87-101.34C116.62 859.94 108.2 808.06 77.1 777L50 750.03l27.1-27.04c31.1-31.06 39.52-82.94 50.22-148.6 5.32-32.87 10.84-66.8 19.87-101.41 16.65-63.59 52.55-105.29 98.53-114.46a96 96 0 0 1 18.87-1.86c32.53 0 65.05 16.21 90.31 44.3 16.45-27.58 41.08-44.71 67.76-44.71h654.68c26.68 0 51.36 17.13 67.81 44.71 25.25-28.09 57.78-44.3 90.31-44.3 6.31 0 12.61.61 18.87 1.86 45.93 9.17 81.83 50.87 98.48 114.46 9.08 34.61 14.59 68.54 19.92 101.41 10.65 65.66 19.07 117.54 50.21 148.6z"
    />
  </svg>

  {/* حاوية المحتوى الفعلي */}
  <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-[15%] py-10 sm:py-14 gap-5 sm:gap-6">
    
    {/* النصوص */}
    <div className="flex flex-col gap-2.5 w-full">
      <h2 className="font-serif-brand text-base sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
        {t("newsletter.title")}
      </h2>
      <p className="text-[10px] sm:text-xs md:text-sm text-white/80 tracking-wide leading-relaxed max-w-xs mx-auto">
        {t("newsletter.description")}
      </p>
    </div>


    {newsletterStatus && (
      <p className="text-[10px] sm:text-xs font-semibold text-white/90 animate-pulse tracking-wide">
        {newsletterStatus}
      </p>
    )}
  </div>
</div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-white pt-16 pb-8 text-burgundy border-t border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          
          {/* Logo & Contact details */}
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <img src="/assets/logo.png" alt={t("alt.footerLogo")} className="h-12 object-contain" />
              <div className="w-8 h-[1px] bg-gold"></div>
            </div>

            {/* Grid Contact info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-16 max-w-2xl w-full text-sm">
              <div className="flex items-center gap-3 justify-center md:justify-start md:pl-16 hover:text-gold transition-colors duration-300">
                <Icons.Phone />
                <span className="font-semibold tracking-wide">652 755 4546</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start md:pl-16 hover:text-gold transition-colors duration-300">
                <Icons.Email />
                <span className="font-semibold tracking-wide">info@yoursite.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start md:pl-16 hover:text-gold transition-colors duration-300">
                <Icons.Location />
                <span className="font-semibold tracking-wide">123 Road State, Country</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start md:pl-16 hover:text-gold transition-colors duration-300">
                <Icons.Website />
                <span className="font-semibold tracking-wide">www.yoursiteurl.com</span>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-burgundy/10 pt-8 flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm font-semibold text-burgundy/80">
              <a href="#" className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                <Icons.Facebook />
                <span>/facebookname</span>
              </a>
              <a href="#" className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                <Icons.Twitter />
                <span>/twittername</span>
              </a>
              <a href="#" className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                <Icons.Instagram />
                <span>/instagramname</span>
              </a>
            </div>
            
            <p className="text-xs text-burgundy/60 tracking-wider font-light">
              © {new Date().getFullYear()} Hollah. {t("footer.rights")}
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
