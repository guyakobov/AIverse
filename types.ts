export type Category = 'All' | 'Coding' | 'Writing' | 'Image' | 'Video' | 'Audio' | 'Productivity' | 'Research';

export interface ToolLink {
  platform: string;
  url: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  url: string;
  icon: string; // Key for the IconMap
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid';
  links: ToolLink[];
}

export interface RecommendationResult {
  toolId: string;
  reason: string;
}
