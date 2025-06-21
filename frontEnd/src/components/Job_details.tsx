import { X, MapPin, Clock, DollarSign, Building2, ExternalLink, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

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

interface JobDetailsSidebarProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function JobDetailsSidebar({ job, isOpen, onClose }: JobDetailsSidebarProps) {
  if (!job) return null

  const handleApply = () => {
    if (job.apply_link) {
      window.open(job.apply_link, "_blank")
    }
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <h2 className="text-lg font-semibold text-blue-700">Job Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Job Title & Company */}
            <div>
              <h1 className="text-2xl font-bold text-blue-700 mb-2">{job.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1 text-blue-500" />
                  {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                  {job.location}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-blue-200 text-blue-600">
                  {job.type}
                </Badge>
                <div className="flex items-center text-blue-700 font-semibold">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
              </div>
            </div>

            <Separator className="bg-blue-200" />

            {/* Job Meta Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center text-blue-600 mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Posted</span>
                </div>
                <p className="text-sm text-gray-700">{job.postedDate || "Recently"}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center text-blue-600 mb-1">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Job Type</span>
                </div>
                <p className="text-sm text-gray-700">{job.type}</p>
              </div>
            </div>

            <Separator className="bg-blue-200" />

            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Requirements</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Bachelor's degree in Computer Science or related field
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  3+ years of experience in software development
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Proficiency in React, Node.js, and modern web technologies
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Strong problem-solving and communication skills
                </li>
              </ul>
            </div>

            {/* Benefits Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Benefits</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Health Insurance",
                  "Dental Coverage",
                  "Retirement Plan",
                  "Flexible Hours",
                  "Remote Work",
                  "Professional Development",
                ].map((benefit) => (
                  <div key={benefit} className="bg-blue-50 px-3 py-2 rounded-md text-sm text-blue-700">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-6 border-t border-blue-200 bg-gray-50">
          <div className="flex space-x-3 mb-4">
            <Button variant="outline" size="sm" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
              <Bookmark className="h-4 w-4 mr-2" />
              Save Job
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={!job.apply_link}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}
