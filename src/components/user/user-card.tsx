
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeList } from "@/components/ui/badge-list";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";
import { type User } from "@/data/mockData";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
  showActions?: boolean;
}

export function UserCard({ user, showActions = true }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.title}</p>
            {user.location && (
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPinIcon className="mr-1 h-3 w-3" />
                <span>{user.location}</span>
                {user.availableRemote && (
                  <span className="ml-2 text-xs text-blue-500">• Remote OK</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm line-clamp-3">{user.bio}</p>
        </div>
        <div className="mt-4">
          <BadgeList badges={user.skills} colorByCategory />
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="p-4 bg-slate-50 flex justify-between">
          <Link to={`/profile/${user.id}`}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
          <Link to={`/messages/new/${user.id}`}>
            <Button size="sm">Message</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
