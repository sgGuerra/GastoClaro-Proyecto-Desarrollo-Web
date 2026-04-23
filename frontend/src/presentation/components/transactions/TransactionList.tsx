import React from "react";

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  icon: string;
  type: "income" | "expense";
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    title: "Almuerzo",
    date: "Hoy, 12:30 PM",
    amount: -12500,
    icon: "🍔",
    type: "expense",
  },
  {
    id: "2",
    title: "TransMilenio",
    date: "Ayer, 6:15 PM",
    amount: -2850,
    icon: "🚌",
    type: "expense",
  },
  {
    id: "3",
    title: "Netflix",
    date: "24 Oct, 2023",
    amount: -17900,
    icon: "🎬",
    type: "expense",
  },
];

export default function TransactionList() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline font-bold text-lg">Últimos gastos</h3>
        <button className="text-primary font-bold text-sm">Ver todos</button>
      </div>

      <div className="space-y-1">
        {recentTransactions.map((tx) => (
          <div
            key={tx.id}
            className="group flex items-center justify-between p-4 bg-surface-container-low rounded-lg transition-all hover:bg-surface-container-high active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-xl shadow-sm">
                {tx.icon}
              </div>
              <div>
                <p className="font-bold text-on-surface">{tx.title}</p>
                <p className="text-xs text-on-surface-variant font-medium">
                  {tx.date}
                </p>
              </div>
            </div>
            <span
              className={`font-display font-bold ${
                tx.type === "expense" ? "text-error" : "text-emerald-600"
              }`}
            >
              {tx.type === "expense" ? "-" : "+"}$
              {Math.abs(tx.amount).toLocaleString("es-CO")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
