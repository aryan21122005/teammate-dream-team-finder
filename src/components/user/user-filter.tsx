
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { skills, hackathons } from "@/data/mockData";

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
  className?: string;
}

export interface FilterValues {
  search: string;
  skills: string[];
  hackathons: string[];
  remote: boolean;
  location: string;
}

export function UserFilter({ onFilterChange, className }: FilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    skills: [],
    hackathons: [],
    remote: false,
    location: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, search: searchInput };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterChange = (
    key: keyof FilterValues,
    value: string | boolean | string[]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSkill = (skillId: string) => {
    const newSkills = filters.skills.includes(skillId)
      ? filters.skills.filter((id) => id !== skillId)
      : [...filters.skills, skillId];
    
    handleFilterChange("skills", newSkills);
  };

  const toggleHackathon = (hackathonId: string) => {
    const newHackathons = filters.hackathons.includes(hackathonId)
      ? filters.hackathons.filter((id) => id !== hackathonId)
      : [...filters.hackathons, hackathonId];
    
    handleFilterChange("hackathons", newHackathons);
  };

  const clearFilters = () => {
    const newFilters = {
      search: "",
      skills: [],
      hackathons: [],
      remote: false,
      location: "",
    };
    setFilters(newFilters);
    setSearchInput("");
    onFilterChange(newFilters);
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-lg items-center space-x-2"
      >
        <Input
          type="search"
          placeholder="Search by name or skill..."
          className="flex-1"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Teammates</SheetTitle>
              <SheetDescription>
                Apply filters to find the perfect teammates
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Location</h3>
                <Input
                  placeholder="City, Country..."
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={filters.remote}
                    onCheckedChange={(checked) =>
                      handleFilterChange("remote", checked === true)
                    }
                  />
                  <Label htmlFor="remote">Remote OK</Label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Skills</h3>
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill.id}`}
                        checked={filters.skills.includes(skill.id)}
                        onCheckedChange={() => toggleSkill(skill.id)}
                      />
                      <Label htmlFor={`skill-${skill.id}`}>{skill.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Hackathons</h3>
                <div className="space-y-2">
                  {hackathons.map((hackathon) => (
                    <div
                      key={hackathon.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`hackathon-${hackathon.id}`}
                        checked={filters.hackathons.includes(hackathon.id)}
                        onCheckedChange={() => toggleHackathon(hackathon.id)}
                      />
                      <Label htmlFor={`hackathon-${hackathon.id}`}>
                        {hackathon.name}
                      </Label>
                    </div>
                  ))}
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
    </div>
  );
}
