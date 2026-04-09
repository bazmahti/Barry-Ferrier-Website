import { useState } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { GraduationCap, BookOpen, Award, FileText, Lightbulb, Monitor, Music, Video, Image, Download, X, ArrowLeft } from "lucide-react";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import thesisPdf from "@assets/Barry_Ferrier_PhD_Thesis_1770172218488.pdf";

const academicImages = [
  { url: "/attached_assets/IMG_2506_1770444964892.jpeg", caption: "Doctor of Philosophy - Southern Cross University" },
  { url: "https://barryferrier.com/media/k2/galleries/27/p1a5vk3kp9id3se66qmoi01bj4.jpg", caption: "PhD Thesis Cover" },
  { url: "https://barryferrier.com/media/k2/galleries/27/p1a5vk3p4t1p3iljq2djd5l9jh5.jpg", caption: "Academic Qualifications" },
  { url: "https://barryferrier.com/media/k2/galleries/27/p1a5vk423cu8d1okm1i1e7471ac26.jpg", caption: "PhD Documentation" },
  { url: "https://barryferrier.com/media/k2/galleries/27/p1a5vk4ane1c12rtcd2t35fmsq7.jpg", caption: "Academic Credentials" },
  { url: "/attached_assets/Bond_Uni_Staff_Card_1770602091995.jpg", caption: "Bond University Staff Card - IT School/Office (1999)" },
  { url: "/attached_assets/TAFE_Staff_Card_1770602091996.jpg", caption: "TAFE NSW Staff Card - Lecturer" },
  { url: "/attached_assets/Barry_Ferrier_APRA_Member_1770602386905.jpg", caption: "APRA Writer Full Member Certificate (26 November 1982)" },
];

export default function Academic() {
  usePageTitle("Academic Career", "Dr Barry Ferrier's academic credentials including PhD in Multimedia Design from Southern Cross University and Professorship at Bond University.");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Academic Career"
        description="Dr Barry Ferrier's academic credentials including PhD in Multimedia Design from Southern Cross University and Professorship at Bond University."
        url="/academic"
        keywords="PhD multimedia design, Bond University, Southern Cross University, academic career, multimedia research"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "History", url: "/history" },
          { name: "Academic Career", url: "/academic" }
        ])}
      />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <GraduationCap className="w-4 h-4 mr-2" />
              Academic Credentials
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                PhD Research
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Doctor of Philosophy in Multimedia Design from Southern Cross University
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-card/50 backdrop-blur mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-orbitron text-primary">
                      Multimedia as Meta Art
                    </CardTitle>
                    <p className="text-muted-foreground">
                      The processes and aesthetics of interactive digital art
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Degree:</span>
                    <span className="font-medium">Doctor of Philosophy (PhD)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Institution:</span>
                    <span className="font-medium">Southern Cross University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">School:</span>
                    <span className="font-medium">School of Contemporary Arts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">June 2004</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Abstract
                  </h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Concepts of <strong className="text-foreground">meta-art</strong>, or a synthesis of the arts, have fascinated 
                      and inspired many historically important artists, including Wagner, Scriabin, Kandinsky, Cage, and the Bauhaus 
                      and Futurist artists. These thinkers dreamed of combining the diverse means of traditional artistic expression 
                      to create a total, transcending art experience.
                    </p>
                    <p>
                      A meta-art machine was visualized by the German author Hermann Hesse in his Nobel Prize-winning novel 
                      <em> The Glass Bead Game ('Magister Ludi')</em>. Hesse explored the idea of a machine which has evolved to be 
                      the ultimate in art technology, a multidimensional machine/human interface, depicted (in a pre-computer time) 
                      as a fantastic creative and conceptual abacus, employing all the cultural and scientific knowledge of the ages. 
                      This once futuristic vision is becoming a reality, with the rapid evolution of the contemporary personal computer, 
                      which offers multi-dimensional, multi-sensory art-making tools, within one machine.
                    </p>
                    <p>
                      Connected to the internet, this nascent meta-art machine offers a channel for delivering multimedia art to the world. 
                      The concept of a meta-art machine is used as a unifying theme in <em>Part One</em> of this dissertation, as a means 
                      of focusing and clarifying an exploration of a wide range of contemporary ideas about interactive digital multimedia art. 
                      Arts associated with each of the primary sense modalities, it is argued herein, communicate on a number of channels of 
                      communication. The arts associated with each of these sensory channels of communication are discussed, with a view to 
                      gaining a broad overview and understanding of the unique aesthetics of the newly emerged, technologically-based digital 
                      multimedia artform.
                    </p>
                    <p>
                      The author's personal exploration of multimedia art is presented in the accompanying creative work, and this work is 
                      discussed in <em>Part Two</em> of the dissertation, drawing on the insights presented in the theoretical discussion 
                      comprising <em>Part One</em>.
                    </p>
                    <p>
                      The creative work is in two parts – the first a large scale experimental video animation, with synchronized audio/music 
                      track, presented on DVD, entitled <em>Take Your Space Now</em>; and the second an experimental interactive CD-ROM, 
                      entitled <em>The Machine</em>.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <a href={thesisPdf} download="Barry_Ferrier_PhD_Thesis.pdf">
                    <Button className="w-full sm:w-auto" data-testid="button-download-thesis">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full PhD Thesis (PDF)
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold font-orbitron mb-6 text-center">
              Creative Portfolio Components
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-accent/20 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Video className="w-5 h-5 text-accent" />
                    </div>
                    <CardTitle className="text-xl">"Take Your Space Now"</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      Large-scale experimental video animation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      Features animations of paintings by Duane Radford
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      Synchronized original audio/music track
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      Presented on DVD
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/20">
                      <Monitor className="w-5 h-5 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">"The Machine"</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      Experimental interactive CD-ROM
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      Explores interactivity as an art form
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      Pioneering work in interactive digital art
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      Supporting documentation in Volume 2
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  External Examiner's Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground">
                  "I am very impressed by this PhD submission. The candidate has clearly demonstrated competence 
                  in his creative work and has a profound knowledge of his research topic... the original creative 
                  work is of a high standard and clearly research-based."
                </blockquote>
                <p className="mt-3 text-sm text-muted-foreground">
                  — Dr. Thomas Reiner, Monash University
                </p>
              </CardContent>
            </Card>

            <div className="mt-12">
              <h2 className="text-2xl font-bold font-orbitron mb-6 text-center flex items-center justify-center gap-2">
                <Image className="w-6 h-6 text-primary" />
                Academic Documentation
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {academicImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImage(image)}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border hover:border-primary transition-colors cursor-pointer text-left"
                    data-testid={`button-academic-image-${index}`}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold font-orbitron mb-6 text-center">
                Academic Qualifications
              </h2>
              
              <div className="space-y-4">
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Doctor of Philosophy (PhD)</h3>
                        <p className="text-sm text-muted-foreground">Southern Cross University, 2004 - Multimedia Design</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Bachelor of Letters (Honours)</h3>
                        <p className="text-sm text-muted-foreground">Deakin University, 1987</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Bachelor of Arts</h3>
                        <p className="text-sm text-muted-foreground">University of Sydney, 1974 - Major in Psychology</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Music className="w-8 h-8 text-accent" />
                      <div>
                        <h3 className="font-semibold">Diploma of Music (Composition)</h3>
                        <p className="text-sm text-muted-foreground">Southern Cross University, 1984 - Under Dr. James Penberthy and Richard Mills</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Monitor className="w-8 h-8 text-secondary" />
                      <div>
                        <h3 className="font-semibold">Diploma I.T. (Web Design)</h3>
                        <p className="text-sm text-muted-foreground">Information Technology - Web Design</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Award className="w-8 h-8 text-gold" />
                      <div>
                        <h3 className="font-semibold">Cert IV Workplace Training and Assessment</h3>
                        <p className="text-sm text-muted-foreground">Vocational Education and Training</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold font-orbitron mb-6 text-center">
                Academic Positions
              </h2>
              
              <div className="space-y-4">
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Assistant Professor of Multimedia</h3>
                        <p className="text-sm text-muted-foreground">Bond University, Gold Coast</p>
                        <p className="text-xs text-muted-foreground mt-1">Also lectured in the School of Film and TV in Video Production and Music Video</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Lecturer in Multimedia and Music</h3>
                        <p className="text-sm text-muted-foreground">Griffith University (Southport), Southern Cross University (Lismore)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Lecturer</h3>
                        <p className="text-sm text-muted-foreground">Central Queensland University (3 years)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Teacher - Multimedia and Graphic Design</h3>
                        <p className="text-sm text-muted-foreground">Kingscliff TAFE (5 years), School of Audio Engineering (Byron Bay)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <Music className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Music Business Lecturer & Guitar Tutor</h3>
                        <p className="text-sm text-muted-foreground">Southern Cross University (mid-1980s)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-accent/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-4">
                      <Monitor className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold">Lecturer - 3D Animation & Music</h3>
                        <p className="text-sm text-muted-foreground">School of Audio Engineering (S.A.E.), Byron Bay</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
              <h3 className="font-semibold mb-3">Background Note</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Barry's first PhD attempt (in music at Southern Cross University) was tragically destroyed in a 
                1994 house fire after two years of intensive work. He subsequently began a new PhD project 
                focusing on emerging multimedia art technology. This research was informed by his extensive 
                practical experience with experimental electronic music theatre, computer music, and digital 
                video from the mid-1980s, including projects like his quadrophonic soundtracks for Brisbane's 
                Expo '88 and his electronic music theatre production "Dreams and Machines."
              </p>
            </div>
          </div>
        </div>
      </section>

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox-overlay"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            data-testid="lightbox-close"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <div 
            className="flex flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <p className="mt-4 text-white text-lg text-center drop-shadow-lg">
              {lightboxImage.caption}
            </p>
            <Button 
              variant="outline" 
              className="mt-6 group"
              onClick={() => setLightboxImage(null)}
              data-testid="lightbox-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
