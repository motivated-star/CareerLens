import React from "react";
import { useState } from "react"
import UploadSection from "../components/UploadSection"
import ResultsSection from "../components/ResultsSection"
import SuggestionsSection from "../components/SuggestionsSection"
import "../globals.css"

export default function Home() {
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleUploadComplete = () => {
    setUploadComplete(true)
    setAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false)
      setResults({
        matchPercentage: 78,
        matchedSkills: ["React", "JavaScript", "CSS", "HTML", "API Integration"],
        missingSkills: ["TypeScript", "Node.js", "AWS"],
        suggestions: [
          "Add experience with TypeScript to your resume",
          "Highlight any Node.js projects you've worked on",
          "Include any cloud experience, especially AWS",
          "Quantify your achievements with metrics",
        ],
      })
    }, 3000)
  }

  return (
    <div className="app-container">
      
      <main>
        <UploadSection onUploadComplete={handleUploadComplete} uploadComplete={uploadComplete} />

        {analyzing && (
          <div className="analyzing-container">
            <div className="analyzing-spinner"></div>
            <h2>Analyzing your resume and job match...</h2>
          </div>
        )}

        {results && !analyzing && (
          <>
            <ResultsSection results={results} />
            <SuggestionsSection suggestions={results.suggestions} />
          </>
        )}
      </main>
    </div>
  )
}
