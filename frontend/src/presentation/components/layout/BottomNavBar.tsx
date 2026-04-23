import React from "react";
import Link from "next/link";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/80 backdrop-blur-3xl rounded-t-[3rem] shadow-[0_-20px_40px_rgba(57,38,76,0.06)]">
      {/* Home (Active) */}
      <Link
        href="/"
        className="flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full p-3 shadow-lg shadow-primary/20 scale-110 active:transition-all active:duration-300 active:ease-out active:transform active:scale-95"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          home
        </span>
        <span className="font-headline text-[10px] font-bold">Inicio</span>
      </Link>
      
      {/* Gastos */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-on-background opacity-40 p-3 hover:opacity-100 transition-opacity active:scale-95"
      >
        <span className="material-symbols-outlined">
          account_balance_wallet
        </span>
        <span className="font-headline text-[10px] font-semibold">Gastos</span>
      </Link>
      
      {/* Reportes */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-on-background opacity-40 p-3 hover:opacity-100 transition-opacity active:scale-95"
      >
        <span className="material-symbols-outlined">bar_chart</span>
        <span className="font-headline text-[10px] font-semibold">Reportes</span>
      </Link>
      
      {/* Perfil */}
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-on-background opacity-40 p-3 hover:opacity-100 transition-opacity active:scale-95"
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-headline text-[10px] font-semibold">Perfil</span>
      </Link>
    </nav>
  );
}
