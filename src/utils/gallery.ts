const photoFiles = import.meta.glob("../content/gallery/photos/*.json", {
  eager: true,
});

export interface GalleryPhoto {
  image: string;
  alt: string;
  category: "exterior" | "interior" | "surroundings" | "activities";
  order: number;
}

export function getAllPhotos(): GalleryPhoto[] {
  const photos: GalleryPhoto[] = Object.values(photoFiles).map(
    (mod: any) => mod.default || mod,
  );
  return photos.sort((a, b) => a.order - b.order);
}

export function getPhotosByCategory(category: string): GalleryPhoto[] {
  return getAllPhotos().filter((p) => p.category === category);
}
