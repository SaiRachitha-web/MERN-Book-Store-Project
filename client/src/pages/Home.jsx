import { useState } from "react";
import { Link } from "react-router-dom";
import { useListBooks, useBookStats } from "@/hooks/useBooks";
import { BookCard } from "@/components/book/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Library, Layers, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["All Books", "Fiction", "Fantasy", "Self Help", "Programming", "Science", "Biography"];

export default function Home() {
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

  const { data: stats } = useBookStats();

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-secondary overflow-hidden text-secondary-foreground py-24 md:py-32">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-6">
          <span className="text-primary font-medium tracking-wider uppercase text-sm animate-in slide-in-from-bottom-4 fade-in duration-700">
            Welcome to PageTurn
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold max-w-4xl leading-tight text-white animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
            A curated space for <span className="text-primary italic">passionate</span> readers.
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
            Discover our hand-picked collection of books spanning fiction, science, programming, and everything in between.
          </p>
          <div className="pt-4 flex gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
            <Button asChild size="lg" className="rounded-full text-base px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/catalog">Explore Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-none bg-background/95 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Books</p>
                <h3 className="text-3xl font-serif font-bold text-secondary">
                  {stats ? stats.totalBooks : <Skeleton className="h-8 w-16 mt-1" />}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none bg-background/95 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <h3 className="text-3xl font-serif font-bold text-secondary">
                  {stats ? stats.totalCategories : <Skeleton className="h-8 w-16 mt-1" />}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-none bg-background/95 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Price</p>
                <h3 className="text-3xl font-serif font-bold text-secondary">
                  {stats ? `$${stats.averagePrice.toFixed(2)}` : <Skeleton className="h-8 w-24 mt-1" />}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Catalog Preview Section */}
      <section className="container mx-auto px-4 md:px-6 py-20 flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-secondary mb-3">Featured Collection</h2>
            <p className="text-muted-foreground">Browse our entire catalog or filter to find your next read.</p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              className="pl-9 bg-white border-muted rounded-full"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className={`rounded-full ${category === cat ? "bg-secondary text-white" : "bg-white hover:bg-muted/50"}`}
              onClick={() => setCategory(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="w-full aspect-[2/3] rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {books.map((book, i) => (
              <BookCard key={book._id} book={book} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white/50 rounded-2xl border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold">No books found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any books matching your current search and category filters. Try adjusting them.
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
      </section>
    </div>
  );
}
