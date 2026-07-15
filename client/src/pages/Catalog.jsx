import { useState } from "react";
import { useListBooks } from "@/hooks/useBooks";
import { BookCard } from "@/components/book/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["All Books", "Fiction", "Fantasy", "Self Help", "Programming", "Science", "Biography"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All Books");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const timer = setTimeout(() => {
      setDebouncedSearch(e.target.value);
    }, 300);
    return () => clearTimeout(timer);
  };

  const { data: books, isLoading } = useListBooks({
    search: debouncedSearch || undefined,
    category: category === "All Books" ? undefined : category,
  });

  return (
    <div className="flex-1 flex flex-col w-full bg-background/50">
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Complete Catalog</h1>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg">
            Explore our entire collection of thoughtfully curated books.
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-secondary border-b pb-2">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Title or author..."
                  className="pl-9 bg-white"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-secondary border-b pb-2">Categories</h3>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-3 py-2 rounded-md transition-colors text-sm font-medium
                      ${category === cat
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-muted-foreground hover:bg-muted hover:text-secondary"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="w-full aspect-[2/3] rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : books && books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
                {books.map((book, i) => (
                  <BookCard key={book._id} book={book} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white rounded-2xl border border-dashed">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold">No books found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any books matching your current search and category filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setDebouncedSearch("");
                    setCategory("All Books");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
