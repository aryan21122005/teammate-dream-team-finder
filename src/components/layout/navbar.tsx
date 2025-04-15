
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  MessageSquareIcon,
  UserIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <span className="text-xl font-bold bg-gradient-to-r from-hackathon-purple to-hackathon-blue bg-clip-text text-transparent">
            HackMate
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-5 text-sm">
          <Link
            to="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/find-teammates"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SearchIcon className="h-4 w-4" />
            Find Teammates
          </Link>
          <Link
            to="/hackathons"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <CalendarIcon className="h-4 w-4" />
            Hackathons
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageSquareIcon className="h-4 w-4" />
            Messages
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <UserIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
