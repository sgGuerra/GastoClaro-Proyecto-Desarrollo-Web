import React from "react";

export default function DashboardStats() {
  return (
    <>
      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-5 rounded-lg flex flex-col gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined">arrow_upward</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold">
              Ingresos
            </p>
            <p className="text-on-surface font-display font-bold text-lg">
              $64,000
            </p>
          </div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-lg flex flex-col gap-3">
          <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error">
            <span className="material-symbols-outlined">arrow_downward</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold">
              Gastos
            </p>
            <p className="text-on-surface font-display font-bold text-lg">
              $18,750
            </p>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline font-bold text-lg">
            Gastos por categoría
          </h3>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
            more_horiz
          </span>
        </div>
        {/* Custom Bento Bar Chart */}
        <div className="h-3 w-full flex rounded-full overflow-hidden mb-6">
          <div className="h-full bg-primary" style={{ width: "35%" }}></div>
          <div className="h-full bg-secondary" style={{ width: "20%" }}></div>
          <div className="h-full bg-tertiary-fixed" style={{ width: "15%" }}></div>
          <div
            className="h-full bg-primary-container"
            style={{ width: "10%" }}
          ></div>
          <div
            className="h-full bg-outline-variant"
            style={{ width: "20%" }}
          ></div>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs font-medium">Alimentación (35%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs font-medium">Transporte (20%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-tertiary-fixed"></div>
            <span className="text-xs font-medium">Entretenimiento (15%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <span className="text-xs font-medium">Servicios (10%)</span>
          </div>
        </div>
      </section>
    </>
  );
}
