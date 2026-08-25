"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";

import { Icons } from "../../components/Icons";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [cart, setCart] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-burgundy">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[100] bg-white text-burgundy border border-cream rounded-xl px-5 py-3 shadow-lg text-sm font-medium animate-pulse">
          {toastMessage}
        </div>
      )}

      <Navbar cart={cart} setCart={setCart} triggerToast={triggerToast} />

      {/* Main Login Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-cream mb-8 justify-center">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-3 text-lg font-bold tracking-wide border-b-2 transition-colors ${
                activeTab === "login" ? "border-burgundy text-burgundy" : "border-transparent text-gray-400 hover:text-burgundy/60"
              }`}
            >
              {t("profile.signIn")}
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`pb-3 text-lg font-bold tracking-wide border-b-2 transition-colors ${
                activeTab === "signup" ? "border-burgundy text-burgundy" : "border-transparent text-gray-400 hover:text-burgundy/60"
              }`}
            >
              {t("profile.joinUs")}
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gold/20 p-8 md:p-10">
            {activeTab === "login" ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoginError("");
                  setLoginLoading(true);
                  try {
                    const res = await fetch("https://dmtart.pro/7ola/api/auth/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      setLoginError(data.message || "Login failed");
                      return;
                    }
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    triggerToast(t("toast.loginSuccess"));
                    setTimeout(() => router.push(data.user.role === "admin" ? "/admin" : "/"), 1500);
                  } catch {
                    setLoginError("Something went wrong. Please try again.");
                  } finally {
                    setLoginLoading(false);
                  }
                }}
                className="flex flex-col gap-5"
              >
                <h2 className="font-serif-brand text-3xl font-semibold text-center mb-2">
                  {t("profile.welcomeBack")}
                </h2>
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {loginError}
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={t("profile.emailPlaceholder")}
                    className="w-full border border-cream rounded-xl p-3.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">
                    {t("profile.password")}
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t("profile.passwordPlaceholder")}
                    className="w-full border border-cream rounded-xl p-3.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy"
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-xs text-gold hover:text-gold-dark font-medium transition-colors">
                    {t("profile.forgotPassword")}
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-burgundy hover:bg-wine text-white py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 mt-2 active:scale-[0.98] disabled:opacity-50"
                >
                  {loginLoading ? "Signing in..." : t("profile.signInBtn")}
                </button>
              </form>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSignupError("");
                  setSignupLoading(true);
                  try {
                    const res = await fetch("https://dmtart.pro/7ola/api/auth/register", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      setSignupError(data.message || "Registration failed");
                      return;
                    }
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    triggerToast(t("toast.registerSuccess"));
                    setTimeout(() => router.push(data.user.role === "admin" ? "/admin" : "/"), 1500);
                  } catch {
                    setSignupError("Something went wrong. Please try again.");
                  } finally {
                    setSignupLoading(false);
                  }
                }}
                className="flex flex-col gap-5"
              >
                <h2 className="font-serif-brand text-3xl font-semibold text-center mb-2">
                  {t("profile.becomeQueen")}
                </h2>
                {signupError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {signupError}
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">
                    {t("profile.fullName")}
                  </label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder={t("profile.namePlaceholder")}
                    className="w-full border border-cream rounded-xl p-3.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder={t("profile.emailPlaceholder")}
                    className="w-full border border-cream rounded-xl p-3.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">
                    {t("profile.password")}
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder={t("profile.passwordPlaceholder")}
                    className="w-full border border-cream rounded-xl p-3.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy"
                  />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t("profile.agreement")}</p>
                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full bg-burgundy hover:bg-wine text-white py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 mt-2 active:scale-[0.98] disabled:opacity-50"
                >
                  {signupLoading ? "Creating account..." : t("profile.createAccount")}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="/" className="text-gold hover:text-gold-dark font-medium transition-colors">
              {t("nav.home")}
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-16 pb-8 text-burgundy border-t border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <img src="/assets/logo.png" alt={t("alt.footerLogo")} className="h-12 object-contain" />
              <div className="w-8 h-[1px] bg-gold"></div>
            </div>

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
              &copy; {new Date().getFullYear()} Hollah. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
