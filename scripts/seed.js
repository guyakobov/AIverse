
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is missing from environment variables');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const tools = [
    {
        id: 1,
        name: 'ChatGPT',
        description: 'Advanced conversational AI for writing, coding, and problem-solving.',
        category: 'Writing',
        url: 'https://chat.openai.com',
        icon: 'MessageSquare',
        tags: ['Chatbot', 'LLM', 'General'],
        pricing: 'Freemium',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/openai/' },
            { platform: 'podcast', url: 'https://open.spotify.com/show/openai-podcast' },
            { platform: 'article', url: 'https://openai.com/blog/chatgpt' }
        ]
    },
    {
        id: 2,
        name: 'Midjourney',
        description: 'Generates high-quality, artistic images from text descriptions via Discord.',
        category: 'Image',
        url: 'https://midjourney.com',
        icon: 'Image',
        tags: ['Art', 'Generative', 'Creative'],
        pricing: 'Paid',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/midjourney/' },
            { platform: 'article', url: 'https://techcrunch.com/2022/midjourney-ai/' }
        ]
    },
    {
        id: 3,
        name: 'GitHub Copilot',
        description: 'AI pair programmer that helps you write code faster with autocomplete.',
        category: 'Coding',
        url: 'https://github.com/features/copilot',
        icon: 'Terminal',
        tags: ['Development', 'Autocomplete', 'Productivity'],
        pricing: 'Paid',
        links: [
            { platform: 'article', url: 'https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/' }
        ]
    },
    {
        id: 4,
        name: 'Jasper',
        description: 'AI copywriter to create high-quality content for marketing and blogs.',
        category: 'Writing',
        url: 'https://jasper.ai',
        icon: 'FileText',
        tags: ['Marketing', 'Copywriting', 'SEO'],
        pricing: 'Paid',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/jasper.ai/' }
        ]
    },
    {
        id: 5,
        name: 'Runway',
        description: 'AI magic tools for video editing, generation, and VFX.',
        category: 'Video',
        url: 'https://runwayml.com',
        icon: 'Video',
        tags: ['Editor', 'VFX', 'Generative Video'],
        pricing: 'Freemium',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/runwayml/' }
        ]
    },
    {
        id: 6,
        name: 'ElevenLabs',
        description: 'Realistic AI voice generator and text-to-speech software.',
        category: 'Audio',
        url: 'https://elevenlabs.io',
        icon: 'Mic',
        tags: ['TTS', 'Voice Cloning', 'Audio'],
        pricing: 'Freemium',
        links: [
            { platform: 'youtube', url: 'https://www.youtube.com/@elevenlabs' }
        ]
    },
    {
        id: 7,
        name: 'Perplexity',
        description: 'AI-powered search engine that provides direct answers with citations.',
        category: 'Research',
        url: 'https://perplexity.ai',
        icon: 'Search',
        tags: ['Search', 'Academic', 'News'],
        pricing: 'Freemium',
        links: [
            { platform: 'twitter', url: 'https://twitter.com/perplexity_ai' }
        ]
    },
    {
        id: 8,
        name: 'Notion AI',
        description: 'Integrated AI assistant for summarizing, writing, and brainstorming within Notion.',
        category: 'Productivity',
        url: 'https://notion.so',
        icon: 'Briefcase',
        tags: ['Notes', 'Workspace', 'Organization'],
        pricing: 'Paid'
    },
    {
        id: 9,
        name: 'Stable Diffusion',
        description: 'Open-source latent text-to-image diffusion model.',
        category: 'Image',
        url: 'https://stability.ai',
        icon: 'Image',
        tags: ['Open Source', 'Art', 'Generation'],
        pricing: 'Free'
    },
    {
        id: 10,
        name: 'Cursor',
        description: 'An AI-first code editor designed to make you extraordinarily productive.',
        category: 'Coding',
        url: 'https://cursor.sh',
        icon: 'Code',
        tags: ['IDE', 'Editor', 'Debugging'],
        pricing: 'Freemium'
    },
    {
        id: 11,
        name: 'Suno',
        description: 'Create full songs with lyrics and vocals using simple text prompts.',
        category: 'Audio',
        url: 'https://suno.com',
        icon: 'Music',
        tags: ['Music', 'Song Generation', 'Creative'],
        pricing: 'Freemium',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/suno_ai_/' }
        ]
    },
    {
        id: 12,
        name: 'Google Gemini',
        description: 'Google’s most capable AI model built for multimodality.',
        category: 'Productivity',
        url: 'https://gemini.google.com',
        icon: 'Zap',
        tags: ['Multimodal', 'Google', 'Assistant'],
        pricing: 'Freemium'
    },
    {
        id: 13,
        name: 'Canva Magic Studio',
        description: 'A suite of AI tools for design, including magic edit, erase, and expand.',
        category: 'Image',
        url: 'https://canva.com',
        icon: 'Layout',
        tags: ['Design', 'Social Media', 'Editor'],
        pricing: 'Freemium'
    },
    {
        id: 14,
        name: 'tl;dv',
        description: 'AI meeting recorder that transcribes and summarizes calls.',
        category: 'Productivity',
        url: 'https://tldv.io',
        icon: 'Mic',
        tags: ['Meetings', 'Summarization', 'Remote Work'],
        pricing: 'Freemium'
    },
    {
        id: 15,
        name: 'Consensus',
        description: 'AI search engine for research papers and scientific evidence.',
        category: 'Research',
        url: 'https://consensus.app',
        icon: 'Search',
        tags: ['Science', 'Academic', 'Papers'],
        pricing: 'Freemium'
    },
    {
        id: 16,
        name: 'Nano Banna',
        description: 'Revolutionary AI tool for creating high-quality, professional product images and marketing visuals.',
        category: 'Image',
        url: 'https://nanobanna.com',
        icon: 'Image',
        tags: ['Marketing', 'Product Photography', 'Design'],
        pricing: 'Paid'
    },
    {
        id: 17,
        name: 'ChatGPT Image Generator',
        description: 'DALL-E 3 integration within ChatGPT for seamless architectural and artistic image generation.',
        category: 'Image',
        url: 'https://chatgpt.com/images',
        icon: 'Paintbrush',
        tags: ['DALL-E', 'Generative AI', 'Art'],
        pricing: 'Paid'
    },
    {
        id: 18,
        name: 'Grok',
        description: 'Elon Musk\'s xAI model with real-time access to X (Twitter) and advanced multi-modal capabilities including image generation.',
        category: 'Image',
        url: 'https://x.ai',
        icon: 'Zap',
        tags: ['Real-time', 'xAI', 'Multimodal'],
        pricing: 'Paid'
    },
    {
        id: 19,
        name: 'Seedance',
        description: 'Cutting-edge AI video generation platform for creators and filmmakers.',
        category: 'Video',
        url: 'https://www.seedance.ai/',
        icon: 'Video',
        tags: ['Generative Video', 'Cinematography', 'AI Film'],
        pricing: 'Paid',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/DUm_lt0iEAL/?img_index=3' },
            { platform: 'instagram', url: 'https://www.instagram.com/p/C6_3N-Yx1_Y/' },
            { platform: 'instagram', url: 'https://www.instagram.com/p/C7A8z8-S5kG/' }
        ]
    }
];

async function seed() {
    try {
        console.log('Connecting to database...');

        // Drop tables to ensure clean migration from TEXT to INT IDs
        console.log('Dropping existing tables for clean migration...');
        await pool.query('DROP TABLE IF EXISTS tool_links CASCADE');
        await pool.query('DROP TABLE IF EXISTS tools CASCADE');

        // Create table if not exists with correct schema
        await pool.query(`
      CREATE TABLE tools (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        url TEXT NOT NULL,
        icon TEXT NOT NULL,
        tags TEXT[] NOT NULL,
        pricing TEXT NOT NULL
      );
    `);

        await pool.query(`
      CREATE TABLE tool_links (
        id SERIAL PRIMARY KEY,
        tool_id INT REFERENCES tools(id) ON DELETE CASCADE,
        platform TEXT NOT NULL,
        url TEXT NOT NULL
      );
    `);
        console.log('Tables created.');

        console.log('Cleaning up old links...');
        await pool.query('DELETE FROM tool_links');

        console.log('Inserting tools...');
        for (const tool of tools) {
            await pool.query(`
        INSERT INTO tools (id, name, description, category, url, icon, tags, pricing)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          url = EXCLUDED.url,
          icon = EXCLUDED.icon,
          tags = EXCLUDED.tags,
          pricing = EXCLUDED.pricing;
      `, [
                tool.id,
                tool.name,
                tool.description,
                tool.category,
                tool.url,
                tool.icon,
                tool.tags,
                tool.pricing
            ]);

            if (tool.links && tool.links.length > 0) {
                for (const link of tool.links) {
                    await pool.query(`
            INSERT INTO tool_links (tool_id, platform, url)
            VALUES ($1, $2, $3);
          `, [tool.id, link.platform, link.url]);
                }
            }
        }
        console.log(`Successfully inserted/updated ${tools.length} tools.`);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
}

seed();
