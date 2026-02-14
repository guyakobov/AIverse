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

export const CATEGORY_COLORS: Record<Category, { primary: string, secondary: string, border: string, text: string }> = {
  'All': { primary: 'indigo-600', secondary: 'indigo-500/10', border: 'indigo-500/20', text: 'indigo-400' },
  'Coding': { primary: 'blue-600', secondary: 'blue-500/10', border: 'blue-500/20', text: 'blue-400' },
  'Writing': { primary: 'emerald-600', secondary: 'emerald-500/10', border: 'emerald-500/20', text: 'emerald-400' },
  'Image': { primary: 'violet-600', secondary: 'violet-500/10', border: 'violet-500/20', text: 'violet-400' },
  'Video': { primary: 'rose-600', secondary: 'rose-500/10', border: 'rose-500/20', text: 'rose-400' },
  'Audio': { primary: 'amber-600', secondary: 'amber-500/10', border: 'amber-500/20', text: 'amber-400' },
  'Productivity': { primary: 'cyan-600', secondary: 'cyan-500/10', border: 'cyan-500/20', text: 'cyan-400' },
  'Research': { primary: 'fuchsia-600', secondary: 'fuchsia-500/10', border: 'fuchsia-500/20', text: 'fuchsia-400' },
};

export const CATEGORY_ICONS: Record<Category, React.FC<any>> = {
  'All': Layout,
  'Coding': Code,
  'Writing': PenTool,
  'Image': ImageIcon,
  'Video': Video,
  'Audio': Mic,
  'Productivity': Zap,
  'Research': Search,
};

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
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Generates high-quality, artistic images from text descriptions via Discord.',
    category: 'Image',
    url: 'https://midjourney.com',
    icon: 'Image',
    tags: ['Art', 'Generative', 'Creative'],
    pricing: 'Paid',
    links: []
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with autocomplete.',
    category: 'Coding',
    url: 'https://github.com/features/copilot',
    icon: 'Terminal',
    tags: ['Development', 'Autocomplete', 'Productivity'],
    pricing: 'Paid',
    links: []
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI copywriter to create high-quality content for marketing and blogs.',
    category: 'Writing',
    url: 'https://jasper.ai',
    icon: 'FileText',
    tags: ['Marketing', 'Copywriting', 'SEO'],
    pricing: 'Paid',
    links: []
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'AI magic tools for video editing, generation, and VFX.',
    category: 'Video',
    url: 'https://runwayml.com',
    icon: 'Video',
    tags: ['Editor', 'VFX', 'Generative Video'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Realistic AI voice generator and text-to-speech software.',
    category: 'Audio',
    url: 'https://elevenlabs.io',
    icon: 'Mic',
    tags: ['TTS', 'Voice Cloning', 'Audio'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search engine that provides direct answers with citations.',
    category: 'Research',
    url: 'https://perplexity.ai',
    icon: 'Search',
    tags: ['Search', 'Academic', 'News'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'Integrated AI assistant for summarizing, writing, and brainstorming within Notion.',
    category: 'Productivity',
    url: 'https://notion.so',
    icon: 'Briefcase',
    tags: ['Notes', 'Workspace', 'Organization'],
    pricing: 'Paid',
    links: []
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source latent text-to-image diffusion model.',
    category: 'Image',
    url: 'https://stability.ai',
    icon: 'Image',
    tags: ['Open Source', 'Art', 'Generation'],
    pricing: 'Free',
    links: []
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'An AI-first code editor designed to make you extraordinarily productive.',
    category: 'Coding',
    url: 'https://cursor.sh',
    icon: 'Code',
    tags: ['IDE', 'Editor', 'Debugging'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'suno',
    name: 'Suno',
    description: 'Create full songs with lyrics and vocals using simple text prompts.',
    category: 'Audio',
    url: 'https://suno.com',
    icon: 'Music',
    tags: ['Music', 'Song Generation', 'Creative'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google’s most capable AI model built for multimodality.',
    category: 'Productivity',
    url: 'https://gemini.google.com',
    icon: 'Zap',
    tags: ['Multimodal', 'Google', 'Assistant'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    description: 'A suite of AI tools for design, including magic edit, erase, and expand.',
    category: 'Image',
    url: 'https://canva.com',
    icon: 'Layout',
    tags: ['Design', 'Social Media', 'Editor'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'tldv',
    name: 'tl;dv',
    description: 'AI meeting recorder that transcribes and summarizes calls.',
    category: 'Productivity',
    url: 'https://tldv.io',
    icon: 'Mic',
    tags: ['Meetings', 'Summarization', 'Remote Work'],
    pricing: 'Freemium',
    links: []
  },
  {
    id: 'consensus',
    name: 'Consensus',
    description: 'AI search engine for research papers and scientific evidence.',
    category: 'Research',
    url: 'https://consensus.app',
    icon: 'Search',
    tags: ['Science', 'Academic', 'Papers'],
    pricing: 'Freemium',
    links: []
  }
];
export const LEGAL_CONTENT = {
  terms: {
    title: 'Terms of Use',
    lastUpdated: 'February 14, 2026',
    content: `
Welcome to AIverse (the "Website"). By accessing or using this Website, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use the Website.

**2. Disclaimer of Warranties**
The Website is an aggregation platform that provides links to third-party artificial intelligence tools and media content ("Third-Party Services"). We do not own, operate, or control these Third-Party Services. The content provided on this Website is for informational purposes only. We make no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of any Third-Party Services.

**3. Third-Party Links and Content**
Our Website contains links to external websites, social media content (e.g., TikTok, Podcasts), and third-party tools. We are not responsible for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that AIverse shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of such content or services.

**4. Intellectual Property**
All original content, design, and layout of this Website are the property of AIverse. All trademarks, logos, and brand names of the AI tools mentioned are the property of their respective owners.

**5. Limitation of Liability**
To the fullest extent permitted by law, AIverse shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the Website.`
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'February 14, 2026',
    content: `
**1. Information We Collect**
We may collect non-personal information about your visit, such as your IP address, browser type, and the pages you visited, to help us analyze traffic and improve the Website.

**2. Cookies**
This Website uses cookies to enhance user experience. By using our Website, you consent to the use of cookies in accordance with this Privacy Policy.

**3. Third-Party Links**
Once you click a link to an external AI tool or media platform, this Privacy Policy no longer applies. We encourage you to read the privacy policies of any site you visit.`
  },
  disclaimer: {
    title: 'Disclaimer',
    lastUpdated: 'February 14, 2026',
    content: `
The information provided on this Website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty regarding the accuracy or completeness of any information on the Site.

**External Links Disclaimer:**
The Site contains links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy or validity by us.

**No Professional Advice:**
The use or reliance of any information contained on the Site is solely at your own risk.`
  },
  accessibility: {
    title: 'Accessibility Statement',
    lastUpdated: 'February 14, 2026',
    content: `
**General**
AIverse strives to ensure that its services are accessible to people with disabilities. We have invested resources to help ensure that our website is made easier to use and more accessible for people with disabilities, with the strong belief that every person has the right to live with dignity, equality, comfort, and independence.

**Accessibility on This Website**
We make efforts to comply with the Web Content Accessibility Guidelines (WCAG 2.1) at the AA level.

**Disclaimer**
Despite our efforts to make all pages and content fully accessible, some content may not have yet been fully adapted to the strictest accessibility standards. This may be a result of not having found or identified the most appropriate technological solution.

**Contact Us**
If you are experiencing difficulty with any content on AIverse or require assistance with any part of our site, please contact us and we will be happy to assist.

**Email:** legal@ai-verse.com`
  }
};