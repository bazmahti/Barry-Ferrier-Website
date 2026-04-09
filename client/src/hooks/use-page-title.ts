import { useEffect } from "react";

export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Dr. Baz` : "Dr. Baz - Australian Musician, Composer & Multimedia Designer";
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title || "Dr. Baz - Australian Musician & Award-Winning Composer");
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) {
      ogDescription.setAttribute("content", description);
    }

    return () => {
      document.title = "Dr. Baz - Australian Musician, Composer & Multimedia Designer";
    };
  }, [title, description]);
}
