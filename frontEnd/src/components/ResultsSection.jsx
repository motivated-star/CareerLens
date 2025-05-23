import React from "react";
import { useEffect, useRef } from "react"
import "../globals.css"

export default function ResultsSection({ results }) {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const percentage = results.coverage_percentage
      const circumference = 2 * Math.PI * 45
      const offset = circumference - (percentage / 100) * circumference

      // Animate the progress circle
      const circle = chartRef.current
      circle.style.strokeDasharray = `${circumference} ${circumference}`
      circle.style.strokeDashoffset = circumference

      setTimeout(() => {
        circle.style.transition = "stroke-dashoffset 2s ease-in-out"
        circle.style.strokeDashoffset = offset
      }, 100)
    }
  }, [results])

  return (
    <section className="results-section">
      <h2 className="section-title">Your Resume Match Results</h2>

      <div className="results-container">
        <div className="match-percentage">
          <svg width="120" height="120" viewBox="0 0 100 100">
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
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="55" textAnchor="middle" fontSize="20" fontWeight="bold" fill="rgb(10, 92, 143)">
              {results.coverage_percentage}%
            </text>
          </svg>
          <p className="match-text">Match Score</p>
        </div>

        <div className="skills-comparison">
          <div className="matched-skills">
            <h3>Matched Skills</h3>
            <ul className="skills-list matched">
              {results.matching_skills.map((skill, index) => (
                <li key={`matched-${index}`} className="skill-item matched">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="missing-skills">
            <h3>Missing Skills</h3>
            <ul className="skills-list missing">
              {results.missing_skills.map((skill, index) => (
                <li key={`missing-${index}`} className="skill-item missing">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
