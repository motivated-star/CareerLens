"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface Results {
  coverage_percentage: number
  matching_skills: string[]
  missing_skills: string[]
}

interface ResultsSectionProps {
  results: Results
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const chartRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const percentage = results.coverage_percentage
      const circumference = 2 * Math.PI * 45
      const offset = circumference - (percentage / 100) * circumference

      // Animate the progress circle
      const circle = chartRef.current
      circle.style.strokeDasharray = `${circumference} ${circumference}`
      circle.style.strokeDashoffset = circumference.toString()

      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 2s ease-in-out"
        circle.style.strokeDashoffset = offset.toString()
      }, 100)
    }
  }, [results])

  return (
    <section className="w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Resume Match Results</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Match Percentage Circle */}
        <div className="lg:col-span-1 flex justify-center">
          <Card className="w-full max-w-sm border-blue-100 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="relative mb-4">
                <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                  <circle
                    ref={chartRef}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgb(16, 137, 211)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="283 283"
                    strokeDashoffset="283"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-800">{results.coverage_percentage}%</span>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-700 text-center">Match Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {/* Matched Skills */}
          <Card className="border-green-200 bg-green-50/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Matched Skills
              </CardTitle>
              <CardDescription>Skills from your resume that match the job requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {results.matching_skills.map((skill, index) => (
                  <li key={`matched-${index}`}>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Missing Skills */}
          <Card className="border-red-200 bg-red-50/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Missing Skills
              </CardTitle>
              <CardDescription>Skills mentioned in the job that could strengthen your application</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {results.missing_skills.map((skill, index) => (
                  <li key={`missing-${index}`}>
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200 transition-colors"
                    >
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
