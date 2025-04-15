
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { HackathonCard } from "@/components/hackathon/hackathon-card";
import { UserCard } from "@/components/user/user-card";
import { Search, Users, Calendar, MessageSquare } from "lucide-react";
import { users, hackathons } from "@/data/mockData";

export default function Home() {
  // Display only the first 3 users and hackathons
  const featuredUsers = users.slice(0, 3);
  const upcomingHackathons = hackathons.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-hackathon-purple/10 to-hackathon-blue/10" />
          <div className="container relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-hackathon-purple to-hackathon-blue bg-clip-text text-transparent mb-6">
              Find Your Perfect Hackathon Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with skilled developers, designers, and innovators to build
              amazing projects at hackathons around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-teammates">
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Find Teammates
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button variant="outline" size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Browse Hackathons
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-slate-50">
          <div className="container mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Upcoming Hackathons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingHackathons.map((hackathon) => (
                  <HackathonCard
                    key={hackathon.id}
                    hackathon={hackathon}
                  />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/hackathons">
                  <Button variant="outline">View All Hackathons</Button>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Featured Teammates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/find-teammates">
                  <Button variant="outline">Find More Teammates</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-hackathon-purple/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-hackathon-purple" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Showcase your skills, experience, and the hackathons you're
                  interested in attending.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-hackathon-blue/10 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-hackathon-blue" />
                </div>
                <h3 className="text-lg font-medium mb-2">Find Teammates</h3>
                <p className="text-muted-foreground">
                  Search for potential teammates based on skills, location, and
                  hackathon interests.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-hackathon-purple/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-hackathon-purple" />
                </div>
                <h3 className="text-lg font-medium mb-2">Connect & Collaborate</h3>
                <p className="text-muted-foreground">
                  Message potential teammates, form your dream team, and build
                  amazing projects together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2023 HackMate - Find Your Perfect Hackathon Team</p>
        </div>
      </footer>
    </div>
  );
}
