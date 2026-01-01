import { Button } from "@/components/ui/button"
import { Camera, Cpu, BarChart, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Grant Camera Access",
      description: "Allow the application to access your webcam to start the live video stream.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "AI Processing",
      description: "Our neural network analyzes facial landmarks and micro-expressions in every frame.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Emotion Mapping",
      description: "Visual features are mapped to specific emotional categories with confidence scores.",
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Real-time Feedback",
      description: "Instantly see the detected emotions and overall sentiment on your screen.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">How It Works</h1>
        <p className="text-xl text-muted-foreground">
          Understanding the technology behind Sentify AI. From raw pixels to emotional insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className="bg-background border rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 text-muted-foreground/30">
                <div className="w-8 h-[2px] bg-current" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Technology Stack</h2>
            <p className="text-muted-foreground mb-4">
              Our system leverages the latest in web and AI technologies to deliver a seamless experience.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">Next.js 16 App Router for performance</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">Tailwind CSS for responsive, modern styling</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">WebRTC for low-latency camera streaming</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">Custom-trained CNN for emotion classification</span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-square md:aspect-auto h-64 md:h-full bg-background rounded-2xl border shadow-inner flex items-center justify-center">
            <div className="text-center p-6">
              <Cpu className="h-16 w-16 text-primary/20 mx-auto mb-4 animate-pulse" />
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Processing Data...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold mb-6">Ready to see it in action?</h3>
        <Link href="/detect">
          <Button size="lg" className="px-12">
            Try Live Detection
          </Button>
        </Link>
      </div>
    </div>
  )
}
