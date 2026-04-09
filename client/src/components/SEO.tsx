import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://barryferrier.com";
const SITE_NAME = "Doctor Baz - Barry Ferrier | AI Video Artist & Experimental Filmmaker";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

export function SEO({ 
  title, 
  description, 
  image = DEFAULT_IMAGE,
  type = "website",
  url = "",
  keywords,
  jsonLd
}: SEOProps) {
  const fullTitle = title === "Home" 
    ? SITE_NAME 
    : `${title} | Doctor Baz - Barry Ferrier`;
  
  const fullUrl = `${BASE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;
  
  const defaultKeywords = "Barry Ferrier, Doctor Baz, AI video artist, AI pioneer in arts, AI innovation arts, AI-generated film, award-winning AI filmmaker, experimental filmmaker, electronic music pioneer, Fairlight CMI, early adopter AI technology, AI art pioneer Australia, Entombed film, Art Soul AI, Byron Bay musician, Australian musician, Dolphin Award winner, multimedia designer, PhD multimedia, Lindsay Kemp, Johnny Cash tribute, Jesus Christ Superstar, QPAC, Bond University, Bluesfest, Splendour in the Grass";
  const fullKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Dr Barry Ferrier (Doctor Baz)" />
      <meta name="robots" content="index, follow" />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AU" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      <link rel="canonical" href={fullUrl} />
      
      <meta name="geo.region" content="AU-NSW" />
      <meta name="geo.placename" content="Byron Bay" />
      
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr Barry Ferrier",
    "alternateName": "Doctor Baz",
    "url": "https://barryferrier.com",
    "image": `${BASE_URL}/favicon.png`,
    "jobTitle": "AI Video Artist & Experimental Filmmaker",
    "description": "Award-winning AI video artist, electronic music pioneer, and experimental filmmaker with 40+ years of creative innovation. Creator of Entombed (Best Experimental Film) and author of Art, Soul and AI.",
    "knowsAbout": ["AI Video Art", "Electronic Music", "Fairlight CMI", "Experimental Film", "Multimedia Design", "Music Composition", "Guitar"],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "PhD",
      "name": "PhD in Multimedia Design",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Southern Cross University"
      }
    },
    "award": [
      "Best Experimental Film - New York Arthouse Film Festival",
      "N.C.E.I.A. Dolphin Award - Best Blues Artist",
      "N.C.E.I.A. Dolphin Award - Best Jazz Artist",
      "N.C.E.I.A. Dolphin Award - Best Music Video",
      "Golden Reel Award",
      "A.S.E.A. Award for Excellence in the Arts"
    ],
    "sameAs": [
      "https://www.youtube.com/@DoctorBaz",
      "https://www.facebook.com/doctorbaz"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Byron Bay",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    }
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "description": "Portfolio of Dr Barry Ferrier (Doctor Baz) - Award-winning AI video artist, electronic music pioneer, and experimental filmmaker with 40+ years of creative innovation.",
    "author": {
      "@type": "Person",
      "name": "Dr Barry Ferrier"
    }
  };
}

export function createArticleJsonLd(title: string, description: string, url: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `${BASE_URL}${url}`,
    "image": image || DEFAULT_IMAGE,
    "author": {
      "@type": "Person",
      "name": "Dr Barry Ferrier",
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Person",
      "name": "Dr Barry Ferrier"
    }
  };
}

export function createVideoJsonLd(name: string, description: string, youtubeId: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    "uploadDate": "2024-01-01",
    "contentUrl": `https://www.youtube.com/watch?v=${youtubeId}`,
    "embedUrl": `https://www.youtube.com/embed/${youtubeId}`
  };
}

export function createBreadcrumbJsonLd(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}
