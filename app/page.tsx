import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BrainCircuit, Camera, BarChart3, ShieldCheck } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BrainCircuit className="h-4 w-4" />
              <span>AI-Powered Sentiment Analysis</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance">
              Real-Time Facial Emotion Detection using AI
            </h1>
            <p className="text-xl text-muted-foreground mb-10 text-pretty">
              Unlock the power of emotional intelligence with our advanced facial analysis system. Detect, analyze, and
              visualize emotions in real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/detect">
                <Button size="lg" className="px-8 gap-2">
                  Start Detection <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system combines cutting-edge computer vision with sophisticated neural networks to provide instant
              emotional feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Video Feed</h3>
              <p className="text-muted-foreground">
                Seamlessly capture and process video streams from any webcam with minimal latency.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Prediction</h3>
              <p className="text-muted-foreground">
                Advanced ML models identify happiness, sadness, anger, and more in milliseconds.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trend Analytics</h3>
              <p className="text-muted-foreground">
                Visualize emotional data over time with intuitive charts and detailed reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Privacy Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Privacy-First Architecture</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe in ethical AI. Our facial detection happens entirely within your browser or secure
                environment. We never store your personal video data without explicit consent.
              </p>
              <Link href="/about">
                <Button variant="link" className="p-0 h-auto font-semibold">
                  Learn about our ethics →
                </Button>
              </Link>
            </div>
            <div className="flex-1 bg-muted rounded-3xl p-8 border aspect-video flex items-center justify-center">
              <div className="text-center">
                <ShieldCheck className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Encrypted Data Flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
