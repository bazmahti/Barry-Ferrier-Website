import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Star, Music, Trophy, Medal, ArrowRight, Film } from "lucide-react";
import type { Award as AwardType } from "@shared/schema";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import awardsHeroImage from "@assets/About_Barry_Ferrier_1770247305469.jpg";

function HeroBanner() {
  return (
    <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
      <img
        src={awardsHeroImage}
        alt="Awards & Recognition"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-1/2 flex justify-center">
          <FadeIn direction="up">
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Star className="w-10 h-10 text-gold animate-pulse" />
                <h1 className="text-4xl lg:text-6xl font-serif font-bold drop-shadow-lg" data-testid="text-awards-title">
                  <AnimatedGradientText>Awards & Recognition</AnimatedGradientText>
                </h1>
                <Star className="w-10 h-10 text-gold animate-pulse" />
              </div>
              <p className="text-xl text-white/90 max-w-lg mx-auto drop-shadow-md">
                A lifetime of musical excellence recognized by industry peers
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FeaturedAward() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card border-gold/20 shadow-xl">
          <CardContent className="p-8 lg:p-12 text-center space-y-6">
            <div className="flex justify-center">
              <img 
                src="/api/objects/public/images/dolphin-award.jpg" 
                alt="N.C.E.I.A. Dolphin Award Trophy" 
                className="w-48 h-auto object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-2" data-testid="text-featured-award">
                Six N.C.E.I.A. "Dolphin Awards"
              </h2>
              <p className="text-xl text-muted-foreground">
                Northern Coastal Entertainment Industry Association
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-gold text-white text-base px-4 py-1.5">Best Blues Artist</Badge>
              <Badge className="bg-gold text-white text-base px-4 py-1.5">Best Jazz Artist</Badge>
              <Badge className="bg-gold text-white text-base px-4 py-1.5">Best Music Video</Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dr. Baz has received six Dolphin Awards, the premier recognition for entertainment excellence in the Northern NSW coastal region, including multiple wins for Best Blues Artist, Best Jazz Artist, and the 2008 Best Music Video award.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function AwardsGrid() {
  const { data: awards, isLoading } = useQuery<AwardType[]>({
    queryKey: ["/api/awards"],
  });

  const defaultAwards = [
    {
      id: "1", title: "Dolphin Award - Best Blues Artist", description: "N.C.E.I.A. recognition for outstanding blues performance and contribution to the Northern NSW music scene.", year: "Multiple Years", category: "music", order: 0, link: "/history/slim-pickens-dr-baz"
    },
    {
      id: "2", title: "Dolphin Award - Best Jazz Artist", description: "Recognition of excellence in jazz performance across the Northern NSW entertainment industry.", year: "Multiple Years", category: "music", order: 1, link: "/history/pete-c-dr-baz"
    },
    {
      id: "3", title: "Multicultural Award - Green Tea", description: "Department of Ethnic Affairs award for the culturally sensitive and artistically significant score for 'Green Tea'.", year: "1990s", category: "composition", order: 2, link: "/history/dreams-and-machines"
    },
    {
      id: "4", title: "PhD in Multimedia Design", description: "Doctoral degree from Southern Cross University, exploring concepts of meta-art and synthesis of the arts through multimedia technology.", year: "2004", category: "academic", order: 3, link: "/about"
    },
    {
      id: "5", title: "Bond University Professorship", description: "Appointed Assistant Professor of Multimedia at the prestigious Bond University, Gold Coast.", year: "2000s", category: "academic", order: 4, link: "/about"
    },
    {
      id: "6", title: "Byron Bay Bluesfest Featured Artist", description: "Selected performer at Australia's premier blues and roots festival, performing 5 times over multiple years.", year: "Multiple Years", category: "festivals", order: 5, link: "/history/festivals-events"
    },
    {
      id: "7", title: "Splendour in the Grass", description: "Featured performer at Australia's largest contemporary music festival, appearing in 2013 and 2018.", year: "2013, 2018", category: "festivals", order: 6, link: "/history/festivals-events"
    },
    {
      id: "8", title: "Salome - 18 Month Sell-Out", description: "Composer for Lindsay Kemp Company's production of Oscar Wilde's Salome at London's Roundhouse - an outstanding 18-month sell-out run.", year: "Late 1970s", category: "theatre", order: 7, link: "/history/lindsay-kemp"
    },
    {
      id: "9", title: "Golden Reel Award", description: "Award for community radio excellence. A radio series produced in collaboration with Bill Davis, broadcast on C.A.A.M.A. (Central Australian Aboriginal Media Association).", year: "2000s", category: "composition", order: 8, link: "/history"
    },
    {
      id: "10", title: "Dolphin Award - Best Music Video", description: "N.C.E.I.A. recognition for outstanding achievement in music video production.", year: "2008", category: "music", order: 9, link: "/videos"
    },
    {
      id: "11", title: "A.S.E.A. Award for Excellence in the Arts", description: "Australian Society for Excellence in the Arts award for the children's theatre production 'Solomon and the Big Cat', composed during tenure as resident composer at QPAC, Brisbane.", year: "Mid-1980s", category: "theatre", order: 10, link: "/history"
    },
    {
      id: "12", title: "27 International Film Awards", description: "In just two years, Barry Ferrier has won 27 international film festival awards across 19 videos on three continents, with several films winning multiple awards for his AI-generated experimental films including Entombed and Brushstrokes in Time.", year: "2024-2025", category: "film", order: 11, link: "/award-videos"
    },
  ];

  const displayAwards = awards && awards.length > 0 ? awards : defaultAwards;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "music": return Music;
      case "composition": return Medal;
      case "academic": return Award;
      case "festivals": return Star;
      case "theatre": return Trophy;
      case "film": return Film;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "music": return "bg-gold/10 text-gold border-gold/30";
      case "composition": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
      case "academic": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "festivals": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "theatre": return "bg-red-500/10 text-red-600 border-red-500/30";
      case "film": return "bg-cyan-500/10 text-cyan-600 border-cyan-500/30";
      default: return "bg-gold/10 text-gold border-gold/30";
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Recognition & Achievements</h2>
          <p className="text-muted-foreground">A career of distinction across music, academia, and the arts</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAwards.map((award: any, index) => {
            const Icon = getCategoryIcon(award.category);
            const link = award.link || (award.category === "film" ? "/award-videos" : null);
            const cardContent = (
              <Card className="hover-elevate overflow-visible h-full cursor-pointer group" data-testid={`card-award-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(award.category)}>
                      <Icon className="w-3 h-3 mr-1" />
                      {award.category}
                    </Badge>
                    {award.year && <span className="text-sm font-medium text-gold">{award.year}</span>}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{award.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{award.description}</p>
                  {link && (
                    <div className="flex items-center text-sm text-primary font-medium pt-1">
                      View Award-Winning Videos
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
            
            return link ? (
              <Link key={award.id} href={link}>
                {cardContent}
              </Link>
            ) : (
              <div key={award.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AcademicExcellence() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid="text-academic-title">Academic Excellence</h2>
            <p className="text-muted-foreground leading-relaxed">
              Beyond the stage, Dr. Ferrier has built an impressive academic career, contributing to the education of the next generation of multimedia artists and musicians.
            </p>
            <ul className="space-y-3">
              {[
                "PhD in Multimedia Design - Southern Cross University (2004)",
                "B.Litt. (Honours) - Deakin University (1987)",
                "B.A. Psychology - University of Sydney",
                "Diploma of Music Composition - Southern Cross University",
                "Assistant Professor - Bond University",
                "Lecturer at Griffith, SCU, CQU, TAFE",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <Award className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold mb-2">5</div>
                <div className="font-semibold">Universities</div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold mb-2">PhD</div>
                <div className="font-semibold">Multimedia</div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold mb-2">200+</div>
                <div className="font-semibold">Websites</div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold mb-2">40+</div>
                <div className="font-semibold">Years Teaching</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-contact-cta-title">Work With an Award-Winner</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Bring the same excellence that has earned these accolades to your next event or project.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white min-w-[180px]" data-testid="button-book-artist">
              Book Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-learn-more">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Awards() {
  usePageTitle("Awards & Recognition", "Doctor Baz has won six N.C.E.I.A. Dolphin Awards including Best Blues Artist and Best Jazz Artist. PhD in Multimedia Design.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="Awards & Recognition"
        description="Doctor Baz has won six N.C.E.I.A. Dolphin Awards including Best Blues Artist and Best Jazz Artist. PhD in Multimedia Design."
        url="/awards"
        keywords="Dolphin Award, NCEIA awards, music awards, best blues artist, best jazz artist, Australian music awards, 27 international film awards, New York Arthouse, Cannes Arts Fest, Berlin, Vienna, Lindsay Kemp, Oscar Wilde Salome, Bond University, Southern Cross University PhD"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Awards & Recognition", url: "/awards" }
        ])}
      />
      <HeroBanner />
      <FeaturedAward />
      <AwardsGrid />
      <AcademicExcellence />
      <ContactCTA />
    </main>
  );
}
