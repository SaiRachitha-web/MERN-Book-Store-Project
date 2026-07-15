import { Star, StarHalf } from "lucide-react";

export function StarRating({ rating, className = "" }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 text-primary ${className}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="fill-current w-4 h-4" />
      ))}
      {hasHalfStar && <StarHalf key="half" className="fill-current w-4 h-4" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 opacity-30" />
      ))}
    </div>
  );
}
