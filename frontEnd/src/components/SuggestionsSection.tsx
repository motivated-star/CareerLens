
// import { useEffect, useRef } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Lightbulb, Download, Edit } from "lucide-react"

// interface SuggestionsSectionProps {
//   suggested_bullets: string[]
// }

// export default function SuggestionsSection({ suggested_bullets }: SuggestionsSectionProps) {
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("opacity-100", "translate-y-0")
//             entry.target.classList.remove("opacity-0", "translate-y-8")
//           }
//         })
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   return (
//     <section
//       className="w-full max-w-6xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-out"
//       ref={sectionRef}
//     >
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Improve Your Resume</h2>

//       <Card className="border-purple-200 bg-purple-50/50 shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
//             <Lightbulb className="w-6 h-6" />
//             Suggested Improvements
//           </CardTitle>
//           <CardDescription className="text-lg">
//             Here are personalized suggestions to make your resume stand out
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-8">
//           <div className="space-y-4">
//             {suggested_bullets.map((suggestion, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-4 p-4 bg-white rounded-lg border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 animate-in fade-in slide-in-from-left-4"
//                 style={{
//                   animationDelay: `${index * 0.2}s`,
//                   animationFillMode: "forwards",
//                 }}
//               >
//                 <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                   {index + 1}
//                 </div>
//                 <p className="text-gray-700 leading-relaxed flex-1">{suggestion}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-purple-200">
//             <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-200/50 transform hover:scale-[1.02] transition-all duration-200">
//               <Download className="w-5 h-5 mr-2" />
//               Download Report
//             </Button>
//             <Button
//               variant="outline"
//               className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl transform hover:scale-[1.02] transition-all duration-200"
//             >
//               <Edit className="w-5 h-5 mr-2" />
//               Edit Resume
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   )
// }
