import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, Star, Globe, Theater, Tv, Disc, ArrowRight, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import type { HistoryItem } from "@shared/schema";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import jcsHeroImage from "@assets/Barry_Ferrier_Jesus_Chrst_Superstar_1770151597294.JPG";

const heroSlides = [
  {
    image: "https://barryferrier.com/images/Barry-Ferrier-2017.jpg",
    title: "History & Archives",
    subtitle: "A journey through 40+ years of music, theatre, and creative excellence"
  },
  {
    image: "https://barryferrier.com/images/Barry-Ferrier-2018.jpg",
    title: "From Theatre to Festival Stages",
    subtitle: "Jesus Christ Superstar, Lindsay Kemp Company, and beyond"
  },
  {
    image: "https://barryferrier.com/images/slideshow/Barry_Ferrier-7.jpg",
    title: "Award-Winning Performer",
    subtitle: "Six Dolphin Awards and decades of musical excellence"
  },
  {
    image: "https://barryferrier.com/images/slideshow/Barry_Ferrier-1.jpg",
    title: "Byron Bay Legend",
    subtitle: "Pioneer of the local music scene since the 1980s"
  },
  {
    image: "https://barryferrier.com/images/Barry-Ferrier-2015.jpg",
    title: "International Tours",
    subtitle: "60+ gigs in Norway, London performances, and worldwide acclaim"
  }
];

const theatreSlugs = [
  "jesus-christ-superstar",
  "joseph-dreamcoat",
  "africa-savage-musical",
  "astounding-optimissimos",
  "lindsay-kemp",
  "beach-1982",
  "goodnight-world",
  "dreams-and-machines",
  "three-legends-kra",
  "musical-theatre",
  "johnny-cash-tribute",
  "heaven-and-hell"
];

const theatreOrder: Record<string, number> = {
  "jesus-christ-superstar": 1,
  "joseph-dreamcoat": 2,
  "africa-savage-musical": 3,
  "astounding-optimissimos": 4,
  "lindsay-kemp": 5,
  "beach-1982": 6,
  "goodnight-world": 7,
  "dreams-and-machines": 8,
  "three-legends-kra": 9,
  "musical-theatre": 10,
  "johnny-cash-tribute": 11,
  "heaven-and-hell": 12
};

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <FadeIn direction="up">
          <div className="text-center px-4">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg" data-testid="text-history-title">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>
        </FadeIn>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Previous slide"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        aria-label="Next slide"
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-history-intro">
          Doctor Baz aka Barry Ferrier has had a long and interesting career in many facets of the entertainment industry, academia and multimedia design. Here are articles recounting highlights from that story.
        </p>
        <blockquote className="mt-6 text-foreground font-serif italic text-lg">
          "A wonderful aspect of all the many shows and bands I have worked with is the great friends I have made. Over the years I have so enjoyed and valued knowing a fascinating cast of talented and quirky characters from the Australian performing arts industry."
        </blockquote>
      </div>
    </section>
  );
}

function HistoryGrid() {
  const { data: historyItems, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ["/api/history"],
  });

  const defaultHistory = [
    {
      id: "africa", title: "Africa: The Savage Musical", slug: "africa-savage-musical", year: "1970s",
      description: "Steve J. Spears' madcap musical. Barry performed in this national campus tour alongside comedian Rodney Bain (Felix B. Tonto). A cult classic of the 70s theatre scene.",
      category: "theatre", order: 29,
      imageUrl: "/attached_assets/IMG_2498_1770238858471.jpeg"
    },
  ];

  const { theatreHistory, musicHistory } = React.useMemo(() => {
    const items = historyItems && historyItems.length > 0 ? historyItems : defaultHistory;
    
    const theatre = items
      .filter(item => theatreSlugs.includes(item.slug))
      .sort((a, b) => (theatreOrder[a.slug] || 99) - (theatreOrder[b.slug] || 99));
    
    const music = items
      .filter(item => !theatreSlugs.includes(item.slug))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return { theatreHistory: theatre, musicHistory: music };
  }, [historyItems]);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "theatre": return Theater;
      case "recording": return Disc;
      case "touring": return Globe;
      case "festivals": return Star;
      case "composition": return Music;
      case "design": return Star;
      default: return Music;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "theatre": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
      case "recording": return "bg-red-500/10 text-red-600 border-red-500/30";
      case "touring": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "festivals": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "composition": return "bg-orange-500/10 text-orange-600 border-orange-500/30";
      case "design": return "bg-pink-500/10 text-pink-600 border-pink-500/30";
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

  const getImageUrl = (item: any) => {
    const galleryStr = item.galleryImages || item.gallery_images;
    if (galleryStr) {
      try {
        const gallery = typeof galleryStr === 'string' ? JSON.parse(galleryStr) : galleryStr;
        if (Array.isArray(gallery) && gallery.length > 0) {
          const firstImage = gallery[0];
          if (firstImage.startsWith('/attached_assets')) {
            return firstImage;
          }
          if (firstImage.startsWith('http')) {
            return firstImage;
          }
          return `/api/objects/public/${firstImage}`;
        }
      } catch (e) {
        // Fall through to default image handling
      }
    }
    
    const imageUrl = item.imageUrl || item.image_url;
    if (imageUrl) {
      if (imageUrl.startsWith('/attached_assets') || imageUrl.startsWith('http')) {
        return imageUrl;
      }
      return `/api/objects/public/${imageUrl}`;
    }
    
    return "https://barryferrier.com/images/Barry-Ferrier-2017.jpg";
  };

  const renderHistoryCard = (item: any, index: number) => {
    const Icon = getCategoryIcon(item.category);
    const imageUrl = getImageUrl(item);
    return (
      <Link key={item.id} href={`/history/${item.slug}`}>
        <Card className="hover-elevate overflow-hidden cursor-pointer group h-full" data-testid={`card-history-${item.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img 
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <Badge className={getCategoryColor(item.category)}>
                <Icon className="w-3 h-3 mr-1" />
                {item.category}
              </Badge>
              <span className="text-sm font-medium text-gold bg-black/50 px-2 py-1 rounded">{item.year}</span>
            </div>
          </div>
          <CardContent className="p-4 space-y-3">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{item.description}</p>
            <div className="flex items-center text-sm text-primary font-medium pt-1">
              Read More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <>
      <section className="py-16 lg:py-24" id="academic-history">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid="text-academic-history-title">
                Academic
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              PhD in Multimedia Design, Bond University Professorship, and academic research.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/academic">
              <Card className="hover-elevate overflow-hidden cursor-pointer group h-full" data-testid="card-history-academic">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/attached_assets/IMG_2506_1770444964892.jpeg"
                    alt="PhD - Southern Cross University"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      academic
                    </Badge>
                    <span className="text-sm font-medium text-gold bg-black/50 px-2 py-1 rounded">2004</span>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">Academic Credentials</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">PhD in Multimedia Design from Southern Cross University, Bond University Professorship, and pioneering research in meta-art and multimedia technology.</p>
                  <div className="flex items-center text-sm text-primary font-medium pt-1">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" id="theatre-history">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Theater className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid="text-theatre-history-title">
                Theatre History
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From Jesus Christ Superstar to original musicals - a journey through the theatrical productions that shaped a career.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theatreHistory.map((item, index) => renderHistoryCard(item, index))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/20" id="music-history">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-8 h-8 text-gold" />
              <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid="text-music-history-title">
                Music History
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bands, collaborations, tours, and recordings - 40+ years of musical adventures across Australia and beyond.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicHistory.map((item, index) => renderHistoryCard(item, index))}
          </div>
        </div>
      </section>
    </>
  );
}

function LegacyCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-legacy-title">A Legacy of Excellence</h2>
        <p className="text-muted-foreground text-lg mb-8">
          From his debut on the stage of the legendary blockbuster "Jesus Christ Superstar" to the award-winning film festivals of today, Doctor Baz continues to bring passion and artistry to every performance and project.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/awards">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white min-w-[180px]" data-testid="button-view-awards">
              View Awards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-full-bio">
              Full Biography
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function History() {
  usePageTitle("History & Archives", "A journey through 40+ years of music, theatre, and creative excellence. From Jesus Christ Superstar to Byron Bay legend.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="History & Archives"
        description="A journey through 40+ years of music, theatre, and creative excellence. From Jesus Christ Superstar to Byron Bay legend."
        url="/history"
        keywords="career history, music career, performing arts, theatre, Lindsay Kemp Company, Oscar Wilde Salome, Roundhouse London, Jesus Christ Superstar, Johnny Cash tribute, Ilona Harker, Slim Pickens, Giant Steps band, Lisa Spence, Jen Anderson, CAAMA, Bill Davis, Ginny Bradley, Steve J Spears, Africa The Savage Musical, Gympie Muster, Tamworth Country Music Festival"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "History & Archives", url: "/history" }
        ])}
      />
      <HeroBanner />
      <IntroSection />
      <HistoryGrid />
      <LegacyCTA />
    </main>
  );
}
