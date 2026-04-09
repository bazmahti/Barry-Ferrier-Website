import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import bookPromoImage from "@/assets/art-soul-ai-book-promo.jpg";
import bookCoverImage from "@assets/ART_SOUL_AND_AI_DR_BARRY_FERRIER__cover_1770190277724.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Brain, Palette, Cpu, Music2, Film, ArrowRight, ExternalLink, Quote, Play, Award } from "lucide-react";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";

const chapters = [
  {
    title: "The Dawn of Creative AI",
    description: "Exploring the emergence of artificial intelligence in artistic creation and its implications for human creativity.",
    icon: Brain,
  },
  {
    title: "40 Years at the Intersection",
    description: "A personal journey through four decades of pioneering work in electronic music, multimedia, and digital art.",
    icon: Music2,
  },
  {
    title: "The Fairlight Revolution",
    description: "How the Fairlight CMI changed music forever and lessons learned for today's AI revolution.",
    icon: Cpu,
  },
  {
    title: "AI Video Creation",
    description: "Practical insights from creating award-winning experimental films using AI technology.",
    icon: Film,
  },
  {
    title: "Soul in the Machine",
    description: "The philosophical and spiritual dimensions of creating art with artificial intelligence.",
    icon: Sparkles,
  },
  {
    title: "The Artist's Future",
    description: "Where human creativity meets machine learning, and what it means for tomorrow's artists.",
    icon: Palette,
  },
];

export default function Book() {
  usePageTitle("Art, Soul & AI", "Explore Doctor Baz's book on creativity in the age of artificial intelligence, combining 40+ years of pioneering multimedia experience.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Art, Soul & AI - The Book"
        description="Art, Soul and AI by Dr Barry Ferrier - a pioneering exploration of creativity at the threshold of machine imagination, written by an award-winning AI artist with 40+ years at the intersection of art and technology. Essential reading on AI innovation in the arts."
        url="/book"
        image={bookPromoImage}
        type="book"
        keywords="Art Soul and AI book, AI creativity book, AI innovation arts, artificial intelligence and art, AI art pioneer, machine imagination, future of creativity AI, technology and art intersection, electronic music history, Fairlight CMI, published author, PhD multimedia"
      />
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-magenta/10 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 70% 70%, hsl(320 90% 60% / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 30% 30%, hsl(280 85% 65% / 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left" className="order-2 lg:order-1">
              <TiltCard intensity={5}>
                <GlowingBorder color="magenta" animated>
                  <div className="relative max-w-xl mx-auto">
                    <div className="rounded-lg overflow-hidden shadow-2xl shadow-neon-magenta/20">
                      <img 
                        src={bookCoverImage} 
                        alt="Art, Soul and AI by Dr Barry Ferrier - Official Book Cover: The Human Spirit at the Threshold of the Machine Imagination"
                        className="w-full h-auto"
                        data-testid="img-book-cover"
                      />
                    </div>
                  </div>
                </GlowingBorder>
              </TiltCard>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="order-1 lg:order-2 space-y-8">
              <Badge className="bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30 animate-border-glow" data-testid="badge-available">
                <Sparkles className="w-3 h-3 mr-1" />
                Now Available
              </Badge>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight"
                data-testid="text-title"
              >
                <AnimatedGradientText>ART, SOUL & AI</AnimatedGradientText>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                A profound exploration of creativity in the age of artificial intelligence, 
                drawing on 40+ years of pioneering work at the intersection of art and technology.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Doctor Baz—PhD multimedia designer, award-winning composer, and AI video pioneer—shares 
                unique insights on where human creativity meets machine learning, and what it means for 
                the future of artistic expression.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">AI & Creativity</Badge>
                <Badge variant="secondary">Electronic Music History</Badge>
                <Badge variant="secondary">Multimedia Innovation</Badge>
                <Badge variant="secondary">Future of Art</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <Button className="bg-neon-magenta text-background group" data-testid="button-purchase">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Contact the Author
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-foreground/30 text-foreground group" data-testid="button-inquire">
                    Inquire About Speaking
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 mx-auto text-neon-magenta/50 mb-6" />
          <blockquote 
            className="text-2xl lg:text-3xl font-serif italic text-foreground/90 leading-relaxed mb-6"
            data-testid="quote-main"
          >
            "If art was once a window into the human soul, what happens when there's no soul behind 
            the glass?"
          </blockquote>
          <cite className="text-muted-foreground">— Doctor Baz, Art, Soul & AI</cite>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              From the Introduction
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-intro-title">
              The Questions We Must Ask
            </h2>
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              In the age of Artificial Intelligence, we might ask ourselves: <span className="text-foreground font-medium">What is art without a soul?</span> And what becomes of the soul when machines start making art? Is a song still a song when composed by code? Will art become more democratic—or dangerously commodified?
            </p>
            
            <p>
              When artificial intelligence agents can paint, compose, and create, we must ask the fundamental question—not as a philosophical riddle, but from the very human standpoint as a living, destabilising force that won't sit still. Is it the brushstroke or the impulse? The song—or the existential silence it interrupts?
            </p>

            <Card className="bg-card/50 border-neon-magenta/20 my-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neon-magenta" />
                  The Shockwave Moment
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I had begun working on a film concept about the Volunteer Fire Brigade in a small country town with my collaborator Ralph Tyrrell called 'Fireies'. Ralph had written lyrics for an introductory song about climate change—'Blazing Summer'. I fed them into the freshly minted 'Suno' generative AI music vending machine, expecting a quirky sketch, something obviously artificial and probably plain dumb.
                </p>
                <p className="text-foreground font-medium">
                  What emerged was a revelation. A polished, emotional piece that our years of devotion to the mysterious alchemy of songwriting had been re-contextualised, and, in that instant—massively challenged.
                </p>
              </CardContent>
            </Card>

            <p>
              It wasn't mimicry. It was something else. <span className="text-foreground font-medium">A voice from the future, yet singing in our key.</span> This was THE moment. The crack in the universe. The machine had transcended our expectations.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">What We Call "AI"</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We call it Artificial Intelligence, but what we're mostly interacting with today isn't intelligence. It's mimicry, wrapped in math. A shimmering facade of understanding, powered by pattern recognition and probability.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Synthetic cognition</li>
                    <li>• Automated intuition</li>
                    <li>• Statistical suggestion engines</li>
                    <li>• Predictive puppetry</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">AI: The Ultimate Tool</h4>
                  <p className="text-sm text-muted-foreground">
                    All tools are extensions of the human body. A hammer is a fist with more force. A telescope is an extended, more powerful eye. But AI is something different. It's not a muscle extender. It's a <span className="text-foreground">mind mirror</span>—a Swiss Army knife for cognition itself. We've outsourced memory before (books). We've outsourced calculation (calculators). But now, we're outsourcing judgement.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-neon-magenta/10 via-neon-purple/10 to-neon-cyan/10 border-neon-purple/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">The Eternal Questions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No matter how sophisticated AI becomes, certain questions will always require human answers: <span className="text-foreground">What are we here for? What does it mean to be alive in this moment?</span> How do we make sense of suffering, of love, of the passage of time? What do we owe each other? What do we owe ourselves? How do we find meaning in a universe that seems indifferent to our existence? These are the questions that drive the greatest art.
                </p>
              </CardContent>
            </Card>

            <p className="text-lg text-foreground font-medium text-center pt-4">
              The future of creativity isn't humans versus machines, but humans <em>with</em> machines—a collaboration between different kinds of intelligence that produces a new kind of art neither could create alone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 mb-4" data-testid="badge-project-sentinel">
              <Film className="w-3 h-3 mr-1" />
              Project Sentinel
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-video-title">
              You Have Been Warned
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The AI Revolution is upon us and will disrupt and change society even more than the advent of the World Wide Web. 
              Here is a short film by Dr Baz on the topic of AI and the future.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/RH-Sfu4otws?rel=0&modestbranding=1"
                title="You Have Been Warned by Dr Baz - The AI Revolution"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-ai-revolution"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-neon-magenta/20 via-neon-purple/20 to-neon-cyan/20 rounded-xl blur-xl -z-10" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Badge className="bg-gold/10 text-gold border-gold/20">
                <Award className="w-3 h-3 mr-1" />
                Semi-Finalist: Berlin Indie Film Awards
              </Badge>
              <Badge className="bg-gold/10 text-gold border-gold/20">
                <Award className="w-3 h-3 mr-1" />
                Semi-Finalist: Rio de Janeiro World Film Festival
              </Badge>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-4">
              A Film by Barry Ferrier © 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-chapters">
              What's Inside
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A journey through the past, present, and future of creative technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-card/50 border-border/50 hover-elevate overflow-visible"
                  data-testid={`card-chapter-${index}`}
                >
                  <CardContent className="p-6 space-y-4">
                    <Icon className="w-10 h-10 text-neon-magenta" />
                    <h3 className="font-semibold text-lg text-foreground">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{chapter.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/30 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground" data-testid="text-author">
                About the Author
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Doctor Baz</strong> (Barry Ferrier) is a multi-award 
                winning Australian artist with over 40 years of experience at the cutting edge of music 
                and technology. With a PhD in Multimedia Design, six N.C.E.I.A. Dolphin Awards, and 
                recognition as one of Australia's electronic music pioneers, he brings a unique perspective 
                to the conversation about AI and creativity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His recent work includes the award-winning experimental film "Entombed" (Best Experimental 
                Film, NY Arthouse Film Festival), created entirely using AI video technology—a practical 
                demonstration of the principles explored in this book.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gold/10 text-gold border-gold/20">PhD Multimedia</Badge>
                <Badge className="bg-gold/10 text-gold border-gold/20">6 Dolphin Awards</Badge>
                <Badge className="bg-gold/10 text-gold border-gold/20">40+ Years Experience</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-cyan" />
                    Perfect For
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-neon-magenta mt-1">•</span>
                      Artists exploring AI as a creative tool
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-magenta mt-1">•</span>
                      Musicians and composers interested in technology
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-magenta mt-1">•</span>
                      Filmmakers curious about AI video generation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-magenta mt-1">•</span>
                      Anyone interested in the future of creativity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-neon-magenta mt-1">•</span>
                      Students of multimedia and digital arts
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl lg:text-4xl font-serif font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, hsl(320 90% 65%), hsl(280 85% 70%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover what happens when art, soul, and artificial intelligence converge.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-neon-magenta text-background" size="lg" data-testid="button-get-book">
                <BookOpen className="w-4 h-4 mr-2" />
                Contact the Author
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/entombed">
              <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan" size="lg" data-testid="button-see-film">
                <Film className="w-4 h-4 mr-2" />
                See the Film
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
