import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function AppLayout({ children }) {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/20">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
