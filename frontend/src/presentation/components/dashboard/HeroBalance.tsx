import React from "react";

export default function HeroBalance() {
  return (
    <section className="relative overflow-hidden bg-inverse-surface rounded-xl p-8 shadow-2xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-secondary/10 rounded-full blur-[40px]"></div>
      
      <div className="relative z-10 space-y-6">
        <div>
          <h2 className="text-on-primary/60 font-medium text-sm mb-1">
            Saldo del mes
          </h2>
          <p className="text-on-primary font-display font-extrabold text-4xl tracking-tight">
            $45,230.00
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-on-primary/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-on-primary/10">
              <span className="material-symbols-outlined text-on-primary text-sm">
                trending_down
              </span>
            </div>
            <div>
              <p className="text-on-primary/40 text-[10px] uppercase font-bold tracking-wider">
                Gasto total
              </p>
              <p className="text-on-primary font-bold text-md">$18,750.00</p>
            </div>
          </div>
          <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 active:scale-95 transition-transform">
            Analizar{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
