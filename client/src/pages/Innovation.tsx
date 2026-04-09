import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Users, Shield, Heart, Target, Sparkles, ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const apps = [
  {
    id: "yarnai",
    name: "YarnAI",
    tagline: "AI-Enabled Indigenous Support Platform",
    developer: "Byron Bay Interactive",
    summary: "An AI-enabled assistance platform designed to support Aboriginal and Torres Strait Islander peoples in navigating everyday interactions with services, institutions, and opportunities.",
    context: "Indigenous Australians continue to face disproportionate barriers when engaging with complex service systems. These barriers stem primarily from systemic complexity and inaccessible communication, not from a lack of capability. YarnAI reduces this friction by providing situational, on-demand assistance that fits naturally into everyday life.",
    philosophy: [
      { title: "Agency over intervention", icon: Users },
      { title: "Cultural safety through design", icon: Shield },
      { title: "Practical usefulness first", icon: Target },
      { title: "Enjoyable, non-stigmatising experience", icon: Heart },
    ],
    features: [
      "Contextual call preparation assistance",
      "Plain-language explanations of complex processes",
      "Flexible expression tools for communication",
      "Gentle planning support",
      "Respectful consent prompts",
      "Indigenous data sovereignty and user control",
    ],
    alignment: "Directly supports Closing the Gap Target 17 (digital inclusion) and contributes to improved engagement across health, education, employment, and service access priorities.",
    color: "neon-cyan",
  },
];

export default function Innovation() {
  usePageTitle("Innovation", "Explore Doctor Baz's innovative AI-powered applications designed to make a positive impact on communities and individuals.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Innovation - YarnAI Indigenous Support Platform"
        description="YarnAI by Byron Bay Interactive - an AI-enabled assistance platform designed to support Aboriginal and Torres Strait Islander peoples. Supporting Closing the Gap Target 17 for digital inclusion."
        url="/innovation"
      />
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-cyan/10 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 70% 70%, hsl(190 95% 55% / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 30% 30%, hsl(280 85% 65% / 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-6" data-testid="badge-innovation">
            <Cpu className="w-3 h-3 mr-1" />
            Innovative Development
          </Badge>
          
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6"
            style={{
              background: "linear-gradient(135deg, hsl(190 95% 65%), hsl(280 85% 70%), hsl(320 90% 65%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            data-testid="text-title"
          >
            INNOVATIVE APP DEVELOPMENT
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Combining 40+ years of creative technology experience with cutting-edge AI to build 
            applications that make a meaningful difference in people's lives.
          </p>
        </div>
      </section>

      {apps.map((app) => (
        <section key={app.id} className="py-16 lg:py-24 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className={`bg-${app.color}/20 text-${app.color} border-${app.color}/30 mb-4`} data-testid={`badge-${app.id}`}>
                <Smartphone className="w-3 h-3 mr-1" />
                {app.developer}
              </Badge>
              
              <h2 
                className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4"
                data-testid={`text-${app.id}-title`}
              >
                {app.name}
              </h2>
              <p className="text-xl text-neon-cyan font-medium mb-6">{app.tagline}</p>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                {app.summary}
              </p>
            </div>

            <Card className="bg-card/50 border-neon-cyan/20 mb-12">
              <CardContent className="p-6 lg:p-8">
                <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-neon-cyan" />
                  Program Context & Need
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {app.context}
                </p>
              </CardContent>
            </Card>

            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Core Design Philosophy</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {app.philosophy.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="bg-card/50 border-border/50 hover-elevate overflow-visible">
                      <CardContent className="p-5 text-center">
                        <Icon className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-magenta" />
                    Functional Features
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 border-neon-cyan/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-gold" />
                    Government Alignment
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {app.alignment}
                  </p>
                  <p className="text-sm text-foreground/80">
                    By reducing confusion and stress in service interactions, the platform supports 
                    equitable participation and improved outcomes across multiple domains.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/30 border-border/50">
              <CardContent className="p-6 lg:p-8">
                <h3 className="font-semibold text-lg text-foreground mb-4">Scalability & Impact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  YarnAI is designed to support ongoing co-design with Aboriginal Community Controlled 
                  Organisations and local communities. The platform is adaptable for use in urban, regional, 
                  and remote contexts and can be deployed independently, through community hubs, or alongside 
                  existing government and ACCO-led programs.
                </p>
                <p className="text-foreground font-medium">
                  Success is measured by improved outcomes and reduced reliance on the platform over time—
                  empowering users rather than creating dependency.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24 bg-gradient-to-r from-neon-purple/5 via-background to-neon-cyan/5 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                <Cpu className="w-3 h-3 mr-1" />
                Legacy Project (2004)
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Enter the Machine
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Before modern web technologies, Doctor Baz was pioneering interactive multimedia experiences 
                using Macromedia Director and Shockwave. "Enter the Machine" was a groundbreaking 2004 
                interactive art installation distributed on CD-ROM.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This biomechanical digital world combined video art, speech synthesis, and an industrial 
                cyberpunk interface to create an immersive journey that was ahead of its time.
              </p>
              <Badge variant="secondary" className="text-sm">
                Coming Soon - Web Version in Development
              </Badge>
            </div>
            <Card className="bg-card/50 border-neon-purple/30">
              <CardContent className="p-0 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto">
                      <Cpu className="w-8 h-8 text-neon-purple" />
                    </div>
                    <p className="text-muted-foreground">Interactive Art Experience</p>
                    <Badge variant="secondary">Shockwave / Director</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
            More Apps Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Doctor Baz continues to develop innovative applications that combine AI technology 
            with human-centered design principles.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan" data-testid="button-contact">
              Discuss a Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
