import { useQuery } from "@tanstack/react-query";
import type { Image } from "@shared/schema";

export function useImages(category?: string) {
  const queryUrl = category ? `/api/images?category=${category}` : "/api/images";
  
  return useQuery<Image[]>({
    queryKey: [queryUrl],
  });
}

export function useImageByCategory(category: string) {
  const { data: images, isLoading } = useImages(category);
  return {
    image: images?.[0] ?? null,
    images: images ?? [],
    isLoading,
  };
}
