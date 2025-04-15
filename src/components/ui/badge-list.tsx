
import * as React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface BadgeListProps extends React.HTMLAttributes<HTMLDivElement> {
  badges: {
    id: string;
    name: string;
    category?: string;
  }[];
  variant?: "default" | "secondary" | "outline" | "destructive";
  colorByCategory?: boolean;
}

export function BadgeList({
  badges,
  variant = "default",
  colorByCategory = false,
  className,
  ...props
}: BadgeListProps) {
  const getCategoryColor = (category: string | undefined) => {
    if (!colorByCategory || !category) return variant;
    
    switch (category) {
      case "frontend":
        return "default";
      case "backend":
        return "secondary";
      case "design":
        return "outline";
      case "mobile":
        return "default";
      case "devops":
        return "secondary";
      case "ai":
        return "outline";
      default:
        return variant;
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {badges.map((badge) => (
        <Badge key={badge.id} variant={getCategoryColor(badge.category)}>
          {badge.name}
        </Badge>
      ))}
    </div>
  );
}
