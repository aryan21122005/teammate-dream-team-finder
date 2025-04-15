
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCard } from "@/components/user/user-card";
import { CalendarIcon, MapPinIcon, UsersIcon, ExternalLinkIcon } from "lucide-react";
import { format } from "date-fns";
import { hackathons, users } from "@/data/mockData";

export default function HackathonDetail() {
  const { hackathonId } = useParams<{ hackathonId: string }>();
  const hackathon = hackathons.find((h) => h.id === hackathonId);

  // Find users interested in this hackathon
  const interestedUsers = users.filter((user) => 
    user.hackathons.includes(hackathonId || "")
  );

  if (!hackathon) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Hackathon Not Found</h1>
            <p className="text-muted-foreground">
              The hackathon you are looking for does not exist.
            </p>
            <Link to="/hackathons" className="mt-4 inline-block">
              <Button>Browse Hackathons</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={hackathon.imageUrl}
            alt={hackathon.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container py-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {hackathon.name}
              </h1>
              {hackathon.isRemote && (
                <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">Remote</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
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

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About This Hackathon</h2>
                <p className="text-muted-foreground">{hackathon.description}</p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-muted-foreground">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    Register
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Link to={`/find-teammates?hackathon=${hackathon.id}`}>
                  <Button variant="outline" className="inline-flex items-center">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Find Teammates
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Potential Teammates</h2>
                {interestedUsers.length > 0 ? (
                  <div className="space-y-4">
                    {interestedUsers.slice(0, 3).map((user) => (
                      <UserCard key={user.id} user={user} showActions={false} />
                    ))}
                    {interestedUsers.length > 3 && (
                      <Link
                        to={`/find-teammates?hackathon=${hackathon.id}`}
                        className="block text-center mt-4"
                      >
                        <Button variant="outline" className="w-full">
                          View All {interestedUsers.length} Teammates
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No teammates found for this hackathon yet.
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Hackathon Details</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{formatDate(hackathon.startDate)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">{formatDate(hackathon.endDate)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{hackathon.location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Remote</span>
                    <span className="font-medium">{hackathon.isRemote ? "Yes" : "No"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
