import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import type { Video } from "@shared/schema";
import { FadeIn, AnimatedGradientText } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";

function HeroBanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <FadeIn direction="up">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 mb-6">
            <Zap className="w-3 h-3 mr-1" />
            Fairlight CMI Pioneer
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-white" data-testid="text-electronic-title">
            <AnimatedGradientText>Electronic Music</AnimatedGradientText>
          </h1>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto mb-8">
            Pioneering electronic compositions from the 1980s featuring the legendary Fairlight CMI
          </p>
          <Link href="/videos">
            <Button variant="outline" className="border-purple-400/50 text-purple-200 hover:bg-purple-800/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Videos
            </Button>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-purple-900/10 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6">Dreams & Machines Era</h2>
        <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
          <p>
            In September 1985, Barry Ferrier premiered "Dreams & Machines" at the Queensland Performing Arts Complex Concert Hall - 
            a groundbreaking multimedia performance featuring the cutting-edge Fairlight CMI IIX and the newly released Fairlight Video Instrument (CVI).
          </p>
          <p>
            These recordings represent some of Australia's earliest electronic music compositions, created on one of the world's 
            first digital sampling synthesizers. Barry was commissioned by the Queensland Performing Arts Trust to showcase 
            state-of-the-art digital technology in a performing arts context.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">Fairlight CMI IIX</Badge>
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">QPAC Concert Hall 1985</Badge>
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">National Film & Sound Archive</Badge>
        </div>
      </div>
    </section>
  );
}

function ElectronicVideoGrid() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const electronicVideos = videos?.filter(v => v.category === 'electronic') || [];

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
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
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Electronic Compositions</h2>
          <p className="text-muted-foreground">Click any video to play</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {electronicVideos.map((video, index) => (
            <Card key={video.id} className="overflow-hidden group" data-testid={`card-electronic-video-${index}`}>
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid={`video-electronic-${index}`}
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Electronic
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg">{video.title}</h3>
                <p className="text-muted-foreground text-sm">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DreamsAndMachinesCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-900/10 via-purple-800/5 to-purple-900/10 border-y border-purple-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Explore Dreams & Machines</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Learn more about this groundbreaking 1985 multimedia performance at QPAC Concert Hall, 
          featuring the Fairlight CMI and Video Instrument.
        </p>
        <Link href="/history/dreams-and-machines">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            View Full History
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default function ElectronicMusic() {
  usePageTitle("Electronic Music", "Pioneering electronic compositions from the 1980s featuring the Fairlight CMI by Barry Ferrier.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="Electronic Music"
        description="Pioneering electronic compositions from the 1980s featuring the Fairlight CMI by Barry Ferrier."
        url="/electronic-music"
        keywords="electronic music, Fairlight CMI, Fairlight CMI IIX, synthesizer, 1980s electronic, QPAC Concert Hall, Queensland Performing Arts Trust, experimental electronica, Dreams and Machines, Ginny Bradley, Vision Dance, computer music, digital sampling synthesizer"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Videos", url: "/videos" },
          { name: "Electronic Music", url: "/electronic-music" }
        ])}
      />
      <HeroBanner />
      <IntroSection />
      <ElectronicVideoGrid />
      <DreamsAndMachinesCTA />
    </main>
  );
}
