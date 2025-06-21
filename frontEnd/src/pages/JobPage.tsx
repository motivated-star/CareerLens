import { useState, useEffect } from "react"
import { Search, MapPin, Clock, DollarSign, Building2, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { JobDetailsSidebar } from "../components/Job_details"

type Job = {
  job_id: string
  title: string
  company: string
  type: string
  apply_link?: string
  description: string
  location: string
  postedDate?: string
  salary?: string
}

export default function JobSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [selectedExperience, setSelectedExperience] = useState<string>("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]
  const experienceLevels = ["Entry-level", "Mid-level", "Senior", "Executive"]

  const fetchJobs = async () => {
    try {
      // const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
//       //   params: {
//       //     query: searchQuery || "Software Engineer posted in the last 30 days",
//       //     page: 1,
//       //     num_pages: 1
//       //   },
//       //   headers: {
//       //     "X-RapidAPI-Host": `${import.meta.env.VITE_JSEARCH_API_HOST}`,
//       //     "X-RapidAPI-Key": `${import.meta.env.VITE_JSEARCH_API_KEY}`,
//       //   },
//       // })
//       // console.log(response.data);
      type RawJob = {
        job_id: string
        job_title: string
        employer_name: string
        job_employment_type: string
        job_apply_link?: string
        job_description: string
        job_city: string
        job_state: string
        job_country: string
        job_posted_at?: string
        job_min_salary?: number
        job_max_salary?: number
      }

      // const rawJobs: RawJob[] = response.data.data;

      const rawJobs: RawJob[] = [
        {
          job_id: "job_001",
          job_title: "Frontend Developer",
          employer_name: "TechCorp Inc.",
          job_employment_type: "Full-time",
          job_apply_link: "https://techcorp.com/careers/frontend",
          job_description:
            "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building responsive user interfaces using React and Tailwind CSS. The ideal candidate should have experience with modern JavaScript frameworks, state management, and API integration.\n\nKey Responsibilities:\n• Develop and maintain user-facing web applications\n• Collaborate with designers to implement pixel-perfect designs\n• Optimize applications for maximum speed and scalability\n• Write clean, maintainable, and well-documented code\n• Participate in code reviews and team meetings",
          job_city: "San Francisco",
          job_state: "CA",
          job_country: "USA",
          job_posted_at: "2025-06-15",
          job_min_salary: 85000,
          job_max_salary: 110000,
        },
        {
          job_id: "job_002",
          job_title: "Backend Engineer",
          employer_name: "DataWave",
          job_employment_type: "Part-time",
          job_apply_link: "https://datawave.io/jobs/backend",
          job_description:
            "Join our backend team to develop robust REST APIs with Node.js and MongoDB. You'll work on scalable microservices architecture and help build the foundation of our data processing platform.\n\nWhat you'll do:\n• Design and implement RESTful APIs\n• Work with databases and data modeling\n• Implement authentication and authorization systems\n• Monitor and optimize application performance\n• Collaborate with frontend developers for seamless integration",
          job_city: "New York",
          job_state: "NY",
          job_country: "USA",
          job_posted_at: "2025-06-12",
          job_min_salary: 60000,
          job_max_salary: 80000,
        },
        {
          job_id: "job_003",
          job_title: "Full Stack Intern",
          employer_name: "StartupNest",
          job_employment_type: "Internship",
          job_apply_link: "https://startupnest.dev/internship",
          job_description:
            "Exciting internship opportunity to work with MERN stack and build scalable web applications. Perfect for students or recent graduates looking to gain hands-on experience in a fast-paced startup environment.\n\nLearning Opportunities:\n• Full-stack development with MongoDB, Express, React, and Node.js\n• Agile development methodologies\n• Code review processes and best practices\n• Deployment and DevOps basics\n• Mentorship from senior developers",
          job_city: "Bangalore",
          job_state: "Karnataka",
          job_country: "India",
          job_posted_at: "2025-06-10",
        },
        {
          job_id: "job_004",
          job_title: "DevOps Engineer",
          employer_name: "CloudNova",
          job_employment_type: "Contract",
          job_description:
            "We're seeking an experienced DevOps Engineer to manage our CI/CD pipelines and cloud infrastructure. You'll work with cutting-edge technologies to ensure our applications are deployed efficiently and securely.\n\nTechnical Requirements:\n• Experience with AWS/Azure/GCP\n• Proficiency in Docker and Kubernetes\n• Knowledge of Infrastructure as Code (Terraform/CloudFormation)\n• CI/CD pipeline management (Jenkins/GitLab CI/GitHub Actions)\n• Monitoring and logging solutions\n• Security best practices",
          job_city: "Remote",
          job_state: "",
          job_country: "USA",
          job_posted_at: "2025-06-08",
          job_min_salary: 90000,
          job_max_salary: 130000,
        },
      ]

      const mappedJobs: Job[] = rawJobs.map(
        (job): Job => ({
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
              ? `$${job.job_min_salary.toLocaleString()} - $${job.job_max_salary.toLocaleString()}`
              : "N/A",
        }),
      )

      console.log(mappedJobs)
      setJobs(mappedJobs)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const clearFilters = () => {
    setSelectedLocation("")
    setSelectedJobType("")
    setSelectedExperience("")
  }

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
    setSelectedJob(null)
  }

  const filteredJobs = jobs.filter((job) => {
    const locationMatch = selectedLocation ? job.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true

    const typeMatch = selectedJobType ? job.type.toLowerCase().includes(selectedJobType.toLowerCase()) : true

    const experienceMatch = selectedExperience
      ? job.description.toLowerCase().includes(selectedExperience.toLowerCase())
      : true

    return locationMatch && typeMatch && experienceMatch
  })

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
              <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
              <SelectItem value="New York">New York, NY</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Austin">Austin, TX</SelectItem>
              <SelectItem value="Seattle">Seattle, WA</SelectItem>
              <SelectItem value="Boston">Boston, MA</SelectItem>
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
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => fetchJobs()}
              >
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
                <h2 className="text-xl font-semibold text-blue-700">{filteredJobs.length} Jobs Found</h2>
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
            {(selectedLocation || selectedJobType || selectedExperience) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedLocation && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      Location: {selectedLocation}
                      <button
                        onClick={() => setSelectedLocation("")}
                        className="ml-1 text-blue-700 hover:text-blue-900"
                        aria-label="Clear location filter"
                      >
                        ✕
                      </button>
                    </Badge>
                  )}

                  {selectedJobType && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      Type: {selectedJobType}
                      <button
                        onClick={() => setSelectedJobType("")}
                        className="ml-1 text-blue-700 hover:text-blue-900"
                        aria-label="Clear job type filter"
                      >
                        ✕
                      </button>
                    </Badge>
                  )}

                  {selectedExperience && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      Experience: {selectedExperience}
                      <button
                        onClick={() => setSelectedExperience("")}
                        className="ml-1 text-blue-700 hover:text-blue-900"
                        aria-label="Clear experience filter"
                      >
                        ✕
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.job_id}
                  className="border-blue-200 hover:border-blue-300 transition-colors hover:shadow-md cursor-pointer"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-700 hover:text-blue-800">{job.title}</h3>
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
                              {/* Tags can be added here if available in job data */}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Handle save functionality
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (job.apply_link) window.open(job.apply_link, "_blank")
                                }}
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

      {/* Job Details Sidebar */}
      <JobDetailsSidebar job={selectedJob} isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={handleCloseSidebar}
        />
      )}



    </div>
  )
}

