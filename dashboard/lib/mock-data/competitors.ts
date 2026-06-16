import { Competitor } from '@/lib/types';

// Competitive landscape: AI tools, SaaS growth, marketing automation space.
//
//  comp_001  DOMINANT     — high followers, high engagement, polished operation
//  comp_002  HIGH-VOLUME  — posts constantly, low quality, low engagement
//  comp_003  NICHE EXPERT — small audience, extremely high engagement
//  comp_004  INCONSISTENT — big following, wildly variable performance
//  comp_005  RISING       — newer player, strong trajectory, growing fast

export const COMPETITORS: Competitor[] = [

  // ─── comp_001 ─── DOMINANT ─────────────────────────────────────────────────
  {
    id: 'comp_001',
    name: 'Loom AI',
    industry: 'AI productivity / async video',
    website: 'https://loom.com',
    strengths: [
      'Consistent posting cadence across all platforms',
      'Strong product-led content (in-product demos, use cases)',
      'High-quality video production',
      'Excellent LinkedIn engagement from B2B audience',
    ],
    weaknesses: [
      'TikTok presence weak — content feels too corporate',
      'Rarely engages back with comments',
      'Threads almost abandoned (last post 3 weeks ago)',
    ],
    notes: 'Direct competitor in the productivity/async space. Strong B2B playbook. Weak on short-form entertainment.',
    platforms: [
      {
        platform: 'linkedin',
        handle: 'company/loom',
        followers: 284000,
        weeklyGrowth: 1.4,
        avgEngagementRate: 6.8,
        postsPerWeek: 5,
        topContentType: 'video',
        recentPosts: [
          { id: 'rp_001a', type: 'video', caption: 'Stop writing emails. Record a Loom instead. Here\'s why async video cuts meeting time by 40%.', likes: 4200, comments: 380, shares: 940, views: 68000, date: '2026-03-28' },
          { id: 'rp_001b', type: 'carousel', caption: '7 types of messages that work better as a Loom than a Slack thread.', likes: 3800, comments: 290, shares: 820, date: '2026-03-25' },
          { id: 'rp_001c', type: 'text', caption: 'We just hit 25 million users. Here\'s what the first 1 million taught us about product-led growth.', likes: 5100, comments: 620, shares: 1400, date: '2026-03-22' },
        ],
      },
      {
        platform: 'youtube',
        handle: '@LoomHQ',
        followers: 98000,
        weeklyGrowth: 0.8,
        avgEngagementRate: 4.2,
        postsPerWeek: 2,
        topContentType: 'video',
        recentPosts: [
          { id: 'rp_001d', type: 'video', caption: 'How to run async standups with Loom (full team walkthrough)', likes: 2800, comments: 210, shares: 480, views: 42000, date: '2026-03-27' },
          { id: 'rp_001e', type: 'video', caption: 'Loom vs Zoom: when to use which (honest comparison)', likes: 2200, comments: 340, shares: 560, views: 38000, date: '2026-03-20' },
        ],
      },
      {
        platform: 'x',
        handle: '@loom',
        followers: 142000,
        weeklyGrowth: 0.6,
        avgEngagementRate: 3.1,
        postsPerWeek: 7,
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_001f', type: 'text', caption: 'Your meeting could have been a Loom.', likes: 3100, comments: 280, shares: 1200, date: '2026-03-29' },
          { id: 'rp_001g', type: 'text', caption: 'Remote teams that use async video spend 31% less time in meetings. The data is in.', likes: 2400, comments: 190, shares: 880, date: '2026-03-26' },
        ],
      },
    ],
  },

  // ─── comp_002 ─── HIGH-VOLUME, LOW-QUALITY ──────────────────────────────────
  {
    id: 'comp_002',
    name: 'AutomateHQ',
    industry: 'Marketing automation / no-code',
    website: 'https://automatehq.io',
    strengths: [
      'Posts 3–5x per day — maximum surface area',
      'Strong keyword coverage for SEO-adjacent social content',
      'Decent follower count from volume posting',
    ],
    weaknesses: [
      'Engagement rate consistently below 1% across all platforms',
      'Content is templated and repetitive — audience has tuned out',
      'No original POV or differentiated angle',
      'High unfollow rate after initial discovery',
      'Reposts same content verbatim across platforms with no adaptation',
    ],
    notes: 'Volume play. Not a real quality threat. Worth watching for keyword/topic coverage — they absorb a lot of search real estate.',
    platforms: [
      {
        platform: 'linkedin',
        handle: 'company/automatehq',
        followers: 62000,
        weeklyGrowth: 0.3,
        avgEngagementRate: 0.8,
        postsPerWeek: 18,
        topContentType: 'image',
        recentPosts: [
          { id: 'rp_002a', type: 'image', caption: '10 automation tools you need in 2026. Save this list. #automation #nocode #productivity', likes: 280, comments: 14, shares: 62, date: '2026-03-29' },
          { id: 'rp_002b', type: 'image', caption: 'Stop doing this manually. Automate it instead. Here\'s how. #workflow #tools', likes: 210, comments: 8, shares: 44, date: '2026-03-28' },
          { id: 'rp_002c', type: 'text', caption: 'Zapier vs Make vs AutomateHQ: which wins? (Spoiler: us) #automation #saas', likes: 190, comments: 22, shares: 38, date: '2026-03-27' },
        ],
      },
      {
        platform: 'tiktok',
        handle: '@automatehq',
        followers: 28400,
        weeklyGrowth: 0.2,
        avgEngagementRate: 0.6,
        postsPerWeek: 21,
        topContentType: 'video',
        recentPosts: [
          { id: 'rp_002d', type: 'video', caption: 'Automate your email in 60 seconds #automation #fyp #productivity', likes: 140, comments: 6, shares: 18, views: 4200, date: '2026-03-29' },
          { id: 'rp_002e', type: 'video', caption: 'No-code tools that will change your life #nocode #tools #fyp', likes: 110, comments: 4, shares: 12, views: 3800, date: '2026-03-28' },
        ],
      },
      {
        platform: 'x',
        handle: '@automatehq_io',
        followers: 18200,
        weeklyGrowth: 0.1,
        avgEngagementRate: 0.5,
        postsPerWeek: 24,
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_002f', type: 'text', caption: 'Thread: 20 automation workflows that save 10 hours per week 🧵 [same thread posted for 4th time]', likes: 88, comments: 12, shares: 24, date: '2026-03-29' },
        ],
      },
    ],
  },

  // ─── comp_003 ─── NICHE EXPERT / HIGH ENGAGEMENT ───────────────────────────
  {
    id: 'comp_003',
    name: 'Maya Chen — AI Operator',
    industry: 'AI workflows / solo creator / thought leadership',
    website: 'https://mayachen.co',
    strengths: [
      'Highest engagement rate in the space (11–14% on LinkedIn)',
      'Deeply trusted voice — audience quality over quantity',
      'Original research and frameworks, not repurposed content',
      'Replies to nearly every comment — strong community loop',
      'Newsletters convert well, drives traffic from social',
    ],
    weaknesses: [
      'Small total reach — only ~28K across all platforms',
      'Posts infrequently (2–3x per week max)',
      'No video presence — purely text and carousel',
      'Difficult to scale without losing the intimacy that drives engagement',
    ],
    notes: 'Not a direct threat on reach but the engagement benchmarks are a useful target. Worth studying her LinkedIn carousel format — saves-to-follower ratio is unusually high.',
    platforms: [
      {
        platform: 'linkedin',
        handle: 'in/mayachen-aiops',
        followers: 18400,
        weeklyGrowth: 2.8,
        avgEngagementRate: 12.4,
        postsPerWeek: 3,
        topContentType: 'carousel',
        recentPosts: [
          { id: 'rp_003a', type: 'carousel', caption: 'I built 14 AI workflows this month. Here are the 3 that actually saved me time (and the 11 that didn\'t).', likes: 1840, comments: 420, shares: 680, date: '2026-03-27' },
          { id: 'rp_003b', type: 'text', caption: 'Unpopular opinion: most AI "productivity" content is written by people who haven\'t changed how they actually work. Here\'s what real AI adoption looks like.', likes: 2200, comments: 580, shares: 840, date: '2026-03-24' },
          { id: 'rp_003c', type: 'carousel', caption: 'The AI prompt I use every Monday morning to plan my week. Swipe for the full template.', likes: 1640, comments: 310, shares: 740, date: '2026-03-20' },
        ],
      },
      {
        platform: 'x',
        handle: '@mayachen_ai',
        followers: 9200,
        weeklyGrowth: 3.2,
        avgEngagementRate: 8.6,
        postsPerWeek: 4,
        topContentType: 'thread',
        recentPosts: [
          { id: 'rp_003d', type: 'thread', caption: 'I tracked every hour of my week for a month to see where AI actually saved time. Results were surprising 🧵', likes: 880, comments: 240, shares: 420, date: '2026-03-28' },
          { id: 'rp_003e', type: 'text', caption: 'The AI tools getting the most hype right now are not the ones doing the most actual work in real businesses. Change my mind.', likes: 740, comments: 310, shares: 280, date: '2026-03-25' },
        ],
      },
    ],
  },

  // ─── comp_004 ─── INCONSISTENT PERFORMER ───────────────────────────────────
  {
    id: 'comp_004',
    name: 'GrowthLoop',
    industry: 'SaaS growth / B2B marketing',
    website: 'https://growthloop.com',
    strengths: [
      'Large existing following from early mover advantage',
      'Occasional viral post lifts all metrics significantly',
      'Strong brand recognition in the SaaS growth niche',
      'When on, the content quality is genuinely excellent',
    ],
    weaknesses: [
      'Posting cadence wildly inconsistent — sometimes 5x/week, sometimes silent for 2 weeks',
      'Engagement collapses during quiet periods, doesn\'t recover fully',
      'No clear editorial strategy — reactive to trends rather than leading them',
      'YouTube channel has 3 videos in 8 months',
    ],
    notes: 'Big name, inconsistent execution. When they post well it sets a benchmark. When they go quiet, the space opens up. Track their posting gaps as opportunity windows.',
    platforms: [
      {
        platform: 'linkedin',
        handle: 'company/growthloop',
        followers: 118000,
        weeklyGrowth: 0.4,
        avgEngagementRate: 3.6,
        postsPerWeek: 3,           // average masks wide variance (0–8)
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_004a', type: 'text', caption: 'The SaaS metric everyone tracks but almost nobody acts on: time-to-value. Here\'s the framework we use.', likes: 4800, comments: 520, shares: 1200, date: '2026-03-26' },
          { id: 'rp_004b', type: 'image', caption: 'Growth benchmarks for B2B SaaS in 2026. Save this.', likes: 920, comments: 68, shares: 180, date: '2026-03-18' },
          // Note the drop-off between posts: 8 days gap, 5x engagement difference
        ],
      },
      {
        platform: 'x',
        handle: '@growthloop',
        followers: 84000,
        weeklyGrowth: 0.2,
        avgEngagementRate: 2.4,
        postsPerWeek: 4,
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_004c', type: 'text', caption: 'Quick take: the companies winning in SaaS right now all have one thing in common. They build in public.', likes: 2100, comments: 180, shares: 640, date: '2026-03-29' },
          { id: 'rp_004d', type: 'text', caption: 'Churn is a product problem disguised as a marketing problem.', likes: 3400, comments: 290, shares: 1100, date: '2026-03-21' },
        ],
      },
      {
        platform: 'youtube',
        handle: '@GrowthLoop',
        followers: 12400,
        weeklyGrowth: 0.1,
        avgEngagementRate: 2.8,
        postsPerWeek: 0,           // effectively inactive (3 videos in 8 months)
        topContentType: 'video',
        recentPosts: [
          { id: 'rp_004e', type: 'video', caption: 'SaaS Growth Playbook 2025 — full breakdown (posted Aug 2025, still their top video)', likes: 880, comments: 94, shares: 140, views: 18000, date: '2025-08-14' },
        ],
      },
    ],
  },

  // ─── comp_005 ─── RISING CHALLENGER ────────────────────────────────────────
  {
    id: 'comp_005',
    name: 'Stackwise',
    industry: 'AI tool stack / creator tools',
    website: 'https://stackwise.ai',
    strengths: [
      'Fastest-growing account in the space — 3.8% weekly follower growth on TikTok',
      'Strong short-form video format, native to each platform',
      'Founder-led content — personal brand drives trust',
      'Excellent at trend-jacking without feeling opportunistic',
      'Threads presence unusually strong for a B2B brand',
    ],
    weaknesses: [
      'Still small total reach (~42K across platforms)',
      'LinkedIn content not yet dialled in — low engagement vs TikTok',
      'No long-form video strategy — YouTube entirely absent',
      'Brand voice inconsistent between founder personal vs company accounts',
    ],
    notes: 'The one to watch. Trajectory is steep. Their TikTok format is worth studying. If they crack LinkedIn they become a real threat within 6 months.',
    platforms: [
      {
        platform: 'tiktok',
        handle: '@stackwise.ai',
        followers: 22800,
        weeklyGrowth: 3.8,
        avgEngagementRate: 9.2,
        postsPerWeek: 6,
        topContentType: 'short',
        recentPosts: [
          { id: 'rp_005a', type: 'video', caption: 'My AI tool stack for running a 7-figure business solo. Full breakdown 👇', likes: 8400, comments: 920, shares: 2100, views: 142000, date: '2026-03-28' },
          { id: 'rp_005b', type: 'video', caption: 'I tested every AI writing tool so you don\'t have to. Honest tier list.', likes: 6200, comments: 740, shares: 1680, views: 98000, date: '2026-03-25' },
          { id: 'rp_005c', type: 'video', caption: 'This AI workflow saves me 3 hours every Monday. Here\'s exactly how it works.', likes: 5800, comments: 680, shares: 1540, views: 86000, date: '2026-03-22' },
        ],
      },
      {
        platform: 'threads',
        handle: '@stackwise',
        followers: 11200,
        weeklyGrowth: 2.4,
        avgEngagementRate: 7.8,
        postsPerWeek: 5,
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_005d', type: 'text', caption: 'Hot take: the best AI tools are boring. They just do the thing, quietly, every time. No dashboard. No weekly digest. Just results.', likes: 1840, comments: 380, shares: 420, date: '2026-03-29' },
          { id: 'rp_005e', type: 'text', caption: 'Tested 40 AI tools this quarter. Only 6 are still in my stack. Here\'s what survived and why.', likes: 2100, comments: 440, shares: 580, date: '2026-03-26' },
        ],
      },
      {
        platform: 'linkedin',
        handle: 'company/stackwise-ai',
        followers: 8200,
        weeklyGrowth: 1.1,
        avgEngagementRate: 2.9,
        postsPerWeek: 3,
        topContentType: 'text',
        recentPosts: [
          { id: 'rp_005f', type: 'text', caption: 'We\'re a 4-person team running at 8-person capacity. Here\'s the exact AI stack making that possible.', likes: 480, comments: 64, shares: 112, date: '2026-03-27' },
          { id: 'rp_005g', type: 'carousel', caption: 'AI tools we actually use vs AI tools we tried and dropped. Honest breakdown.', likes: 620, comments: 88, shares: 148, date: '2026-03-23' },
        ],
      },
    ],
  },
];

// ─── Comparative scores (1–100) ─────────────────────────────────────────────
// Weighted: reach (30%), engagement (40%), consistency (20%), trend (10%)

export const COMPETITOR_SCORES: Record<string, {
  overall: number;
  reach: number;
  engagement: number;
  consistency: number;
  trend: number;
}> = {
  comp_001: { overall: 82, reach: 90, engagement: 74, consistency: 88, trend: 72 },
  comp_002: { overall: 24, reach: 52, engagement:  8, consistency: 80, trend: 18 },
  comp_003: { overall: 68, reach: 22, engagement: 98, consistency: 62, trend: 84 },
  comp_004: { overall: 51, reach: 82, engagement: 48, consistency: 18, trend: 44 },
  comp_005: { overall: 61, reach: 32, engagement: 86, consistency: 66, trend: 94 },
};
