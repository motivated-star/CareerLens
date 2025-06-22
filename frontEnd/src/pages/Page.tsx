import { useState } from "react"
import UploadSection from "../components/UploadSection"
import ResultsSection from "../components/ResultsSection"
import SuggestionsSection from "../components/SuggestionsSection"
import { InfinitySpin } from "react-loader-spinner"


interface Results {
  match_score: number
  missing_skills: string[]
  suggestions: string[]
}

export default function HomePage() {
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<Results | null>(null)

  const handleUploadComplete = (data: Results) => {
    setUploadComplete(true)
    setAnalyzing(true)

    setResults(data)
    setAnalyzing(false)
  }

  console.log("Results:", results);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Resume Analysis
            </h1>
            
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <UploadSection onUploadComplete={handleUploadComplete} uploadComplete={uploadComplete} onAnalyzingStart={()=>setAnalyzing(true)}/>

        {analyzing && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col justify-center items-center space-y-6">
            <InfinitySpin width="150" color="#2563eb" />
            <h2 className="text-2xl font-semibold text-blue-700 text-center">Analyzing your resume and job match...</h2>
            <p className="text-gray-600 text-center max-w-md">
              Our AI is reviewing your resume against the job to give smart suggestions.
            </p>
          </div>
        )}

        {results && !analyzing && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <ResultsSection results={results} />
            {results.suggestions && <SuggestionsSection suggestions={results.suggestions} />}
          </div>
        )}
      </main>
    </div>
  )
}
