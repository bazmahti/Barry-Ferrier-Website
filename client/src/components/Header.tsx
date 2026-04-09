import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Cpu, ChevronDown, Film, Music2, Sparkles, BookOpen, Lightbulb, User, FolderOpen, Trophy, Play, Mail, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  path: string;
  icon?: React.ElementType;
  highlight?: boolean;
  description?: string;
}

interface NavGroup {
  name: string;
  items: NavItem[];
  highlight?: boolean;
}

const featuredWorks: NavItem[] = [
  { name: "Award-Winning Videos", path: "/award-videos", icon: Trophy, highlight: true, description: "27 international awards" },
  { name: "Entombed - the Film", path: "/entombed", icon: Film, highlight: true, description: "Award-winning AI film" },
  { name: "Brushstrokes in Time", path: "/brushstrokes", icon: Sparkles, highlight: true, description: "Animated art series" },
  { name: "Art, Soul & AI - the Book", path: "/book", icon: BookOpen, highlight: true, description: "The book" },
  { name: "YarnAI App", path: "/projects/yarnai", icon: Cpu, highlight: true, description: "Indigenous AI platform" },
];

const currentProjectItems: NavItem[] = [
  { name: "All Projects", path: "/projects", icon: FolderOpen, description: "View all current projects" },
  { name: "Music Projects", path: "/projects/music", icon: Music2, description: "Live acts & collaborations" },
  { name: "Media Projects", path: "/projects/media", icon: Film, description: "Film, theatre & multimedia" },
  { name: "App Development", path: "/projects/apps", icon: Monitor, description: "AI & tech applications" },
];

const exploreItems: NavItem[] = [
  { name: "Dr Baz Music", path: "/music", icon: Music2, description: "23 albums on Bandcamp" },
  { name: "Dr Baz History", path: "/history", icon: User, description: "40+ year career" },
  { name: "Awards", path: "/awards", icon: Trophy, description: "Recognition & honours" },
  { name: "Academic", path: "/academic", icon: BookOpen, description: "PhD & credentials" },
  { name: "Video Gallery", path: "/videos", icon: Play, description: "Video portfolio" },
];

function DropdownNavGroup({ group, location }: { group: NavGroup; location: string }) {
  const isActive = group.items.some(item => location === item.path);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          className={`text-sm font-medium gap-1 ${group.highlight ? 'text-neon-cyan' : ''}`}
          data-testid={`nav-dropdown-${group.name.toLowerCase()}`}
        >
          {group.name}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {group.items.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.path} asChild>
              <Link 
                href={item.path} 
                className={`flex items-start gap-3 cursor-pointer ${location === item.path ? 'bg-accent' : ''}`}
                data-testid={`nav-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`}
              >
                {Icon && <Icon className={`w-4 h-4 mt-0.5 ${item.highlight ? 'text-neon-cyan' : 'text-muted-foreground'}`} />}
                <div className="flex flex-col">
                  <span className={item.highlight ? 'text-neon-cyan font-medium' : ''}>{item.name}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <Cpu className="w-8 h-8 text-neon-cyan" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight">DOCTOR BAZ</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden sm:block">AI Video Artist & Musician</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                size="sm"
                className="text-sm font-medium"
                data-testid="nav-home"
              >
                Home
              </Button>
            </Link>

            <DropdownNavGroup 
              group={{ name: "Featured Work", items: featuredWorks, highlight: true }} 
              location={location} 
            />

            <DropdownNavGroup 
              group={{ name: "Current Projects", items: currentProjectItems }} 
              location={location} 
            />

            <DropdownNavGroup 
              group={{ name: "Explore", items: exploreItems }} 
              location={location} 
            />

            <Link href="/about">
              <Button
                variant={location === "/about" ? "secondary" : "ghost"}
                size="sm"
                className="text-sm font-medium"
                data-testid="nav-about"
              >
                About
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant={location === "/contact" ? "secondary" : "ghost"}
                size="sm"
                className="text-sm font-medium"
                data-testid="nav-contact"
              >
                Contact
              </Button>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button data-testid="button-book-now" className="bg-neon-cyan text-background">
                Get In Touch
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              <Link href="/">
                <Button
                  variant={location === "/" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="nav-mobile-home"
                >
                  Home
                </Button>
              </Link>

              <div className="pt-2 pb-1">
                <span className="px-3 text-xs font-semibold text-neon-cyan uppercase tracking-wider">Featured Work</span>
              </div>
              {featuredWorks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`nav-mobile-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                    >
                      {Icon && <Icon className="w-4 h-4 text-neon-cyan" />}
                      <span className="text-neon-cyan">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}

              <div className="pt-4 pb-1">
                <span className="px-3 text-xs font-semibold text-gold uppercase tracking-wider">Current Projects</span>
              </div>
              {currentProjectItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`nav-mobile-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                    >
                      {Icon && <Icon className="w-4 h-4 text-gold" />}
                      <span className="text-gold">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}

              <div className="pt-4 pb-1">
                <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</span>
              </div>
              {exploreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`nav-mobile-${item.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                    >
                      {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              <div className="pt-4 pb-1">
                <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Info</span>
              </div>
              <Link href="/about">
                <Button
                  variant={location === "/about" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="nav-mobile-about"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  About
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant={location === "/contact" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="nav-mobile-contact"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Contact
                </Button>
              </Link>

              <Link href="/contact" className="mt-4">
                <Button 
                  className="w-full bg-neon-cyan text-background"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-book-now"
                >
                  Get In Touch
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
