import { useParams, Link } from "react-router-dom";
import { useBook } from "@/hooks/useBooks";
import { StarRating } from "@/components/book/StarRating";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop";

export default function BookDetail() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useBook(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-32 mb-8" />
        <div className="flex flex-col md:flex-row gap-12">
          <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-xl" />
          <div className="w-full md:w-2/3 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <div className="pt-8 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Book not found</h2>
        <p className="text-muted-foreground mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/catalog">Back to Catalog</Link>
        </Button>
      </div>
    );
  }

  const isGenericImage = !book.image || book.image === "null" || book.image === "undefined";
  const coverImage = isGenericImage ? FALLBACK_COVER : book.image;

  const createdDate = new Date(book.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 bg-background">
      <div className="bg-secondary/5 py-8 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6">
          <Link to="/catalog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Cover Image */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="sticky top-24">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-white p-2 animate-in fade-in zoom-in duration-700">
                <img
                  src={coverImage}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto aspect-[2/3] object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = FALLBACK_COVER;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-2/3 flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-sm">
                {book.category}
              </Badge>
              <div className="flex items-center text-muted-foreground text-sm font-medium">
                <StarRating rating={book.rating} className="mr-2" />
                {book.rating.toFixed(1)} / 5.0
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-2 leading-tight">
              {book.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              by <span className="font-semibold text-secondary">{book.author}</span>
            </p>

            <div className="flex items-center gap-6 pb-8 border-b">
              <div className="text-4xl font-serif font-bold text-primary">
                ${book.price.toFixed(2)}
              </div>
              <Button size="lg" className="rounded-full px-8 h-12 text-base">
                Add to Cart
              </Button>
            </div>

            <div className="py-8 prose prose-lg max-w-none text-secondary-foreground/80">
              <h3 className="font-serif text-2xl font-bold text-secondary mb-4">Synopsis</h3>
              <p className="whitespace-pre-line leading-relaxed">{book.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 bg-muted/30 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-muted-foreground mb-1">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Condition</span>
                </div>
                <span className="font-medium text-secondary">New</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center text-muted-foreground mb-1">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Format</span>
                </div>
                <span className="font-medium text-secondary">Hardcover</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Added</span>
                </div>
                <span className="font-medium text-secondary">{createdDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
