import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";

export function BookCard({ book, index = 0 }) {
  const isGenericImage = !book.image || book.image === "null" || book.image === "undefined";
  const coverImage = isGenericImage ? FALLBACK_COVER : book.image;

  return (
    <Link
      to={`/books/${book._id}`}
      className="group block animate-in fade-in zoom-in duration-500 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card className="h-full overflow-hidden border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
        <div className="aspect-[2/3] w-full overflow-hidden relative bg-muted">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = FALLBACK_COVER;
            }}
          />
          <Badge className="absolute top-3 right-3 z-20 bg-background/90 text-foreground hover:bg-background backdrop-blur-md border-none font-medium">
            {book.category}
          </Badge>
        </div>
        <CardContent className="p-5 flex flex-col gap-2">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              by {book.author}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <StarRating rating={book.rating} />
            <span className="font-serif font-semibold text-lg text-secondary">
              ${book.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
            {book.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
