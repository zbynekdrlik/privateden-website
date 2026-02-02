import apartment1 from "../content/apartments/apartment-1.json";
import apartment2 from "../content/apartments/apartment-2.json";
import apartment3 from "../content/apartments/apartment-3.json";
import studio from "../content/apartments/studio.json";
import cottage from "../content/apartments/cottage.json";

export interface Apartment {
  id: string;
  slug: string;
  order: number;
  name: Record<string, string>;
  description: Record<string, string>;
  capacity: number;
  capacityNote: Record<string, string>;
  bedroomCount: number;
  rooms: Array<{
    type: string;
    beds?: Array<{ type: string; count: number }>;
    extras?: string[];
  }>;
  priceRange: { min: number; max: number };
  mainImage: string;
  images: string[];
  features: string[];
}

const allApartments: Apartment[] = [
  apartment1,
  apartment2,
  apartment3,
  studio,
  cottage,
] as Apartment[];

export function getAllApartments(): Apartment[] {
  return allApartments.sort((a, b) => a.order - b.order);
}

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return allApartments.find((a) => a.slug === slug);
}
