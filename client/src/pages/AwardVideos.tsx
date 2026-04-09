import { useState } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trophy, ExternalLink, X, Calendar, Award, Film } from "lucide-react";
import { FadeIn, AnimatedGradientText, StaggeredList } from "@/components/AnimatedElements";
import { Button } from "@/components/ui/button";

import newYorkArthouse from "@/assets/laurels/new-york-arthouse.jpg";
import californiaIndies from "@/assets/laurels/california-indies.jpg";
import seattle from "@/assets/laurels/seattle.jpg";
import cannes from "@/assets/laurels/cannes.jpg";
import amsterdam from "@/assets/laurels/amsterdam.jpg";
import vienna from "@/assets/laurels/vienna.jpg";
import toronto from "@/assets/laurels/toronto.jpg";
import chicago from "@/assets/laurels/chicago.jpg";
import berlin from "@/assets/laurels/berlin.jpg";
import florence from "@/assets/laurels/florence.jpg";
import austin from "@/assets/laurels/austin-welcome.jpg";
import hollywoodDiscovery from "@/assets/laurels/hollywood-discovery-winner.jpg";
import nyIndependent from "@/assets/laurels/ny-independent-winner.jpg";
import niagara from "@/assets/laurels/niagara-winner.jpg";
import london from "@/assets/laurels/london.jpg";
import washington from "@assets/Washington_Film_Awards_Best_Music_Video_Barry_Ferrier_Welcome__1771544770816.jpg";
import philadelphia from "@assets/Philadelphia_Film_Awards_Best_Music_Video_Barry_Ferrier_Midnig_1771544779070.jpg";

interface AwardVideo {
  title: string;
  youtubeId: string;
  award: string;
  festival: string;
  duration: string;
  description?: string;
  laurel?: string;
  laurel2?: string;
}

const awardVideos: AwardVideo[] = [
  {
    title: "Welcome to Tomorrow: The Future is Now",
    youtubeId: "hZLAxGYygBc",
    award: "Best Music Video",
    festival: "California Indies Film Fest & Austin Art Fest",
    duration: "2:45",
    description: "A visionary journey into tomorrow's world.",
    laurel: californiaIndies,
    laurel2: austin
  },
  {
    title: "The Midnight Shift Till Dawn",
    youtubeId: "I4DtIleRMRM",
    award: "Best Music Video",
    festival: "Seattle Filmmaker Awards 2024",
    duration: "3:58",
    description: "Nocturnal tales of the working night.",
    laurel: seattle
  },
  {
    title: "ENTOMBED",
    youtubeId: "72NdBEjhTUY",
    award: "Best Experimental Film",
    festival: "New York Arthouse Film Festival 2023",
    duration: "2:04",
    description: "A haunting 30-minute sci-fi experimental film created entirely with AI video technology.",
    laurel: newYorkArthouse
  },
  {
    title: "The Sea Remembers",
    youtubeId: "QRXOBAuXf5E",
    award: "Best Animation & Best Environmental Film",
    festival: "Cannes Arts Fest & New York Shorts Fest",
    duration: "4:47",
    description: "An environmental meditation on our oceans.",
    laurel: cannes
  },
  {
    title: "Titanic Deckchairs",
    youtubeId: "3fmbN5az-fk",
    award: "Winner",
    festival: "Amsterdam Movie Fest",
    duration: "3:41",
    description: "The existential crisis facing humanity.",
    laurel: amsterdam
  },
  {
    title: "Echoes of the Future",
    youtubeId: "EuvTfowJeq0",
    award: "Winner",
    festival: "New York Shorts Film Fest",
    duration: "3:22",
    description: "Where are we heading? What have we become?",
    laurel: newYorkArthouse
  },
  {
    title: "Je veux te sentir",
    youtubeId: "WctipiDt9XU",
    award: "Best Erotic Short Film",
    festival: "Niagara Falls International Short Film Fest",
    duration: "3:09",
    description: "A sensual exploration of desire.",
    laurel: niagara
  },
  {
    title: "Dreamscape: Max Ernst",
    youtubeId: "c9--ohkI6A0",
    award: "Best Music Video",
    festival: "Vienna Short Film Fest",
    duration: "5:22",
    description: "The art of the great Max Ernst brought to life.",
    laurel: vienna
  },
  {
    title: "Living Sci Fi",
    youtubeId: "6VVpWoYw9TM",
    award: "Best Music Video 2024",
    festival: "Toronto Film & Script Awards",
    duration: "3:42",
    description: "A retro journey into the future.",
    laurel: toronto
  },
  {
    title: "The Painter's Sacred Flame: G F Watts",
    youtubeId: "Yv4kz0BwP5g",
    award: "Winner",
    festival: "Chicago Indie Film Fest",
    duration: "5:22",
    description: "G F Watts' mystical art brought to life.",
    laurel: chicago
  },
  {
    title: "Count Dracula's Mistress",
    youtubeId: "Ys0HNh_lGMM",
    award: "Official Selection",
    festival: "Multiple International Film Festivals",
    duration: "3:34",
    description: "A gothic music video about forbidden desire and the allure of darkness."
  },
  {
    title: "Dr Frankenstein's AI Monster",
    youtubeId: "PtuC0PDAyXA",
    award: "Best Music Video",
    festival: "Atlanta Cinema Awards, USA",
    duration: "5:27",
    description: "When science creates something beyond control."
  },
  {
    title: "Shaman's Frame - Embracing Impermanence",
    youtubeId: "2VPupCgSe6w",
    award: "Best Music Video",
    festival: "London International Film Festival",
    duration: "7:40",
    description: "A spiritual journey through impermanence.",
    laurel: london
  },
  {
    title: "Bailar con la luna",
    youtubeId: "eYslp6wdJdU",
    award: "Winner",
    festival: "New York Independent Cinema Award",
    duration: "3:58",
    description: "Beautiful Latin music by George Smilovici.",
    laurel: nyIndependent
  },
  {
    title: "21st Century Man",
    youtubeId: "K3IOT9fE8ts",
    award: "Best Music Video",
    festival: "Berlin International Short Film Festival",
    duration: "5:09",
    description: "A reflection on modern existence.",
    laurel: berlin
  },
  {
    title: "LYRA'S DREAM",
    youtubeId: "-VEo5UaIct8",
    award: "Best Music Video",
    festival: "Hollywood Discovery Awards 2024",
    duration: "3:40",
    description: "Haunting Latin guitar by George Smilovici.",
    laurel: hollywoodDiscovery
  },
  {
    title: "You Have Been Warned",
    youtubeId: "RH-Sfu4otws",
    award: "Official Selection",
    festival: "Multiple International Film Festivals",
    duration: "5:01",
    description: "This is the AI revolution."
  },
  {
    title: "Monsters in the Night",
    youtubeId: "KvuQ5oDYsrE",
    award: "Official Selection",
    festival: "International Film Festivals",
    duration: "4:17",
    description: "Facing your fears and inner demons."
  },
  {
    title: "The Way the Petals Fall",
    youtubeId: "KgfshoDq7t8",
    award: "Winner",
    festival: "Berlin & Florence Film Festivals",
    duration: "4:30",
    description: "A delicate meditation on beauty and impermanence.",
    laurel: florence
  },
];

function VideoCard({ video, index }: { video: AwardVideo; index: number }) {
  return (
    <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible group">
      <CardContent className="p-0">
        <div className="aspect-video bg-black rounded-t-lg overflow-hidden relative">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
            data-testid={`video-award-${index}`}
          />
          {video.laurel && (
            <div className="absolute bottom-2 right-2 w-20 h-20 pointer-events-none">
              <img 
                src={video.laurel} 
                alt={`${video.festival} Award`}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
          {video.laurel2 && (
            <div className="absolute bottom-2 left-2 w-20 h-20 pointer-events-none">
              <img 
                src={video.laurel2} 
                alt={`${video.festival} Award`}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start gap-2 mb-2">
            <Trophy className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
            <div>
              <Badge className="bg-gold/10 text-gold border-gold/30 text-xs mb-1">
                {video.award}
              </Badge>
              <p className="text-xs text-muted-foreground">{video.festival}</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{video.title}</h3>
          {video.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">{video.duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface LaurelInfo {
  img: string;
  name: string;
  year: string;
  category: string;
  description: string;
  films: string[];
}

function LaurelShowcase() {
  const [selectedLaurel, setSelectedLaurel] = useState<LaurelInfo | null>(null);

  const laurels: LaurelInfo[] = [
    { 
      img: newYorkArthouse, 
      name: "New York Arthouse Film Festival", 
      year: "2023",
      category: "Best Experimental Film",
      description: "Prestigious New York festival celebrating independent and experimental cinema. ENTOMBED won Best Experimental Film.",
      films: ["ENTOMBED", "Echoes of the Future"]
    },
    { 
      img: cannes, 
      name: "Cannes World Film Festival", 
      year: "2024",
      category: "Best Animation & Best Environmental Film",
      description: "International film festival recognizing excellence in world cinema and artistic achievement.",
      films: ["The Sea Remembers"]
    },
    { 
      img: berlin, 
      name: "Berlin Shorts Awards", 
      year: "2024",
      category: "Best Music Video",
      description: "German festival celebrating short-form cinema and music video artistry.",
      films: ["Rousseau: Transcendent Timeless Space"]
    },
    { 
      img: vienna, 
      name: "Vienna Short Film Festival", 
      year: "2024",
      category: "Best Music Video",
      description: "Austrian festival honoring excellence in short films and music videos.",
      films: ["Dreamscape: Max Ernst"]
    },
    { 
      img: seattle, 
      name: "Seattle Filmmaker Awards", 
      year: "2024",
      category: "Best Music Video",
      description: "Pacific Northwest festival recognizing innovative filmmaking and music video production.",
      films: ["The Midnight Shift Till Dawn"]
    },
    { 
      img: amsterdam, 
      name: "Amsterdam Movie Festival", 
      year: "2024",
      category: "Winner",
      description: "Dutch festival celebrating diverse international cinema and artistic vision.",
      films: ["Titanic Deckchairs"]
    },
    { 
      img: toronto, 
      name: "Toronto Film & Script Awards", 
      year: "2024",
      category: "Best Music Video",
      description: "Canadian festival honoring excellence in film and screenwriting.",
      films: ["Living Sci Fi"]
    },
    { 
      img: chicago, 
      name: "Chicago Indie Film Festival", 
      year: "2024",
      category: "Winner",
      description: "Midwest festival celebrating independent filmmaking and artistic innovation.",
      films: ["The Painter's Sacred Flame: G F Watts"]
    },
    { 
      img: hollywoodDiscovery, 
      name: "Hollywood Discovery Awards", 
      year: "2024",
      category: "Winner",
      description: "Los Angeles festival discovering new talent in filmmaking and video artistry.",
      films: ["Lyra's Dream"]
    },
    { 
      img: florence, 
      name: "Florence Film Awards", 
      year: "2024",
      category: "Best Music Video",
      description: "Italian festival celebrating cinema in the heart of Renaissance art.",
      films: ["Rousseau: Transcendent Timeless Space"]
    },
    { 
      img: austin, 
      name: "Austin Art Fest", 
      year: "2024",
      category: "Best Music Video",
      description: "Texas festival at the intersection of music, film, and interactive media.",
      films: ["Welcome to Tomorrow"]
    },
    { 
      img: niagara, 
      name: "Niagara Falls International Short Film Festival", 
      year: "2024",
      category: "Best Erotic Short Film",
      description: "Canadian-American festival celebrating short-form cinema.",
      films: ["Je veux te sentir"]
    },
    { 
      img: californiaIndies, 
      name: "California Indies Film Festival", 
      year: "2024",
      category: "Best Music Video",
      description: "West Coast festival championing independent filmmakers and artists.",
      films: ["Welcome to Tomorrow"]
    },
    { 
      img: london, 
      name: "London International Film Festival", 
      year: "2024",
      category: "Official Selection",
      description: "UK festival showcasing international cinema and emerging artists.",
      films: ["Shaman's Frame"]
    },
    { 
      img: nyIndependent, 
      name: "NY Independent Cinema Awards", 
      year: "2024",
      category: "Winner",
      description: "New York festival celebrating independent and innovative cinema.",
      films: ["Lyra's Dream"]
    },
    { 
      img: washington, 
      name: "Washington Film Awards", 
      year: "2026",
      category: "Best Music Video",
      description: "Washington DC festival recognizing excellence in filmmaking and music video production.",
      films: ["Welcome to Tomorrow"]
    },
    { 
      img: philadelphia, 
      name: "Philadelphia International Filmmaker Awards", 
      year: "2026",
      category: "Best Music Video",
      description: "Philadelphia festival honoring international filmmakers and artistic achievement.",
      films: ["The Midnight Shift Till Dawn"]
    },
  ];

  return (
    <>
      <div className="py-12 border-y border-gold/20 bg-gradient-to-r from-gold/5 via-transparent to-gold/5">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">Click a laurel to learn more</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {laurels.map((laurel, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedLaurel(laurel)}
                className="flex flex-col items-center cursor-pointer group"
                data-testid={`laurel-${i}`}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <img 
                    src={laurel.img} 
                    alt={laurel.name}
                    className="w-full h-full object-contain filter brightness-110 contrast-110"
                  />
                </div>
                <span className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {laurel.name.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedLaurel} onOpenChange={() => setSelectedLaurel(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {selectedLaurel && (
            <div className="relative">
              <button
                onClick={() => setSelectedLaurel(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
                data-testid="button-close-laurel"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 p-8 flex justify-center">
                <img 
                  src={selectedLaurel.img} 
                  alt={selectedLaurel.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedLaurel.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-gold/10 text-gold border-gold/30">
                      <Calendar className="w-3 h-3 mr-1" />
                      {selectedLaurel.year}
                    </Badge>
                    <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30">
                      <Award className="w-3 h-3 mr-1" />
                      {selectedLaurel.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedLaurel.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Film className="w-4 h-4 text-gold" />
                    Winning Films
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLaurel.films.map((film, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {film}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AwardVideos() {
  usePageTitle("Award-Winning Videos");

  return (
    <>
      <SEO 
        title="Award-Winning Videos | Doctor Baz"
        description="27 international film festival awards across 19 AI-generated videos by pioneering AI artist Barry Ferrier. Internationally recognised for innovation in AI filmmaking, with wins at New York Arthouse, Cannes Arts Fest, Berlin, Vienna, Seattle, and festivals on three continents."
        url="/award-videos"
        keywords="award-winning AI videos, AI-generated film awards, international film festivals, AI filmmaking recognition, AI innovation arts awards, New York Arthouse, Cannes Arts Fest, Berlin film festival, Vienna film festival, Seattle film festival, Rousseau, Gauguin, Klimt, Dali, Namatjira, Drysdale, Entombed, Brushstrokes in Time, pioneering AI art"
      />

      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-background via-background to-gold/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <FadeIn direction="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-gold/10 text-gold border-gold/30 mb-4">
              <Trophy className="w-3 h-3 mr-1" />
              International Recognition
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4">
              <AnimatedGradientText>Award-Winning Videos</AnimatedGradientText>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              27 international film festival awards across 19 music videos and short films, with several winning multiple awards at festivals worldwide
            </p>
          </div>
        </FadeIn>
      </section>

      <LaurelShowcase />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These 19 videos have collectively won 27 international film festival awards, with several films recognised at multiple festivals. 
              Created by Australian video artist and composer Barry Ferrier (Doctor Baz).
            </p>
          </div>

          <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awardVideos.map((video, index) => (
              <VideoCard key={video.youtubeId} video={video} index={index} />
            ))}
          </StaggeredList>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              © 2024 All videos created by Australian video artist and composer Barry Ferrier
            </p>
            <a 
              href="https://youtube.com/playlist?list=PL-H2G0rnnqqU_x0ll4x1EuRtVaZnjEnal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View Full Playlist on YouTube
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
