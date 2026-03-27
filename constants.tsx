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
  Briefcase,
  BookOpen,
  Wand2,
  Layers
} from 'lucide-react';
import { Tool, Category } from './types';
export const CATEGORIES: Category[] = ['All', 'Ecosystem', 'Video', 'Image', 'Coding', 'Vibe Coding', 'Audio', 'Writing', 'Open Source', 'AI Courses'];

export const CATEGORY_COLORS: Record<Category, { primary: string, secondary: string, border: string, text: string }> = {
  'All': { primary: 'indigo-600', secondary: 'indigo-500/10', border: 'indigo-500/20', text: 'indigo-400' },
  'Video': { primary: 'rose-600', secondary: 'rose-500/10', border: 'rose-500/20', text: 'rose-400' },
  'Image': { primary: 'violet-600', secondary: 'violet-500/10', border: 'violet-500/20', text: 'violet-400' },
  'Coding': { primary: 'blue-600', secondary: 'blue-500/10', border: 'blue-500/20', text: 'blue-400' },
  'Vibe Coding': { primary: 'fuchsia-600', secondary: 'fuchsia-500/10', border: 'fuchsia-500/20', text: 'fuchsia-400' },
  'Audio': { primary: 'amber-600', secondary: 'amber-500/10', border: 'amber-500/20', text: 'amber-400' },
  'Writing': { primary: 'emerald-600', secondary: 'emerald-500/10', border: 'emerald-500/20', text: 'emerald-400' },
  'Ecosystem': { primary: 'slate-600', secondary: 'slate-500/10', border: 'slate-500/20', text: 'slate-400' },
  'Open Source': { primary: 'cyan-600', secondary: 'cyan-500/10', border: 'cyan-500/20', text: 'cyan-400' },
  'AI Courses': { primary: 'orange-600', secondary: 'orange-500/10', border: 'orange-500/20', text: 'orange-400' },
};

export const CATEGORY_ICONS: Record<Category, React.FC<any>> = {
  'All': Layout,
  'Video': Video,
  'Image': ImageIcon,
  'Coding': Code,
  'Vibe Coding': Wand2,
  'Audio': Mic,
  'Writing': PenTool,
  'Ecosystem': Cpu,
  'Open Source': Terminal,
  'AI Courses': BookOpen,
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
  Briefcase,
  BookOpen,
  Wand2,
  Layers
};

export const LEGAL_CONTENT = {
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'March 27, 2026',
    content: `
**1. Acceptance of Terms**
Welcome to AIverse (aiverse.site), a curated directory for executive-level AI technology. These Terms of Service ("Terms") govern your access to and use of our platform. By accessing or using AIverse, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our services.

**2. Eligibility**
The Site is intended for use by individuals at least 18 years old and by organizations with the authority to bind such entities to these Terms. By using AIverse, you represent and warrant that you meet these eligibility requirements.

**3. User Conduct and Content Guidelines**
As a condition of your use of AIverse, you agree not to:
- Use the Site for any unlawful purpose or in violation of local, national, or international regulations.
- Engage in any activity that could harm, disrupt, or impair the Site’s functionality or accessibility.
- Upload or transmit any material that contains viruses, Trojan horses, or any other harmful programs.
- Post, submit, or promote content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, or otherwise objectionable based on race, gender, or other protected characteristics.
- Engage in spamming, mass or automated posting, or manual/automated manipulation of engagement (e.g., fake votes or saves).
- Impersonate any person or entity, including AIverse employees or other users.

**4. Automated Data Extraction (Anti-Scraping)**
AIverse’s database—including its collection, curation, organization, categorization, and rankings—constitutes our proprietary intellectual property. Without our prior express written consent, no person or entity may scrape, crawl, harvest, index, or systematically extract any data from the Site by any automated or manual means. This includes extraction for the purpose of training AI models or building competing products.

**5. Intellectual Property and User Submissions**
- **AIverse Content:** All text, graphics, logos, and software on the Site are the property of AIverse or its content suppliers and are protected by international copyright laws.
- **User Submissions:** When you submit a tool or content to AIverse, you retain ownership of that content. However, you grant AIverse a worldwide, irrevocable, perpetual, non-exclusive, royalty-free license to use, copy, modify, distribute, and display such content in connection with providing and promoting our directory.
- **Warranties:** You warrant that you own or have the necessary licenses for all content you submit and that it does not infringe on third-party intellectual property rights.

**6. Commercial Services and Submissions**
Certain services, such as "Executive Picks" or featured listings, may be subject to fees.
- **Fees:** You agree to pay all associated charges in full through our accepted payment mechanisms.
- **No Guarantees:** AIverse does not guarantee specific performance results (clicks, traffic, or conversions) for featured tools. All metric estimates are based on historical data and are provided for informational purposes only.
- **Refund Policy:** Unless otherwise stated, all commercial payments are final and non-refundable once the service (e.g., tool listing) has been initiated or performed.

**7. Disclaimers and Warranties**
AIverse is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or completeness of any content on the Site. The inclusion of a tool in our directory does not constitute an endorsement. AI-generated outputs and third-party tools listed here are unpredictable; we bear no responsibility for their content or consequences of use.

**8. Limitation of Liability**
To the fullest extent permitted by law, AIverse and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of, or inability to use, the platform. This includes, but is not limited to, loss of profits, data, or goodwill. In jurisdictions that do not allow the exclusion of certain warranties, our liability shall be limited to the maximum extent permitted.

**9. Indemnification**
You agree to defend, indemnify, and hold harmless AIverse, its officers, and employees from any claims, damages, or expenses (including attorneys’ fees) arising from your violation of these Terms or your use of the Site.

**10. Modifications to Service and Terms**
AIverse reserves the right to modify, suspend, or discontinue any part of the Site or these Terms at any time without prior notice. Continued use of the Site after such changes constitutes your acceptance of the new Terms.

**11. Governing Law and Dispute Resolution**
These Terms shall be governed by the laws of Israel. Any disputes arising out of or related to these Terms that cannot be resolved informally shall be submitted to the exclusive jurisdiction of the courts of Israel.`
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'March 27, 2026',
    content: `
This Privacy Policy describes how AIverse ("we," "us," or "our") collects, stores, and uses your information when you use our directory services at aiverse.site.

**SUMMARY OF KEY POINTS**
This summary provides the highlights of our privacy practices.

- **What personal information do we process?** We process information you voluntarily provide (like name and email when submitting a tool) and certain technical data collected automatically (like IP address and browser type).
- **Do we process sensitive information?** No, we do not process any sensitive personal information.
- **Do we receive information from third parties?** No, we only process information gathered directly from your use of our site.
- **How do we keep your information safe?** We have technical procedures in place to protect your data, though no system is 100% secure.

**1. WHAT INFORMATION DO WE COLLECT?**
We collect personal information that you voluntarily provide to us when you:
- Submit a tool for review.
- Contact us through our support forms.
- Save favorites to your local stack (stored in your browser).

We also automatically collect technical data such as your IP address, browser characteristics, and operating system to help us understand how visitors use the directory and to maintain site security.

**2. HOW DO WE PROCESS YOUR INFORMATION?**
We process your information to:
- Review and publish tool submissions.
- Respond to your inquiries.
- Improve the AIverse user experience.
- Maintain the security and operation of our services.

**3. WHEN AND WITH WHOM DO WE SHARE YOUR DATA?**
We do not sell your data. We may share information only in specific situations, such as:
- **Business Transfers:** In connection with any merger or sale of company assets.
- **Service Providers:** With vendors who perform services for us (like hosting or analytics).

**4. THIRD-PARTY WEBSITES**
AIverse contains links to third-party tools. We are not responsible for the privacy practices of these external sites. We encourage you to review their policies directly.

**5. HOW LONG DO WE KEEP YOUR DATA?**
We keep your information for as long as necessary to fulfill the purposes outlined in this notice, or as required by law.

**6. WHAT ARE YOUR PRIVACY RIGHTS?**
Depending on your location (e.g., EEA, UK, Canada), you have certain rights regarding access to and control over your personal information. You may request to review, update, or delete your data at any time.

**7. HOW CAN YOU CONTACT US?**
If you have questions about this policy, please contact us at: support@aiverse.site`
  },
  editorial: {
    title: 'Editorial Guidelines',
    lastUpdated: 'March 27, 2026',
    content: `
At AIverse, our mission is to curate the ultimate executive directory of world-class AI technology, with a special focus on professional workflows and the emerging "Vibe Coding" paradigm.

**1. Expert Selection for Executives**
Every tool listed on AIverse is selected based on its utility in professional environments. We don't just list any AI tool; we prioritize software that offers genuine value, reliability, and modern efficiency for executives and high-performance teams.

**2. Built by Humans, Powered by AI**
Every tool in our directory undergoes a human-led review. While we leverage AI to assist in data aggregation and feature analysis, a human curator always makes the final decision on whether a tool meets our premium quality standards.

**3. Independence & Integrity**
Our rankings and "Executive Picks" are entirely independent. We do not sell rankings, and we do not allow tool providers to purchase their way into a top spot. If a tool is featured, it's because our team truly believes in its capabilities.

**4. Commitment to Accuracy**
The AI landscape moves fast. We strive to keep our descriptions, pricing tiers, and feature lists up-to-date. If you represent a tool listed here and wish to submit an update, please use our "Update a Tool" request system.

**5. Transparency**
We are fully transparent about our business model. To keep AIverse free for our users, we may earn referral fees from some partnerships. However, this has zero impact on our editorial stance or whether a tool is included in our curated selection.`
  },
  disclosure: {
    title: 'Advertiser Disclosure',
    lastUpdated: 'March 27, 2026',
    content: `
AIverse is free to use for all visitors. To keep our site free and maintain the quality of our content, we use a partnership-based business model.

**1. Referral Fees**
When you click on links to some tools in our directory and subsequently sign up or make a purchase, we may receive compensation (a referral fee) from the company that provides the tool.

**2. Editorial Integrity**
Compensation received does not influence our editorial content, tool reviews, or rankings. We are committed to providing an unbiased and comprehensive directory of AI tools, regardless of whether we have a partnership with the tool provider.

**3. Affiliate Relationships**
We identify affiliate links where possible, but you should assume that many links to third-party tools are affiliate links. This helps us continue to provide high-quality, curated AI content at no cost to our users.`
  },
  disclaimer: {
    title: 'AI Tools Disclaimer',
    lastUpdated: 'March 27, 2026',
    content: `
AIverse is a curated directory of artificial intelligence tools.

We do not develop, operate, or control the tools listed on this website. We are not responsible for their functionality, performance, data handling practices, or any outcomes resulting from their use.

Users should review each tool’s official website, terms, and privacy policies before using their services.

Use of any third-party tool is at your own discretion and risk.`
  },
  accessibility: {
    title: 'Accessibility Statement',
    lastUpdated: 'March 27, 2026',
    content: `
AIverse is committed to providing an accessible and user-friendly experience for all visitors.

We strive to follow recognized accessibility standards and continuously improve the usability of this website.

If you experience any difficulty accessing content, please contact us at: support@aiverse.site and we will do our best to assist you.`
  },
  contact: {
    title: 'Contact Us',
    lastUpdated: 'March 27, 2026',
    content: `
We welcome feedback, suggestions, and accessibility requests.

**Email:** support@aiverse.site

Feel free to reach out to us with any questions or comments regarding the AIverse directory.`
  },
  dmca: {
    title: 'DMCA / Copyright Policy',
    lastUpdated: 'March 27, 2026',
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
Email: dmca@aiverse.site`
  },
  cookies: {
    title: 'Cookie Policy',
    lastUpdated: 'March 27, 2026',
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
    lastUpdated: 'March 27, 2026',
    content: `
**Legal Information**
AIverse Executive Directory
Represented by: Guy Akavia
Address: Tel Aviv, Israel
Email: contact@aiverse.site

**Responsible for Content**
Owner of AIverse
Tel Aviv, Israel

**Dispute Resolution**
The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr. We are not jumpy or obligated to participate in dispute resolution proceedings before a consumer arbitration board.`
  }
};

