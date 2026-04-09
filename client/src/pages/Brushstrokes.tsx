import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Film, Music, Sparkles, Play, Award, ArrowRight, ExternalLink, Users, Brush, Download } from "lucide-react";
import brushstrokesPdf from "@assets/Brushstrokes_in_Time_-_The_Living_Canvas._An_Introduction._1770054212062.pdf";
import brushstrokesHero from "@assets/Brushstrokes_in_Time_-_the_Living_Canvas_1770430940031.jpg";
import gauguinImg from "@assets/Gaugauin_1770430702397.jpg";
import rousseauImg from "@assets/Rousseau_1770430940031.jpg";
import klimtImg from "@assets/Klimt_1770430940031.jpg";
import daliImg from "@assets/Dali_1770430940031.jpg";
import namatjiraImg from "@assets/The_Vision_of_Namatjira-_the_watercolours_of_the_great_indigen_1770430940031.jpg";
import drysdaleImg from "@assets/Drysdale_1770430940031.jpg";
import headeImg from "@assets/Heade_1770430940031.jpg";
import magritteImg from "@assets/Magritte_1770430940031.jpg";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard, StaggeredList } from "@/components/AnimatedElements";

const featuredArtists = [
  {
    name: "Henri Rousseau",
    episode: "Transcendent Timeless Space",
    description: "Journey into Rousseau's mysterious jungles where primal spirits dance in moonlight.",
    style: "Naive Art / Post-Impressionism",
    img: rousseauImg,
  },
  {
    name: "Paul Gauguin",
    episode: "Monsieur Gauguin",
    description: "His dream of Polynesia - the transformation from Parisian greys to tropical golds.",
    style: "Post-Impressionism / Primitivism",
    img: gauguinImg,
  },
  {
    name: "Gustav Klimt",
    episode: "Golden Dreamscapes",
    description: "Enter Klimt's shimmering world of golden embraces and symbolic beauty.",
    style: "Art Nouveau / Symbolism",
    img: klimtImg,
  },
  {
    name: "Salvador Dalí",
    episode: "The Divine Rhinoceros",
    description: "Dalí's extraordinary Surrealist masterpieces brought to life.",
    style: "Surrealism",
    img: daliImg,
  },
  {
    name: "Albert Namatjira",
    episode: "The Vision of Namatjira",
    description: "The watercolours of the great indigenous Australian artist animated.",
    style: "Australian Landscape",
    img: namatjiraImg,
  },
  {
    name: "Russell Drysdale",
    episode: "Aching Earth",
    description: "The art of great Australian painter Russell Drysdale.",
    style: "Australian Modernism",
    img: drysdaleImg,
  },
  {
    name: "Martin Johnson Heade",
    episode: "Orchids & Hummingbirds",
    description: "A tribute to the exotic art of Martin Johnson Heade.",
    style: "Luminism / Romanticism",
    img: headeImg,
  },
  {
    name: "René Magritte",
    episode: "This is Not a Song",
    description: "The surreal art of René Magritte - his other-worldly paintings animated.",
    style: "Surrealism",
    img: magritteImg,
  },
];

export default function Brushstrokes() {
  usePageTitle("Brushstrokes in Time", "The Living Canvas - bringing the paintings of great artists to life through animation and original music by Doctor Baz.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Brushstrokes in Time - The Living Canvas"
        description="Award-winning AI-animated art series bringing masterpieces by Rousseau, Gauguin, Klimt, Dalí, Namatjira and Drysdale to life with original music by Doctor Baz. Pioneering use of AI animation technology recognised at Berlin and Florence film festivals."
        url="/brushstrokes"
        type="video.tv_show"
        keywords="AI animation, AI-generated art video, Rousseau, Gauguin, Klimt, Salvador Dali, Albert Namatjira, Russell Drysdale, AI art innovation, living canvas, Berlin film festival, Florence film festival, generative AI animation, art masterpieces, AI fine art video"
      />
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${brushstrokesHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center space-y-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge className="bg-gold/20 text-gold border-gold/30 animate-border-glow" data-testid="badge-award-winning">
                  <Award className="w-3 h-3 mr-1" />
                  Award Winning Web Series
                </Badge>
                <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                  Berlin & Florence
                </Badge>
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold tracking-tight"
                data-testid="text-title"
              >
                <AnimatedGradientText>BRUSHSTROKES IN TIME</AnimatedGradientText>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-normal">
                  The Living Canvas
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The paintings of great artists brought to life with music and animation
              </p>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                An evening of live music and animated artworks with <strong className="text-foreground">Dr Baz</strong> (Barry Ferrier), 
                award-winning filmmaker. Experience masterpieces transformed through cutting-edge animation and original musical compositions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Badge variant="secondary">Animation</Badge>
                <Badge variant="secondary">Original Music</Badge>
                <Badge variant="secondary">Art History</Badge>
                <Badge variant="secondary">Installation</Badge>
                <Badge variant="secondary">Educational</Badge>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-4">
                <Play className="w-3 h-3 mr-1" />
                Featured Episode
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-featured">
                Transcendent Timeless Space
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The Magical Art of Rousseau - his mysterious paintings brought to life
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <TiltCard intensity={3}>
                <GlowingBorder color="purple" animated>
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/FoEET9lk1cA?rel=0&modestbranding=1"
                      title="Brushstrokes in Time - Transcendent Timeless Space (Rousseau)"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      data-testid="video-rousseau"
                    />
                  </div>
                </GlowingBorder>
              </TiltCard>
            </div>
            <div className="mt-8 p-6 bg-card/50 rounded-lg border border-border/50">
              <p className="text-muted-foreground leading-relaxed">
                In this video, we create a visual and musical journey that honours Henri Rousseau's revolutionary 
                artistic vision. Rousseau, a self-taught artist often dismissed by his contemporaries, created 
                worlds of extraordinary imagination. The electro-pop soundtrack creates an intentional temporal 
                dissonance, pairing 19th-century visuals with contemporary electronic sounds.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground" data-testid="text-about">
                About The Series
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                "Brushstrokes in Time - The Living Canvas" represents a bold reimagining of how we experience 
                classical and modern art. Each episode weaves together three essential elements: the original 
                paintings that have shaped our cultural heritage, cutting-edge animation techniques that set 
                these works in motion, and original music that distills the essence of each artist's life 
                and vision into accessible, poetic narratives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From Rousseau's mysterious jungles to Klimt's golden dreamscapes, from Dalí's melting realities 
                to Namatjira's sun-drenched Australian landscapes, we traverse the full spectrum of artistic 
                innovation. Our approach varies with each artist's unique style – yet all are united by our 
                commitment to honour the original while creating something entirely new.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The decision to use music as our primary narrative vehicle was deliberate. Rather than relying 
                on traditional documentary techniques, we compress each artist's story into songs that capture 
                both biographical details and deeper truths about their work.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    Key Features
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Palette className="w-4 h-4 text-neon-purple mt-1 shrink-0" />
                      <span>Masterpiece paintings animated with cutting-edge technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Music className="w-4 h-4 text-neon-cyan mt-1 shrink-0" />
                      <span>Original songs by Barry Ferrier capturing each artist's essence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Film className="w-4 h-4 text-neon-magenta mt-1 shrink-0" />
                      <span>Award-winning at Berlin & Florence film festivals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-gold mt-1 shrink-0" />
                      <span>Available as installation or educational series</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brush className="w-4 h-4 text-neon-purple mt-1 shrink-0" />
                      <span>Live performance format with Dr Baz</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20">
                <CardContent className="p-6 text-center">
                  <Award className="w-10 h-10 text-gold mx-auto mb-3" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Award Winning</h3>
                  <p className="text-sm text-muted-foreground">
                    Recognized at Berlin & Florence film festivals for excellence in animated art documentary
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Download className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Project Introduction</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download the full introduction document for Brushstrokes in Time
                  </p>
                  <a href={brushstrokesPdf} download="Brushstrokes_in_Time_Introduction.pdf">
                    <Button className="w-full" data-testid="button-download-brushstrokes">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-artists">
              Featured Artists
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A journey through the masterworks of art history, brought to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist, index) => (
              <Card 
                key={index} 
                className="bg-card/50 border-border/50 hover-elevate overflow-visible"
                data-testid={`card-artist-${index}`}
              >
                {artist.img && (
                  <div className="aspect-video rounded-t-md overflow-hidden">
                    <img 
                      src={artist.img} 
                      alt={artist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{artist.style}</Badge>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-foreground">{artist.name}</h3>
                  <p className="text-sm text-neon-cyan font-medium">{artist.episode}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{artist.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl lg:text-4xl font-serif font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, hsl(45 80% 60%), hsl(280 70% 65%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Experience The Living Canvas
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Available for galleries, museums, educational institutions, and community events. 
            Book Dr Baz for a live performance experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-gold hover:bg-gold/90 text-background" size="lg" data-testid="button-book-event">
                <Users className="w-4 h-4 mr-2" />
                Book for Your Event
              </Button>
            </Link>
            <Link href="/videos">
              <Button variant="outline" className="border-neon-purple/50 text-neon-purple" size="lg" data-testid="button-more-videos">
                <Play className="w-4 h-4 mr-2" />
                More Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
