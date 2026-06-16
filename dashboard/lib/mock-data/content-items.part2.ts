import { ContentItem } from '@/lib/types';

// ─── REPURPOSING CHAIN ─────────────────────────────────────────────────────
//
//  ci_006  Original TikTok-first video (published, strong metrics)
//    └─ repurposeFrom: undefined
//
//  ci_007  LinkedIn long-form carousel derived from ci_006
//    └─ repurposeFrom: 'ci_006'
//
//  ci_008  X thread + YouTube deep-dive derived from ci_007
//    └─ repurposeFrom: 'ci_007'
//         ⚠ WORKFLOW ISSUE: status='scheduled' but no variant is 'approved'
//            Two variants were scheduled directly from 'review' — bypassing
//            the approval gate. Surfaces as a control center alert.
//
// ──────────────────────────────────────────────────────────────────────────

export const CONTENT_ITEMS_PART2: ContentItem[] = [

  // ─── ci_006 ─── ORIGINAL: TikTok-first, published, high performing ────────
  {
    id: 'ci_006',
    title: 'The 5am myth: why early rising doesn\'t make you more productive',
    type: 'video',
    status: 'published',
    priority: 'high',
    estimatedValue: 3100,
    publishIntent: 'authority',
    hook: 'The 5am club isn\'t a productivity hack. It\'s a personality contest.',
    primaryCTA: 'Follow for evidence-based productivity breakdowns',
    repurposeFrom: undefined,
    campaignId: 'camp_001',
    tags: ['productivity', 'habits', 'research', 'myth-busting'],
    notes: 'Viral on TikTok. Strong pull-through to LinkedIn. Spawned ci_007 carousel and ci_008 deep-dive.',
    createdBy: 'tm_002',
    assignedTo: 'tm_002',
    approvedBy: 'tm_001',
    approvedAt: '2026-03-08T10:00:00Z',
    createdAt: '2026-03-06T09:00:00Z',
    updatedAt: '2026-03-15T12:00:00Z',
    variants: [
      {
        id: 'cv_006_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: 'The 5am club is not a productivity hack. It\'s a personality contest. Here\'s the actual research 👇',
        caption: 'I went through 14 peer-reviewed studies on early rising and productivity. The results are not what the influencer crowd wants you to hear. Chronotype is genetic. Forcing a mismatch actively reduces output. Full breakdown incoming.',
        hashtags: ['#productivity', '#5amclub', '#habitscience', '#fyp', '#research'],
        mentions: [],
        primaryCTA: 'Follow for more research breakdowns',
        media: [{ id: 'm_060', type: 'video', url: '/mock/video-5am.mp4', thumbnailUrl: '/mock/thumb-5am.jpg', aspectRatio: '9:16', durationSeconds: 63 }],
        platformSpecific: { duetEnabled: true, stitchEnabled: true, soundId: 'original' },
        status: 'published',
        scheduledAt: '2026-03-10T17:00:00Z',
        publishedAt: '2026-03-10T17:00:09Z',
        metrics: { impressions: 520000, reach: 341000, views: 341000, likes: 29800, comments: 4200, shares: 7100, saves: 11400, watchTimeSeconds: 14994300, completionRate: 69, engagementRate: 8.4, ctr: 4.2, clicks: 14322 },
      },
      {
        id: 'cv_006_x',
        platform: 'x',
        platformAccountId: 'acc_x',
        hook: 'The 5am club is not a productivity hack. It\'s a personality contest.',
        caption: 'The 5am club is not a productivity hack. It\'s a personality contest.\n\nI read 14 peer-reviewed studies so you don\'t have to 🧵\n\n1/ Chronotype (whether you\'re a morning or evening person) is 50% heritable. You cannot hustle your way out of your biology.',
        hashtags: ['#productivity', '#research', '#habits'],
        mentions: [],
        primaryCTA: 'RT this if you\'ve ever been guilted for sleeping in',
        media: [],
        platformSpecific: { isThread: true, threadCount: 9, replySettings: 'everyone' },
        status: 'published',
        publishedAt: '2026-03-10T18:30:00Z',
        metrics: { impressions: 74000, reach: 52000, likes: 3800, comments: 910, shares: 2300, clicks: 1870, ctr: 2.5, engagementRate: 6.8 },
      },
      {
        id: 'cv_006_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'Waking up at 5am will not make you more productive. The research says the opposite.',
        caption: 'I spent two weeks reading the literature on chronotype and cognitive performance. Here\'s what 14 peer-reviewed studies actually say:\n\n→ Chronotype is 50% heritable. It\'s not discipline — it\'s genetics.\n→ Social jetlag (forcing early rising against your chronotype) reduces reaction time by up to 26%.\n→ Evening chronotypes forced onto morning schedules show measurably lower executive function.\n\nThe 5am club isn\'t a productivity system. It works for morning chronotypes because it aligns with their biology — not because of the hour.\n\nAre you scheduling your hardest work at the right time for you?',
        hashtags: ['#productivity', '#leadership', '#workplaceculture', '#research'],
        mentions: [],
        primaryCTA: 'Save this the next time someone judges your schedule',
        media: [{ id: 'm_061', type: 'image', url: '/mock/li-5am-quote.jpg', aspectRatio: '1:1', altText: 'Chronotype is 50% heritable' }],
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'published',
        publishedAt: '2026-03-11T08:00:00Z',
        metrics: { impressions: 31000, reach: 24000, likes: 2100, comments: 487, shares: 620, saves: 1840, clicks: 1240, ctr: 4.0, engagementRate: 7.1 },
      },
      {
        id: 'cv_006_threads',
        platform: 'threads',
        platformAccountId: 'acc_threads',
        hook: 'The 5am club is a personality contest dressed up as productivity advice.',
        caption: 'The 5am club is a personality contest dressed up as productivity advice.\n\nChronotype is 50% genetic. Forcing a mismatch with your biology doesn\'t build discipline — it creates social jetlag and reduces your output.\n\n14 studies. Same conclusion. Sleep in if you need to.',
        hashtags: [],
        mentions: [],
        primaryCTA: 'What time does your brain actually work best?',
        media: [],
        platformSpecific: { crosspostToInstagram: false, replyControl: 'everyone' },
        status: 'published',
        publishedAt: '2026-03-10T19:00:00Z',
        metrics: { impressions: 18400, reach: 13200, likes: 3400, comments: 780, shares: 420, engagementRate: 6.2 },
      },
    ],
  },

  // ─── ci_007 ─── REPURPOSED FROM ci_006: LinkedIn carousel ────────────────
  {
    id: 'ci_007',
    title: '14 studies on early rising — what the research actually says [carousel]',
    type: 'carousel',
    status: 'published',
    priority: 'medium',
    estimatedValue: 1600,
    publishIntent: 'educational',
    hook: 'Everyone told you to wake up at 5am. 14 studies disagree.',
    primaryCTA: 'Save this and share it with your 5am evangelist',
    repurposeFrom: 'ci_006',
    campaignId: 'camp_001',
    tags: ['productivity', 'research', 'carousel', 'habits'],
    notes: 'Carousel format of ci_006 TikTok. LinkedIn primary, Facebook secondary. TikTok failed — wrong format for platform.',
    createdBy: 'tm_002',
    assignedTo: 'tm_003',
    approvedBy: 'tm_001',
    approvedAt: '2026-03-16T09:00:00Z',
    createdAt: '2026-03-13T11:00:00Z',
    updatedAt: '2026-03-20T08:00:00Z',
    variants: [
      {
        id: 'cv_007_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'Everyone told you to wake up at 5am. 14 studies disagree.',
        caption: '14 studies on chronotype and productivity — the slides your manager needs to see.\n\nSlide 1: The claim everyone repeats\nSlide 2: What chronotype actually means\nSlide 3: The heritability data\nSlide 4: Social jetlag and its cost\nSlide 5–10: Study breakdowns\nSlide 11: What this means for your schedule\nSlide 12: The only productivity rule that holds\n\nSave this. Share it. Stop the 5am guilt.',
        hashtags: ['#productivity', '#research', '#leadership', '#chronotype', '#workplaceculture'],
        mentions: [],
        primaryCTA: 'Save this and share with your team',
        media: [{ id: 'm_070', type: 'carousel', url: '/mock/carousel-5am.pdf', thumbnailUrl: '/mock/thumb-carousel-5am.jpg', aspectRatio: '1:1' }],
        platformSpecific: { documentType: 'carousel', slideCount: 12, sponsored: false },
        status: 'published',
        publishedAt: '2026-03-18T08:30:00Z',
        metrics: { impressions: 44000, reach: 33000, likes: 3200, comments: 610, shares: 1100, saves: 4800, clicks: 2200, ctr: 5.0, engagementRate: 8.9 },
      },
      {
        id: 'cv_007_facebook',
        platform: 'facebook',
        platformAccountId: 'acc_facebook',
        hook: '14 studies on early rising. The results are not what productivity gurus want you to hear.',
        caption: 'We turned the research on chronotype and early rising into 12 slides. Here\'s the short version: waking up at 5am only works if your biology agrees. For everyone else, it\'s actually counterproductive.\n\nFull carousel in the post.',
        hashtags: ['#productivity', '#habits', '#research', '#wellness'],
        mentions: [],
        primaryCTA: 'Tag someone who needs to see this',
        media: [{ id: 'm_071', type: 'carousel', url: '/mock/carousel-5am.pdf', thumbnailUrl: '/mock/thumb-carousel-5am.jpg', aspectRatio: '1:1' }],
        platformSpecific: { targetingAgeMin: 25, targetingAgeMax: 45, boostBudget: 100 },
        status: 'published',
        publishedAt: '2026-03-18T10:00:00Z',
        metrics: { impressions: 12800, reach: 9400, likes: 680, comments: 94, shares: 230, clicks: 410, ctr: 3.2, engagementRate: 3.4 },
      },
      {
        id: 'cv_007_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: '14 studies say the 5am club is wrong — here\'s the data 👇',
        caption: 'Tried to run this as a carousel on TikTok. Format rejected. Resubmitted as a static image slideshow — also rejected. Platform does not support PDF carousel uploads.',
        hashtags: ['#productivity', '#research', '#fyp'],
        mentions: [],
        primaryCTA: 'Follow for more',
        media: [{ id: 'm_072', type: 'carousel', url: '/mock/carousel-5am.pdf', thumbnailUrl: '/mock/thumb-carousel-5am.jpg', aspectRatio: '9:16' }],
        platformSpecific: { duetEnabled: false, stitchEnabled: false },
        status: 'failed',
        scheduledAt: '2026-03-18T17:00:00Z',
        failedReason: 'TikTok does not support PDF carousel uploads. Content type mismatch — platform requires native video or image slideshow via app. Needs full re-format as video.',
        metrics: undefined,
      },
    ],
  },

  // ─── ci_008 ─── REPURPOSED FROM ci_007: X thread + YouTube deep-dive ──────
  // ⚠ WORKFLOW ISSUE: ContentItem status is 'scheduled' but editorial status
  //   was never moved to 'approved'. Two variants were pushed to 'scheduled'
  //   directly from 'review' — bypassing the approval gate. This is a real
  //   workflow failure that should surface in the Control Center as an alert.
  {
    id: 'ci_008',
    title: 'The chronotype research — full breakdown (X thread + YouTube)',
    type: 'longform',
    status: 'scheduled',   // ⚠ NOT approved — scheduled without approval sign-off
    priority: 'medium',
    estimatedValue: 2200,
    publishIntent: 'educational',
    hook: '14 studies. One conclusion: stop scheduling your life around someone else\'s biology.',
    primaryCTA: 'Subscribe for the full research library',
    repurposeFrom: 'ci_007',
    campaignId: 'camp_001',
    tags: ['productivity', 'research', 'youtube', 'deep-dive'],
    notes: '⚠ APPROVAL MISSING — variants moved to scheduled without editorial sign-off from tm_001. Flagged by tm_003 on 2026-03-26. Needs review before publish date.',
    createdBy: 'tm_003',
    assignedTo: 'tm_002',
    // approvedBy intentionally undefined — no approval on record
    // approvedAt intentionally undefined
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-26T16:00:00Z',
    variants: [
      {
        id: 'cv_008_x',
        platform: 'x',
        platformAccountId: 'acc_x',
        hook: '14 studies on chronotype. I read every single one. Here\'s what they actually say 🧵',
        caption: '14 studies on chronotype. I read every single one. Here\'s what they actually say 🧵\n\n1/ First: what is chronotype? It\'s your biological preference for morning vs evening activity. And it\'s roughly 50% determined by your genes.',
        hashtags: ['#productivity', '#research', '#chronotype', '#science'],
        mentions: [],
        primaryCTA: 'Bookmark this thread',
        media: [],
        platformSpecific: { isThread: true, threadCount: 14, replySettings: 'everyone' },
        status: 'scheduled',   // ⚠ scheduled without parent approval
        scheduledAt: '2026-04-08T09:00:00Z',
      },
      {
        id: 'cv_008_youtube',
        platform: 'youtube',
        platformAccountId: 'acc_youtube',
        hook: 'I read 14 peer-reviewed studies on early rising so you don\'t have to',
        caption: 'The productivity world has been selling you the 5am myth for a decade. I went through 14 peer-reviewed studies on chronotype, social jetlag, and cognitive performance. This is the full breakdown — with sources.',
        hashtags: ['#productivity', '#research', '#chronotype', '#habits', '#scienceexplained'],
        mentions: [],
        primaryCTA: 'Subscribe for weekly research breakdowns',
        media: [{ id: 'm_080', type: 'longform', url: '/mock/yt-chronotype.mp4', thumbnailUrl: '/mock/thumb-yt-chronotype.jpg', aspectRatio: '16:9', durationSeconds: 1380 }],
        platformSpecific: { chapters: ['0:00 Intro', '2:00 What is chronotype?', '6:30 The heritability studies', '12:00 Social jetlag cost', '18:40 What this means for scheduling', '22:00 Takeaways'], endScreenEnabled: true, visibility: 'public', tags: ['productivity', 'research', 'sleep science'] },
        status: 'scheduled',   // ⚠ scheduled without parent approval
        scheduledAt: '2026-04-08T14:00:00Z',
      },
      {
        id: 'cv_008_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'The full research behind the 5am myth — everything we found across 14 studies.',
        caption: 'Following the carousel that got 4,800 saves last week — here\'s the full written breakdown with citations.\n\n[Full article draft pending — 1,200 words, linking to YouTube]',
        hashtags: ['#productivity', '#research', '#leadership'],
        mentions: [],
        primaryCTA: 'Watch the full breakdown on YouTube — link in comments',
        media: [],
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'review',   // still in review — not yet scheduled
      },
      {
        id: 'cv_008_threads',
        platform: 'threads',
        platformAccountId: 'acc_threads',
        hook: 'Quick one: the 5am myth, full research version.',
        caption: 'The carousel on LinkedIn got 4,800 saves. YouTube deep-dive drops Tuesday.\n\nShort version: your chronotype is mostly genetic. Stop fighting it. Schedule your hard work when your brain is actually online.',
        hashtags: [],
        mentions: [],
        primaryCTA: 'Watch on YouTube Tuesday',
        media: [],
        platformSpecific: { crosspostToInstagram: false, replyControl: 'everyone' },
        status: 'approved',
        scheduledAt: '2026-04-08T10:00:00Z',
      },
    ],
  },
];
