import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Play, ChevronRight, Film, BookOpen, Cpu, Zap, Trophy, Music2, Sparkles, ArrowRight } from "lucide-react";
import { FadeIn, AnimatedCounter, TiltCard, GlowingBorder, AnimatedGradientText } from "@/components/AnimatedElements";
import type { Video } from "@shared/schema";
import bookCoverImage from "@assets/ART_SOUL_AND_AI_DR_BARRY_FERRIER__cover_1770190277724.jpg";
import yarnaiLogo from "@assets/YarnAI_logo_1770424436282.jpg";
import drBazPhoto from "@assets/Dr_Baz_aka_Barry_Ferrier_1770594104402.jpg";
import dreamsMachinesImg from "@assets/dreams-machines_1771545128358.jpg";

const heroImages = [
  { src: "/attached_assets/Dr._Barry_Ferrier_1770342989874.jpg", alt: "Dr. Barry Ferrier" },
  { src: drBazPhoto, alt: "Dr Baz aka Barry Ferrier" },
];

function DissolveLoop({ images, className }: { images: { src: string; alt: string }[]; className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative ${className || ""}`}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover rounded-md border border-neon-cyan/30"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 2s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-neon-purple/10" />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, hsl(190 95% 55% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(280 85% 65% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(320 90% 60% / 0.1) 0%, transparent 70%)
          `,
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="space-y-8">
          <FadeIn delay={0.1} direction="down">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/award-videos">
                <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 px-4 py-1.5 animate-pulse-glow cursor-pointer hover:bg-neon-cyan/30 transition-colors" data-testid="badge-ai-artist">
                  <Cpu className="w-3 h-3 mr-1" />
                  AI Video Artist
                </Badge>
              </Link>
              <Link href="/entombed">
                <Badge className="bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30 px-4 py-1.5 cursor-pointer hover:bg-neon-magenta/30 transition-colors" data-testid="badge-filmmaker">
                  <Film className="w-3 h-3 mr-1" />
                  Award-Winning Filmmaker
                </Badge>
              </Link>
              <Link href="/music">
                <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 px-4 py-1.5 cursor-pointer hover:bg-neon-purple/30 transition-colors" data-testid="badge-pioneer">
                  <Zap className="w-3 h-3 mr-1" />
                  Electronic Pioneer
                </Badge>
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h1 
              className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-tight animate-text-glow"
              data-testid="text-hero-title"
            >
              <AnimatedGradientText>DOCTOR BAZ</AnimatedGradientText>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/90 font-light tracking-wide" data-testid="text-hero-subtitle">
              Pushing the Boundaries of <span className="text-neon-cyan">Art</span>, <span className="text-neon-magenta">Technology</span> & <span className="text-neon-purple">Sound</span>
            </p>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
              <DissolveLoop 
                images={heroImages}
                className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0"
              />
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed text-center sm:text-left" data-testid="text-hero-description">
                Official website of multi-award winning Australian artist and entertainer Barry Ferrier fusing cutting-edge AI technology with 40+ years of musical mastery. 
                Creator of experimental films, electronic compositions, pioneering multimedia experiences and innovative apps. Choose Explore from the menu to discover Dr Baz music, history and videos.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.9}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/entombed">
              <Button 
                size="lg" 
                className="bg-neon-cyan text-background border-neon-cyan min-w-[180px] font-semibold"
                data-testid="button-watch-entombed"
              >
                <Film className="w-4 h-4 mr-2" />
                Watch Entombed
              </Button>
            </Link>
            <Link href="/book">
              <Button 
                size="lg" 
                variant="outline"
                className="border-neon-magenta/50 text-neon-magenta min-w-[180px]"
                data-testid="button-explore-book"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Art, Soul & AI
              </Button>
            </Link>
            <Link href="/videos">
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground/30 text-foreground min-w-[180px]"
                data-testid="button-view-work"
              >
                <Play className="w-4 h-4 mr-2" />
                View Work
              </Button>
            </Link>
          </div>
          </FadeIn>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-neon-cyan/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-neon-cyan/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { number: 1, suffix: "", label: "Best Experimental Film", sublabel: "NY Arthouse Festival", icon: Trophy },
    { number: 6, suffix: "", label: "Dolphin Awards", sublabel: "Blues & Jazz Excellence", icon: Award },
    { number: 40, suffix: "+", label: "Years Creating", sublabel: "Pioneer Since 1980s", icon: Zap },
    { number: 23, suffix: "", label: "Albums Released", sublabel: "On Bandcamp", icon: Music2 },
  ];

  return (
    <section className="py-12 lg:py-16 border-y border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={index} delay={index * 0.15} direction="up">
                <div className="text-center space-y-2 group">
                  <Icon className="w-6 h-6 mx-auto text-neon-cyan mb-2 group-hover:text-neon-magenta transition-colors" />
                  <div className="text-3xl lg:text-4xl font-serif font-bold text-neon-cyan" data-testid={`stat-number-${index}`}>
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm lg:text-base font-semibold uppercase tracking-wider text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs lg:text-sm text-muted-foreground">
                    {stat.sublabel}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EntombedSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-purple/5 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="space-y-6">
              <Badge className="bg-gold/20 text-gold border-gold/30 animate-border-glow" data-testid="badge-award">
                <Trophy className="w-3 h-3 mr-1" />
                Best Experimental Film - NY Arthouse Film Festival
              </Badge>
              
              <h2 
                className="text-4xl lg:text-5xl font-serif font-bold"
                data-testid="text-entombed-title"
              >
                <AnimatedGradientText>ENTOMBED</AnimatedGradientText>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                A groundbreaking 30-minute sci-fi experimental film created entirely with AI video technology. 
                Based on a short story by Des Collins, this pioneering work represents the cutting edge of 
                AI-assisted filmmaking.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Finalist - Vancouver Director's Cut</Badge>
                <Badge variant="secondary">Semi-Finalist - Melbourne Independent</Badge>
                <Badge variant="secondary">Semi-Finalist - Hawaii International</Badge>
              </div>
              
              <div className="pt-4">
                <Link href="/entombed">
                  <Button className="bg-neon-cyan text-background group" data-testid="button-entombed-learn">
                    <Film className="w-4 h-4 mr-2" />
                    Explore the Film
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.2}>
            <TiltCard className="relative" intensity={5}>
              <GlowingBorder color="cyan" animated>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/72NdBEjhTUY?rel=0&modestbranding=1"
                    title="ENTOMBED - Official Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    data-testid="video-entombed-home"
                  />
                </div>
              </GlowingBorder>
            </TiltCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section className="py-20 lg:py-28 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/5 via-transparent to-neon-cyan/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" className="order-2 lg:order-1">
            <TiltCard className="relative" intensity={5}>
              <GlowingBorder color="magenta" animated>
                <div className="aspect-[3/4] max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl shadow-neon-magenta/20">
                  <img 
                    src={bookCoverImage} 
                    alt="Art, Soul and AI by Dr Barry Ferrier - Official Book Cover"
                    className="w-full h-full object-cover"
                    data-testid="img-book-cover-home"
                  />
                </div>
              </GlowingBorder>
            </TiltCard>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.2} className="order-1 lg:order-2 space-y-6">
            <Badge className="bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30" data-testid="badge-book">
              <Sparkles className="w-3 h-3 mr-1" />
              Now Available
            </Badge>
            
            <h2 
              className="text-4xl lg:text-5xl font-serif font-bold"
              data-testid="text-book-title"
            >
              <AnimatedGradientText>ART, SOUL & AI</AnimatedGradientText>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              A profound exploration of creativity in the age of artificial intelligence. Doctor Baz shares 
              insights from decades of pioneering work at the intersection of art and technology, offering 
              a unique perspective on where human creativity meets machine learning.
            </p>
            
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-magenta" />
                Exploring the future of creative expression
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-magenta" />
                40+ years of multimedia innovation
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-magenta" />
                Practical insights for artists embracing AI
              </li>
            </ul>
            
            <div className="pt-4">
              <Link href="/book">
                <Button className="bg-neon-magenta text-background group" data-testid="button-book-learn">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Discover the Book
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ElectronicPioneerSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-cyan/5 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-6" data-testid="badge-electronic">
          <Cpu className="w-3 h-3 mr-1" />
          Electronic Music Pioneer
        </Badge>
        
        <h2 
          className="text-4xl lg:text-5xl font-serif font-bold mb-6"
          style={{
            background: "linear-gradient(135deg, hsl(190 95% 65%), hsl(165 80% 55%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          data-testid="text-electronic-title"
        >
          DREAMS & MACHINES
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          In 1985, Doctor Baz pioneered electronic music performance at QPAC Concert Hall, Brisbane, 
          utilizing the revolutionary Fairlight CMI—one of the world's first digital sampling synthesizers. 
          His groundbreaking work combined live video processing, choreographed dance, and computer-generated 
          soundscapes decades before such integration became mainstream.
        </p>

        <div className="max-w-4xl mx-auto mb-12">
          <img 
            src={dreamsMachinesImg} 
            alt="Dreams and Machines - original program, newspaper clipping advertising the 1985 QPAC performance, and cassette tape cover for Volume I by Barry Ferrier" 
            className="w-full rounded-md border border-border/50"
            data-testid="img-dreams-machines"
          />
          <p className="text-sm text-muted-foreground mt-3 italic">Original program, press coverage, and cassette release from the 1985 Dreams & Machines performances at QPAC</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible" data-testid="card-fairlight">
            <CardContent className="p-6 text-center space-y-3">
              <Cpu className="w-10 h-10 mx-auto text-neon-cyan" />
              <h3 className="font-semibold">Fairlight CMI Pioneer</h3>
              <p className="text-sm text-muted-foreground">
                One of Australia's first composers to master the Fairlight CMI digital synthesizer
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible" data-testid="card-qpac">
            <CardContent className="p-6 text-center space-y-3">
              <Music2 className="w-10 h-10 mx-auto text-neon-magenta" />
              <h3 className="font-semibold">QPAC Commissioned</h3>
              <p className="text-sm text-muted-foreground">
                Regular composer for Queensland Performing Arts Trust throughout the 1980s
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible" data-testid="card-multimedia">
            <CardContent className="p-6 text-center space-y-3">
              <Zap className="w-10 h-10 mx-auto text-neon-purple" />
              <h3 className="font-semibold">Multimedia Innovator</h3>
              <p className="text-sm text-muted-foreground">
                PhD in Multimedia Design, combining technology with artistic vision
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10">
          <Link href="/history">
            <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan" data-testid="button-explore-history">
              Explore Full History
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoShowcase() {
  const { data: videos } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const featuredVideo = videos?.find(v => v.featured) || {
    title: "The City",
    description: "Electronic composition showcasing experimental sound design and AI-enhanced visuals.",
    youtubeId: "BmfO-K4cyvk",
  };

  return (
    <section className="py-20 lg:py-28 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 via-transparent to-neon-cyan/5" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 mb-6" data-testid="badge-video">
          <Play className="w-3 h-3 mr-1" />
          Featured Work
        </Badge>
        
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-foreground" data-testid="text-video-title">
          {featuredVideo.title}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {featuredVideo.description}
        </p>
        
        <div className="relative">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl shadow-neon-purple/20 border border-border/50">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?rel=0&modestbranding=1`}
              title={featuredVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              data-testid="video-featured"
            />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-magenta/10 rounded-xl blur-xl -z-10" />
        </div>
        
        <div className="mt-10">
          <Link href="/videos">
            <Button variant="outline" className="border-neon-purple/50 text-neon-purple" data-testid="button-view-portfolio">
              View Full Portfolio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function YarnAISection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <FadeIn direction="left" delay={0.1}>
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl shadow-neon-cyan/20 border border-border/50">
              <img
                src={yarnaiLogo}
                alt="YarnAI Logo"
                className="w-full h-full object-cover"
                data-testid="img-yarnai-logo"
              />
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.2}>
            <div className="text-center md:text-left">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-4" data-testid="badge-yarnai">
                <Cpu className="w-3 h-3 mr-1" />
                App Development
              </Badge>
              
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-foreground" data-testid="text-yarnai-title">
                <AnimatedGradientText>YarnAI</AnimatedGradientText>
              </h2>
              
              <p className="text-muted-foreground mb-6 max-w-xl">
                A digital inclusion project designed to assist Australian indigenous communities in using AI in their everyday lives. Totally voice driven, requiring no reading or typing for literacy challenged users.
              </p>
              
              <Link href="/projects/yarnai">
                <Button className="bg-neon-cyan text-background" data-testid="button-yarnai-details">
                  View Project Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const awards = [
    "Best Experimental Film - NY Arthouse Film Festival",
    "6x N.C.E.I.A. Dolphin Awards",
    "Best Blues Artist",
    "Best Jazz Artist",
    "Finalist - Vancouver Director's Cut",
    "Semi-Finalist - 5 International Film Festivals",
  ];

  return (
    <section className="py-16 lg:py-20 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground" data-testid="text-awards-title">
            Recognition & Awards
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {awards.map((award, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="bg-gold/10 text-gold border-gold/20 px-4 py-2"
              data-testid={`badge-award-${index}`}
            >
              <Trophy className="w-3 h-3 mr-2" />
              {award}
            </Badge>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/awards">
            <Button variant="ghost" className="text-gold" data-testid="button-all-awards">
              View All Awards
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(240 10% 4%) 0%, 
              hsl(190 95% 55% / 0.1) 25%, 
              hsl(280 85% 65% / 0.1) 50%, 
              hsl(320 90% 60% / 0.1) 75%, 
              hsl(240 10% 4%) 100%
            )
          `,
          backgroundSize: "400% 400%",
          animation: "gradient-shift 15s ease infinite",
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="text-3xl lg:text-5xl font-serif font-bold mb-6"
          style={{
            background: "linear-gradient(135deg, hsl(190 95% 65%), hsl(280 85% 70%), hsl(320 90% 65%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          data-testid="text-cta-title"
        >
          Ready to Collaborate?
        </h2>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          From AI video production to live performances, let's create something extraordinary together.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-neon-cyan text-background min-w-[160px]"
              data-testid="button-cta-contact"
            >
              Get In Touch
            </Button>
          </Link>
          <Link href="/projects">
            <Button 
              size="lg" 
              variant="outline"
              className="border-foreground/30 text-foreground min-w-[160px]"
              data-testid="button-cta-projects"
            >
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle("Home", "Doctor Baz - Award-winning AI video artist, electronic music pioneer, and experimental filmmaker. Creator of 'Entombed' and author of 'Art, Soul and AI'.");

  return (
    <main>
      <SEO 
        title="Home"
        description="Doctor Baz (Dr Barry Ferrier) - Pioneer of AI in the arts, award-winning AI video artist, and electronic music innovator since 1985. Winner of 27 international film festival awards for AI-generated films. Creator of 'Entombed' (Best Experimental Film NY Arthouse), author of 'Art, Soul and AI', with 40+ years at the forefront of creative technology."
        url="/"
        keywords="AI pioneer in arts, AI innovation arts, AI-generated film awards, early adopter AI technology, generative AI filmmaking, AI creativity, technology and art, Dreams and Machines, Fairlight CMI, QPAC Concert Hall, Lindsay Kemp Company, Johnny Cash tribute, Ilona Harker, Slim Pickens, Rex Carter, Pete Crowley, Giant Steps band, Dame Joan Sutherland, Peter Allen, Elton John, David Bowie, Rousseau, Gauguin, Klimt, Dali, Namatjira, Drysdale"
      />
      <HeroSection />
      <StatsSection />
      <EntombedSection />
      <BookSection />
      <ElectronicPioneerSection />
      <VideoShowcase />
      <YarnAISection />
      <AwardsSection />
      <CTASection />
    </main>
  );
}
