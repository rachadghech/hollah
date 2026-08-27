"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../LanguageContext";
import { User, Phone, MapPin, Map, Plus, Minus, Loader2, AlertCircle } from "lucide-react";
import { Product } from "../../productsData";
import { WILAYAS } from "@/lib/wilayas";
import * as fpixel from "@/lib/fpixel";
import { api } from "../../admin/api";

interface OrderFormProps {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
}

export default function OrderForm({ product, selectedColor = "White", selectedSize = "S" }: OrderFormProps) {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Extract numeric price (e.g. "5,900 DA" -> 5900)
  const basePriceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0;
  const totalPriceNum = basePriceNum * quantity;
  const formattedTotalPrice = `${totalPriceNum.toLocaleString()} DA`;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict input to digits only
    const digitsOnly = e.target.value.replace(/\D/g, "");
    // Max 10 digits
    if (digitsOnly.length <= 10) {
      setPhone(digitsOnly);
      if (errorMessage) setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation for empty fields
    if (!fullName.trim() || !phone.trim() || !wilaya.trim()) {
      setErrorMessage(t("order.errorRequired"));
      return;
    }

    // Strict validation: must start with 05, 06, or 07 and be exactly 10 digits
    const isPhoneValid = /^(05|06|07)\d{8}$/.test(phone.trim());
    if (!isPhoneValid) {
      setErrorMessage(t("order.phoneCondition"));
      return;
    }

    setLoading(true);

    const activeColorObj = product.colors.find((c) => c.name === selectedColor) || product.colors[0];
    const productImage = activeColorObj?.images[0] || product.cardImages?.[0] || "";
    const orderRefId = `HL-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderId: orderRefId,
      productName: product.name,
      productPrice: product.price,
      totalAmount: formattedTotalPrice,
      selectedColor,
      selectedSize,
      quantity,
      productImage,
      fullName: fullName.trim(),
      phone: phone.trim(),
      wilaya: wilaya.trim(),
      commune: commune.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Try sending to backend API
      try {
        await api.post("/api/orders", {
          fullName: fullName.trim(),
          phone: phone.trim(),
          address: `${wilaya} - ${commune}`,
          items: [
            {
              product: null,
              color: { name: selectedColor, hex: activeColorObj?.hex || "#000", image: productImage },
              quantity,
              price: basePriceNum,
            },
          ],
          subtotal: totalPriceNum,
        });
      } catch (apiErr) {
        console.warn("Backend order sync notice:", apiErr);
      }

      // 2. Save order locally for Thank You page
      if (typeof window !== "undefined") {
        localStorage.setItem("lastOrder", JSON.stringify(orderPayload));
      }

      // 3. Track Facebook Pixel Purchase and Lead Events
      fpixel.event("Purchase", {
        content_name: product.name,
        content_type: "product",
        value: totalPriceNum,
        currency: "DZD",
        num_items: quantity,
      });

      fpixel.event("Lead", {
        content_name: product.name,
        value: totalPriceNum,
        currency: "DZD",
      });

      // 4. Redirect to Thank You Page
      router.push("/thank-you");
    } catch (err) {
      console.error("Order submission error:", err);
      // Even on unexpected error, proceed with local fallback
      localStorage.setItem("lastOrder", JSON.stringify(orderPayload));
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 md:mt-0 flex flex-col gap-6">
      <h2 className="text-2xl md:text-3xl font-serif-brand text-[var(--brand-wine)] text-center mb-1">
        {t("product.fillInformation")}
      </h2>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        {/* Name Field */}
        <div
          className="h-14 w-full flex items-center px-6 gap-3 bg-transparent border border-gray-200 rounded-2xl md:border-transparent md:rounded-none"
          style={{
            backgroundImage: "url('/svgs/Group-1.svg')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <User className="w-5 h-5 text-[var(--brand-wine)] shrink-0" />
          <input
            type="text"
            required
            dir={language === "ar" ? "rtl" : "ltr"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("product.name")}
            className="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-500 font-medium text-start"
          />
        </div>

        {/* Phone Field */}
        <div className="flex flex-col gap-1.5">
          <div
            className="h-14 w-full flex items-center px-6 gap-3 bg-transparent border border-gray-200 rounded-2xl md:border-transparent md:rounded-none"
            style={{
              backgroundImage: "url('/svgs/Group-1.svg')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Phone className="w-5 h-5 text-[var(--brand-wine)] shrink-0" />
            <input
              type="tel"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              dir={language === "ar" ? "rtl" : "ltr"}
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t("product.phone")}
              className="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-500 font-medium text-start [direction:inherit]"
            />
          </div>
          {/* Phone condition note */}
          <p className="text-[11px] md:text-xs text-gray-500 px-3 flex items-center gap-1.5 text-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"></span>
            <span>{t("order.phoneHint")}</span>
          </p>
        </div>

        {/* Wilaya Field (Dropdown with 58 Wilayas) */}
        <div
          className="h-14 w-full flex items-center px-6 gap-3 bg-transparent border border-gray-200 rounded-2xl md:border-transparent md:rounded-none"
          style={{
            backgroundImage: "url('/svgs/Group-1.svg')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <MapPin className="w-5 h-5 text-[var(--brand-wine)] shrink-0" />
          <select
            required
            dir={language === "ar" ? "rtl" : "ltr"}
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            className="bg-transparent flex-1 outline-none text-gray-800 font-medium cursor-pointer text-start"
          >
            <option value="" disabled className="text-gray-500">
              {t("product.wilaya")}
            </option>
            {WILAYAS.map((w) => (
              <option key={w.code} value={language === "ar" ? w.nameAr : w.nameFr} className="text-gray-800 bg-white">
                {language === "ar" ? w.nameAr : w.nameFr}
              </option>
            ))}
          </select>
        </div>

        {/* Commune Field */}
        <div
          className="h-14 w-full flex items-center px-6 gap-3 bg-transparent border border-gray-200 rounded-2xl md:border-transparent md:rounded-none"
          style={{
            backgroundImage: "url('/svgs/Group-1.svg')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Map className="w-5 h-5 text-[var(--brand-wine)] shrink-0" />
          <input
            type="text"
            required
            dir={language === "ar" ? "rtl" : "ltr"}
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            placeholder={t("product.commune")}
            className="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-500 font-medium text-start"
          />
        </div>

        {/* Quantity & Summary Box */}
        <div className="flex items-center justify-between bg-[#F9F6F0] p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">{t("product.quantity")}:</span>
            <div className="flex items-center bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-[var(--brand-wine)]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total Price Display */}
          <div className="text-end">
            <span className="text-xs text-gray-500 block">{t("product.total")}</span>
            <span className="text-lg font-bold text-[var(--brand-wine)]">{formattedTotalPrice}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="h-14 mt-2 text-xl md:text-2xl font-serif-brand transition-all text-white hover:opacity-90 active:scale-95 flex items-center justify-center cursor-pointer disabled:opacity-70 shadow-lg shadow-[var(--brand-wine)]/20"
          style={{
            backgroundImage: "url('/svgs/Group.svg')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span className="text-base font-sans">{t("order.submitting")}</span>
            </div>
          ) : (
            t("product.buy")
          )}
        </button>
      </form>
    </div>
  );
}
