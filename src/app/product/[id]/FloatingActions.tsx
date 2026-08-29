"use client";

import React from "react";
import { useLanguage } from "../../LanguageContext";

interface FloatingActionsProps {
  triggerToast: (msg: string) => void;
}

export default function FloatingActions({ triggerToast }: FloatingActionsProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-18 right-6 flex flex-col gap-3 z-9999999">
      {/* Loyalty Button */}
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

      {/* Support/Chat Button */}
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
  );
}
