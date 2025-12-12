export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
export type CategoryType = 'Text' | 'Image' | 'Video' | 'Code' | 'Audio' | 'Productivity' | '3D';

export interface AITool {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: CategoryType;
  pricing: PricingType;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
  imageUrl: string;
  tags: string[];
  launchDate: string;
  featured?: boolean;
}

export interface FilterState {
  query: string;
  category: string;
  pricing: string;
  sortBy: 'popular' | 'newest' | 'name';
}
