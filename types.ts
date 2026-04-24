export type Category = string;

export interface ToolLink {
  platform: string;
  url: string;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  category: Category;
  url: string;
  icon: string; // Key for the IconMap
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid';
  links: ToolLink[];
  features?: string[];
}

export interface RecommendationResult {
  toolId: number;
  reason: string;
}
