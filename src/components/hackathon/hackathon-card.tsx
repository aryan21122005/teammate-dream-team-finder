
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { type Hackathon } from "@/data/mockData";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface HackathonCardProps {
  hackathon: Hackathon;
  className?: string;
}

export function HackathonCard({ hackathon, className }: HackathonCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="aspect-video relative overflow-hidden">
        <img
          src={hackathon.imageUrl}
          alt={hackathon.name}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
        />
        {hackathon.isRemote && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Remote
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2">{hackathon.name}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{hackathon.location}</span>
          </div>
        </div>
        <p className="mt-4 text-sm line-clamp-3">{hackathon.description}</p>
      </CardContent>
      <CardFooter className="p-4 bg-slate-50 flex justify-between">
        <Link to={`/hackathons/${hackathon.id}`}>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </Link>
        <Link to={`/find-teammates?hackathon=${hackathon.id}`}>
          <Button size="sm">
            <UsersIcon className="mr-2 h-4 w-4" />
            Find Teammates
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
