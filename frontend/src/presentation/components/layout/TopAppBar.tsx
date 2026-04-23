import React from "react";

export default function TopAppBar() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface/70 backdrop-blur-2xl rounded-b-[2rem] shadow-[0_10px_40px_0px_rgba(57,38,76,0.04)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest ring-2 ring-primary-container/30 flex items-center justify-center">
          {/* Usamos un icono por defecto */}
          <span className="material-symbols-outlined text-primary">person</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Bienvenido
          </span>
          <span className="font-headline font-bold text-on-surface text-sm">
            Buenos días, Carlos 👋
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent font-headline">
          GastoClaro
        </span>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-all active:scale-90 duration-200">
          <span className="material-symbols-outlined text-primary">
            notifications
          </span>
        </button>
      </div>
    </header>
  );
}
