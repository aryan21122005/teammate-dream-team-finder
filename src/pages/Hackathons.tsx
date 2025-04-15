
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { HackathonCard } from "@/components/hackathon/hackathon-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hackathons } from "@/data/mockData";

export default function Hackathons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filteredHackathons, setFilteredHackathons] = useState(hackathons);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(searchQuery, remoteOnly);
  };

  const applyFilters = (query: string, remote: boolean) => {
    let filtered = [...hackathons];

    if (query) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(
        (hackathon) =>
          hackathon.name.toLowerCase().includes(queryLower) ||
          hackathon.description.toLowerCase().includes(queryLower) ||
          hackathon.location.toLowerCase().includes(queryLower)
      );
    }

    if (remote) {
      filtered = filtered.filter((hackathon) => hackathon.isRemote);
    }

    setFilteredHackathons(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRemoteOnly(false);
    setFilteredHackathons(hackathons);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Hackathons</h1>
            <p className="text-muted-foreground">
              Find hackathons to participate in and connect with teammates
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-lg items-center space-x-2"
          >
            <Input
              type="search"
              placeholder="Search hackathons..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Hackathons</SheetTitle>
                  <SheetDescription>
                    Apply filters to find the perfect hackathon
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Options</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={remoteOnly}
                        onCheckedChange={(checked) => {
                          setRemoteOnly(checked === true);
                          applyFilters(searchQuery, checked === true);
                        }}
                      />
                      <Label htmlFor="remote">Remote Only</Label>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </form>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredHackathons.length} hackathons found
                {(searchQuery || remoteOnly) &&
                  ` • ${(searchQuery ? 1 : 0) + (remoteOnly ? 1 : 0)} filters applied`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.length > 0 ? (
                filteredHackathons.map((hackathon) => (
                  <HackathonCard
                    key={hackathon.id}
                    hackathon={hackathon}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    No hackathons found matching your filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
