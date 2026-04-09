import * as React from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music2, ExternalLink, Disc3, Sparkles, Guitar, Theater, Palette, ChevronLeft, ChevronRight, Headphones } from "lucide-react";
import { SiSpotify, SiApplemusic, SiTidal } from "react-icons/si";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard, StaggeredList } from "@/components/AnimatedElements";

interface Album {
  title: string;
  artist: string;
  bandcampUrl: string;
  imageUrl: string;
  description?: string;
  price?: string;
}

const sunreelAlbums: Album[] = [
  {
    title: "The Epstein Files",
    artist: "S'uNReel",
    bandcampUrl: "https://drbaz.bandcamp.com/album/the-epstein-files-the-sunreel-glitch-pop-album",
    imageUrl: "https://f4.bcbits.com/img/a3964927261_16.jpg",
    description: "The S'uNReel Glitch Pop Album - A cutting commentary on power and corruption.",
  },
  {
    title: "If Words Could Burn",
    artist: "S'uNReel featuring Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/if-words-could-burn-the-sunreel-hip-hop-album",
    imageUrl: "https://f4.bcbits.com/img/a0977292834_16.jpg",
    description: "The S'uNReel Hip Hop Album - Powerful lyrics meet urban beats.",
  },
  {
    title: "Dancing on the Edge of the Precipice",
    artist: "S'uNReel featuring Dr Baz and Ralph Lycett Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/dancing-on-the-edge-of-the-precipice-the-sunreel-gyspy-jazz-album",
    imageUrl: "https://f4.bcbits.com/img/a3398126712_16.jpg",
    description: "The S'uNReel Gypsy Jazz Album - Django-inspired swing and virtuosity.",
  },
  {
    title: "Irresistible Connection",
    artist: "S'uNReel featuring Dr Baz & Ralph Lycett Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/irresistable-connection-the-sunreel-r-b-chill-album",
    imageUrl: "https://f4.bcbits.com/img/a1309051297_16.jpg",
    description: "The S'uNReel R&B Chill Album - Smooth grooves and soulful vibes.",
  },
  {
    title: "Famous Last Words",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/famous-last-words-the-sunreel-reggae-album",
    imageUrl: "https://f4.bcbits.com/img/a4043231888_16.jpg",
    description: "The S'uNReel Reggae Album - Island rhythms with conscious lyrics.",
  },
  {
    title: "Cactus in a Cowboy Hat",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/cactus-in-a-cowboy-hat-the-sunreel-country-album",
    imageUrl: "https://f4.bcbits.com/img/a0025598103_16.jpg",
    description: "The S'uNReel Country Album - Dusty roads and heartfelt stories.",
  },
  {
    title: "Distractions",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/distractions-the-sunreel-alternative-album",
    imageUrl: "https://f4.bcbits.com/img/a2609354590_16.jpg",
    description: "The S'uNReel Alternative Album - Eclectic sounds and unexpected turns.",
  },
  {
    title: "I Want To Feel You",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/i-want-to-feel-you-the-sunreel-pop-electronica-album",
    imageUrl: "https://f4.bcbits.com/img/a0811331923_16.jpg",
    description: "The S'uNReel Pop Electronica Album - Synth-driven modern pop.",
  },
  {
    title: "Looking Up At The Stars",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/looking-up-at-the-stars-the-sunreel-pop-album",
    imageUrl: "https://f4.bcbits.com/img/a3517075046_16.jpg",
    description: "The S'uNReel Pop Album - Catchy melodies and cosmic dreams.",
  },
  {
    title: "Stay Classy",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/stay-classy-the-sunreel-retro-swing-album",
    imageUrl: "https://f4.bcbits.com/img/a1717775600_16.jpg",
    description: "The S'uNReel Retro Swing Album - Big band era elegance meets modern flair.",
  },
  {
    title: "S'UnReel",
    artist: "S'uNReel featuring Dr Baz & Ralph Tyrrell",
    bandcampUrl: "https://drbaz.bandcamp.com/album/sunreel-2",
    imageUrl: "https://f4.bcbits.com/img/a1302644226_16.jpg",
    description: "The original S'uNReel album - Where it all began.",
  },
];

const drBazAlbums: Album[] = [
  {
    title: "Welcome to Tomorrow",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/welcome-to-tomorrow",
    imageUrl: "https://f4.bcbits.com/img/a3513835621_16.jpg",
    description: "A journey through time and consciousness with tracks like '21st Century Man' and 'Time Travellers'.",
  },
  {
    title: "Nightfall on the City",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/nightfall-on-the-city",
    imageUrl: "https://f4.bcbits.com/img/a0097341912_16.jpg",
    description: "Urban nocturnal tales featuring 'The New Voodoo', 'Tragedy Queen', and 'The Cockroach Blues'.",
  },
  {
    title: "Poco Loco",
    artist: "Barry Ferrier aka Dr. Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/poco-loco",
    imageUrl: "https://f4.bcbits.com/img/a3898788719_16.jpg",
    description: "A little bit crazy - eclectic songwriting at its finest.",
  },
  {
    title: "Runaway Train",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/runaway-train",
    imageUrl: "https://f4.bcbits.com/img/a1413034344_16.jpg",
    description: "Full steam ahead with powerful rock and blues-infused tracks.",
  },
  {
    title: "Doctor Baz",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/doctor-baz",
    imageUrl: "https://f4.bcbits.com/img/a0702498795_16.jpg",
    description: "The self-titled album showcasing the breadth of Dr Baz's musical vision.",
  },
];

const artMusicAlbums: Album[] = [
  {
    title: "Brushstrokes in Time - The Living Canvas",
    artist: "Dr Baz & S'UnReel",
    bandcampUrl: "https://drbaz.bandcamp.com/album/brushstrokes-in-time-the-living-canvas",
    imageUrl: "https://f4.bcbits.com/img/a1235098922_16.jpg",
    description: "Award-winning musical tributes to great artists: Dalí, Klimt, Rothko, Namatjira, Drysdale and more.",
  },
  {
    title: "Meditations for Classical Guitar",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/album/meditations-for-classical-guitar",
    imageUrl: "https://f4.bcbits.com/img/a3392878005_16.jpg",
    description: "Contemplative classical guitar pieces for relaxation and reflection.",
  },
  {
    title: "Road to Amata",
    artist: "Dr Baz",
    bandcampUrl: "https://drbaz.bandcamp.com/track/road-to-amata",
    imageUrl: "https://f4.bcbits.com/img/a0720076708_16.jpg",
    description: "A musical journey through the Australian outback.",
  },
];

const theatricalAlbums: Album[] = [
  {
    title: "I Hear That Train a-Comin': The Johnny Cash Story",
    artist: "Dr. Baz aka Barry Ferrier",
    bandcampUrl: "https://drbaz.bandcamp.com/album/i-hear-that-train-a-comin-the-johnny-cash-story",
    imageUrl: "https://f4.bcbits.com/img/a0695150466_16.jpg",
    description: "A theatrical tribute to The Man in Black featuring Ring of Fire, Walk the Line, Folsom Prison Blues and more.",
  },
  {
    title: "Eve the Musical",
    artist: "S'UnReel",
    bandcampUrl: "https://drbaz.bandcamp.com/album/eve-the-musical",
    imageUrl: "https://f4.bcbits.com/img/a0565316698_16.jpg",
    description: "Original musical theatre - a dramatic exploration of the first woman.",
  },
  {
    title: "Fireies the Musical",
    artist: "S'UnReel",
    bandcampUrl: "https://drbaz.bandcamp.com/album/fireies-the-musical",
    imageUrl: "https://f4.bcbits.com/img/a3819676182_16.jpg",
    description: "A tribute to Australia's volunteer fire brigades and the climate crisis.",
  },
  {
    title: "From the Vault: Covers of Dr. Baz Songs",
    artist: "Various Artists",
    bandcampUrl: "https://drbaz.bandcamp.com/album/from-the-vault-covers-of-dr-baz-songs",
    imageUrl: "https://f4.bcbits.com/img/a3546393150_16.jpg",
    description: "Songs composed by Barry Ferrier, performed by various artists.",
  },
];

function AlbumCard({ album }: { album: Album }) {
  return (
    <Card className="bg-card/50 border-border/50 hover-elevate overflow-visible group">
      <CardContent className="p-0">
        <a 
          href={album.bandcampUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
          data-testid={`link-album-${album.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        >
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img 
              src={album.imageUrl} 
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-neon-cyan transition-colors">
              {album.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{album.artist}</p>
            {album.description && (
              <p className="text-xs text-muted-foreground/80 line-clamp-2">{album.description}</p>
            )}
            <div className="flex items-center gap-1 text-neon-cyan text-sm pt-2">
              <span>Listen on Bandcamp</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
}

function AlbumSection({ 
  title, 
  description, 
  albums, 
  icon: Icon,
  badgeColor = "neon-cyan",
  sectionId
}: { 
  title: string; 
  description: string; 
  albums: Album[]; 
  icon: React.ElementType;
  badgeColor?: string;
  sectionId?: string;
}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    handleScroll();
  }, [albums]);

  return (
    <section className="py-12 lg:py-16" id={sectionId}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className={`bg-${badgeColor}/20 text-${badgeColor} border-${badgeColor}/30 mb-4`}>
            <Icon className="w-3 h-3 mr-1" />
            {albums.length} Albums
          </Badge>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl">{description}</p>
        </div>
        
        <div className="relative">
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-colors"
              aria-label="Scroll left"
              data-testid="button-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-colors"
              aria-label="Scroll right"
              data-testid="button-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            {albums.map((album, index) => (
              <div key={index} className="flex-shrink-0 w-[160px] md:w-[200px] lg:w-[220px]">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 gap-1">
            <span className="text-xs text-muted-foreground">Scroll to see more albums</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Music() {
  usePageTitle("Music", "Explore Doctor Baz's extensive discography spanning multiple genres - from AI-generated S'uNReel albums to theatrical productions and classical guitar.");

  return (
    <main className="min-h-screen">
      <SEO 
        title="Music - 23 Albums Discography"
        description="Explore Doctor Baz's 23 albums on Bandcamp spanning electronic, glitch pop, gypsy jazz, R&B, reggae, country, classical guitar, and theatrical productions. Featuring the S'uNReel AI-generated music series and award-winning Brushstrokes in Time - pioneering AI-assisted composition."
        url="/music"
        type="music.playlist"
        keywords="Bandcamp discography, 23 albums, AI-generated music, AI music composition, electronic music, glitch pop, gypsy jazz, R&B, reggae, country, classical guitar, SuNReel AI music, Brushstrokes in Time, Fairlight CMI, Dreams and Machines, AI music pioneer"
      />
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-neon-purple/10 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 70% 70%, hsl(280 85% 65% / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 30% 30%, hsl(320 90% 60% / 0.15) 0%, transparent 50%)
            `,
          }}
        />
        
        <FadeIn direction="up">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 mb-6 animate-border-glow" data-testid="badge-discography">
              <Music2 className="w-3 h-3 mr-1" />
              23 Albums Available
            </Badge>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6"
              data-testid="text-title"
            >
              <AnimatedGradientText>DISCOGRAPHY</AnimatedGradientText>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              A lifetime of music spanning genres from electronic and glitch pop to gypsy jazz, 
              theatrical productions, and classical guitar. Available for digital download on Bandcamp.
            </p>

            <a href="https://drbaz.bandcamp.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-neon-purple text-background group" size="lg" data-testid="button-bandcamp">
                <Disc3 className="w-4 h-4 mr-2" />
                Visit Bandcamp Store
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-border/50">
        <AlbumSection
          title="Dr Baz Solo Albums"
          description="Original compositions showcasing Barry Ferrier's distinctive songwriting voice—urban tales, philosophical musings, and rock-infused storytelling from 40+ years of musical exploration."
          albums={drBazAlbums}
          icon={Guitar}
          badgeColor="neon-cyan"
        />
      </div>

      <div className="border-t border-border/50 bg-card/20">
        <AlbumSection
          title="Art & Instrumental"
          description="Musical tributes to great visual artists and contemplative instrumental works. The award-winning 'Brushstrokes in Time' series brings paintings to life through original compositions."
          albums={artMusicAlbums}
          icon={Palette}
          badgeColor="gold"
        />
      </div>

      <div className="border-t border-border/50">
        <AlbumSection
          title="S'uNReel - Collaborations with Lyricist Ralph Lycett Tyrrell"
          description="A groundbreaking collaboration between human creativity and artificial intelligence. Each album explores a different genre, from glitch pop to gypsy jazz, demonstrating the remarkable possibilities of AI-assisted music creation."
          albums={sunreelAlbums}
          icon={Sparkles}
          badgeColor="neon-magenta"
          sectionId="sunreel-collaborations"
        />
      </div>

      <div className="border-t border-border/50 bg-card/20">
        <AlbumSection
          title="Theatrical & Tribute Albums"
          description="From the acclaimed Johnny Cash tribute show to original musicals, these albums capture the theatrical flair that runs through all of Dr Baz's work."
          albums={theatricalAlbums}
          icon={Theater}
          badgeColor="neon-purple"
        />
      </div>

      <section className="py-16 lg:py-24 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
            Get the Complete Collection
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            All 23 albums are available as a discounted bundle on Bandcamp. 
            High-quality digital downloads in MP3, FLAC, and more.
          </p>
          <a href="https://drbaz.bandcamp.com/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-neon-cyan text-background" size="lg" data-testid="button-full-discography">
              <Music2 className="w-4 h-4 mr-2" />
              Browse Full Discography
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-border/50 bg-gradient-to-b from-card/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <Badge className="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 mb-4">
              <Headphones className="w-3 h-3 mr-1" />
              Stream Everywhere
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
              Listen on Your Favourite Platform
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dr Baz music is available on all major streaming platforms. Choose your preferred service below.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <a href="https://open.spotify.com/artist/4sdQyhiMXBQZOYmqV8x6fz" target="_blank" rel="noopener noreferrer" data-testid="link-spotify">
              <Card className="hover-elevate overflow-visible p-6 flex flex-col items-center gap-3 h-full">
                <SiSpotify className="w-10 h-10 text-[#1DB954]" />
                <span className="font-medium text-sm">Spotify</span>
              </Card>
            </a>
            <a href="https://music.apple.com/us/artist/barry-ferrier-aka-dr-baz/1134873953" target="_blank" rel="noopener noreferrer" data-testid="link-apple-music">
              <Card className="hover-elevate overflow-visible p-6 flex flex-col items-center gap-3 h-full">
                <SiApplemusic className="w-10 h-10 text-[#FA243C]" />
                <span className="font-medium text-sm">Apple Music</span>
              </Card>
            </a>
            <a href="https://tidal.com/artist/7998370" target="_blank" rel="noopener noreferrer" data-testid="link-tidal">
              <Card className="hover-elevate overflow-visible p-6 flex flex-col items-center gap-3 h-full">
                <SiTidal className="w-10 h-10 text-foreground" />
                <span className="font-medium text-sm">Tidal</span>
              </Card>
            </a>
            <a href="https://www.deezer.com/album/13655436" target="_blank" rel="noopener noreferrer" data-testid="link-deezer">
              <Card className="hover-elevate overflow-visible p-6 flex flex-col items-center gap-3 h-full">
                <Disc3 className="w-10 h-10 text-[#A238FF]" />
                <span className="font-medium text-sm">Deezer</span>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
