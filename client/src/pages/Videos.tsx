import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Music, Zap, ArrowRight, X, Guitar, Rocket, ChevronDown, Leaf, Clapperboard } from "lucide-react";
import type { Video } from "@shared/schema";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import heroImage from "@assets/Barry_Ferrier_Dr_Baz_YouTube_1770432266156.jpg";

function HeroBanner() {
  return (
    <section className="relative pt-40 pb-8 lg:pt-56 lg:pb-10 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />
      <FadeIn direction="up">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 text-white drop-shadow-lg" data-testid="text-videos-title">
            <AnimatedGradientText>Video Portfolio</AnimatedGradientText>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Experience the music and artistry of Doctor Baz
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

function FeaturedVideo() {
  const { data: videos } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const featuredVideo = videos?.find(v => v.featured) || {
    id: "1",
    title: "The City",
    description: "Experience Barry's electronic music composition combining multimedia art and experimental sound. A pioneer of techno music in Australia, this piece showcases the intersection of technology and artistic expression.",
    youtubeId: "BmfO-K4cyvk",
    category: "electronic",
    featured: true,
    order: 0,
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge className="bg-gold/10 text-gold border-gold/30 mb-4">Featured Video</Badge>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-featured-video">{featuredVideo.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{featuredVideo.description}</p>
        </div>
        
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?rel=0&modestbranding=1`}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            data-testid="video-featured-embed"
          />
        </div>
      </div>
    </section>
  );
}

function VideoGrid() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });
  const [selectedVideo, setSelectedVideo] = useState<{title: string; youtubeId: string; isPlaylist: boolean} | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const defaultVideos = [
    {
      id: "1", title: "The City", description: "Electronic music composition and multimedia art piece", youtubeId: "BmfO-K4cyvk", category: "electronic", featured: true, order: 0
    },
    {
      id: "2", title: "Armageddon Blues - Dr Baz", description: "Original blues track by Dr Baz", youtubeId: "hduvZdhQyiA", category: "blues-roots", featured: false, order: 1
    },
    {
      id: "3", title: "Johnny Cash Tribute Preview", description: "Highlights from 'I Hear That Train a-Comin' show", youtubeId: "dQw4w9WgXcQ", category: "theatre", featured: false, order: 2
    },
    {
      id: "4", title: "Acoustic Sessions", description: "Intimate acoustic performance showcasing guitar and vocals", youtubeId: "dQw4w9WgXcQ", category: "performance", featured: false, order: 3
    },
    {
      id: "5", title: "Electronic Experimentation", description: "1980s electronic and techno music pioneer work", youtubeId: "dQw4w9WgXcQ", category: "electronic", featured: false, order: 4
    },
    {
      id: "6", title: "Festival Highlights", description: "Compilation of festival performances across Australia", youtubeId: "dQw4w9WgXcQ", category: "performance", featured: false, order: 5
    },
  ];

  const displayVideos = videos && videos.length > 0 ? videos : defaultVideos;
  const knownGalleryCategories = ['electronic', 'giant-steps', 'hip-hop', 'instrumental', 'johnny-cash', 'blues-roots', 'sci-fi', 'environmental', 'cartoons'];
  const knownAllCategories = [...knownGalleryCategories, 'performance', 'ai-video'];
  const customCategories = Array.from(new Set(displayVideos.map(v => v.category))).filter(c => !knownAllCategories.includes(c));
  const allGalleryCategories = [...knownGalleryCategories, ...customCategories];
  const nonFeaturedVideos = displayVideos.filter(v => !v.featured && !allGalleryCategories.includes(v.category));
  const electronicVideos = displayVideos.filter(v => v.category === 'electronic' && !v.featured);
  const giantStepsVideos = displayVideos.filter(v => v.category === 'giant-steps');
  const hipHopVideos = displayVideos.filter(v => v.category === 'hip-hop');
  const instrumentalVideos = displayVideos.filter(v => v.category === 'instrumental');
  const johnnyCashVideos = displayVideos.filter(v => v.category === 'johnny-cash');
  const bluesRootsVideos = displayVideos.filter(v => v.category === 'blues-roots');
  const sciFiVideos = displayVideos.filter(v => v.category === 'sci-fi');
  const environmentalVideos = displayVideos.filter(v => v.category === 'environmental');
  const cartoonsVideos = displayVideos.filter(v => v.category === 'cartoons');

  const categoryGalleries = [
    {
      key: 'electronic',
      title: 'Electronic Music Collection',
      description: 'Pioneering electronic compositions from the 1985 "Dreams & Machines" multimedia performance at QPAC, featuring the legendary Fairlight CMI IIX digital synthesizer.',
      badgeLabel: 'Electronic',
      videos: electronicVideos,
      icon: Zap,
      gradientFrom: 'from-purple-900/20',
      gradientTo: 'to-purple-700/20',
      overlayGradient: 'from-purple-900/60 to-transparent',
      badgeBg: 'bg-purple-500/80',
      badgeBorder: 'border-purple-400/50',
      titleBadgeBg: 'bg-purple-500/10',
      titleBadgeText: 'text-purple-400',
      titleBadgeBorder: 'border-purple-500/30',
      hoverText: 'text-purple-400',
      playBtnBg: 'bg-purple-500/90',
    },
    {
      key: 'hip-hop',
      title: 'Dr Baz Hip Hop',
      description: 'Original hip hop tracks by Dr Baz blending beats, rhymes, and creative storytelling.',
      badgeLabel: 'Hip Hop',
      videos: hipHopVideos,
      icon: Music,
      gradientFrom: 'from-violet-900/20',
      gradientTo: 'to-violet-700/20',
      overlayGradient: 'from-violet-900/60 to-transparent',
      badgeBg: 'bg-violet-500/80',
      badgeBorder: 'border-violet-400/50',
      titleBadgeBg: 'bg-violet-500/10',
      titleBadgeText: 'text-violet-400',
      titleBadgeBorder: 'border-violet-500/30',
      hoverText: 'text-violet-400',
      playBtnBg: 'bg-violet-500/90',
    },
    {
      key: 'johnny-cash',
      title: 'Johnny Cash Tribute',
      description: "I Hear That Train a-Comin': The Johnny Cash Story - a powerful theatrical tribute show.",
      badgeLabel: 'Theatre',
      videos: johnnyCashVideos,
      icon: Play,
      gradientFrom: 'from-red-900/20',
      gradientTo: 'to-red-700/20',
      overlayGradient: 'from-red-900/60 to-transparent',
      badgeBg: 'bg-red-600/80',
      badgeBorder: 'border-red-400/50',
      titleBadgeBg: 'bg-red-500/10',
      titleBadgeText: 'text-red-400',
      titleBadgeBorder: 'border-red-500/30',
      hoverText: 'text-red-400',
      playBtnBg: 'bg-red-600/90',
    },
    {
      key: 'blues-roots',
      title: 'Blues and Funk',
      description: 'Original blues and funk music by Dr Baz - raw, authentic, and steeped in tradition.',
      badgeLabel: 'Blues & Funk',
      videos: bluesRootsVideos,
      icon: Guitar,
      gradientFrom: 'from-amber-800/20',
      gradientTo: 'to-amber-600/20',
      overlayGradient: 'from-amber-900/60 to-transparent',
      badgeBg: 'bg-amber-600/80',
      badgeBorder: 'border-amber-400/50',
      titleBadgeBg: 'bg-amber-600/10',
      titleBadgeText: 'text-amber-400',
      titleBadgeBorder: 'border-amber-600/30',
      hoverText: 'text-amber-400',
      playBtnBg: 'bg-amber-600/90',
    },
    {
      key: 'sci-fi',
      title: 'Sci-Fi',
      description: 'Science fiction themed music videos exploring futuristic worlds and AI consciousness.',
      badgeLabel: 'Sci-Fi',
      videos: sciFiVideos,
      icon: Rocket,
      gradientFrom: 'from-emerald-900/20',
      gradientTo: 'to-emerald-700/20',
      overlayGradient: 'from-emerald-900/60 to-transparent',
      badgeBg: 'bg-emerald-500/80',
      badgeBorder: 'border-emerald-400/50',
      titleBadgeBg: 'bg-emerald-500/10',
      titleBadgeText: 'text-emerald-400',
      titleBadgeBorder: 'border-emerald-500/30',
      hoverText: 'text-emerald-400',
      playBtnBg: 'bg-emerald-500/90',
    },
    {
      key: 'environmental',
      title: 'Environmental',
      description: 'Award-winning environmental films and music advocating for ocean conservation, wildlife protection, and planetary stewardship.',
      badgeLabel: 'Environmental',
      videos: environmentalVideos,
      icon: Leaf,
      gradientFrom: 'from-green-900/20',
      gradientTo: 'to-green-700/20',
      overlayGradient: 'from-green-900/60 to-transparent',
      badgeBg: 'bg-green-500/80',
      badgeBorder: 'border-green-400/50',
      titleBadgeBg: 'bg-green-500/10',
      titleBadgeText: 'text-green-400',
      titleBadgeBorder: 'border-green-500/30',
      hoverText: 'text-green-400',
      playBtnBg: 'bg-green-500/90',
    },
    {
      key: 'cartoons',
      title: 'Cartoons',
      description: 'Original animated films and cartoon music videos by Doctor Baz - from surreal comedy to enigmatic visual storytelling.',
      badgeLabel: 'Cartoons',
      videos: cartoonsVideos,
      icon: Clapperboard,
      gradientFrom: 'from-orange-900/20',
      gradientTo: 'to-orange-700/20',
      overlayGradient: 'from-orange-900/60 to-transparent',
      badgeBg: 'bg-orange-500/80',
      badgeBorder: 'border-orange-400/50',
      titleBadgeBg: 'bg-orange-500/10',
      titleBadgeText: 'text-orange-400',
      titleBadgeBorder: 'border-orange-500/30',
      hoverText: 'text-orange-400',
      playBtnBg: 'bg-orange-500/90',
    },
    {
      key: 'instrumental',
      title: 'Dr Baz Instrumentals',
      description: 'Original guitar instrumentals by Dr Baz - melodic compositions and solo performances.',
      badgeLabel: 'Instrumentals',
      videos: instrumentalVideos,
      icon: Music,
      gradientFrom: 'from-cyan-900/20',
      gradientTo: 'to-cyan-700/20',
      overlayGradient: 'from-cyan-900/60 to-transparent',
      badgeBg: 'bg-cyan-500/80',
      badgeBorder: 'border-cyan-400/50',
      titleBadgeBg: 'bg-cyan-500/10',
      titleBadgeText: 'text-cyan-400',
      titleBadgeBorder: 'border-cyan-500/30',
      hoverText: 'text-cyan-400',
      playBtnBg: 'bg-cyan-500/90',
    },
    {
      key: 'giant-steps',
      title: 'Giant Steps Gallery',
      description: 'Hot 80s indie rock from Byron Bay - the legendary Giant Steps band.',
      badgeLabel: 'Giant Steps',
      videos: giantStepsVideos,
      icon: Music,
      gradientFrom: 'from-yellow-800/20',
      gradientTo: 'to-yellow-600/20',
      overlayGradient: 'from-yellow-900/60 to-transparent',
      badgeBg: 'bg-yellow-600/80',
      badgeBorder: 'border-yellow-400/50',
      titleBadgeBg: 'bg-yellow-600/10',
      titleBadgeText: 'text-yellow-400',
      titleBadgeBorder: 'border-yellow-600/30',
      hoverText: 'text-yellow-400',
      playBtnBg: 'bg-yellow-600/90',
    },
  ];

  const colorPresets = [
    { gradientFrom: 'from-rose-900/20', gradientTo: 'to-rose-700/20', overlayGradient: 'from-rose-900/60 to-transparent', badgeBg: 'bg-rose-500/80', badgeBorder: 'border-rose-400/50', titleBadgeBg: 'bg-rose-500/10', titleBadgeText: 'text-rose-400', titleBadgeBorder: 'border-rose-500/30', hoverText: 'text-rose-400', playBtnBg: 'bg-rose-500/90' },
    { gradientFrom: 'from-teal-900/20', gradientTo: 'to-teal-700/20', overlayGradient: 'from-teal-900/60 to-transparent', badgeBg: 'bg-teal-500/80', badgeBorder: 'border-teal-400/50', titleBadgeBg: 'bg-teal-500/10', titleBadgeText: 'text-teal-400', titleBadgeBorder: 'border-teal-500/30', hoverText: 'text-teal-400', playBtnBg: 'bg-teal-500/90' },
    { gradientFrom: 'from-indigo-900/20', gradientTo: 'to-indigo-700/20', overlayGradient: 'from-indigo-900/60 to-transparent', badgeBg: 'bg-indigo-500/80', badgeBorder: 'border-indigo-400/50', titleBadgeBg: 'bg-indigo-500/10', titleBadgeText: 'text-indigo-400', titleBadgeBorder: 'border-indigo-500/30', hoverText: 'text-indigo-400', playBtnBg: 'bg-indigo-500/90' },
    { gradientFrom: 'from-orange-900/20', gradientTo: 'to-orange-700/20', overlayGradient: 'from-orange-900/60 to-transparent', badgeBg: 'bg-orange-500/80', badgeBorder: 'border-orange-400/50', titleBadgeBg: 'bg-orange-500/10', titleBadgeText: 'text-orange-400', titleBadgeBorder: 'border-orange-500/30', hoverText: 'text-orange-400', playBtnBg: 'bg-orange-500/90' },
    { gradientFrom: 'from-pink-900/20', gradientTo: 'to-pink-700/20', overlayGradient: 'from-pink-900/60 to-transparent', badgeBg: 'bg-pink-500/80', badgeBorder: 'border-pink-400/50', titleBadgeBg: 'bg-pink-500/10', titleBadgeText: 'text-pink-400', titleBadgeBorder: 'border-pink-500/30', hoverText: 'text-pink-400', playBtnBg: 'bg-pink-500/90' },
  ];
  customCategories.forEach((cat, i) => {
    const catVideos = displayVideos.filter(v => v.category === cat);
    if (catVideos.length > 0) {
      const colors = colorPresets[i % colorPresets.length];
      const displayName = cat.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
      categoryGalleries.push({
        key: cat,
        title: displayName,
        description: `${displayName} videos by Dr Baz.`,
        badgeLabel: displayName,
        videos: catVideos,
        icon: Music,
        ...colors,
      });
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "electronic": return Zap;
      case "performance": return Music;
      case "theatre": return Play;
      case "instrumental": return Music;
      default: return Music;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "electronic": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
      case "performance": return "bg-gold/10 text-gold border-gold/30";
      case "theatre": return "bg-red-500/10 text-red-600 border-red-500/30";
      case "instrumental": return "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30";
      default: return "bg-gold/10 text-gold border-gold/30";
    }
  };

  const getEmbedUrl = (youtubeId: string, isPlaylist: boolean) => {
    if (isPlaylist) {
      const playlistId = youtubeId.match(/list=([^&]+)/)?.[1];
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;
    }
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  };

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
    <>
      {nonFeaturedVideos.length > 0 && (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">More Videos</h2>
            <p className="text-muted-foreground">Explore performances, compositions, and behind-the-scenes content</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonFeaturedVideos.map((video, index) => {
              const Icon = getCategoryIcon(video.category);
              const isPlaylist = video.youtubeId.includes('list=') || video.youtubeId.includes('videoseries');
              const thumbnailUrl = isPlaylist 
                ? `https://img.youtube.com/vi/X1LhnUERgzo/mqdefault.jpg`
                : `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo({title: video.title, youtubeId: video.youtubeId, isPlaylist})}
                  className="block cursor-pointer"
                  data-testid={`link-video-${index}`}
                >
                  <Card className="hover-elevate overflow-visible group cursor-pointer h-full" data-testid={`card-video-${index}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-gold/20 rounded-t-md relative overflow-hidden">
                      <img 
                        src={thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(video.category)}>
                          <Icon className="w-3 h-3 mr-1" />
                          {video.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{video.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )}

      <section className="py-8 lg:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {categoryGalleries.map((gallery) => (
            gallery.videos.length > 0 && (
              <div key={gallery.key}>
                <Card 
                  className="hover-elevate overflow-hidden cursor-pointer group"
                  onClick={() => setExpandedCategory(expandedCategory === gallery.key ? null : gallery.key)}
                  data-testid={`card-category-${gallery.key}`}
                >
                  <div className={`grid md:grid-cols-2 gap-0`}>
                    <div className={`aspect-video md:aspect-auto bg-gradient-to-br ${gallery.gradientFrom} ${gallery.gradientTo} relative overflow-hidden min-h-[200px]`}>
                      <img 
                        src={`https://img.youtube.com/vi/${gallery.videos[0]?.youtubeId?.includes('list=') ? 'X1LhnUERgzo' : gallery.videos[0]?.youtubeId}/mqdefault.jpg`}
                        alt={gallery.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${gallery.overlayGradient}`} />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${gallery.badgeBg} text-white ${gallery.badgeBorder}`}>
                          <gallery.icon className="w-3 h-3 mr-1" />
                          {gallery.videos.length} {gallery.videos.length === 1 ? 'Video' : 'Videos'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className={`${gallery.titleBadgeBg} ${gallery.titleBadgeText} ${gallery.titleBadgeBorder} w-fit mb-4`}>
                        {gallery.badgeLabel}
                      </Badge>
                      <h2 className={`text-2xl lg:text-3xl font-serif font-bold mb-4 group-hover:${gallery.hoverText} transition-colors`}>
                        {gallery.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {gallery.description}
                      </p>
                      <div className={`flex items-center ${gallery.titleBadgeText} font-medium`}>
                        <span>{expandedCategory === gallery.key ? 'Hide Gallery' : 'Explore Collection'}</span>
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${expandedCategory === gallery.key ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </Card>

                {expandedCategory === gallery.key && (
                  <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.videos.map((video, index) => {
                      const isPlaylist = video.youtubeId.includes('list=') || video.youtubeId.includes('videoseries');
                      const thumbnailUrl = isPlaylist 
                        ? `https://img.youtube.com/vi/X1LhnUERgzo/mqdefault.jpg`
                        : `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                      return (
                        <div
                          key={video.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedVideo({title: video.title, youtubeId: video.youtubeId, isPlaylist}); }}
                          className="block cursor-pointer"
                          data-testid={`link-${gallery.key}-video-${index}`}
                        >
                          <Card className="hover-elevate overflow-visible group/card cursor-pointer h-full" data-testid={`card-${gallery.key}-video-${index}`}>
                            <div className={`aspect-video bg-gradient-to-br ${gallery.gradientFrom} ${gallery.gradientTo} rounded-t-md relative overflow-hidden`}>
                              <img 
                                src={thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className={`w-16 h-16 rounded-full ${gallery.playBtnBg} flex items-center justify-center group-hover/card:scale-110 transition-transform`}>
                                  <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge className={`${gallery.titleBadgeBg} ${gallery.titleBadgeText} ${gallery.titleBadgeBorder}`}>
                                  <gallery.icon className="w-3 h-3 mr-1" />
                                  {gallery.badgeLabel}
                                </Badge>
                              </div>
                              <h3 className="font-semibold group-hover/card:text-primary transition-colors">{video.title}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </section>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-gold transition-colors z-10"
              data-testid="button-close-video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video">
              {selectedVideo && (
                <iframe
                  key={selectedVideo.youtubeId}
                  src={getEmbedUrl(selectedVideo.youtubeId, selectedVideo.isPlaylist)}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid="video-modal-embed"
                />
              )}
            </div>
            {selectedVideo && (
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


function ContactCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-video-cta">Bring This Energy to Your Event</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Experience Doctor Baz live at your next wedding, corporate event, or festival.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white min-w-[180px]" data-testid="button-book-performance">
              Book Performance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-view-projects">
              View Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Videos() {
  usePageTitle("Video Portfolio", "Watch Doctor Baz performances, electronic music compositions, and Johnny Cash tribute highlights.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="Video Portfolio"
        description="Watch Doctor Baz performances, electronic music compositions, and Johnny Cash tribute highlights."
        url="/videos"
        keywords="music videos, live performance, electronic music, guitar, Johnny Cash tribute, Giant Steps band, Lisa Spence, Jen Anderson, Lindsay Kemp Salome, Fairlight CMI, Ginny Bradley choreography, Slim Pickens"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Video Portfolio", url: "/videos" }
        ])}
      />
      <HeroBanner />
      <FeaturedVideo />
      <VideoGrid />
      <ContactCTA />
    </main>
  );
}
