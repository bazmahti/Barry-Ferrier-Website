import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Music, Globe, BookOpen, Users, ArrowRight, Download, Star, Film, Mic, Palette, Trophy } from "lucide-react";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard, StaggeredList } from "@/components/AnimatedElements";

import aboutHeroImage from "@assets/Barry_Ferrier-aka_Dr_Baz_1770247402990.jpg";

function HeroBanner() {
  return (
    <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
      <img
        src={aboutHeroImage}
        alt="About Doctor Baz"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-1/2 flex justify-center">
          <FadeIn direction="up">
            <div className="text-center px-4">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-lg" data-testid="text-about-title">
                <AnimatedGradientText>About Doctor Baz</AnimatedGradientText>
              </h1>
              <p className="text-xl text-white/90 max-w-lg mx-auto drop-shadow-md">
                Australian Musician • Award-Winning Composer • PhD Multimedia Designer • Byron Bay Cultural Pioneer
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProfessionalSummary() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <TiltCard intensity={3}>
            <GlowingBorder color="cyan" animated>
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-gold/10 text-gold border-gold/30">PhD in Multimedia Design</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">B.A. Psychology (Sydney Uni)</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">6 Dolphin Awards</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">Golden Reel Award</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">40+ Years Experience</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">Bond University Professor</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/30">120+ Shows Per Year</Badge>
                  </div>
            
            <p className="text-lg leading-relaxed text-foreground" data-testid="text-about-summary">
              Dr. Barry Ferrier, known professionally as Doctor Baz, is a distinguished Australian musician, composer, multimedia artist and AI video artist with over four decades of excellence in the performing arts. After completing a degree in Psychology at Sydney University, he began his professional career in the original production of Jesus Christ Superstar before going on to compose musicals, tour nationally and internationally, and pioneer electronic music with the Fairlight CMI at QPAC.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              Holding a PhD in Multimedia Design and having served as Assistant Professor of Multimedia at Bond University, Dr. Ferrier uniquely bridges artistic practice and academic rigor. He holds additional degrees in orchestral composition, performing arts (theatre directing), and web design. A six-time N.C.E.I.A. "Dolphin Award" winner (Best Blues Artist, Best Jazz Artist, and Best Music Video), and Golden Reel Award recipient, he has made significant contributions to Australian music, theatre, film, and digital media arts.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              His career highlights include touring as band leader for the legendary Eartha Kitt across all Australian capital cities, producing the original recordings for Jimmy Chi's hit indigenous musical "Bran Nue Dae", and opening for Ry Cooder at Melbourne's Palais Theatre. He appeared on ABC's iconic Countdown and Channel 9's Midday Show as an RCA recording artist, and has performed an average of 120 shows per year while maintaining a prolific career as a graphic designer with over 200 websites created.
            </p>
            
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="bg-gold text-white group" data-testid="button-download-cv">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full CV
                    </Button>
                    <Link href="/projects">
                      <Button variant="outline" className="group" data-testid="button-view-projects">
                        View Projects
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </GlowingBorder>
          </TiltCard>
        </FadeIn>
      </div>
    </section>
  );
}

function CareerTimeline() {
  const eras = [
    {
      period: "1970s",
      title: "Music Theatre & Touring",
      highlights: ["Jesus Christ Superstar (original cast)", "Lindsay Kemp Company - Salome", "Africa: the Savage Musical (national tour)", "The Astounding Optimissimos (Pram Factory)", "Toured with Jeff St John"],
      icon: Music,
    },
    {
      period: "1980s",
      title: "Byron Bay & Electronic Pioneer",
      highlights: ["Fairlight CMI at QPAC (1985)", "QPAC Resident Composer (5 years)", "Composed musicals with Frank Howson", "RCA recording artist (Countdown, Midday Show)", "Opened for Ry Cooder at Palais Theatre"],
      icon: Star,
    },
    {
      period: "1990s-2000s",
      title: "Academic, Tours & Indigenous Arts",
      highlights: ["Band leader for Eartha Kitt (national tour)", "Produced Bran Nue Dae recordings (CAAMA)", "NT Arts Council Aboriginal community tours", "PhD Multimedia Design (2004)", "Bond University Assistant Professor"],
      icon: GraduationCap,
    },
    {
      period: "2010s+",
      title: "Festival Circuit, Film & AI",
      highlights: ["6 Dolphin Awards + Golden Reel", "Bluesfest, Splendour in the Grass", "European tours (60+ shows)", "AI filmmaker - Entombed (Best Experimental Film)", "Published author - Art, Soul and AI"],
      icon: Award,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-timeline-title">Career Journey</h2>
          <p className="text-muted-foreground">Four decades of musical excellence and innovation</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eras.map((era, index) => {
            const Icon = era.icon;
            return (
              <Card key={index} className="hover-elevate overflow-visible" data-testid={`card-era-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold">{era.period}</span>
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold">{era.title}</h3>
                  <ul className="space-y-2">
                    {era.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CredentialsGrid() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Education",
      items: ["PhD - Multimedia Design, SCU (2004)", "B.A. - Psychology, Sydney University", "B.Litt. (Hons.) - Deakin University", "Dip. Orchestral Composition", "Dip. Performing Arts (Theatre Directing)", "Dip. I.T. (Web Design)", "Cert IV Workplace Training & Assessment"],
      link: "/academic",
    },
    {
      icon: Award,
      title: "Awards & Recognition",
      items: ["6 N.C.E.I.A. Dolphin Awards", "Best Blues Artist (Multiple)", "Best Jazz Artist (2007)", "Best Music Video (2008)", "Golden Reel Award", "A.S.E.A. Award for Excellence in the Arts", "Dip. I.T. (Web Design)", "Cert IV Workplace Training & Assessment"],
      link: "/awards",
    },
    {
      icon: Trophy,
      title: "International Film Awards",
      items: ["25 International Film Awards in 2 years", "Awards on 3 continents", "Best Experimental Film (NY Arthouse)", "Entombed - AI sci-fi feature", "Brushstrokes in Time - animated art series", "Multiple festival wins (Berlin, Florence)", "Vancouver International Film Festival Finalist"],
      link: "/award-videos",
    },
    {
      icon: Music,
      title: "Theatre & Musicals",
      items: ["Jesus Christ Superstar (original cast)", "Lindsay Kemp Company - Salome", "Africa: the Savage Musical (national tour)", "The Astounding Optimissimos (Pram Factory)", "Goodnight World (La Boite Theatre)"],
      link: "/history",
    },
    {
      icon: Mic,
      title: "Major Collaborations",
      items: ["Band leader for Eartha Kitt (national tour)", "Nathan Cavaleri (band leader)", "Opened for Ry Cooder (Palais Theatre)", "Norman Gunston Christmas Show tour", "RCA recording artist (Countdown, Midday Show)"],
      link: "/history",
    },
    {
      icon: BookOpen,
      title: "Teaching (30+ Years)",
      items: ["Bond University Asst. Professor", "Griffith University Lecturer", "Southern Cross University", "CQU Lecturer", "S.A.E. Institute Lecturer", "Kingscliff TAFE"],
      link: "/academic",
    },
    {
      icon: Globe,
      title: "Indigenous & Community Arts",
      items: ["Produced Bran Nue Dae recordings", "NT Arts Council community tours", "CAAMA Aboriginal music recording", "Pilgrim Brothers recordings", "Byron Bay cultural pioneer (40+ years)"],
      link: "/history",
    },
    {
      icon: Film,
      title: "Film & Composition",
      items: ["Moments of Cruelty (soundtrack)", "Green Tea (award-winning score)", "Entombed (AI experimental film)", "QPAC Resident Composer (5 years)", "Fairlight CMI electronic pioneer"],
      link: "/videos",
    },
    {
      icon: Star,
      title: "Festivals & Tours",
      items: ["Byron Bay Bluesfest (5 times)", "Splendour in the Grass (2013, 2018)", "Blues on Broadbeach (5 times)", "European Tours (60+ shows)", "Gold Coast International Jazz Festival (ABC live)"],
      link: "/history",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-credentials-title">Qualifications & Experience</h2>
          <p className="text-muted-foreground">A career spanning music, academia, and multimedia design</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <Card key={index} className="hover-elevate overflow-visible" data-testid={`card-credential-${index}`}>
                <CardContent className="p-6 space-y-4 flex flex-col h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold">{cred.title}</h3>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {cred.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {cred.link && (
                    <Link href={cred.link}>
                      <span className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors font-medium pt-2" data-testid={`link-credential-${index}`}>
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="space-y-6">
          <p className="text-xl lg:text-2xl font-serif italic text-foreground leading-relaxed" data-testid="text-pullquote">
            "A wonderful aspect of all the many shows and bands I have worked with is the great friends I have made. Over the years I have so enjoyed and valued knowing a fascinating cast of talented and quirky characters from the Australian performing arts industry."
          </p>
          <cite className="text-muted-foreground not-italic">— Barry Ferrier</cite>
        </blockquote>
      </div>
    </section>
  );
}

function CommunityImpact() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid="text-impact-title">Community Impact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Over 40 years in the Byron Bay region, Dr. Ferrier has been more than just a performer—he has been a cultural pillar, shaping the local music scene and inspiring generations of musicians.
            </p>
            <ul className="space-y-3">
              {[
                "Pioneered and shaped the Byron Bay music scene since 1980 (40+ consecutive years)",
                "Extensive Aboriginal community arts work across the Northern Territory",
                "Produced original recordings for Bran Nue Dae and Pilgrim Brothers (CAAMA)",
                "NT Arts Council touring to every Aboriginal settlement in the NT",
                "Taught and inspired students across 5 universities and TAFE",
                "Performed an average of 120 shows per year as a working musician",
                "Prolific graphic designer - created over 200 websites (Byron Bay Interactive)",
                "Collaborated with Indigenous artists (The Kukannari Show)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <Users className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-gold mb-2">40+</div>
                <div className="text-lg font-semibold">Years in Byron Bay</div>
                <div className="text-primary-foreground/70 text-sm">Pioneer of the local music scene</div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-1">5</div>
                  <div className="text-sm font-medium">Universities</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-1">120+</div>
                  <div className="text-sm font-medium">Shows/Year</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-1">200+</div>
                  <div className="text-sm font-medium">Websites</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  const services = [
    { title: "Music Performance", desc: "Solo entertainment, duo performances, weddings, corporate functions" },
    { title: "Composition", desc: "Film scores, documentary music, theatre compositions, commercial music" },
    { title: "Design & Media", desc: "Graphic design, website development, video production, copywriting" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-services-title">Professional Services</h2>
          <p className="text-muted-foreground">Available for a wide range of creative and professional engagements</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate overflow-visible" data-testid={`card-service-${index}`}>
              <CardContent className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/contact">
            <Button size="lg" className="bg-gold text-white" data-testid="button-contact-services">
              Enquire About Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  usePageTitle("About", "Meet Dr. Barry Ferrier (Doctor Baz): Award-winning Australian musician with PhD in multimedia design, 40+ years performing arts experience, former Professor at Bond University. Six-time Dolphin Award winner.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO 
        title="About Dr Barry Ferrier"
        description="Dr Barry Ferrier (Doctor Baz) - AI arts pioneer, award-winning AI filmmaker, and multimedia innovator with PhD in multimedia design. Early adopter of AI technology for creative arts, winning 27 international film awards for AI-generated work. Six-time Dolphin Award winner, former Bond University Professor, electronic music pioneer since 1985."
        url="/about"
        type="profile"
        keywords="AI arts pioneer, early adopter AI technology, AI innovation arts, PhD multimedia design, technology art fusion, generative AI artist, Lindsay Kemp, Jesus Christ Superstar, Bond University professor, Southern Cross University PhD, Fairlight CMI, QPAC, Dame Joan Sutherland, Peter Allen, Elton John, David Bowie, CAAMA, Bill Davis, Aboriginal community work, Ginny Bradley, Andrew Thomas Wilson"
      />
      <HeroBanner />
      <ProfessionalSummary />
      <CareerTimeline />
      <CredentialsGrid />
      <PullQuote />
      <CommunityImpact />
      <ServicesOverview />
    </main>
  );
}
