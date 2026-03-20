
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
        tags: ['Chatbot', 'LLM', 'Writing Assistant', 'Coding Help', 'Brainstorming', 'Text Generation'],
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
        tags: ['AI Art', 'Image Generation', 'Digital Painting', 'Creative Design', 'Graphic Tool'],
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
        tags: ['Coding Assistant', 'Autocomplete', 'Programming', 'Developer Tools', 'Software Engineering'],
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
        tags: ['Copywriting', 'Content Marketing', 'SEO Writing', 'Blog Post', 'Ad Copy'],
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
        tags: ['Video Editor', 'Video Generation', 'VFX', 'Motion Graphics', 'Cinematography', 'Movie Maker'],
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
        tags: ['Text to Speech', 'Voice Cloning', 'AI Voice', 'Narration', 'Podcast Tool', 'Dubbing'],
        pricing: 'Freemium',
        links: [
            { platform: 'youtube', url: 'https://www.youtube.com/@elevenlabs' }
        ]
    },
    {
        id: 7,
        name: 'Perplexity Search',
        description: 'AI-powered search engine that provides direct answers with citations.',
        category: 'Writing',
        url: 'https://perplexity.ai',
        icon: 'Search',
        tags: ['AI Search', 'Information Retrieval', 'Fact Checking', 'Citations', 'Knowledge Engine'],
        pricing: 'Freemium',
        links: [
            { platform: 'twitter', url: 'https://twitter.com/perplexity_ai' }
        ]
    },
    {
        id: 8,
        name: 'Notion AI',
        description: 'Integrated AI assistant for summarizing, writing, and brainstorming within Notion.',
        category: 'Writing',
        url: 'https://notion.so',
        icon: 'Briefcase',
        tags: ['Workspace Assistant', 'Notes Summarization', 'Project Management', 'Organization'],
        pricing: 'Paid'
    },
    {
        id: 9,
        name: 'Stable Diffusion',
        description: 'Open-source latent text-to-image diffusion model.',
        category: 'Image',
        url: 'https://stability.ai',
        icon: 'Image',
        tags: ['Open Source AI', 'Image Generation', 'Local Image Model', 'Generative Art'],
        pricing: 'Free'
    },
    {
        id: 10,
        name: 'Cursor',
        description: 'An AI-first code editor designed to make you extraordinarily productive.',
        category: 'Coding',
        url: 'https://cursor.sh',
        icon: 'Code',
        tags: ['AI Code Editor', 'IDE', 'Software Development', 'Debugging Assistant'],
        pricing: 'Freemium'
    },
    {
        id: 11,
        name: 'Suno',
        description: 'Create full songs with lyrics and vocals using simple text prompts.',
        category: 'Audio',
        url: 'https://suno.com',
        icon: 'Music',
        tags: ['Music Generation', 'Song Creator', 'AI Singer', 'Melody Maker', 'Composer'],
        pricing: 'Freemium',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/suno_ai_/' }
        ]
    },
    {
        id: 12,
        name: 'Google Gemini',
        description: 'Google’s most capable AI model built for multimodality.',
        category: 'Writing',
        url: 'https://gemini.google.com',
        icon: 'Zap',
        tags: ['Multimodal AI', 'Google Assistant', 'LLM', 'Creative Writing', 'Data Analysis'],
        pricing: 'Freemium'
    },
    {
        id: 13,
        name: 'Canva Magic Studio',
        description: 'A suite of AI tools for design, including magic edit, erase, and expand.',
        category: 'Image',
        url: 'https://canva.com',
        icon: 'Layout',
        tags: ['Graphic Design', 'Social Media Templates', 'Visual Content', 'Image Editing'],
        pricing: 'Freemium'
    },
    {
        id: 14,
        name: 'tl;dv',
        description: 'AI meeting recorder that transcribes and summarizes calls.',
        category: 'Audio',
        url: 'https://tldv.io',
        icon: 'Mic',
        tags: ['Meeting Minutes', 'Call Transcriber', 'Video Recording', 'Summarization Tool'],
        pricing: 'Freemium'
    },
    {
        id: 15,
        name: 'Consensus',
        description: 'AI search engine for research papers and scientific evidence.',
        category: 'Writing',
        url: 'https://consensus.app',
        icon: 'Search',
        tags: ['Scientific Research', 'Peer Reviewed Papers', 'Evidence Based Search'],
        pricing: 'Freemium'
    },
    {
        id: 16,
        name: 'Nano Banna',
        description: 'Revolutionary AI tool for creating high-quality, professional product images and marketing visuals.',
        category: 'Image',
        url: 'https://nanobanna.com',
        icon: 'Image',
        tags: ['Product Photography', 'E-commerce Photos', 'Marketing Visuals', 'Studio Lighting AI'],
        pricing: 'Paid'
    },
    {
        id: 17,
        name: 'ChatGPT Image Generator',
        description: 'DALL-E 3 integration within ChatGPT for seamless architectural and artistic image generation.',
        category: 'Image',
        url: 'https://chatgpt.com/images',
        icon: 'Paintbrush',
        tags: ['DALL-E 3', 'AI Image Creator', 'Architectural Design', 'Concept Art'],
        pricing: 'Paid'
    },
    {
        id: 18,
        name: 'Grok',
        description: 'Elon Musk\'s xAI model with real-time access to X (Twitter) and advanced multi-modal capabilities including image generation.',
        category: 'Image',
        url: 'https://x.ai',
        icon: 'Zap',
        tags: ['Real-time News', 'X Integration', 'Multimodal LLM', 'Unfiltered AI'],
        pricing: 'Paid'
    },
    {
        id: 19,
        name: 'Seedance',
        description: 'Cutting-edge AI video generation platform for creators and filmmakers.',
        category: 'Video',
        url: 'https://www.seedance.ai/',
        icon: 'Video',
        tags: ['AI Film', 'Cinematic Video Generation', 'Creative Video Tool', 'Movie Creation'],
        pricing: 'Paid',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/DUm_lt0iEAL/?img_index=3' },
            { platform: 'instagram', url: 'https://www.instagram.com/p/C6_3N-Yx1_Y/' },
            { platform: 'instagram', url: 'https://www.instagram.com/p/C7A8z8-S5kG/' }
        ]
    },
    {
        id: 20,
        name: 'Google',
        description: 'Major AI ecosystem featuring the Gemini model family (3.1 Flash, Pro, Reasoning), design tools like Stitch and Whisk, coding agents, and cross-platform communication protocols.',
        category: 'Ecosystem',
        url: 'https://gemini.google.com',
        icon: 'Cpu',
        tags: ['AI Ecosystem', 'Gemini', 'Google AI', 'Multi-modal'],
        pricing: 'Freemium',
        features: [
            'Gemini 3.1 Flash Lite - Fastest efficient model',
            'Gemini Reasoning - Deep reasoning for agents',
            'Stitch & Whisk - Advanced AI design tools',
            'Antigravity IDE - Agent-powered productivity',
            'Veo 3.1 - High-quality cinematic video'
        ],
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/DUxeZJhiKi7/?img_index=7' },
            { platform: 'instagram', url: 'https://www.instagram.com/p/DVtuNJiiMF8/?img_index=1' }
        ]
    },
    {
        id: 21,
        name: 'OpenAI Platform',
        description: 'Developer platform for integrating OpenAI models like GPT-4 and DALL-E into applications.',
        category: 'Ecosystem',
        url: 'https://platform.openai.com',
        icon: 'Zap',
        tags: ['AI Tools Integration', 'API Access', 'Model Management', 'Developer Ecosystem'],
        pricing: 'Paid'
    },
    {
        id: 22,
        name: 'Hugging Face',
        description: 'The AI community building the future. Home to thousands of open-source models and datasets.',
        category: 'Ecosystem',
        url: 'https://huggingface.co',
        icon: 'Box',
        tags: ['Open Source', 'Model Repository', 'NLP', 'Computer Vision', 'Collaborative AI'],
        pricing: 'Freemium'
    },
    {
        id: 23,
        name: 'Anthropic Console',
        description: 'Interface for managing Claude API keys and testing prompts in the workbench.',
        category: 'Ecosystem',
        url: 'https://console.anthropic.com',
        icon: 'Terminal',
        tags: ['AI Safety', 'Claude API', 'Prompt Engineering', 'Platform'],
        pricing: 'Paid'
    },
    {
        id: 24,
        name: 'Pixel Agents',
        description: 'Turns AI agent interactions in the terminal into a visual board like a SIMS or pixel game.',
        category: 'Open Source',
        url: 'https://github.com/pablodelucca/pixel-agents',
        icon: 'Terminal',
        tags: ['Open Source', 'AI Agents', 'Visualization', 'Simulation'],
        pricing: 'Free',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/reel/DVcbEr-iJVx/' }
        ]
    },
    {
        id: 27,
        name: 'AirLLM',
        description: 'Open-source Python library that enables running large language models (LLMs) on consumer-grade hardware by using layer-by-layer weight streaming.',
        category: 'Open Source',
        url: 'https://github.com/lyogavin/airllm',
        icon: 'Cpu',
        tags: ['LLM', 'AI Inference', 'Memory Optimization', 'Open Source', 'Hugging Face'],
        pricing: 'Free',
        features: [
            'Ultra-low GPU memory usage',
            'Layer-by-layer weight streaming',
            'Support for 70B and 405B models on single GPUs',
            'CPU and Apple Silicon support',
            'Seamless Hugging Face integration'
        ],
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/reel/DVywlWPCVHN/' }
        ]
    },
    {
        id: 25,
        name: 'Anthropic Courses',
        description: 'Official educational platform for learning how to build with Anthropic models like Claude.',
        category: 'AI Courses',
        url: 'https://anthropic.skilljar.com/',
        icon: 'BookOpen',
        tags: ['Claude', 'Prompt Engineering', 'AI Development', 'Official Course', 'Education'],
        pricing: 'Free',
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/DVizhDoCPA7/?img_index=8' }
        ]
    },
    {
        id: 26,
        name: 'Replit Animation',
        description: 'AI Agent that creates professional motion graphics through natural language conversation. Turn screenshots into React-based animations.',
        category: 'Video',
        url: 'https://replitanimation.com/',
        icon: 'Video',
        tags: ['AI Motion Graphics', 'React Animation', 'No-code Video', 'Screenshot-to-Video'],
        pricing: 'Paid',
        links: [{ platform: 'instagram', url: 'https://www.instagram.com/reel/DVyl--kDDu0/' }]
    },
    {
        id: 28,
        name: 'Perplexity AI',
        description: 'The Perplexity AI ecosystem, featuring multi-agent capabilities and advanced search workflows.',
        category: 'Ecosystem',
        url: 'https://www.perplexity.ai/',
        icon: 'Zap',
        tags: ['AI Agents', 'Multi-agent', 'Search Ecosystem', 'Productivity'],
        pricing: 'Freemium',
        features: [
            'Multi-agent orchestration',
            'Advanced research workflows',
            'Real-time web access',
            'Source citations and grounding'
        ],
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/reel/DV1wdtHAOKz/' }
        ]
    },
    {
        id: 29,
        name: 'Stitch',
        description: 'Stitch generates UIs for mobile and web applications, making design ideation fast and easy.',
        category: 'Vibe Coding',
        url: 'https://stitch.withgoogle.com/',
        icon: 'Wand2',
        tags: ['Design UI', 'Rapid Ideation', 'Vibe Coding', 'Google Design'],
        pricing: 'Free',
        features: [
            'Generates UIs for mobile and web',
            'Fast design ideation',
            'Google experimental design tool'
        ],
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/reel/DWCRZDHFV-f/' }
        ]
    },
    {
        id: 30,
        name: 'Google Disco',
        description: 'Turn the tabs you have open into custom, interactive apps with GenTabs for web discovery.',
        category: 'Ecosystem',
        url: 'https://labs.google/disco',
        icon: 'Layers',
        tags: ['Google Labs', 'Web Apps', 'GenTabs', 'Browser AI', 'Productivity'],
        pricing: 'Free',
        features: [
            'GenTabs turn open tabs into custom apps',
            'Generates interactive apps based on specific goals',
            'Experimental AI web discovery feature'
        ],
        links: [
            { platform: 'instagram', url: 'https://www.instagram.com/reel/DWEeXoWjxZz/' }
        ]
    }
];

async function seed() {
    try {
        console.log('Connecting to database...');

        // Enable pg_trgm extension for similarity search
        console.log('Enabling pg_trgm extension...');
        await pool.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');

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
        pricing TEXT NOT NULL,
        features TEXT[] DEFAULT '{}'
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
        INSERT INTO tools (id, name, description, category, url, icon, tags, pricing, features)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          url = EXCLUDED.url,
          icon = EXCLUDED.icon,
          tags = EXCLUDED.tags,
          pricing = EXCLUDED.pricing,
          features = EXCLUDED.features;
      `, [
                tool.id,
                tool.name,
                tool.description,
                tool.category,
                tool.url,
                tool.icon,
                tool.tags,
                tool.pricing,
                tool.features || []
            ]);

            if (tool.links && tool.links.length > 0) {
                for (const link of tool.links) {
                    await pool.query(`
            INSERT INTO tool_links (tool_id, platform, url)
            VALUES ($1, $2, $3);
          `, [tool.id, link.platform, link.url]);
                }
            }
            if (tool.id === 20) {
              console.log(`Tool 20 features: ${JSON.stringify(tool.features)}`);
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
