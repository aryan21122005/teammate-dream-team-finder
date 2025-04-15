
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { UserCard } from "@/components/user/user-card";
import { UserFilter, type FilterValues } from "@/components/user/user-filter";
import { type User, users, skills, hackathons } from "@/data/mockData";

export default function FindTeammates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
  const initialHackathonId = searchParams.get("hackathon") || "";

  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    skills: [],
    hackathons: initialHackathonId ? [initialHackathonId] : [],
    remote: false,
    location: "",
  });

  useEffect(() => {
    // Apply filters to users
    let result = [...users];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.skills.some((skill) =>
            skill.name.toLowerCase().includes(searchLower)
          )
      );
    }

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter((user) =>
        user.skills.some((skill) => filters.skills.includes(skill.id))
      );
    }

    // Hackathons filter
    if (filters.hackathons.length > 0) {
      result = result.filter((user) =>
        user.hackathons.some((h) => filters.hackathons.includes(h))
      );
    }

    // Location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter((user) =>
        user.location.toLowerCase().includes(locationLower)
      );
    }

    // Remote filter
    if (filters.remote) {
      result = result.filter((user) => user.availableRemote);
    }

    setFilteredUsers(result);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    
    // Update URL params for hackathon
    if (newFilters.hackathons.length > 0 && newFilters.hackathons[0] !== initialHackathonId) {
      setSearchParams({ hackathon: newFilters.hackathons[0] });
    } else if (newFilters.hackathons.length === 0 && initialHackathonId) {
      setSearchParams({});
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.skills.length > 0) count++;
    if (filters.hackathons.length > 0) count++;
    if (filters.location) count++;
    if (filters.remote) count++;
    return count;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Find Teammates</h1>
            <p className="text-muted-foreground">
              Search and filter to find the perfect teammates for your next hackathon
            </p>
          </div>

          <UserFilter onFilterChange={handleFilterChange} className="w-full" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredUsers.length} teammates found
                {getActiveFiltersCount() > 0 && ` • ${getActiveFiltersCount()} filters applied`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    No teammates found matching your filters. Try adjusting your search criteria.
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
