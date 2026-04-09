import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTitle } from "@/hooks/use-page-title";
import { ExternalLink, Globe, Music, Video, Mail, Download, ArrowRight } from "lucide-react";
import { SiFacebook, SiYoutube, SiInstagram, SiSoundcloud, SiSpotify, SiBandcamp } from "react-icons/si";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";

function HeroBanner() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4" data-testid="text-links-title">
          Links & Resources
        </h1>
        <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
          Connect with Doctor Baz across platforms and download resources
        </p>
      </div>
    </section>
  );
}

function SocialLinks() {
  const socialLinks = [
    { icon: SiFacebook, name: "Facebook", url: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: SiYoutube, name: "YouTube", url: "#", color: "bg-red-600 hover:bg-red-700" },
    { icon: SiInstagram, name: "Instagram", url: "#", color: "bg-pink-600 hover:bg-pink-700" },
    { icon: SiSoundcloud, name: "SoundCloud", url: "#", color: "bg-orange-500 hover:bg-orange-600" },
    { icon: SiSpotify, name: "Spotify", url: "#", color: "bg-green-600 hover:bg-green-700" },
    { icon: SiBandcamp, name: "Bandcamp", url: "#", color: "bg-teal-600 hover:bg-teal-700" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Social Media</h2>
          <p className="text-muted-foreground">Follow Doctor Baz on social platforms</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-white rounded-lg p-6 flex items-center gap-4 transition-colors`}
                data-testid={`social-link-${link.name.toLowerCase()}`}
              >
                <Icon className="w-8 h-8" />
                <span className="font-semibold">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  const siteLinks = [
    { icon: Music, name: "Current Projects", path: "/projects", description: "Solo, duos, and Johnny Cash tribute" },
    { icon: Video, name: "Video Portfolio", path: "/videos", description: "Watch performances and compositions" },
    { icon: Globe, name: "History & Archives", path: "/history", description: "40+ years of musical journey" },
    { icon: Mail, name: "Contact", path: "/contact", description: "Book a performance or enquire" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Quick Links</h2>
          <p className="text-muted-foreground">Explore the site</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {siteLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} href={link.path}>
                <Card className="hover-elevate overflow-visible h-full" data-testid={`quick-link-${index}`}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{link.name}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Downloads() {
  const downloads = [
    { icon: Download, name: "Full CV (PDF)", description: "Complete curriculum vitae for grant applications" },
    { icon: Download, name: "Media Kit", description: "Press photos and promotional materials" },
    { icon: Download, name: "Technical Rider", description: "Stage requirements and specifications" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Downloads</h2>
          <p className="text-muted-foreground">Resources for venues, promoters, and grant applications</p>
        </div>
        
        <div className="space-y-4">
          {downloads.map((download, index) => {
            const Icon = download.icon;
            return (
              <Card key={index} className="hover-elevate overflow-visible" data-testid={`download-${index}`}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{download.name}</h3>
                      <p className="text-sm text-muted-foreground">{download.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" data-testid={`button-download-${index}`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExternalResources() {
  const resources = [
    { name: "Byron Bay Interactive", url: "#", description: "Web design services" },
    { name: "N.C.E.I.A.", url: "#", description: "Northern Coastal Entertainment Industry Association" },
    { name: "Railway Friendly Bar", url: "#", description: "Regular performance venue" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">External Resources</h2>
          <p className="text-muted-foreground">Related sites and organizations</p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              data-testid={`external-resource-${index}`}
            >
              <Card className="hover-elevate overflow-visible h-full">
                <CardContent className="p-6 text-center">
                  <ExternalLink className="w-6 h-6 text-gold mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Links() {
  usePageTitle("Links & Resources", "Connect with Doctor Baz across platforms and download resources including CV, media kit, and technical rider.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="Links & Resources"
        description="Connect with Doctor Baz across platforms and download resources including CV, media kit, and technical rider."
        url="/links"
        keywords="social media, resources, media kit, technical rider, contact"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Links & Resources", url: "/links" }
        ])}
      />
      <HeroBanner />
      <SocialLinks />
      <QuickLinks />
      <Downloads />
      <ExternalResources />
    </main>
  );
}
