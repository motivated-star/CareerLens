import axios from "axios"
import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, LinkIcon, CheckCircle } from "lucide-react"

interface UploadSectionProps {
  onUploadComplete: (data: any) => void
  uploadComplete: boolean
  onAnalyzingStart: () => void
}

export default function UploadSection({ onUploadComplete, uploadComplete, onAnalyzingStart }: UploadSectionProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobLink, setJobLink] = useState("")
  const [resumeDragging, setResumeDragging] = useState(false)
  const [jobDescription, setJobDescription] = useState("")

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleJobLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobLink(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (resumeFile && jobLink) {
      onAnalyzingStart();
      const formData = new FormData()
      formData.append("resume", resumeFile)
      if (jobDescription) {
        formData.append("jobDescription", jobDescription)
      } else {
        formData.append("jobLink", jobLink)
      }


      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log('Upload Success:', res.data);
        onUploadComplete(res.data);
      } catch (error: any) {
        console.error('Upload Error:', error.response?.data || error.message);
        alert('Upload failed. Please try again.');
      }

    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setResumeDragging(true)
  }

  const handleDragLeave = () => {
    setResumeDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setResumeDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  return (
    <section className={`transition-all duration-500 ${uploadComplete ? "scale-95 opacity-75" : ""}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Match Your Resume to the Perfect Job</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste a job link to see how well you match and get personalized suggestions
          </p>
        </div>

        <Card className="shadow-xl border-blue-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${resumeDragging
                  ? "border-blue-500 bg-blue-50 scale-105"
                  : resumeFile
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer block">
                  <div className="space-y-4">
                    {resumeFile ? (
                      <div className="flex items-center justify-center space-x-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <span className="text-lg font-medium text-green-700">{resumeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <span className="text-lg font-medium text-gray-700 block">
                            Drag & drop your resume or click to browse
                          </span>
                          <span className="text-sm text-gray-500 mt-2 block">Accepts PDF, DOC, DOCX</span>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                <Label htmlFor="job-link" className="text-base font-medium text-gray-700 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Job Posting Link (Optional)
                </Label>
                <Input
                  type="url"
                  id="job-link"
                  placeholder="Paste the link to the job posting"
                  value={jobLink}
                  onChange={handleJobLinkChange}
                  className="text-base py-3 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="job-desc" className="text-base font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Job Description (Optional)
                </Label>
                <textarea
                  id="job-desc"
                  placeholder="Or paste the job description directly"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                  className="w-full text-base py-3 px-4 bg-white border border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-md resize-y"
                />
              </div>


              <Button
                type="submit"
                disabled={!resumeFile || !jobLink}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-lg rounded-xl shadow-lg shadow-blue-200/50 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FileText className="w-5 h-5 mr-2" />
                Analyze Match
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
