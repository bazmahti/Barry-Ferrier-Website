import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { useImages } from "@/hooks/use-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Star, ArrowLeft, ArrowRight, Calendar, Phone, Play, ExternalLink, Image as ImageIcon, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import raynePdf from "@assets/Rayne_&_Dr_Baz_Duo_1770349857680.pdf";
import soloBioPdf from "@assets/Barry_Ferrier_Biography_1770363494312.pdf";
import { FadeIn, AnimatedGradientText } from "@/components/AnimatedElements";
import { sanitizeHtml, isHtmlContent } from "@/lib/sanitize";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import type { Project, Image } from "@shared/schema";

interface ProjectContent {
  slug: string;
  title: string;
  category: string;
  summary: string;
  fullContent: string[];
  highlights?: string[];
  collaborators?: string[];
  bookingInfo?: string;
  bookingLabel?: string;
  downloadPdf?: { url: string; label: string };
  heroImage?: string;
  galleryImages?: string[];
  externalLinks?: { url: string; label: string }[];
}

const projectContentData: ProjectContent[] = [
  {
    slug: "yarnai",
    title: "YarnAI",
    category: "current",
    summary: "AI-driven conversational interface for storytelling and knowledge sharing.",
    fullContent: [
      "YarnAI is a digital inclusion project designed to assist Australian indigenous communities in using AI in their everyday lives. The Letter Helper uploads a photo of a document for AI analysis and translation into everyday culturally sensitive colloquial language with an action plan.",
      "YarnAI represents the next frontier in interactive storytelling, utilizing advanced large language models to create a responsive, engaging narrative experience. The interface is designed to be intuitive, allowing users to 'spin a yarn' through natural conversation.",
      "The project explores the intersection of human creativity and machine intelligence, providing a platform where stories can evolve dynamically based on user input. Whether used for education, entertainment, or historical preservation, YarnAI brings a unique dimension to digital communication.",
      "Featuring a sleek, modern UI with a focus on ease of use, YarnAI demonstrates how AI can be humanized through thoughtful design and meaningful interaction patterns.",
      "The App is totally voice driven requiring no reading or typing for literacy challenged users."
    ],
    highlights: [
      "Conversational AI interface",
      "Dynamic storytelling engine",
      "Modern mobile-responsive design",
      "Voice-to-text integration",
      "Interactive narrative development"
    ],
    bookingInfo: "Contact for information regarding licensing or custom integration of the YarnAI engine for your creative projects.",
    bookingLabel: "Contact Dr Baz"
  },
  {
    slug: "my-intelligent-health",
    title: "My Intelligent Health",
    category: "current",
    heroImage: "/attached_assets/lMy_Intelligent_Health_Logo_1770425238192.jpg",
    summary: "AI-Powered Postoperative Care Management Platform revolutionizing patient outcomes through intelligent automation.",
    fullContent: [
      "My Intelligent Health is transforming postoperative care through an innovative AI-driven platform that bridges the gap between surgical procedures and full patient recovery. Our solution reduces hospital readmissions by up to 30% while saving clinicians 2+ hours daily through intelligent automation.",
      "With enterprise-grade security, multi-region compliance (HIPAA, APP, GDPR), and support for 17 medical specialties across 17 languages, we're positioned to capture a significant share of the $15B+ global post-acute care market.",
      "The platform combines AI-powered patient monitoring with daily check-ins analyzed by our AI Triage Engine to detect complications before they become critical. 17 specialty-specific AI copilots — from Orthopaedics to Oncology — are trained on clinical guidelines from colleges including RACGP, AOA, and CSANZ.",
      "Our automated billing optimization supports Medicare (MBS) and CPT/ICD-10 code suggestions with confidence scoring to maximize revenue capture. The AI Voice Scribe allows clinicians to speak naturally during consultations while our AI transcribes and structures notes in real-time.",
      "The mobile-first patient portal enables patients to track vitals, complete check-ins, and communicate with their care team. The AI health assistant chatbot supports 17 languages, making quality postoperative care accessible to diverse communities.",
      "Deployment takes less than 1 hour with immediate ROI. Currently live in Australia and the United States, with planned expansion to Canada, the United Kingdom, and New Zealand."
    ],
    highlights: [
      "Reduces hospital readmissions by up to 30%",
      "Saves clinicians 2+ hours daily",
      "17 medical specialties supported",
      "17 languages supported",
      "Enterprise-grade HIPAA, APP, GDPR compliance",
      "Sub-1-hour deployment",
      "AI Voice Scribe documentation",
      "Automated Medicare & CPT/ICD-10 billing"
    ],
    bookingInfo: "Contact for information about My Intelligent Health, partnership opportunities, or investor enquiries.",
    bookingLabel: "Contact Dr Baz"
  },
  {
    slug: "yoursay",
    title: "YourSay Video Polling App",
    category: "current",
    heroImage: "/attached_assets/YourSay_screen_1770425514022.jpg",
    summary: "A gamified video polling and engagement platform that transforms passive surveys into addictive experiences with real-time biometric analytics.",
    fullContent: [
      "We've seen how traditional polling methods are failing -- pollsters failed to predict Brexit and the Trump era. This innovative new App offers unique video polling: explainer videos with swipe yes/no functions for rapid responses allow a cutting edge data collection app for measuring public sentiment and opinion.",
      "YourSay is a state-of-the-art Flutter-based engagement platform that transforms passive surveys into addictive, gamified experiences. Our technology captures real-time emotional reactions to video content including industry-standard worm testing methodology, enhanced with device-universal biometric analytics that require no special hardware.",
      "Our biometric analytics system includes response timing tracking (measuring hesitation, decision speed, and change frequency), gesture intensity tracking (touch pressure and swipe velocity for enthusiasm scores), engagement motion tracking via accelerometer, camera-based attention detection, and scroll behavior analysis revealing interest through pause points and direction changes.",
      "YourSay includes a comprehensive gamification and rewards system with a 5-tier progression from New Voice to Top 5%, 10 achievement badges with celebration animations, daily challenges and streak rewards, and insight unlocks comparing user sentiment to crowd sentiment.",
      "The global market research industry exceeds $80 billion annually, with digital engagement platforms growing at 15% CAGR. YourSay delivers 3-5x higher engagement rates and unprecedented emotional intelligence data, with 75-85% response rates compared to 15-25% for traditional surveys, and 90%+ completion rates versus 40-60% industry standard.",
      "Built with Flutter 3.x and Dart 3 for cross-platform mobile (iOS, Android, Web), Firebase backend, Bunny.net CDN for global video delivery, OpenAI GPT-5 for AI-powered insights, and ElevenLabs for voice synthesis. A Public Democracy Pty Ltd product."
    ],
    highlights: [
      "75-85% response rate (vs 15-25% traditional)",
      "90%+ completion rate",
      "Real-time biometric emotion tracking",
      "Gamified 5-tier progression system",
      "Cross-platform: iOS, Android, Web",
      "AI-powered sentiment analysis",
      "$80B+ market opportunity",
      "No special hardware required"
    ],
    bookingInfo: "Contact for information about YourSay, partnership opportunities, or investor enquiries.",
    bookingLabel: "Contact Dr Baz"
  },
  {
    slug: "solo-performer",
    title: "Doctor Baz Solo",
    category: "current",
    heroImage: "/attached_assets/Dr_Baz__1770352347531.jpg",
    summary: "Multi-instrumentalist performer featuring vocals, guitar, piano, and stompbox. Perfect for intimate venues, weddings, and corporate events.",
    fullContent: [
      "Barry performs as a solo entertainer on vocals, guitar, piano, and stompbox, offering a diverse repertoire perfect for intimate venues, weddings, and corporate events. With decades of experience and a deep musical catalogue spanning blues, jazz, country, and rock, Doctor Baz brings an unforgettable atmosphere to any occasion.",
      "Drawing on over 40 years of professional performance experience, Doctor Baz delivers a captivating one-man show that spans multiple genres and styles. From soulful blues to upbeat rock classics, from tender ballads to foot-stomping boogie, every performance is tailored to the venue and audience.",
      "The solo format is perfect for restaurants, wine bars, private functions, weddings, and corporate events where quality background music or engaging entertainment is desired without the footprint of a full band."
    ],
    highlights: [
      "Vocals, guitar, piano & stompbox",
      "40+ years professional experience",
      "Weddings & corporate events",
      "Intimate venue specialist",
      "Diverse repertoire spanning multiple genres"
    ],
    galleryImages: [
      "/attached_assets/IMG_2508_1770444884845.jpeg",
      "/attached_assets/IMG_2507_1770444884846.jpeg"
    ],
    bookingInfo: "Available for bookings throughout the Northern Rivers region and beyond. Perfect for intimate venues, weddings, wineries, and corporate functions.",
    downloadPdf: { url: soloBioPdf, label: "Download Biography PDF" }
  },
  {
    slug: "pete-c-dr-baz",
    title: "Pete C. & Dr. Baz",
    category: "current",
    heroImage: "/attached_assets/Dr._Baz_&_Pete_C_1770353129612.jpg",
    summary: "Dynamic blues duo with Byron Bay legend Peter Claydon. Authentic blues with powerful vocals and gritty guitar.",
    fullContent: [
      "A dynamic blues duo featuring Byron Bay legend Peter Claydon (frontman of The Propellers and The Soul Shakers) alongside Doctor Baz. This powerhouse pairing delivers authentic blues with gritty vocals, powerful guitar work, and that raw energy that can only come from decades of dedication to the craft.",
      "The duo performs regularly at iconic Byron Bay venues including the Railway Friendly Bar, where their 'Acoustic Lounge Adventures' residency has become a local institution. Their chemistry on stage is undeniable, built on years of friendship and mutual musical respect.",
      "Pete C. brings his signature gravelly vocals and fierce guitar attack, while Dr. Baz provides the rhythmic foundation with his multi-instrumental skills. Together they create a sound that's bigger than the sum of its parts."
    ],
    highlights: [
      "Byron Bay blues legends",
      "Railway Friendly Bar residency",
      "Acoustic Lounge Adventures",
      "Authentic raw blues sound",
      "Regular Northern Rivers performances"
    ],
    collaborators: ["Peter Claydon (Pete C.)"],
    bookingInfo: "Available for venue bookings, festivals, and private events. The duo format offers powerful blues entertainment in a compact package.",
    externalLinks: [
      { url: "/history/pete-c-dr-baz", label: "See Videos" },
      { url: "/history/the-propellers", label: "The Propellers" }
    ]
  },
  {
    slug: "dr-baz-rex-carter",
    title: "Dr Baz & Rex Carter Duo",
    category: "current",
    heroImage: "/attached_assets/Dr_Baz_&_Rex_Carter_1771549136228.jpg",
    summary: "An energetic duo pairing Barry's multi-instrumental skills with drum master Rex Carter's intricate beats.",
    fullContent: [
      "An energetic duo pairing Barry's multi-instrumental skills with drum master Rex Carter's intricate Latin beats, funky grooves, and driving rock rhythms. Perfect for venues wanting high energy and musical sophistication in a smaller format.",
      "Rex Carter brings his masterful drumming skills developed over decades of professional performance, adding dynamic percussion that elevates every song. From subtle brushwork to powerful backbeats, Rex's versatility allows the duo to tackle virtually any genre.",
      "This duo format is ideal for venues that want the energy and impact of a full band without the larger footprint and higher costs. The combination of Barry's vocals, guitar, piano and stompbox with Rex's dynamic drums creates a surprisingly full sound."
    ],
    highlights: [
      "High-energy performance duo",
      "Latin, funk & rock versatility",
      "Full band sound in duo format",
      "Perfect for festivals & venues",
      "Dynamic percussion mastery"
    ],
    collaborators: ["Rex Carter"],
    galleryImages: [
      "/attached_assets/Dr_Baz_&_Rex_Carter_1771549136228.jpg",
      "/attached_assets/Dr_Baz_and_Rex_Carter_Duo_1771549145714.jpg"
    ],
    bookingInfo: "Available for festivals, venues, and events throughout the region. Offers the energy of a full band with the practicality of a duo."
  },
  {
    slug: "johnny-cash-tribute",
    title: "Johnny Cash Tribute Show",
    category: "current",
    summary: "Self-penned music theatre production celebrating the life of Johnny Cash. Sell-out success across Australia.",
    fullContent: [
      "'I Hear That Train a-Comin': The Johnny Cash Story' is Barry's self-penned music theatre production celebrating the life of Johnny Cash. The show has been a sell-out success across Australia, including performances at Darwin and Alice Springs Entertainment Centres and major Sydney venues.",
      "Barry stars in the lead role, bringing his rich, deep voice (reminiscent of Johnny Cash, Nick Cave, and Leonard Cohen) to this celebrated production. The show weaves together Johnny Cash's greatest hits with storytelling that brings the Man in Black's remarkable life to vivid reality.",
      "From his early days at Sun Records through his battles with addiction to his triumphant later years, the show covers the full arc of Cash's legendary career. Barry's natural vocal similarity to Cash, combined with his theatrical background and deep understanding of Cash's music, creates an authentic and moving tribute.",
      "The production has received critical acclaim and audience adoration wherever it plays, with standing ovations the norm rather than the exception."
    ],
    highlights: [
      "Self-penned music theatre production",
      "Sell-out success across Australia",
      "Darwin & Alice Springs Entertainment Centres",
      "Barry in the lead role",
      "Standing ovation performances"
    ],
    bookingInfo: "Available for theatre bookings, festivals, and major events. Full production with band available, or scaled versions for smaller venues."
  },
  {
    slug: "sunreel",
    title: "S'uNReel",
    category: "current",
    summary: "Experimental AI video and music production house pushing the boundaries of machine-assisted creativity.",
    heroImage: "/attached_assets/S'UnReel_5_1770249756468.jpeg",
    fullContent: [
      "S'uNReel is a creative musical partnership between Dr. Baz and Ralph Lycett Tyrrell, bringing together two experienced musicians to create original works that span multiple genres and styles.",
      "The collaboration has produced several notable projects including 'Fireies the Musical' - a tribute to volunteer firefighters - and 'Eve the Musical', as well as genre albums exploring Gypsy Jazz, R&B, and Reggae.",
      "Ralph Lycett Tyrrell brings his unique musical perspective and script and lyric writing skills to the partnership, complementing Dr. Baz's animation, songwriting and production abilities. Together they create music, films, stage musicals, and music videos that are both commercially accessible and artistically satisfying.",
      "The S'uNReel project represents the kind of creative freedom that comes from two experienced musicians collaborating without commercial constraints, allowing them to explore musical ideas that might not fit conventional industry expectations."
    ],
    highlights: [
      "Original musical collaborations",
      "Fireies the Musical",
      "Eve the Musical",
      "Genre albums: Gypsy Jazz, R&B, Reggae",
      "Creative partnership with Ralph Lycett Tyrrell"
    ],
    collaborators: ["Ralph Lycett Tyrrell"],
    galleryImages: [
      "/attached_assets/S'UnReel_2_1770427783857.jpg",
      "/attached_assets/S'UnReel_5_1770427783857.jpeg",
      "/attached_assets/S'unReel_T-Shirts__1770427783857.jpg"
    ],
    bookingInfo: "Contact information for availability for project design, music score composition, conceptual and artistic direction consultation, scriptwriting or rights to perform S'uNReel works.",
    bookingLabel: "Contact S'uNReel",
    externalLinks: [
      { url: "/projects/bumfluff-navellint", label: "Bum Fluff & Navel Lint" },
      { url: "/projects/fireies-the-musical", label: "Fireies - The Musical" },
      { url: "/projects/maeve-first-fleet-saga", label: "Maeve: A First Fleet Saga" },
      { url: "/music#sunreel-collaborations", label: "S'uNReel Discography" }
    ]
  },
  {
    slug: "rayne-dr-baz",
    title: "Rayne & Dr Baz",
    category: "current",
    summary: "A great new duo performing popular, rock, jazz & blues music with a big sophisticated sound.",
    heroImage: "/attached_assets/RAYNE_&_BAZ_1770349937602.JPG",
    fullContent: [
      "'Rayne & Dr Baz' perform a wide range of popular, rock, jazz & blues music, creating a big sophisticated sound, perfect for entertaining guests at your venue. A class act!",
      "Rayne was born and raised in Sydney, Australia. At the tender age of 4 she entered the entertainment industry, training as a classical ballerina. Her first performance soon followed at the age of 6 in 'The King & I'. She was proudly accepted into the Western Australian ballet company at the age of 15.",
      "At 16 she toured and performed with the Australian Opera Company in operas such as 'La Traviata' and 'The Merry Widow' with Dame Joan Sutherland. Along with her classical training in RAD, Kirov and Cecchetti methods, Rayne also commenced training in Jazz, Modern, Tap, choreography, singing and acting.",
      "At 18, Rayne entered the world of commercial dance performing with Barry Humphries, Frankie Howard, Robert Palmer, Peter Allen, Paul Hogan, Christopher Cross, Meatloaf and Elton John to name but a few, and including various musicals such as 'A Funny Thing Happened On The Way To The Forum' and 'Prisoner Cell Block H'.",
      "Rayne toured extensively in Australia, Singapore, Malaysia, Korea, London, Paris, Morocco, Turkey and Dubai. She lived for many years in London where she worked with an independent record label in the roles of A&R, Production, Songwriter and Artist. Rayne released her first album 'Between Heaven & Earth' which she wrote and co-produced in 2004, followed by 'Journey's' in 2009. She has now teamed up with Dr Baz."
    ],
    highlights: [
      "Popular, rock, jazz & blues repertoire",
      "Big sophisticated sound",
      "Top shelf entertainment",
      "Perfect for venues & private events",
      "Two highly experienced performers"
    ],
    collaborators: ["Rayne"],
    bookingInfo: "Available for venue bookings, private events, weddings, and corporate functions. A class act delivering top shelf entertainment.",
    downloadPdf: { url: raynePdf, label: "Download Promo PDF" }
  },
  {
    slug: "bumfluff-navellint",
    title: "Bum Fluff and Navel Lint",
    category: "current",
    heroImage: "/attached_assets/Bum_Fluff_&_Navel_Lint_CU_1770424178215.jpg",
    summary: "Test animations for the madcap musical animation series currently in development by S'uNReel Entertainment partners Ralph Lycett Tyrrell and Barry Ferrier (aka Dr Baz).",
    fullContent: [
      "Test animations for the madcap musical animation series 'Bum Fluff and Navel Lint' currently in development by S'uNReel Entertainment partners Ralph Lycett Tyrrell and Barry Ferrier (aka Dr Baz).",
      "Ever wonder what happens to all the residue from that messy hubbub of washing and drying in the laundry? Here's your answer. The Laundry is alive and inhabited by a bunch of animated characters left over from the last wash/dry cycle.",
      "Washing Machine, known as WM for short, has, as they say, been around a few times and remains stoic. Dizzy the Dryer is a bit scattered but means well. The Laundry staples include: OWO the smiling detergent; Smoothie the nervous fabric softener; Bucket, an angry blue bucket; Flop the mop; and the mischievous Buster the feather duster, not to be trusted. Inside WM lives the Gunk - a lump of gunk.",
      "Enter Bum Fluff - young and impulsive, always grooming, rearranging his fluff in new styles. His offsider Navel Lint has been around for ages and is content to be an uninteresting ball of mediocrity whilst offering wise comments. OneSock is their pal, perpetually unhinged, desperate to find her Twin (Twinnie). AssGas blows in periodically and, as expected, cracks fart jokes. Mr. Coin has been around, through a few washes, and hands, you might say, and as a result, has a very philosophical outlook. AssGas causes a stir and is gone in a puff of smoke.",
      "Setting off on a crazy adventure, our characters take a big slide down the drain to the outside world. Here, they befriend Frog, a big Australian green tree frog. Using some remembered magic, Mr. Coin casts a spell to transform Frog into Green Princess who escorts them to the Grate. They find Twinnie and she and OneSock are at long last reunited.",
      "On their return they discover the mischievous Buster has blocked the entrance to the drain with Bucket. But Moo comes to their rescue and they are soon reunited with WM, Dizzy and the others in the Laundry. Ready for the next big adventure."
    ],
    highlights: [
      "Madcap musical animation series",
      "S'uNReel Entertainment production",
      "Original animated characters",
      "Currently in development",
      "Collaboration with Ralph Lycett Tyrrell"
    ],
    collaborators: ["Ralph Lycett Tyrrell"],
    bookingInfo: "Contact for information about Bum Fluff and Navel Lint animation series and licensing opportunities.",
    bookingLabel: "Contact Creative Team"
  },
  {
    slug: "maeve-first-fleet-saga",
    title: "Maeve: A First Fleet Saga",
    category: "current",
    heroImage: "/attached_assets/MAEVE_an_esoteric_opera_1770363925407.jpg",
    summary: "An esoteric opera blending European and Aboriginal mysticism, tracing the journey of an Irish healer from conviction to transformation in colonial Australia. A S'uNReel Entertainment production.",
    fullContent: [
      "Maeve: A First Fleet Saga is an ambitious esoteric opera currently in development by S'uNReel Entertainment partners Barry Ferrier and Ralph Lycett Tyrrell. The work follows Maeve, a young Irish woman with deep connections to elemental spirits, whose gift for natural healing leads to her arrest and transportation to the penal colony of New South Wales aboard the First Fleet.",
      "The opera weaves a rich mythological foundation with historical drama, blending European and Aboriginal mysticism into a powerful narrative of freedom, containment, and transformation. Maeve's journey from the wild spaces of Ireland through the courts of London, across the ocean, and into the ancient landscapes of Australia forms the dramatic spine of the work.",
      "Four elemental spirits accompany Maeve throughout her ordeal: the practical, grounding Gnome (Earth); the whimsical, prophetic Sylph (Air); the passionate Salamander (Fire); and the empathic Undine (Water). These supernatural companions provide both dramatic and musical counterpoint, each with distinct vocal personalities ranging from bass-baritone to coloratura soprano.",
      "The work explores themes of environmental consciousness, the colonial impact on indigenous cultures, the tension between traditional healing and established medicine, and the possibility of cultural reconciliation. The score draws on traditional opera elements including arias, recitative, and ensemble pieces, enriched with contemporary influences, world music textures, Aboriginal instrumentation, and electronic sound design.",
      "The libretto features a triadic dramatic structure across two acts: Act 1 traces Maeve's arrest, trial, and sentencing in London, while Act 2 follows the ocean voyage and arrival in the new land, culminating in a transformative meeting with Orana, an Aboriginal healer whose ancient knowledge mirrors and complements Maeve's own gifts."
    ],
    highlights: [
      "Esoteric opera in development",
      "S'uNReel Entertainment production",
      "European & Aboriginal mysticism",
      "Four elemental spirit characters",
      "First Fleet historical drama",
      "Traditional & contemporary orchestration",
      "Collaboration with Ralph Lycett Tyrrell"
    ],
    collaborators: ["Ralph Lycett Tyrrell"],
    bookingInfo: "Contact for information about Maeve: A First Fleet Saga, performance rights, or collaboration opportunities.",
    bookingLabel: "Contact Creative Team"
  },
  {
    slug: "fireies-the-musical",
    title: "Fireies - The Musical",
    category: "current",
    heroImage: "/attached_assets/Fireies_the_Musical_1770419293451.jpg",
    summary: "A musical celebration of the values of small town rural Australia -- family, community and noble sacrifice when facing adversity.",
    fullContent: [
      "Fireies - The Musical celebrates the values of small town rural Australia -- family, community and noble sacrifice when facing adversity. This original musical production captures the spirit of volunteer firefighters and the communities they protect, weaving together themes of courage, resilience and the bonds that hold rural Australia together.",
      "Set in a typical Australian country town, the story follows the lives of local volunteer firefighters as they face the challenges of bushfire season. Through original songs and dramatic storytelling, the musical brings to life the camaraderie, sacrifice and quiet heroism that defines these communities.",
      "A S'uNReel Entertainment production by Barry Ferrier and Ralph Lycett Tyrrell."
    ],
    highlights: [
      "Original musical production",
      "S'uNReel Entertainment production",
      "Celebrates volunteer firefighters",
      "Rural Australian community values",
      "Original songs & dramatic storytelling"
    ],
    collaborators: ["Ralph Lycett Tyrrell"],
    bookingInfo: "Contact for information about Fireies - The Musical, performance rights, or collaboration opportunities.",
    bookingLabel: "Contact Creative Team"
  },
  {
    slug: "between-two-shores",
    title: "Between Two Shores: The Mirror Self",
    category: "current",
    summary: "A live performance installation co-created by Saya Minami and Barry Ferrier, exploring the psychological and emotional experience of migration through live theatre, immersive projection, generative visuals, and live music.",
    heroImage: "/attached_assets/Between_Two_Shores_1770351781833.jpg",
    fullContent: [
      "Between Two Shores explores the psychological and emotional experience of migration through the lens of a Japanese woman becoming bicultural in Australia. Rather than presenting a simplistic narrative of assimilation, the work focuses on identity negotiation, translation of self, and the creation of new cultural grammar.",
      "The performance combines live theatre, immersive projection, generative visuals, live music, and audience participation to place viewers inside the protagonist's internal world. The project uses dual embodiment: Saya Minami as the live performer — the embodied migrant self navigating the world — alongside a Screen Inner Voice representing memory, heritage, and subconscious identity, and Barry Ferrier as live Australian Counterpoint — symbolic representation of bureaucracy, cultural contrast, humour, sound architecture, and system triggers.",
      "This triadic structure allows emotional, cultural, and institutional forces to be represented theatrically rather than explained intellectually. The work is designed as a touring-ready performance installation compatible with diverse venue formats.",
      "About Saya Minami: Saya is a Japanese actress and performer from Tokyo, based in Byron Bay, Australia for over 16 years. Trained at the Byron Bay Film & Television School under the Larry Moss, Meisner, and Ivana Chubbuck methods, and at Theatre of Life Byron Bay, she brings rigorous technique and deep emotional range to her work. Saya is represented by JRM Group.",
      "Across more than 15 screen credits spanning 2013–2025, Saya has taken lead and supporting roles in independent Australian and international productions. Her lead performance in 'Midori in Hawaii' (2014, directed by John Hill) earned the Best Feature Film Award at the Korean International Expat Film Festival and a Best Narrative nomination at the Hawaii International Film Festival. 'The Viper's Hex' (2017, Black Forest Films) won Best Horror Film at the New York Hudson Yards Film Festival and Best Aussie Film 2017, screening at Monster Fest and Japan-Filmfest Hamburg.",
      "Recent credits include lead roles in 'The Haunted & Devoted' (2024, Black Forest Films) and 'CUTS!' (TV series pilot, 2022), supporting roles in 'Cherry Corpse' (2025, MaxFilm) and 'The Grand Finale: A New York Odyssey' (2025, Black Forest Films), and featured extra/stand-in work on the Hollywood production 'Nine Perfect Strangers' (2020, Blossom Films). On stage, she performed the role of Christmas Eve in the musical 'Avenue Q' (2023, Ballina Players).",
      "Her journey into acting began after a life-changing accident in Tokyo. During recovery, she re-evaluated her career in the internet industry and committed to performing arts, driven by a mission to raise awareness about the Fukushima nuclear disaster and its ongoing consequences.",
      "Between Two Shores represents a powerful new creative partnership, combining Saya's deeply personal experience of cultural migration and her extensive screen and stage career with Barry's background in immersive multimedia design, AI-driven visuals, and live musical performance. The work is currently in development."
    ],
    highlights: [
      "Live performance installation",
      "Immersive projection & generative AI visuals",
      "Intercultural identity exploration",
      "Live music integration",
      "Touring-ready format",
      "Collaboration between Japanese & Australian artists"
    ],
    collaborators: ["Saya Minami"],
    bookingInfo: "Between Two Shores is currently in development. Contact for expressions of interest, venue partnerships, or festival programming inquiries.",
    externalLinks: [
      { url: "https://vimeo.com/1051512602", label: "Saya Minami Showreel 2025" },
      { url: "https://www.imdb.com/name/nm6505233/", label: "Saya Minami on IMDb" }
    ]
  }
];

function getProjectContent(slug: string): ProjectContent | undefined {
  return projectContentData.find(p => p.slug === slug);
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: {
  images: { objectPath: string; altText?: string | null }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const image = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        data-testid="button-lightbox-close"
      >
        <X className="w-6 h-6" />
      </Button>

      {images.length > 1 && (
        <>
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            data-testid="button-lightbox-prev"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            data-testid="button-lightbox-next"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}

      <div 
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.objectPath}
          alt={image.altText || "Gallery image"}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          data-testid="lightbox-image"
        />
        <p className="text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", slug],
    enabled: !!slug,
  });

  const { data: soloImages } = useImages("solo");
  const { data: peteImages } = useImages("pete-c");
  const { data: rexImages } = useImages("rex-carter");
  const { data: cashImages } = useImages("johnny-cash");
  const { data: sunreelImages } = useImages("sunreel");

  const projectImages: Record<string, Image[] | undefined> = {
    "solo-performer": [
      { id: "solo-hero", objectPath: "/attached_assets/Dr_Baz__1770352347531.jpg", category: "solo", altText: "Dr Baz performing solo" } as any,
      ...(soloImages || []),
    ],
    "pete-c-dr-baz": [
      { id: "pete-c-hero", objectPath: "/attached_assets/Dr._Baz_&_Pete_C_1770353129612.jpg", category: "pete-c", altText: "Dr. Baz & Pete C." } as any,
      { id: "pete-c-live", objectPath: "/attached_assets/Pete_C._and_Dr_Baz_1770352150320.jpg", category: "pete-c", altText: "Pete C. and Dr Baz performing live" } as any,
      { id: "pete-c-propellers", objectPath: "/attached_assets/The_Propellers_Duo_-_Pete_C_&_Dr._Baz_1770360171063.jpg", category: "pete-c", altText: "The Propellers Duo - Pete C & Dr. Baz" } as any,
      ...(peteImages || []),
    ],
    "dr-baz-rex-carter": rexImages,
    "johnny-cash-tribute": cashImages,
    "sunreel": [
      { id: "sunreel-forest", objectPath: "/attached_assets/S'UnReel_2_1770427783857.jpg", category: "sunreel", altText: "S'uNReel Entertainment - Forest Logo" } as any,
      { id: "sunreel-clapper", objectPath: "/attached_assets/S'UnReel_5_1770427783857.jpeg", category: "sunreel", altText: "S'uNReel Entertainment - Clapperboard" } as any,
      { id: "sunreel-tshirts", objectPath: "/attached_assets/S'unReel_T-Shirts__1770427783857.jpg", category: "sunreel", altText: "S'uNReel Entertainment - T-Shirts" } as any,
      ...(sunreelImages || []),
    ],
    "yarnai": [
      { id: "yarnai-logo", objectPath: "/attached_assets/YarnAI_logo_1770424436282.jpg", category: "yarnai", altText: "YarnAI Logo" } as any,
      { id: "yarnai-hero", objectPath: "/attached_assets/IMG_2499_1770239583938.png", category: "yarnai", altText: "YarnAI Interface" } as any,
    ],
    "my-intelligent-health": [
      { id: "mih-logo", objectPath: "/attached_assets/lMy_Intelligent_Health_Logo_1770425238192.jpg", category: "my-intelligent-health", altText: "My Intelligent Health Logo" } as any,
    ],
    "yoursay": [
      { id: "yoursay-logo", objectPath: "/attached_assets/yoursay-logo_1770425746697.png", category: "yoursay", altText: "YourSay Logo" } as any,
      { id: "yoursay-screen", objectPath: "/attached_assets/YourSay_screen_1770425514022.jpg", category: "yoursay", altText: "YourSay App Screen" } as any,
      { id: "yoursay-tablet", objectPath: "/attached_assets/Your_Say_Android_Galaxy_S2_Tablet_Bag_1770425584902.jpg", category: "yoursay", altText: "YourSay on Android Tablet" } as any,
      { id: "yoursay-iphone", objectPath: "/attached_assets/Your_Say_iPhone_Mockup_08_1770425769581.jpg", category: "yoursay", altText: "YourSay on iPhone" } as any,
    ],
    "rayne-dr-baz": [{ id: "rayne-hero", objectPath: "/attached_assets/RAYNE_&_BAZ_1770349937602.JPG", category: "rayne-dr-baz", altText: "Rayne & Dr Baz performing" } as any],
    "maeve-first-fleet-saga": [
      { id: "maeve-hero", objectPath: "/attached_assets/MAEVE_an_esoteric_opera_1770363925407.jpg", category: "maeve", altText: "Maeve: A First Fleet Saga - Esoteric Opera" } as any,
      { id: "maeve-orana", objectPath: "/attached_assets/Orana_&_Maeve_on_a_log_1770364231521.jpg", category: "maeve", altText: "Orana and Maeve on a log in the forest" } as any,
      { id: "maeve-bunyip", objectPath: "/attached_assets/Bunyip_1770364195078.jpg", category: "maeve", altText: "The Bunyip - mythological creature" } as any,
      { id: "maeve-old-tree", objectPath: "/attached_assets/enhanced_Old_Tree_1770364323143.png", category: "maeve", altText: "The Old Tree - Gnome elemental spirit" } as any,
    ],
    "between-two-shores": [
      { id: "bts-hero", objectPath: "/attached_assets/Between_Two_Shores_1770351781833.jpg", category: "between-two-shores", altText: "Between Two Shores: The Mirror Self" } as any,
      { id: "saya-portrait", objectPath: "/attached_assets/Saya_Minami_1_1770362714357.jpg", category: "between-two-shores", altText: "Saya Minami" } as any,
      { id: "baz-portrait", objectPath: "/attached_assets/Dr._Barry_Ferrier_1770342989874.jpg", category: "between-two-shores", altText: "Dr. Barry Ferrier" } as any,
    ],
    "bumfluff-navellint": [
      { id: "bumfluff-hero", objectPath: "/attached_assets/Bum_Fluff_&_Navel_Lint_CU_1770424178215.jpg", category: "bumfluff", altText: "Bum Fluff and Navel Lint" } as any,
      { id: "bumfluff-orig", objectPath: "/attached_assets/BumFluff_&NavelLint_1770356607571.jpg", category: "bumfluff", altText: "Bum Fluff and Navel Lint Characters" } as any,
    ],
    "fireies-the-musical": [
      { id: "fireies-hero", objectPath: "/attached_assets/Fireies_the_Musical_1770419293451.jpg", category: "fireies", altText: "Fireies - The Musical" } as any,
      { id: "fireies-cliff", objectPath: "/attached_assets/Cliff_at_Bar_2_1770419644021.jpg", category: "fireies", altText: "Cliff at the Bar" } as any,
      { id: "fireies-brad-millie", objectPath: "/attached_assets/Brad_&_Millie_in_Bar_copy_1770419654282.jpg", category: "fireies", altText: "Brad & Millie in the Bar" } as any,
      { id: "fireies-glenys", objectPath: "/attached_assets/Glenys__1770419673250.jpg", category: "fireies", altText: "Glenys" } as any,
      { id: "fireies-weirdo", objectPath: "/attached_assets/Weirdo_Midshot_1770419701157.png", category: "fireies", altText: "Weirdo - Young Firefighter" } as any,
      { id: "fireies-tom", objectPath: "/attached_assets/Tom__1770423555040.jpg", category: "fireies", altText: "Tom" } as any,
    ],
  };

  const hardcodedContent = slug ? getProjectContent(slug) : undefined;
  
  usePageTitle(
    hardcodedContent?.title || project?.title || "Project",
    hardcodedContent?.summary || project?.description || ""
  );

  if (isLoading) {
    return (
      <main className="pt-16 md:pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const content = hardcodedContent;
  const dbProject = project;
  const title = content?.title || dbProject?.title || "Project";
  const category = content?.category || dbProject?.category || "current";
  const images = slug ? projectImages[slug] : undefined;
  const heroImage = content?.heroImage || images?.[0]?.objectPath;

  let youtubeVideos: { id: string; title: string }[] = [];
  if (dbProject?.youtubeVideos) {
    try {
      youtubeVideos = typeof dbProject.youtubeVideos === 'string' 
        ? JSON.parse(dbProject.youtubeVideos)
        : dbProject.youtubeVideos;
    } catch {
      youtubeVideos = [];
    }
  }

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title={title}
        description={content?.summary || dbProject?.description || ""}
        url={`/projects/${slug}`}
        keywords="music project, live performance, Doctor Baz"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: title, url: `/projects/${slug}` }
        ])}
      />
      <section className="relative min-h-[40vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {heroImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-gold/30" />
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <FadeIn direction="up">
            <Link href="/projects">
              <Button variant="ghost" className="mb-6" data-testid="button-back-projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30" data-testid="badge-category">
              {category === "current" ? "Active Project" : category}
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4" data-testid="text-project-title">
              <AnimatedGradientText>{title}</AnimatedGradientText>
            </h1>
            
            {content?.summary && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {content.summary}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" delay={0.1}>
            {content?.fullContent && content.fullContent.length > 0 ? (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                {content.fullContent.map((paragraph, index) => (
                  <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : dbProject?.fullDescription ? (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                {isHtmlContent(dbProject.fullDescription) ? (
                  <div className="text-foreground/90 leading-relaxed rich-html-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(dbProject.fullDescription) }} />
                ) : (
                  <p className="text-foreground/90 leading-relaxed">
                    {dbProject.fullDescription}
                  </p>
                )}
              </div>
            ) : null}
          </FadeIn>

          {content?.highlights && content.highlights.length > 0 && (
            <FadeIn direction="up" delay={0.2}>
              <Card className="mb-12">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-gold" />
                    Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <span className="text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {content?.collaborators && content.collaborators.length > 0 && (
            <FadeIn direction="up" delay={0.3}>
              <Card className="mb-12">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-2xl font-serif font-bold mb-4">Collaborators</h2>
                  <div className="flex flex-wrap gap-2">
                    {content.collaborators.map((collaborator, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {collaborator}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {content?.externalLinks && content.externalLinks.length > 0 && (
            <FadeIn direction="up" delay={0.35}>
              <div className="mb-12 flex flex-wrap gap-4">
                {content.externalLinks.map((link, index) => {
                  const isExternal = link.url.startsWith('http');
                  if (isExternal) {
                    return (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" data-testid={`link-external-${index}`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {link.label}
                        </Button>
                      </a>
                    );
                  }
                  return (
                    <Link key={index} href={link.url}>
                      <Button variant="outline" data-testid={`link-internal-${index}`}>
                        {link.label}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </FadeIn>
          )}

          {youtubeVideos.length > 0 && (
            <FadeIn direction="up" delay={0.4}>
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <Play className="w-6 h-6 text-primary" />
                  Videos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {youtubeVideos.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          data-testid={`video-embed-${index}`}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{video.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {content?.downloadPdf && (
            <FadeIn direction="up" delay={0.5}>
              <div className="mb-12">
                <a href={content.downloadPdf.url} download>
                  <Button variant="outline" data-testid="button-download-pdf">
                    <Download className="w-4 h-4 mr-2" />
                    {content.downloadPdf.label}
                  </Button>
                </a>
              </div>
            </FadeIn>
          )}

          {images && images.length > 0 && (
            <FadeIn direction="up" delay={0.55}>
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden bg-muted hover-elevate cursor-pointer"
                      onClick={() => setLightboxIndex(index)}
                    >
                      <img
                        src={image.objectPath}
                        alt={image.altText || `${title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        data-testid={`gallery-image-${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {lightboxIndex !== null && images && images.length > 0 && (
            <Lightbox
              images={images}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
              onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
            />
          )}

          {content?.bookingInfo && (
            <FadeIn direction="up" delay={0.6}>
              <Card className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-gold/20">
                <CardContent className="p-6 lg:p-8 text-center">
                  <h2 className="text-2xl font-serif font-bold mb-4">{content?.bookingLabel || "Book This Act"}</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    {content.bookingInfo}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact">
                      <Button className="bg-gold hover:bg-gold/90 text-white min-w-[180px]" data-testid="button-book-now">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                    <a href="tel:0405788433">
                      <Button variant="outline" className="min-w-[180px]" data-testid="button-call">
                        <Phone className="w-4 h-4 mr-2" />
                        Call: 0405 788 433
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      </section>
    </main>
  );
}
