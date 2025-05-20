import React from "react";
import { useEffect, useRef } from "react"
import "../globals.css"

export default function SuggestionsSection({ suggestions }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="suggestions-section" ref={sectionRef}>
      <h2 className="section-title">Improve Your Resume</h2>

      <div className="suggestions-container">
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="suggestion-number">{index + 1}</div>
              <p className="suggestion-text">{suggestion}</p>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="action-button primary">Download Report</button>
          <button className="action-button secondary">Edit Resume</button>
        </div>
      </div>
    </section>
  )
}
