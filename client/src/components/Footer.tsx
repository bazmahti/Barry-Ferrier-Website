import { Link } from "wouter";
import { Cpu, Phone, Mail, MapPin, Film, BookOpen, Zap } from "lucide-react";
import { SiFacebook, SiYoutube, SiInstagram, SiBandcamp, SiLinkedin, SiSoundcloud, SiSubstack, SiSpotify } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-8 h-8 text-neon-cyan" />
              <span className="font-serif text-2xl font-bold">DOCTOR BAZ</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI Video Artist, Electronic Music Pioneer, Award-Winning Experimental Filmmaker, PhD Multimedia Designer.
            </p>
            <p className="font-mono text-neon-cyan/80 text-xs tracking-wider">
              // PUSHING CREATIVE BOUNDARIES
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Featured Work</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/entombed" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm" data-testid="footer-link-entombed">
                <Film className="w-3 h-3" />
                Entombed (Film)
              </Link>
              <Link href="/book" className="flex items-center gap-2 text-muted-foreground hover:text-neon-magenta transition-colors text-sm" data-testid="footer-link-book">
                <BookOpen className="w-3 h-3" />
                Art, Soul & AI (Book)
              </Link>
              <Link href="/videos" className="flex items-center gap-2 text-muted-foreground hover:text-neon-purple transition-colors text-sm" data-testid="footer-link-videos">
                <Zap className="w-3 h-3" />
                Video Portfolio
              </Link>
              <Link href="/history" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="footer-link-history">
                History & Archives
              </Link>
              <Link href="/awards" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="footer-link-awards">
                Awards
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Expertise</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">AI Video Production</span>
              <span className="text-muted-foreground text-sm">Experimental Filmmaking</span>
              <span className="text-muted-foreground text-sm">Electronic Music</span>
              <span className="text-muted-foreground text-sm">Multimedia Design</span>
              <span className="text-muted-foreground text-sm">Live Performance</span>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+61266871594" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm" data-testid="footer-phone">
                <Phone className="w-4 h-4" />
                +61 2 6687 1594
              </a>
              <a href="tel:0405788433" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm" data-testid="footer-mobile">
                <Phone className="w-4 h-4" />
                0405 788 433
              </a>
              <Link href="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors text-sm" data-testid="footer-email">
                <Mail className="w-4 h-4" />
                Send Message
              </Link>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Byron Bay Region, Australia</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="https://www.linkedin.com/in/barry-ferrier-b2403925/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-cyan transition-colors" data-testid="social-linkedin">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://drbazwrites.substack.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-purple transition-colors" data-testid="social-substack">
                <SiSubstack className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@BarryFerrier" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-magenta transition-colors" data-testid="social-youtube">
                <SiYoutube className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/drbarryferrier" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-cyan transition-colors" data-testid="social-facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/gurubazmahti/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-purple transition-colors" data-testid="social-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="https://open.spotify.com/artist/4sdQyhiMXBQZOYmqV8x6fz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-cyan transition-colors" data-testid="social-spotify">
                <SiSpotify className="w-5 h-5" />
              </a>
              <a href="https://soundcloud.com/user-984458959" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-magenta transition-colors" data-testid="social-soundcloud">
                <SiSoundcloud className="w-5 h-5" />
              </a>
              <a href="https://drbaz.bandcamp.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-cyan transition-colors" data-testid="social-bandcamp">
                <SiBandcamp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Doctor Baz (Barry Ferrier). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="font-mono">v2.0</span>
            <span>•</span>
            <span>Byron Bay Interactive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
