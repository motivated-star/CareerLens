import { useState, useEffect } from "react"
import { Search, MapPin, Clock, DollarSign, Building2, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import axios from "axios"

// Mock job data - replace with actual jsearch API data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$120k - $160k",
    description: "We are looking for a Senior Frontend Developer to join our dynamic team...",
    tags: ["React", "TypeScript", "Next.js"],
    postedDate: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
  }
]



type Job = {
  job_id: string;
  title: string;
  company: string;
  type: string;
  apply_link?: string;
  description: string;
  location: string;
  postedDate?: string;
  salary?: string;
};


export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([]);

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]
  const experienceLevels = ["Entry-level", "Mid-level", "Senior", "Executive"]
  const salaryRanges = ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"]
  const popularTags = ["React", "TypeScript", "Python", "Node.js", "AWS", "Docker", "UI/UX", "Machine Learning"]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: searchQuery || "Software Engineer posted in the last 30 days",
          page: 1,
          num_pages: 1
        },
        headers: {
          "X-RapidAPI-Host": `${import.meta.env.VITE_JSEARCH_API_HOST}`,
          "X-RapidAPI-Key": `${import.meta.env.VITE_JSEARCH_API_KEY}`,
        },
      })
      console.log(response.data);
      type RawJob = {
        job_id: string;
        job_title: string;
        employer_name: string;
        job_employment_type: string;
        job_apply_link?: string;
        job_description: string;
        job_city: string;
        job_state: string;
        job_country: string;
        job_posted_at?: string;
        job_min_salary?: number;
        job_max_salary?: number;
      };

      const rawJobs: RawJob[] = response.data.data;

      const mappedJobs: Job[] = rawJobs.map((job): Job => ({
        job_id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        type: job.job_employment_type,
        apply_link: job.job_apply_link,
        description: job.job_description,
        location: `${job.job_city}, ${job.job_state}, ${job.job_country}`,
        postedDate: job.job_posted_at,
        salary:
          job.job_min_salary && job.job_max_salary
            ? `${job.job_min_salary} - ${job.job_max_salary}`
            : "N/A",
      }));

      console.log(mappedJobs);
      setJobs(mappedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const clearFilters = () => {
    setSelectedLocation("")
    setSelectedJobType("")
    setSelectedExperience("")
    setSelectedSalaryRange("")
    setSelectedTags([])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-700">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-blue-700">Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="mt-1 border-blue-200 focus:border-blue-600">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
              <SelectItem value="new-york">New York, NY</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="austin">Austin, TX</SelectItem>
              <SelectItem value="seattle">Seattle, WA</SelectItem>
              <SelectItem value="boston">Boston, MA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-blue-700">Job Type</Label>
          <Select value={selectedJobType} onValueChange={setSelectedJobType}>
            <SelectTrigger className="mt-1 border-blue-200 focus:border-blue-600">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-blue-700">Experience Level</Label>
          <Select value={selectedExperience} onValueChange={setSelectedExperience}>
            <SelectTrigger className="mt-1 border-blue-200 focus:border-blue-600">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level.toLowerCase().replace("-", "")}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-blue-700">Salary Range</Label>
          <Select value={selectedSalaryRange} onValueChange={setSelectedSalaryRange}>
            <SelectTrigger className="mt-1 border-blue-200 focus:border-blue-600">
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              {salaryRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-blue-700 mb-3 block">Skills & Technologies</Label>
          <div className="grid grid-cols-2 gap-2">
            {popularTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                  className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor={tag} className="text-sm text-gray-700 cursor-pointer">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              JobSearch
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => fetchJobs()}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <Card className="border-blue-200 shadow-sm">
              <CardContent className="p-6">
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-700">{mockJobs.length} Jobs Found</h2>
                <p className="text-gray-600 mt-1">Discover your next career opportunity</p>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden border-blue-200 text-blue-600">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-blue-700">Filter Jobs</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {(selectedLocation ||
              selectedJobType ||
              selectedExperience ||
              selectedSalaryRange ||
              selectedTags.length > 0) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Location: {selectedLocation}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedLocation("")} />
                      </Badge>
                    )}
                    {selectedJobType && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Type: {selectedJobType}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedJobType("")} />
                      </Badge>
                    )}
                    {selectedExperience && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Experience: {selectedExperience}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedExperience("")} />
                      </Badge>
                    )}
                    {selectedSalaryRange && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Salary: {selectedSalaryRange}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedSalaryRange("")} />
                      </Badge>
                    )}
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {tag}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.job_id} className="border-blue-200 hover:border-blue-300 transition-colors hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* <img
                          src={job.logo || "/placeholder.svg"}
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-lg border border-blue-200"
                        /> */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-700 hover:text-blue-800 cursor-pointer">
                                {job.title}
                              </h3>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Building2 className="h-4 w-4 mr-1 text-blue-500" />
                                  {job.company}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                  {job.postedDate}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-blue-700 font-semibold">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {job.salary}
                              </div>
                              <Badge variant="outline" className="mt-1 border-blue-200 text-blue-600">
                                {job.type}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex flex-wrap gap-2">
                              {/* {job.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                                >
                                  {tag}
                                </Badge>
                              ))} */}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                onClick={() => job.apply_link ? window.open(job.apply_link, "_blank") : null}
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Load More Jobs
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
