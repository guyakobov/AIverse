import React from 'react';
import { 
  Code, 
  PenTool, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Zap, 
  Search, 
  Cpu, 
  MessageSquare, 
  Music, 
  Layout, 
  Terminal,
  FileText,
  Briefcase
} from 'lucide-react';
import { Tool, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Coding', 'Writing', 'Image', 'Video', 'Audio', 'Productivity', 'Research'];

export const ICON_MAP: Record<string, React.FC<any>> = {
  Code,
  PenTool,
  Image: ImageIcon,
  Video,
  Mic,
  Zap,
  Search,
  Cpu,
  MessageSquare,
  Music,
  Layout,
  Terminal,
  FileText,
  Briefcase
};

export const TOOLS: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for writing, coding, and problem-solving.',
    category: 'Writing',
    url: 'https://chat.openai.com',
    icon: 'MessageSquare',
    tags: ['Chatbot', 'LLM', 'General'],
    pricing: 'Freemium'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Generates high-quality, artistic images from text descriptions via Discord.',
    category: 'Image',
    url: 'https://midjourney.com',
    icon: 'Image',
    tags: ['Art', 'Generative', 'Creative'],
    pricing: 'Paid'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with autocomplete.',
    category: 'Coding',
    url: 'https://github.com/features/copilot',
    icon: 'Terminal',
    tags: ['Development', 'Autocomplete', 'Productivity'],
    pricing: 'Paid'
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI copywriter to create high-quality content for marketing and blogs.',
    category: 'Writing',
    url: 'https://jasper.ai',
    icon: 'FileText',
    tags: ['Marketing', 'Copywriting', 'SEO'],
    pricing: 'Paid'
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'AI magic tools for video editing, generation, and VFX.',
    category: 'Video',
    url: 'https://runwayml.com',
    icon: 'Video',
    tags: ['Editor', 'VFX', 'Generative Video'],
    pricing: 'Freemium'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Realistic AI voice generator and text-to-speech software.',
    category: 'Audio',
    url: 'https://elevenlabs.io',
    icon: 'Mic',
    tags: ['TTS', 'Voice Cloning', 'Audio'],
    pricing: 'Freemium'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search engine that provides direct answers with citations.',
    category: 'Research',
    url: 'https://perplexity.ai',
    icon: 'Search',
    tags: ['Search', 'Academic', 'News'],
    pricing: 'Freemium'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'Integrated AI assistant for summarizing, writing, and brainstorming within Notion.',
    category: 'Productivity',
    url: 'https://notion.so',
    icon: 'Briefcase',
    tags: ['Notes', 'Workspace', 'Organization'],
    pricing: 'Paid'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source latent text-to-image diffusion model.',
    category: 'Image',
    url: 'https://stability.ai',
    icon: 'Image',
    tags: ['Open Source', 'Art', 'Generation'],
    pricing: 'Free'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'An AI-first code editor designed to make you extraordinarily productive.',
    category: 'Coding',
    url: 'https://cursor.sh',
    icon: 'Code',
    tags: ['IDE', 'Editor', 'Debugging'],
    pricing: 'Freemium'
  },
  {
    id: 'suno',
    name: 'Suno',
    description: 'Create full songs with lyrics and vocals using simple text prompts.',
    category: 'Audio',
    url: 'https://suno.com',
    icon: 'Music',
    tags: ['Music', 'Song Generation', 'Creative'],
    pricing: 'Freemium'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google’s most capable AI model built for multimodality.',
    category: 'Productivity',
    url: 'https://gemini.google.com',
    icon: 'Zap',
    tags: ['Multimodal', 'Google', 'Assistant'],
    pricing: 'Freemium'
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    description: 'A suite of AI tools for design, including magic edit, erase, and expand.',
    category: 'Image',
    url: 'https://canva.com',
    icon: 'Layout',
    tags: ['Design', 'Social Media', 'Editor'],
    pricing: 'Freemium'
  },
  {
    id: 'tldv',
    name: 'tl;dv',
    description: 'AI meeting recorder that transcribes and summarizes calls.',
    category: 'Productivity',
    url: 'https://tldv.io',
    icon: 'Mic',
    tags: ['Meetings', 'Summarization', 'Remote Work'],
    pricing: 'Freemium'
  },
  {
    id: 'consensus',
    name: 'Consensus',
    description: 'AI search engine for research papers and scientific evidence.',
    category: 'Research',
    url: 'https://consensus.app',
    icon: 'Search',
    tags: ['Science', 'Academic', 'Papers'],
    pricing: 'Freemium'
  }
];