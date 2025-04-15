
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BadgeList } from "@/components/ui/badge-list";
import { HackathonCard } from "@/components/hackathon/hackathon-card";
import { MapPin, Mail, UserCircle } from "lucide-react";
import { users, hackathons } from "@/data/mockData";

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  // If userId is provided, show that user, otherwise show the current user (default to first user for demo)
  const currentUserId = "1"; // Mock the current user ID
  const profileUser = userId ? users.find((u) => u.id === userId) : users.find((u) => u.id === currentUserId);
  
  const isCurrentUser = !userId || userId === currentUserId;
  
  const userHackathons = hackathons.filter((hackathon) =>
    profileUser?.hackathons.includes(hackathon.id)
  );

  if (!profileUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
            <p className="text-muted-foreground">
              The user you are looking for does not exist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const initials = profileUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileUser.avatarUrl} alt={profileUser.name} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                <p className="text-lg text-muted-foreground mb-2">
                  {profileUser.title}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{profileUser.location}</span>
                  {profileUser.availableRemote && (
                    <span className="ml-2 text-blue-500">• Remote OK</span>
                  )}
                </div>
                {!isCurrentUser && (
                  <div className="flex gap-2">
                    <Button asChild className="gap-1">
                      <a href={`/messages/new/${profileUser.id}`}>
                        <Mail className="h-4 w-4" />
                        Message
                      </a>
                    </Button>
                  </div>
                )}
                {isCurrentUser && (
                  <Button variant="outline" className="gap-1">
                    <UserCircle className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* About & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground">{profileUser.bio}</p>
              </div>
              
              <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Interested Hackathons</h2>
                <div className="space-y-4">
                  {userHackathons.length > 0 ? (
                    userHackathons.map((hackathon) => (
                      <HackathonCard
                        key={hackathon.id}
                        hackathon={hackathon}
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      {isCurrentUser
                        ? "You haven't added any hackathons to your profile yet."
                        : "This user hasn't added any hackathons to their profile yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-white h-fit">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <BadgeList badges={profileUser.skills} colorByCategory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
