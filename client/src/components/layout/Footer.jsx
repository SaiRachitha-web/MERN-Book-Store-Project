import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-serif text-xl font-bold tracking-tight text-white">PageTurn</span>
        </div>

        <div className="text-center md:text-right space-y-1">
          <p className="text-secondary-foreground/80 font-medium">
            Book Store Management System
          </p>
          <p className="text-sm text-secondary-foreground/60">
            Built with MERN Stack | © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
