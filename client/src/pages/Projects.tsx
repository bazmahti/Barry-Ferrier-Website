import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { useImages } from "@/hooks/use-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, Guitar, Users, Mic, ArrowRight, Phone, Calendar, BookOpen, Film, Monitor } from "lucide-react";
import type { Project, Image } from "@shared/schema";
import { sanitizeHtml, isHtmlContent } from "@/lib/sanitize";
import { FadeIn, GlowingBorder, AnimatedGradientText, TiltCard } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import projectsHeroImage from "@assets/Barry_Ferrier_Music_Videos_1770248554592.jpg";

export const musicSlugs = ["solo-performer", "pete-c-dr-baz", "rayne-dr-baz", "dr-baz-rex-carter", "johnny-cash-tribute", "sunreel"];
export const mediaSlugs = ["between-two-shores", "maeve-first-fleet-saga", "fireies-the-musical", "bumfluff-navellint"];
export const appSlugs = ["yarnai", "my-intelligent-health", "yoursay", "sunreel-go-koala"];

export type ProjectCategory = "music" | "media" | "apps" | "all";

interface CategoryConfig {
  title: string;
  subtitle: string;
  pageDescription: string;
  icon: any;
  slugs: string[];
  badgeColor: string;
}

const categoryConfigs: Record<Exclude<ProjectCategory, "all">, CategoryConfig> = {
  music: {
    title: "Music Projects",
    subtitle: "Live performance acts, collaborations, and musical productions",
    pageDescription: "Doctor Baz current musical projects including solo performance, blues duo with Pete C., and the Johnny Cash tribute show.",
    icon: Music,
    slugs: musicSlugs,
    badgeColor: "bg-gold/10 text-gold border-gold/30",
  },
  media: {
    title: "Media Projects",
    subtitle: "Film, theatre, and multimedia creative works",
    pageDescription: "Doctor Baz media projects including film, theatre productions, and multimedia creative works.",
    icon: Film,
    slugs: mediaSlugs,
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  },
  apps: {
    title: "App Development",
    subtitle: "Innovative technology and AI-powered applications",
    pageDescription: "Doctor Baz app development projects including YarnAI, My Intelligent Health, YourSay Video Polling, and S'uNReel 2026 - GO KOALA!",
    icon: Monitor,
    slugs: appSlugs,
    badgeColor: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
  },
};

function HeroBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
      <img
        src={projectsHeroImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-1/2 flex justify-center">
          <FadeIn direction="up">
            <div className="text-center px-4">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-lg" data-testid="text-projects-title">
                <AnimatedGradientText>{title}</AnimatedGradientText>
              </h1>
              <p className="text-xl text-white/90 max-w-lg mx-auto drop-shadow-md">
                {subtitle}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, projectImages }: { project: Project; index: number; projectImages: Record<string, any> }) {
  const icons = [Music, Users, Guitar, Mic];
  const Icon = icons[index % icons.length];

  const getImageUrl = (project: Project) => {
    const projectImage = projectImages[project.slug];
    if (projectImage) return projectImage.objectPath;
    if (project.imageUrl) {
      if (project.imageUrl.startsWith('http') || project.imageUrl.startsWith('/attached_assets')) {
        return project.imageUrl;
      }
      return `/api/objects/public/${project.imageUrl}`;
    }
    return null;
  };

  const imageUrl = getImageUrl(project);

  const getButtonLabel = (slug: string) => {
    const labels: Record<string, string> = {
      "bumfluff-navellint": "Contact Creative Team",
      "maeve-first-fleet-saga": "Contact Creative Team",
      "between-two-shores": "Contact Creative Team",
      "fireies-the-musical": "Contact Creative Team",
      "yarnai": "Contact Dr Baz",
      "my-intelligent-health": "Contact Dr Baz",
      "yoursay": "Contact Dr Baz",
    };
    return labels[slug] || "Book This Act";
  };

  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-project-${project.slug}`}>
      <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-gold/20 rounded-t-md overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            data-testid={`img-project-${project.slug}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-20 h-20 text-gold/50" />
          </div>
        )}
      </div>
      <CardContent className="p-6 lg:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-gold/10 text-gold border-gold/30">{project.category === "current" ? "Active" : project.category}</Badge>
        </div>
        <h3 className="text-2xl font-serif font-semibold">{project.title}</h3>
        {isHtmlContent(project.fullDescription || project.description) ? (
          <div className="text-muted-foreground leading-relaxed rich-html-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.fullDescription || project.description) }} />
        ) : (
          <p className="text-muted-foreground leading-relaxed">{project.fullDescription || project.description}</p>
        )}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
          {project.slug === "sunreel" ? (
            <a href="https://patreon.com/SUnReel" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold hover:bg-gold/90 text-white" data-testid={`button-patreon-${project.slug}`}>
                <Users className="w-4 h-4 mr-2" />
                Join S'uNReel Patreon
              </Button>
            </a>
          ) : (
            <Link href="/contact">
              <Button className="bg-gold hover:bg-gold/90 text-white" data-testid={`button-book-${project.slug}`}>
                <Calendar className="w-4 h-4 mr-2" />
                {getButtonLabel(project.slug)}
              </Button>
            </Link>
          )}
          <Link href={`/projects/${project.slug}`}>
            <Button variant="outline" data-testid={`button-read-more-${project.slug}`}>
              <BookOpen className="w-4 h-4 mr-2" />
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectSection({ title, description, icon: SectionIcon, projects, projectImages, badgeColor }: {
  title: string;
  description: string;
  icon: any;
  projects: Project[];
  projectImages: Record<string, any>;
  badgeColor: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="flex items-center gap-3 mb-2">
            <SectionIcon className="w-6 h-6 text-gold" />
            <h2 className="text-3xl lg:text-4xl font-serif font-bold" data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h2>
          </div>
          <p className="text-muted-foreground text-lg mb-8 ml-9">{description}</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} projectImages={projectImages} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function useProjectImages() {
  const { data: soloImages } = useImages("solo");
  const { data: peteImages } = useImages("pete-c");
  const { data: rexImages } = useImages("rex-carter");
  const { data: cashImages } = useImages("johnny-cash");

  const projectImages: Record<string, Image | undefined> = {
    "solo-performer": { id: "solo-hero", objectPath: "/attached_assets/Dr_Baz__1770352347531.jpg", category: "solo", altText: "Dr Baz performing solo" } as any,
    "pete-c-dr-baz": { id: "pete-c-hero", objectPath: "/attached_assets/Dr._Baz_&_Pete_C_1770353129612.jpg", category: "pete-c", altText: "Dr. Baz & Pete C." } as any,
    "dr-baz-rex-carter": { id: "rex-carter-hero", objectPath: "/attached_assets/Dr_Baz_and_Rex_Carter_Duo_1771549145714.jpg", category: "rex-carter", altText: "Dr Baz & Rex Carter Duo" } as any,
    "johnny-cash-tribute": cashImages?.[0],
    "sunreel": { id: "sunreel-hero", objectPath: "/attached_assets/S'UnReel_5_1770427783857.jpeg", category: "sunreel", altText: "S'uNReel Entertainment" } as any,
    "between-two-shores": { id: "bts-hero", objectPath: "/attached_assets/Between_Two_Shores_1770351781833.jpg", category: "between-two-shores", altText: "Between Two Shores" } as any,
    "yarnai": { id: "yarnai-hero", objectPath: "/attached_assets/YarnAI_logo_1770424436282.jpg", category: "yarnai", altText: "YarnAI" } as any,
    "my-intelligent-health": { id: "mih-hero", objectPath: "/attached_assets/lMy_Intelligent_Health_Logo_1770425238192.jpg", category: "my-intelligent-health", altText: "My Intelligent Health" } as any,
    "yoursay": { id: "yoursay-hero", objectPath: "/attached_assets/yoursay-logo_1770425746697.png", category: "yoursay", altText: "YourSay Video Polling App" } as any,
    "bumfluff-navellint": { id: "bumfluff-hero", objectPath: "/attached_assets/Bum_Fluff_&_Navel_Lint_CU_1770424178215.jpg", category: "bumfluff", altText: "Bum Fluff and Navel Lint" } as any,
    "maeve-first-fleet-saga": { id: "maeve-hero", objectPath: "/attached_assets/MAEVE_an_esoteric_opera_1770363925407.jpg", category: "maeve", altText: "Maeve: A First Fleet Saga" } as any,
    "fireies-the-musical": { id: "fireies-hero", objectPath: "/attached_assets/Fireies_the_Musical_1770419293451.jpg", category: "fireies", altText: "Fireies - The Musical" } as any,
  };

  return projectImages;
}

function ProjectsContent({ category }: { category: ProjectCategory }) {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const projectImages = useProjectImages();

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const allProjects = projects && projects.length > 0 ? projects : [];

  if (category !== "all") {
    const config = categoryConfigs[category];
    const filtered = allProjects.filter(p => config.slugs.includes(p.slug));
    return (
      <ProjectSection
        title={config.title}
        description={config.subtitle}
        icon={config.icon}
        projects={filtered}
        projectImages={projectImages}
        badgeColor={config.badgeColor}
      />
    );
  }

  const musicProjects = allProjects.filter(p => musicSlugs.includes(p.slug));
  const mediaProjects = allProjects.filter(p => mediaSlugs.includes(p.slug));
  const appProjects = allProjects.filter(p => appSlugs.includes(p.slug));
  const otherProjects = allProjects.filter(p =>
    !musicSlugs.includes(p.slug) && !mediaSlugs.includes(p.slug) && !appSlugs.includes(p.slug)
  );

  return (
    <>
      <ProjectSection
        title="Music Projects"
        description="Live performance acts, collaborations, and musical productions"
        icon={Music}
        projects={musicProjects}
        projectImages={projectImages}
        badgeColor="bg-gold/10 text-gold border-gold/30"
      />

      {musicProjects.length > 0 && mediaProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-border" />
        </div>
      )}

      <ProjectSection
        title="Media Projects"
        description="Film, theatre, and multimedia creative works"
        icon={Film}
        projects={mediaProjects}
        projectImages={projectImages}
        badgeColor="bg-purple-500/10 text-purple-600 border-purple-500/30"
      />

      {mediaProjects.length > 0 && appProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-border" />
        </div>
      )}

      <ProjectSection
        title="App Development"
        description="Innovative technology and AI-powered applications"
        icon={Monitor}
        projects={appProjects}
        projectImages={projectImages}
        badgeColor="bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30"
      />

      {otherProjects.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <hr className="border-border" />
          </div>
          <ProjectSection
            title="Other Projects"
            description="Additional creative endeavours"
            icon={Guitar}
            projects={otherProjects}
            projectImages={projectImages}
            badgeColor="bg-gold/10 text-gold border-gold/30"
          />
        </>
      )}
    </>
  );
}

function BookingCTA({ category }: { category: ProjectCategory }) {
  const isMedia = category === "media";
  const isApps = category === "apps";
  const heading = isMedia || isApps ? "Get in Touch" : "Ready to Book?";
  const subtitle = isMedia || isApps
    ? "Interested in collaborating or learning more about these projects? Reach out to Doctor Baz."
    : "Whether it's a wedding, corporate event, festival, or intimate venue performance, Doctor Baz delivers unforgettable entertainment.";
  const buttonLabel = isMedia || isApps ? "Contact the Artist" : "Get a Quote";

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" data-testid="text-booking-title">{heading}</h2>
        <p className="text-muted-foreground text-lg mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white min-w-[180px]" data-testid="button-get-quote">
              {buttonLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href="tel:0405788433">
            <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-call-now">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export function ProjectsPage({ category = "all" }: { category?: ProjectCategory }) {
  const config = category !== "all" ? categoryConfigs[category] : null;
  const title = config ? config.title : "Current Projects";
  const subtitle = config ? config.subtitle : "Bringing Music to Life Across Australia";
  const description = config ? config.pageDescription : "Doctor Baz current musical projects including solo performance, blues duo with Pete C., and the Johnny Cash tribute show.";

  usePageTitle(title, description);

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title={title}
        description={description}
        url="/projects"
        keywords="music projects, current projects, live music, entertainment, Johnny Cash tribute, Ilona Harker, Slim Pickens, Rex Carter, Pete Crowley, Rayne duo, Roy Orbison tribute, solo performer Byron Bay"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: title, url: "/projects" }
        ])}
      />
      <HeroBanner title={title} subtitle={subtitle} />
      <ProjectsContent category={category} />
      <BookingCTA category={category} />
    </main>
  );
}

export default function Projects() {
  return <ProjectsPage category="all" />;
}

export function MusicProjects() {
  return <ProjectsPage category="music" />;
}

export function MediaProjects() {
  return <ProjectsPage category="media" />;
}

export function AppProjects() {
  return <ProjectsPage category="apps" />;
}
