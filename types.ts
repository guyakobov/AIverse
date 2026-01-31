export type Category = 'All' | 'Coding' | 'Writing' | 'Image' | 'Video' | 'Audio' | 'Productivity' | 'Research';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  url: string;
  icon: string; // Key for the IconMap
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid';
}

export interface RecommendationResult {
  toolId: string;
  reason: string;
}
