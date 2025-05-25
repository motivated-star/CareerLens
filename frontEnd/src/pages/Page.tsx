import { useState } from "react"
import UploadSection from "../components/UploadSection"
import ResultsSection from "../components/ResultsSection"
// import SuggestionsSection from "../components/SuggestionsSection"

interface Results {
  coverage_percentage: number
  matching_skills: string[]
  missing_skills: string[]
}

export default function HomePage() {
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<Results | null>(null)

  const handleUploadComplete = (data: Results) => {
    setUploadComplete(true)
    setAnalyzing(true)

    // Simulate analysis process
    // setTimeout(() => {
    //   setAnalyzing(false)
    //   setResults({
    //     matchPercentage: 78,
    //     matchedSkills: ["React", "JavaScript", "CSS", "HTML", "API Integration"],
    //     missingSkills: ["TypeScript", "Node.js", "AWS"],
    //     suggestions: [
    //       "Add experience with TypeScript to your resume",
    //       "Highlight any Node.js projects you've worked on",
    //       "Include any cloud experience, especially AWS",
    //       "Quantify your achievements with metrics",
    //     ],
    //   })
    // }, 3000)
    setResults(data)
    setAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <UploadSection onUploadComplete={handleUploadComplete} uploadComplete={uploadComplete} />

        {analyzing && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Analyzing your resume and job match...</h2>
            <p className="text-gray-500 text-center max-w-md">
              Our AI is carefully reviewing your resume against the job requirements to provide personalized insights.
            </p>
          </div>
        )}

        {results && !analyzing && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ResultsSection results={results} />
            {/* {results.suggested_bullets && <SuggestionsSection suggestions={results.suggested_bullets} />} */}
          </div>
        )}
      </main>
    </div>
  )
}
