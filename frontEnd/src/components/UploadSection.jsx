import React from "react";
import { useState } from "react"
import "../globals.css"
import axios from "axios"

export default function UploadSection({ onUploadComplete, uploadComplete }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobLink, setJobLink] = useState("")
  const [resumeDragging, setResumeDragging] = useState(false)

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleJobLinkChange = (e) => {
    setJobLink(e.target.value)
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  if (resumeFile && jobLink) {
    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("jobLink", jobLink)

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Server response:", response.data)
      onUploadComplete(response.data)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }
}

  const handleDragOver = (e) => {
    e.preventDefault()
    setResumeDragging(true)
  }

  const handleDragLeave = () => {
    setResumeDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setResumeDragging(false)

    if (e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  return (
    <section className={`upload-section ${uploadComplete ? "minimized" : ""}`}>
      <div className="upload-container">
        <h1 className="title">Match Your Resume to the Perfect Job</h1>
        <p className="subtitle">
          Upload your resume and paste a job link to see how well you match and get personalized suggestions
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div
            className={`resume-upload-area ${resumeDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="file-input"
            />
            <label htmlFor="resume" className="file-label">
              <div className="upload-icon"></div>
              {resumeFile ? (
                <span className="file-name">{resumeFile.name}</span>
              ) : (
                <>
                  <span className="upload-text">Drag & drop your resume or click to browse</span>
                  <span className="upload-hint">Accepts PDF, DOC, DOCX</span>
                </>
              )}
            </label>
          </div>

          <div className="job-link-area">
            <label htmlFor="job-link" className="job-link-label">
              Job Posting URL
            </label>
            <input
              type="url"
              id="job-link"
              placeholder="Paste the link to the job posting"
              value={jobLink}
              onChange={handleJobLinkChange}
              className="job-link-input"
              required
            />
          </div>

          <button type="submit" className="analyze-button" disabled={!resumeFile || !jobLink}>
            Analyze Match
          </button>
        </form>
      </div>
    </section>
  )
}
