"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard without validation as requested
    router.push("/");
  };

  return (
    <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(57,38,76,0.06)] p-8 relative z-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface mb-2">¡Hola de nuevo!</h2>
        <p className="text-on-surface-variant text-sm">
          Inicia sesión para controlar tu flujo de dinero.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2">
            Email
          </label>
          <div className="relative flex items-center">
            <span
              className="material-symbols-outlined absolute left-4 text-outline"
            >
              mail
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-full text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all duration-200 outline-none"
              placeholder="ejemplo@correo.com"
              type="email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Contraseña
            </label>
            <Link
              href="#"
              className="text-xs font-bold text-primary hover:text-primary-dim transition-colors"
            >
              ¿Olvidaste?
            </Link>
          </div>
          <div className="relative flex items-center">
            <span
              className="material-symbols-outlined absolute left-4 text-outline"
            >
              lock
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-full text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all duration-200 outline-none"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>

        {/* Primary Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-full shadow-[0_10px_20px_rgba(106,55,212,0.2)] active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          <span>Iniciar Sesión</span>
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-10 flex items-center">
        <div className="flex-grow h-px bg-surface-variant/30"></div>
        <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-outline">
          O inicia sesión con
        </span>
        <div className="flex-grow h-px bg-surface-variant/30"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-4">
        <button className="w-full py-4 bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold rounded-full transition-colors duration-300 flex items-center justify-center gap-3">
          <img
            alt="Google"
            className="w-5 h-5"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwP_YlijbE8T3M6W7V-caLwZ_3UBGjdi8Xsab6KPo_E0s2o1W54XRwhUpBTfXUi5GbZbIm994Kzsitts9a9Go0D0sQMC5V0OjG1E2GoMVPlPaMgj_F9BYFnrmvy8IwKmmgf-jt_i0TsLHeulpAZ0-2jY_lT7vblh5FHJyAm9QKnrSxy84y563QoVk6WloyjLHDC7VeQ9mr9B9tG3NL8vJOb_OffSaFHUFv3RmWZIfyJIqsI_NMcQn-mZrM3VnL1dvJyyrHXKbKH_s"
          />
          <span>Continuar con Google</span>
        </button>
      </div>
    </div>
  );
}
