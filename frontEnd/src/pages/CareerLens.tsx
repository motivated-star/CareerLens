import type React from "react"

import { useState, useEffect } from "react"
import { FileText, Briefcase, ArrowRight, Target, TrendingUp, Users, Award, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"


export default function CareerLens() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 p-4 bg-white/90 backdrop-blur-md border-b border-blue-200 transition-transform duration-700 ease-out ${
          isLoaded ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg ${
                isLoaded ? "animate-pulse" : ""
              }`}
            >
              <Target size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CareerLens
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Button variant="ghost" className="text-blue-800 hover:text-blue-600" onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button variant="ghost" className="text-blue-800 hover:text-blue-600">
              About
            </Button>
            <Button variant="ghost" className="text-blue-800 hover:text-blue-600">
              Contact
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-8 text-center max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >

          <h2 className="text-6xl font-bold text-blue-900 mb-6 leading-tight">
            Your Career Success,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Amplified</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Analyze your resume compatibility with dream jobs and discover new opportunities tailored to your skills and
            experience with our advanced AI technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <FeatureCard
            icon={<FileText size={32} />}
            title="Resume Analysis"
            description="Upload your resume and job URL to get instant compatibility analysis and improvement suggestions powered by AI."
            features={["AI-Powered Matching", "Instant Feedback", "Improvement Tips"]}
            delay={600}
            isLoaded={isLoaded}
            primary={true}
            onClick = {() => navigate("/resume-analysis")}
          />

          <FeatureCard
            icon={<Briefcase size={32} />}
            title="Posted Jobs"
            description="Browse through curated job postings that match your skills and career aspirations from top companies."
            features={["Smart Filtering", "Real-time Updates", "Salary Insights"]}
            delay={700}
            isLoaded={isLoaded}
            primary={false}
            onClick = {() => navigate("/job-search")}
          />

          <FeatureCard
            icon={<FolderKanban size={32} />}
            title="Job Dashboard"
            description="Keep track of yours jobs with us."
            features={["Add jobs", "Automatic Follow Up", "Track Progress"]}
            delay={600}
            isLoaded={isLoaded}
            primary={true}
            onClick = {() => navigate("/job-dashboard")}
          />

          
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-1000 ease-out delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <StatCard icon={<Users />} number="10K+" label="Resumes Analyzed" />
          <StatCard icon={<TrendingUp />} number="500+" label="Job Matches" />
          <StatCard icon={<Award />} number="95%" label="Success Rate" />
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  delay: number
  isLoaded: boolean
  primary: boolean
  onClick?: () => void
}

function FeatureCard({ icon, title, description, features, delay, isLoaded, primary, onClick }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 ${
        isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
      } ${
        isHovered
          ? `shadow-2xl shadow-blue-500/20 ${primary ? "border-blue-500" : "border-blue-400"}`
          : "border-transparent shadow-lg"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          primary ? "from-blue-500/5 to-blue-600/10" : "from-blue-400/5 to-blue-500/10"
        } transition-opacity duration-400 ${isHovered ? "opacity-100" : "opacity-0"}`}
      />

      <CardHeader className="relative z-10 text-center">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${
            primary ? "from-blue-600 to-blue-700" : "from-blue-500 to-blue-600"
          } rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg transition-transform duration-300 ${
            isHovered ? "rotate-6 scale-110 animate-bounce" : ""
          }`}
        >
          {icon}
        </div>
        <CardTitle className={`text-2xl ${primary ? "text-blue-700" : "text-blue-600"}`}>{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 text-center">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {features.map((feature, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`${primary ? "bg-blue-50 text-blue-700" : "bg-blue-50 text-blue-600"} hover:scale-105 transition-transform duration-200`}
            >
              {feature}
            </Badge>
          ))}
        </div>

        <Button
          className={`w-full transition-all duration-300 transform ${isHovered ? "translate-x-1 scale-105" : "translate-x-0"} ${
            primary
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
          variant={primary ? "default" : "outline"}
        >
          Get Started
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  number: string
  label: string
}

function StatCard({ icon, number, label }: StatCardProps) {
  return (
    <Card className="text-center border-blue-100 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-8">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:rotate-12 hover:scale-110">
          <div className="text-blue-600">{icon}</div>
        </div>
        <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
        <div className="text-slate-500 text-base font-medium">{label}</div>
      </CardContent>
    </Card>
  )
}
