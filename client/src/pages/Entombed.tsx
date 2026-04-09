import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Film, Award, MapPin, Calendar, Clock, Cpu, ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard, StaggeredList } from "@/components/AnimatedElements";

const festivalRecognition = [
  { name: "New York Arthouse Film Festival", status: "Winner", award: "Best Experimental Film", icon: Trophy },
  { name: "Vancouver Director's Cut Film Festival", status: "Finalist", award: null, icon: Award },
  { name: "Melbourne Independent Film Awards", status: "Semi-Finalist", award: null, icon: Award },
  { name: "Hawaii International Film Awards", status: "Semi-Finalist", award: null, icon: Award },
  { name: "St. Louis Film Awards", status: "Semi-Finalist", award: null, icon: Award },
  { name: "Arthouse Festival of Beverly Hills", status: "Semi-Finalist", award: null, icon: Award },
];

export default function Entombed() {
  usePageTitle("Entombed", "Award-winning experimental sci-fi film created with AI video technology. Best Experimental Film - New York Arthouse Film Festival.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Entombed - Award-Winning AI Experimental Film"
        description="Entombed is a groundbreaking 30-minute experimental sci-fi film by Doctor Baz, created entirely with AI video generation technology. Winner of Best Experimental Film at the New York Arthouse Film Festival - a landmark achievement in AI-generated cinema. Recognised at Vancouver, Melbourne, Hawaii, and festivals worldwide."
        url="/entombed"
        type="video.movie"
        keywords="Entombed film, AI-generated cinema, AI experimental film, Best Experimental Film, New York Arthouse Film Festival, AI filmmaking pioneer, generative AI film, AI video generation, Vancouver film festival, sci-fi short film, AI art innovation, FilmFreeway, groundbreaking AI film"
      />
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-purple/10 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 70%, hsl(280 85% 65% / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, hsl(190 95% 55% / 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <Badge className="bg-gold/20 text-gold border-gold/30 mb-6 animate-border-glow" data-testid="badge-winner">
                <Trophy className="w-3 h-3 mr-1" />
                Best Experimental Film - NY Arthouse Film Festival
              </Badge>
              
              <h1 
                className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-tight mb-6"
                data-testid="text-title"
              >
                <AnimatedGradientText>ENTOMBED</AnimatedGradientText>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-subtitle">
                A groundbreaking experimental sci-fi film pushing the boundaries of AI-assisted filmmaking
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-8">
                <TiltCard intensity={5}>
                  <GlowingBorder color="purple" animated>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/72NdBEjhTUY?rel=0&modestbranding=1"
                        title="ENTOMBED - Official Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        data-testid="video-entombed-trailer"
                      />
                    </div>
                  </GlowingBorder>
                </TiltCard>
              </div>
              <Card className="bg-card/50 border-border/50 mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-neon-cyan" />
                    Technical Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Runtime:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" /> 30 minutes
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Genre:</span>
                      <p className="font-medium">Sci-Fi / Experimental</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Technology:</span>
                      <p className="font-medium">AI Video Generation</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> 2023-2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground">About the Film</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Entombed</strong> is a pioneering 30-minute experimental 
                    science fiction film created entirely using cutting-edge AI video technology. Based on a 
                    short story by local writer Des Collins, this groundbreaking work represents a new frontier 
                    in independent filmmaking.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Produced from Doctor Baz's bedroom studio, <em>Entombed</em> demonstrates the revolutionary 
                    potential of AI-assisted filmmaking, enabling a single artist to create cinematic experiences 
                    that previously required large production teams and substantial budgets.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The film explores themes of isolation, technology, and the human condition through a 
                    visually stunning and emotionally resonant narrative that has captivated audiences and 
                    judges at film festivals worldwide.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-foreground">What's Next</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Doctor Baz and Des Collins are currently developing the short film into a full-length 
                    screenplay, expanding the world and narrative for a feature film production.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-recognition">
              Festival Recognition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entombed has been recognized at prestigious film festivals around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivalRecognition.map((festival, index) => {
              const Icon = festival.icon;
              const isWinner = festival.status === "Winner";
              return (
                <Link 
                  key={index}
                  href="/award-videos"
                  className="block"
                  data-testid={`link-festival-${index}`}
                >
                  <Card 
                    className={`hover-elevate overflow-visible cursor-pointer transition-all duration-300 group ${isWinner ? 'border-gold/50 bg-gold/5 hover:border-gold' : 'bg-card/50 border-border/50 hover:border-neon-cyan/50'}`}
                    data-testid={`card-festival-${index}`}
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <Icon className={`w-8 h-8 ${isWinner ? 'text-gold' : 'text-neon-cyan'}`} />
                        <Badge 
                          className={isWinner 
                            ? 'bg-gold/20 text-gold border-gold/30' 
                            : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'
                          }
                        >
                          {festival.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors">{festival.name}</h3>
                      {festival.award && (
                        <p className="text-sm text-gold font-medium">{festival.award}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          International
                        </div>
                        <span className="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          View Videos <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
            The Future of Filmmaking
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Entombed represents a new paradigm in independent cinema—proof that compelling, 
            award-winning films can be created by individual artists using AI technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://filmfreeway.com/Entombed607" target="_blank" rel="noopener noreferrer">
              <Button className="bg-neon-cyan text-background" data-testid="button-filmfreeway">
                View on FilmFreeway
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="border-foreground/30 text-foreground" data-testid="button-contact">
                Contact for Screenings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
