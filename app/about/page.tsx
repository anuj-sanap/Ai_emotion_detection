import { Shield, BrainCircuit, Users, Eye } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Privacy First",
      description: "We never store facial images. Processing occurs in real-time and data is discarded immediately.",
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      title: "Scientific Rigor",
      description: "Our models are built on established psychological frameworks and diverse datasets.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Ethical AI",
      description: "We are committed to preventing bias and ensuring fair detection across all demographics.",
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Transparency",
      description: "Clear communication about how our technology works and what data is collected.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Sentify AI</h1>
        <div className="prose prose-blue dark:prose-invert max-w-none mb-16">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sentify AI was founded with a simple goal: to make human-computer interaction more intuitive by bridging the
            emotional gap. We believe that technology should understand not just what we say, but how we feel.
          </p>
          <div className="h-px bg-border my-12" />
          <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
          <p className="mb-6">
            In an increasingly digital world, we often lose the emotional nuance that makes human communication so
            effective. Our real-time facial emotion detection technology aims to restore that nuance, enabling software
            to adapt to user frustration, joy, or confusion in real-time.
          </p>
          <p>
            Whether it's improving online education, enhancing customer support, or creating more accessible interfaces,
            the applications for empathetic AI are limitless.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-8">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={index} className="p-6 border rounded-2xl bg-muted/30">
              <div className="w-12 h-12 rounded-xl bg-background border flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="font-bold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Privacy & Ethics Note</h2>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            We take facial recognition ethics seriously. Sentify AI is NOT a surveillance tool. We do not support or
            enable biometric tracking, persistent identification, or any form of invasive monitoring.
          </p>
          <p className="text-primary-foreground/80 leading-relaxed">
            Our technology is designed for situational sentiment analysis only. We encourage our users and partners to
            adhere to the same high standards of privacy and consent.
          </p>
        </div>
      </div>
    </div>
  )
}
