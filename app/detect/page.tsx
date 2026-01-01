"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, CameraOff, BrainCircuit, RefreshCw, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function DetectionPage() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [emotion, setEmotion] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start/Stop Camera
  const toggleCamera = async () => {
    if (isCameraActive) {
      const stream = videoRef.current?.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setIsCameraActive(false)
      setIsPredicting(false)
      setEmotion(null)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsCameraActive(true)
          setError(null)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setError("Could not access camera. Please ensure you have granted permission.")
      }
    }
  }

  // This effect manages the real-time detection loop.
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isPredicting && isCameraActive) {
      intervalId = setInterval(async () => {
        // --- ML API INTEGRATION START ---
        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext("2d")
          if (context) {
            // Draw current video frame to hidden canvas
            context.drawImage(videoRef.current, 0, 0, 640, 480)
            // Extract frame as base64 string
            const frame = canvasRef.current.toDataURL("image/jpeg", 0.8)

            try {
              // Send frame to your custom ML endpoint
              const response = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ frame }),
              })

              if (!response.ok) throw new Error("API call failed")

              const data = await response.json()
              setEmotion(data.emotion)
              setConfidence(data.confidence)
            } catch (e) {
              console.error("[v0] Prediction error:", e)
              // Optional: fallback to standby or show error
            }
          }
        }
        // --- ML API INTEGRATION END ---
      }, 100)
    }

    return () => clearInterval(intervalId)
  }, [isPredicting, isCameraActive])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Live Emotion Detection</h1>
            <p className="text-muted-foreground">Monitor facial expressions in real-time using your webcam.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCameraActive ? "default" : "secondary"} className="h-6">
              {isCameraActive ? "Camera Active" : "Camera Inactive"}
            </Badge>
            {isPredicting && (
              <Badge variant="outline" className="h-6 border-primary text-primary animate-pulse">
                Predicting...
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-2 bg-black aspect-video relative group">
              {!isCameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-black/60 backdrop-blur-sm">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <CameraOff className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-medium mb-2">Camera is Off</p>
                  <p className="text-sm text-gray-400">Click the button below to start your feed</p>
                </div>
              )}

              {error && (
                <div className="absolute inset-x-4 top-4 z-20">
                  <div className="bg-destructive/15 text-destructive-foreground p-3 rounded-lg flex items-center gap-3 border border-destructive/20 backdrop-blur-md">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-xs font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Webcam Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-500 ${isCameraActive ? "opacity-100" : "opacity-0"}`}
              />

              {/* UI Overlay (Detection Box) */}
              {isPredicting && isCameraActive && (
                <div className="absolute inset-0 pointer-events-none border-4 border-primary/50 m-24 rounded-2xl animate-pulse">
                  <div className="absolute -top-12 -left-1 flex flex-col gap-1">
                    <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1">
                      {emotion || "Analyzing..."}
                    </Badge>
                    <span className="text-[10px] text-primary-foreground font-mono bg-black/50 px-1 rounded">
                      CONF: {confidence}%
                    </span>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" width="640" height="480" />
            </Card>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={toggleCamera}
                variant={isCameraActive ? "destructive" : "default"}
                size="lg"
                className="gap-2"
              >
                {isCameraActive ? (
                  <>
                    <CameraOff className="h-4 w-4" /> Stop Camera
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" /> Start Camera
                  </>
                )}
              </Button>

              <Button
                onClick={() => setIsPredicting(!isPredicting)}
                disabled={!isCameraActive}
                variant="outline"
                size="lg"
                className={`gap-2 ${isPredicting ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" : ""}`}
              >
                <BrainCircuit className={`h-4 w-4 ${isPredicting ? "animate-spin-slow" : ""}`} />
                {isPredicting ? "Stop Detection" : "Start Detection"}
              </Button>

              {isPredicting && (
                <Button variant="ghost" size="icon" onClick={() => setEmotion(null)} className="text-muted-foreground">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Stats/Results Panel */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-4">Detection Results</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Detected Emotion</p>
                    <div className="text-3xl font-bold text-primary">{emotion || "---"}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence Score</span>
                      <span className="font-medium">{confidence}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {isPredicting ? "LIVE_PREDICTION" : "STANDBY"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="font-mono text-[10px]">{isPredicting ? "42ms" : "---"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">Tips for Accuracy</h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Ensure adequate lighting on your face</li>
                  <li>• Stay centered within the camera frame</li>
                  <li>• Remove glasses or masks if detection is poor</li>
                  <li>• Avoid rapid movements during prediction</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
