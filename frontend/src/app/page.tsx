import TopAppBar from "@/presentation/components/layout/TopAppBar";
import BottomNavBar from "@/presentation/components/layout/BottomNavBar";
import HeroBalance from "@/presentation/components/dashboard/HeroBalance";
import DashboardStats from "@/presentation/components/dashboard/DashboardStats";
import TransactionList from "@/presentation/components/transactions/TransactionList";

export default function HomePage() {
  return (
    <div className="pb-32">
      <TopAppBar />
      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-8">
        <HeroBalance />
        <DashboardStats />
        <TransactionList />
      </main>

      {/* FAB */}
      <button className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#6a37d4] to-[#ae8dff] text-white shadow-xl shadow-primary/30 flex items-center justify-center z-40 active:scale-90 transition-transform">
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      <BottomNavBar />
    </div>
  );
}
