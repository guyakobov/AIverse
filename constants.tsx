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
    lastUpdated: 'February 15, 2026',
    content: `
Welcome to AIverse. By accessing or using this website, you agree to the following terms and conditions.

**1. Informational Purpose**
AIverse provides information about artificial intelligence tools for general informational purposes only. The content on this website does not constitute legal, financial, business, or professional advice.

**2. No Warranties**
All content is provided "as is" without warranties of any kind. AIverse does not guarantee the accuracy, completeness, or reliability of any information listed.

**3. Third-Party Links**
This website contains links to third-party websites and social media platforms. AIverse has no control over the content or policies of those external websites and assumes no responsibility for them.

**4. Limitation of Liability**
AIverse shall not be liable for any direct or indirect damages arising from the use of this website or any linked third-party services.

**5. User Submissions**
If you submit tool suggestions or other content, you confirm that you have the right to share that information. You grant AIverse permission to review, modify, and publish such submissions.

**6. Intellectual Property**
All trademarks, logos, and brand names displayed on this website belong to their respective owners. Their inclusion does not imply affiliation or endorsement.

AIverse reserves the right to update these Terms at any time.`
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'February 15, 2026',
    content: `
AIverse respects your privacy.

**1. Information We Collect**
We only collect information that users voluntarily submit through forms, such as tool suggestions or contact messages.

**2. How We Use Information**
Submitted information is used solely for reviewing tool suggestions and improving the website.

**3. Data Sharing**
We do not sell, rent, or trade personal information to third parties.

**4. Data Security**
We take reasonable measures to protect submitted information. However, no method of transmission over the internet is completely secure.

**5. Contact**
If you would like your submitted information removed, please contact us at: support@ai-verse.com`
  },
  disclaimer: {
    title: 'AI Tools Disclaimer',
    lastUpdated: 'February 15, 2026',
    content: `
AIverse is a curated directory of artificial intelligence tools.

We do not develop, operate, or control the tools listed on this website. We are not responsible for their functionality, performance, data handling practices, or any outcomes resulting from their use.

Users should review each tool’s official website, terms, and privacy policies before using their services.

Use of any third-party tool is at your own discretion and risk.`
  },
  accessibility: {
    title: 'Accessibility Statement',
    lastUpdated: 'February 15, 2026',
    content: `
AIverse is committed to providing an accessible and user-friendly experience for all visitors.

We strive to follow recognized accessibility standards and continuously improve the usability of this website.

If you experience any difficulty accessing content, please contact us at: support@ai-verse.com and we will do our best to assist you.`
  },
  contact: {
    title: 'Contact Us',
    lastUpdated: 'February 15, 2026',
    content: `
We welcome feedback, suggestions, and accessibility requests.

**Email:** support@ai-verse.com

Feel free to reach out to us with any questions or comments regarding the AIverse directory.`
  },
  dmca: {
    title: 'DMCA / Copyright Policy',
    lastUpdated: 'February 15, 2026',
    content: `
**Notification of Copyright Infringement**
AIverse respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act ("DMCA"), we will respond promptly to notices of alleged infringement that are reported to our Designated Copyright Agent.

**How to File a Notice**
If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with a written notice containing:
1. A description of the copyrighted work you claim has been infringed.
2. A description of where the material you claim is infringing is located on the Site.
3. Your address, telephone number, and email address.
4. A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.
5. A statement by you, made under penalty of perjury, that the info in your notice is accurate and that you are the copyright owner or authorized to act on their behalf.
6. An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest.

**Designated Copyright Agent**
Copyright Manager
AIverse Executive Directory
Email: dmca@ai-verse.com`
  },
  cookies: {
    title: 'Cookie Policy',
    lastUpdated: 'February 15, 2026',
    content: `
**1. What are Cookies?**
Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide info to the owners of the site.

**2. How we use Cookies**
We use cookies for the following purposes:
- **Essential Cookies**: Necessary for the website to function.
- **Analytics Cookies**: To understand how visitors interact with the website (e.g., page views, traffic sources).
- **Preference Cookies**: To remember your settings and choices (e.g., favorites).

**3. Your Choices**
You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.`
  },
  imprint: {
    title: 'Imprint / Legal Notice',
    lastUpdated: 'February 15, 2026',
    content: `
**Legal Information**
AIverse Executive Directory
Represented by: Guy Akavia
Address: Tel Aviv, Israel
Email: contact@ai-verse.com

**Responsible for Content**
Owner of AIverse
Tel Aviv, Israel

**Dispute Resolution**
The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr. We are not jumpy or obligated to participate in dispute resolution proceedings before a consumer arbitration board.`
  }
};
