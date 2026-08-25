"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../app/LanguageContext";
import { Icons } from "./Icons";

interface NavbarProps {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  triggerToast: (msg: string) => void;
  products?: any[];
}

export default function Navbar({ cart, setCart, triggerToast, products = [] }: NavbarProps) {
  const { t, language, setLanguage } = useLanguage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<{ role: string } | null>(null);
  const [profileTab, setProfileTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setLoggedInUser(JSON.parse(raw));
    } catch {}
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const priceStr = item.product?.price || "0";
      const priceVal = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
      return total + priceVal * item.quantity;
    }, 0);
  };

  const filterProducts = (prods: any[]) => {
    return prods.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <>
      {/* ================= DRAWERS & MODALS ================= */}

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-full max-w-xs bg-white text-burgundy h-full shadow-2xl p-8 flex flex-col justify-between transform transition-transform duration-300 ease-out z-10">
            <div>
              <div className="flex justify-between items-center mb-10">
                <img src="/assets/logo.png" alt="Hollah logo" className="h-10 object-contain" />
                <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:text-gold transition-colors">
                  <Icons.Close />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-xl font-medium tracking-wide">
                <Link href="/" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.home")}</Link>
                <Link href="/#new-arrivals" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.newArrivals")}</Link>
                <Link href="/#best-sellers" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.bestSellers")}</Link>
                <Link href="/#about" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.aboutUs")}</Link>
                <Link href="/#contact" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.contact")}</Link>
                {loggedInUser ? (
                  <>
                    <Link href="/admin" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>
                      {loggedInUser.role === "admin" ? t("nav.dashboard") : t("nav.myAccount")}
                    </Link>
                    <a href="#" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); setLoggedInUser(null); setIsMenuOpen(false); }}>
                      {t("nav.logout")}
                    </a>
                  </>
                ) : (
                  <Link href="/login" className="hover:text-gold transition-colors py-2 border-b border-cream" onClick={() => setIsMenuOpen(false)}>{t("nav.login")}</Link>
                )}
              </nav>
            </div>
            <div className="border-t border-cream pt-6 text-sm text-gray-500 flex flex-col gap-4">
              <div className="flex gap-4 text-burgundy font-semibold">
                <a href="#" className="hover:text-gold transition-colors">{t("nav.facebook")}</a>
                <a href="#" className="hover:text-gold transition-colors">{t("nav.instagram")}</a>
                <a href="#" className="hover:text-gold transition-colors">{t("nav.pinterest")}</a>
              </div>
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Drawer */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity" onClick={() => setIsSearchOpen(false)}></div>
          <div className="relative w-full bg-white text-burgundy shadow-2xl p-6 md:p-10 transform transition-transform duration-300 ease-out z-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-serif-brand text-2xl tracking-wide">{t("search.title")}</h3>
                <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:text-gold transition-colors">
                  <Icons.Close />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b border-burgundy py-4 text-xl outline-none focus:border-gold transition-colors bg-transparent placeholder-gray-400 text-burgundy"
                  autoFocus
                />
                <span className={`absolute ${language === "ar" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-burgundy/60`}>
                  <Icons.Search />
                </span>
              </div>
              {searchQuery && (
                <div className="mt-4 max-h-[300px] overflow-y-auto flex flex-col gap-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{t("search.filteredResults")}</p>
                  {filterProducts(products).length === 0 ? (
                    <p className="text-gray-500 italic">{t("search.noResults", { query: searchQuery })}</p>
                  ) : (
                    filterProducts(products).slice(0, 5).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 py-2 border-b border-cream hover:bg-cream/40 px-2 rounded-lg transition-colors cursor-pointer" onClick={() => {
                        triggerToast(t("toast.selectedItem", { product: item.name }));
                        setIsSearchOpen(false);
                      }}>
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded" />
                        <div>
                           <p className="font-semibold text-sm">{item.name}</p>
                           <p className="text-xs text-gold font-medium">{item.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white text-burgundy h-full shadow-2xl p-6 md:p-8 flex flex-col justify-between transform transition-transform duration-300 ease-out z-10">
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-cream pb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-brand text-2xl tracking-wide">{t("cart.title")}</h3>
                  <span className="bg-burgundy text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-gold transition-colors">
                  <Icons.Close />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-burgundy/40">
                      <Icons.Bag />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{t("cart.empty")}</p>
                      <p className="text-sm text-gray-500">{t("cart.emptyDescription")}</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 bg-burgundy hover:bg-wine text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                    >
                      {t("cart.continueShopping")}
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedColor.hex}`} className="flex gap-4 py-4 border-b border-cream items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={item.selectedColor.image} 
                          alt={item.product.name} 
                          className="w-16 h-20 object-cover rounded-lg border border-cream shadow-sm" 
                        />
                        <div className="flex flex-col gap-1 max-w-[180px]">
                          <p className="font-semibold text-sm leading-tight line-clamp-1">{item.product.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: item.selectedColor.hex }}></span>
                            <span className="text-xs text-gray-500 font-medium">{item.selectedColor.name}</span>
                          </div>
                          <p className="text-sm font-bold text-gold">{item.product.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-cream rounded-full bg-cream/40">
                          <button 
                            className="px-2.5 py-1 text-burgundy hover:text-gold font-bold transition-colors"
                            onClick={() => {
                              setCart((prev) => 
                                prev.map((c, i) => i === index ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c)
                              );
                            }}
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                          <button 
                            className="px-2.5 py-1 text-burgundy hover:text-gold font-bold transition-colors"
                            onClick={() => {
                              setCart((prev) => 
                                prev.map((c, i) => i === index ? { ...c, quantity: c.quantity + 1 } : c)
                              );
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button 
                          onClick={() => {
                            setCart((prev) => prev.filter((_, i) => i !== index));
                            triggerToast(t("toast.removedCart"));
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-cream pt-6 flex flex-col gap-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>{t("cart.subtotal")}</span>
                  <span className="text-gold font-serif-brand text-xl">{calculateSubtotal().toLocaleString()} DZD</span>
                </div>
                <p className="text-xs text-gray-500 italic">{t("cart.shippingNote")}</p>
                <button 
                  onClick={() => {
                    triggerToast(t("toast.redirectCheckout"));
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-burgundy hover:bg-wine text-white py-4 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg active:scale-[0.98]"
                >
                  {t("cart.checkout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity" onClick={() => setIsProfileOpen(false)}></div>
          <div className="relative bg-white text-burgundy rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full transform transition-all z-10 border border-gold/20">
            <button onClick={() => setIsProfileOpen(false)} className="absolute right-4 top-4 p-1 hover:text-gold transition-colors">
              <Icons.Close />
            </button>
            <div className="flex gap-6 border-b border-cream mb-6">
              <button 
                onClick={() => setProfileTab("login")}
                className={`pb-3 text-lg font-bold tracking-wide border-b-2 transition-colors ${profileTab === "login" ? "border-burgundy text-burgundy" : "border-transparent text-gray-400"}`}
              >
                {t("profile.signIn")}
              </button>
              <button 
                onClick={() => setProfileTab("signup")}
                className={`pb-3 text-lg font-bold tracking-wide border-b-2 transition-colors ${profileTab === "signup" ? "border-burgundy text-burgundy" : "border-transparent text-gray-400"}`}
              >
                {t("profile.joinUs")}
              </button>
            </div>

            {profileTab === "login" ? (
              <form onSubmit={(e) => { e.preventDefault(); triggerToast(t("toast.loginSuccess")); setIsProfileOpen(false); }} className="flex flex-col gap-4">
                <h4 className="font-serif-brand text-2xl font-semibold mb-2">{t("profile.welcomeBack")}</h4>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">{t("profile.email")}</label>
                  <input type="email" required placeholder={t("profile.emailPlaceholder")} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">{t("profile.password")}</label>
                  <input type="password" required placeholder={t("profile.passwordPlaceholder")} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <div className="text-right">
                  <a href="#" className="text-xs text-gold hover:text-gold-dark font-medium transition-colors">{t("profile.forgotPassword")}</a>
                </div>
                <button type="submit" className="w-full bg-burgundy hover:bg-wine text-white py-3 rounded-xl font-bold transition-all duration-300 mt-2">
                  {t("profile.signInBtn")}
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); triggerToast(t("toast.registerSuccess")); setIsProfileOpen(false); }} className="flex flex-col gap-4">
                <h4 className="font-serif-brand text-2xl font-semibold mb-2">{t("profile.becomeQueen")}</h4>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">{t("profile.fullName")}</label>
                  <input type="text" required placeholder={t("profile.namePlaceholder")} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">{t("profile.email")}</label>
                  <input type="email" required placeholder={t("profile.emailPlaceholder")} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">{t("profile.password")}</label>
                  <input type="password" required placeholder={t("profile.passwordPlaceholder")} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <p className="text-xs text-gray-400">{t("profile.agreement")}</p>
                <button type="submit" className="w-full bg-burgundy hover:bg-wine text-white py-3 rounded-xl font-bold transition-all duration-300 mt-2">
                  {t("profile.createAccount")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-cream/50 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left Side: Mobile Menu Hamburger & Search */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-burgundy hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t("aria.toggleMenu")}
            >
              <Icons.Menu />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-burgundy hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t("aria.search")}
            >
              <Icons.Search />
            </button>
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="/assets/logo.png" 
              alt={t("alt.logo") || "Logo"} 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Right Side: Language Switcher, Account & Cart Bag */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 border border-cream rounded-full px-1.5 py-1">
              {(["en", "ar", "fr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10px] font-bold px-1.5 mx-1 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                    language === lang
                      ? "bg-burgundy text-white scale-105"
                      : "text-burgundy/50 hover:text-burgundy"
                  }`}
                >
                  {lang === "en" ? "EN" : lang === "ar" ? "AR" : "FR"}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="p-2 text-burgundy hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={t("aria.profile")}
            >
              <Icons.User />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-burgundy hover:text-gold transition-all duration-300 hover:scale-105 active:scale-95 relative cursor-pointer"
              aria-label={t("aria.shoppingCart")}
            >
              <Icons.Bag />
              {cart.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-gold text-white text-[10px] w-4.5 h-4.5 rounded-full font-bold flex items-center justify-center border border-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
