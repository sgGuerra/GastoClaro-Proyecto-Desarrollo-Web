import React from "react";
import LoginForm from "@/presentation/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col text-on-background">
      {/* Hero Section */}
      <header className="relative w-full h-[353px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary-container rounded-b-xl px-8 z-10">
        {/* Abstract Decoration */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-surface-variant/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="z-10 text-center">
          <div className="mb-2 flex justify-center">
            <span
              className="material-symbols-outlined text-on-primary text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bubble_chart
            </span>
          </div>
          <h1 className="text-on-primary text-4xl font-extrabold tracking-tighter font-headline mb-2">
            GastoClaro
          </h1>
          <p className="text-on-primary/90 text-sm font-medium tracking-wide leading-relaxed">
            Tus finanzas, claras como el agua.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-12 bg-background rounded-t-xl"></div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center px-6 -mt-8 pb-12 relative z-20">
        <LoginForm />

        {/* Illustration Area (Bento Grid Style) */}
        <div className="mt-12 w-full max-w-md grid grid-cols-2 gap-4">
          <div className="col-span-1 bg-secondary-container/30 p-4 rounded-lg flex flex-col justify-center items-center text-center">
            <span
              className="material-symbols-outlined text-secondary mb-2 text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              insights
            </span>
            <p className="text-[10px] font-bold uppercase text-on-secondary-container">
              Análisis Claros
            </p>
          </div>
          <div className="col-span-1 bg-primary-container/20 p-4 rounded-lg flex flex-col justify-center items-center text-center">
            <span
              className="material-symbols-outlined text-primary mb-2 text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_with_heart
            </span>
            <p className="text-[10px] font-bold uppercase text-on-primary-container">
              100% Seguro
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center pb-8">
          <p className="text-on-surface-variant text-sm">
            ¿No tienes cuenta?{" "}
            <Link className="text-primary font-bold hover:underline" href="#">
              Regístrate
            </Link>
          </p>
        </footer>
      </main>

      {/* Aesthetic Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary z-50"></div>
    </div>
  );
}
