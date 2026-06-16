import { ContentItem } from '@/lib/types';

// Edge cases only. No normal items.
//
//  ci_009  MISSING MEDIA — variants exist, media arrays empty/incomplete
//           → publish risk: scheduled with no assets attached
//
//  ci_010  CROSS-PLATFORM MISMATCH — same item, three different states:
//           LinkedIn = published, TikTok = failed, Facebook = drafting
//
//  ci_011  BLOCKED WORKFLOW — full block at item level, dependency chain
//           broken (legal review + missing brand assets)
//
//  ci_012  DRAFT CHAOS — messy real-world draft: placeholder copy,
//           missing hooks, inconsistent fields, half-formed ideas

export const CONTENT_ITEMS_PART3: ContentItem[] = [

  // ─── ci_009 ─── MISSING MEDIA — scheduled with no assets ─────────────────
  // Two variants are 'scheduled' but media arrays are empty.
  // Third variant has a media object with a broken/placeholder URL.
  // Represents a real failure mode: copy done, assets not uploaded yet.
  {
    id: 'ci_009',
    title: 'Q2 product roadmap reveal — what\'s shipping this quarter',
    type: 'video',
    status: 'scheduled',
    priority: 'high',
    estimatedValue: 5000,
    publishIntent: 'awareness',
    hook: 'Here\'s everything we\'re shipping in Q2. No fluff, no vague promises.',
    primaryCTA: 'Subscribe to be first to know when each drops',
    campaignId: 'camp_002',
    tags: ['product', 'roadmap', 'q2', 'announcement'],
    notes: '⚠ PUBLISH RISK: Scheduled for April 10 but no video assets uploaded. Design team confirmed recording on April 7 — turnaround window is tight. Captions ready, media is not.',
    createdBy: 'tm_003',
    assignedTo: 'tm_002',
    approvedBy: 'tm_001',
    approvedAt: '2026-03-29T11:00:00Z',
    createdAt: '2026-03-25T09:00:00Z',
    updatedAt: '2026-03-29T11:05:00Z',
    variants: [
      {
        id: 'cv_009_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: 'Here\'s everything we\'re shipping in Q2 — no vague roadmap slides, just what\'s actually coming 🔥',
        caption: 'Q2 roadmap drop. Real features, real dates, no filler. Here\'s what\'s landing this quarter and why we built it.',
        hashtags: ['#productlaunch', '#saas', '#buildinpublic', '#fyp', '#startup'],
        mentions: [],
        primaryCTA: 'Follow to see each feature drop live',
        media: [],   // ⚠ empty — no video asset uploaded
        platformSpecific: { duetEnabled: false, stitchEnabled: false },
        status: 'scheduled',
        scheduledAt: '2026-04-10T17:00:00Z',
        // No publishedAt, no metrics — hasn't gone out
      },
      {
        id: 'cv_009_youtube',
        platform: 'youtube',
        platformAccountId: 'acc_youtube',
        hook: 'Everything shipping in Q2 — full roadmap breakdown',
        caption: 'Full Q2 roadmap reveal. We\'re walking through every feature shipping this quarter: what it is, why we built it, and when it drops. No slides. No vague timelines.',
        hashtags: ['#productlaunch', '#saas', '#roadmap', '#startup'],
        mentions: [],
        primaryCTA: 'Subscribe — we\'re doing a live walkthrough for each feature',
        media: [],   // ⚠ empty — same recording not yet delivered
        platformSpecific: { chapters: ['0:00 Intro', '1:30 Feature 1', '5:00 Feature 2', '9:30 Feature 3', '14:00 Timeline'], endScreenEnabled: true, visibility: 'public' },
        status: 'scheduled',
        scheduledAt: '2026-04-10T14:00:00Z',
      },
      {
        id: 'cv_009_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'Q2 roadmap is locked. Here\'s what we\'re shipping.',
        caption: 'Q2 roadmap is finalized. Here\'s what\'s coming:\n\n→ Feature A: [copy TBC from PM brief]\n→ Feature B: [copy TBC]\n→ Feature C: [copy TBC]\n\nEach ships with a full walkthrough. Subscribe to the YouTube channel — we\'re documenting every release.',
        hashtags: ['#productdevelopment', '#saas', '#roadmap'],
        mentions: [],
        primaryCTA: 'Watch the full roadmap video — link in comments',
        media: [{ id: 'm_090', type: 'image', url: '/mock/PLACEHOLDER_roadmap.jpg', thumbnailUrl: '/mock/PLACEHOLDER_roadmap.jpg', aspectRatio: '16:9', altText: 'Q2 Roadmap placeholder' }],
        // ⚠ placeholder URL — real asset not designed yet
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'approved',
        scheduledAt: '2026-04-10T08:30:00Z',
      },
    ],
  },

  // ─── ci_010 ─── CROSS-PLATFORM STATUS MISMATCH ───────────────────────────
  // Same ContentItem. LinkedIn published successfully. TikTok failed after
  // going live (removed by platform). Facebook is still drafting — was never
  // finished because the team deprioritised it after TikTok failure.
  {
    id: 'ci_010',
    title: 'How we cut our customer churn by 34% in one quarter',
    type: 'video',
    status: 'published',   // editorial intent: published. Reality: mixed.
    priority: 'high',
    estimatedValue: 3800,
    publishIntent: 'authority',
    hook: 'We cut churn by 34% in 90 days. Here\'s the exact playbook.',
    primaryCTA: 'Save this for your next retention review',
    campaignId: 'camp_001',
    tags: ['churn', 'retention', 'saas', 'growth', 'case-study'],
    notes: 'LinkedIn killed it. TikTok posted then removed — flagged for "misleading business claims" after a competitor report. Facebook draft was deprioritised after TikTok issue. Still sitting in drafts.',
    createdBy: 'tm_001',
    assignedTo: 'tm_002',
    approvedBy: 'tm_001',
    approvedAt: '2026-03-17T10:00:00Z',
    createdAt: '2026-03-14T09:00:00Z',
    updatedAt: '2026-03-22T14:30:00Z',
    variants: [
      {
        id: 'cv_010_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'We cut churn by 34% in one quarter. Here\'s exactly what we changed.',
        caption: 'Twelve months ago our churn was unsustainable. We fixed it in 90 days. Here\'s the playbook:\n\n1. Identified the 3 moments where users disengaged (not where they churned — where they stopped caring)\n2. Rebuilt onboarding around those 3 moments\n3. Added a proactive check-in sequence at day 7, 14, and 30\n4. Introduced a success metric users could see in their own dashboard\n\nChurn dropped 34% by end of quarter. Expansion revenue up 18%.\n\nThe counterintuitive part: we did it by removing features, not adding them.',
        hashtags: ['#saas', '#customerretention', '#churn', '#growth', '#productled'],
        mentions: [],
        primaryCTA: 'Save this — it\'s the full playbook',
        media: [{ id: 'm_100', type: 'image', url: '/mock/li-churn-stat.jpg', aspectRatio: '1:1', altText: 'Churn down 34%' }],
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'published',
        publishedAt: '2026-03-18T08:00:00Z',
        metrics: { impressions: 48000, reach: 36000, likes: 3800, comments: 720, shares: 1400, saves: 5200, clicks: 2800, ctr: 5.8, engagementRate: 9.2 },
      },
      {
        id: 'cv_010_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: 'We cut churn by 34% in 90 days. Here\'s the exact 4-step playbook 👇',
        caption: 'Most SaaS teams focus on acquisition. We fixed retention instead. Here\'s the 4-step framework that cut our churn by 34% in one quarter.',
        hashtags: ['#saas', '#startup', '#retention', '#growthhacking', '#fyp'],
        mentions: [],
        primaryCTA: 'Follow for more SaaS growth frameworks',
        media: [{ id: 'm_101', type: 'video', url: '/mock/tiktok-churn.mp4', thumbnailUrl: '/mock/thumb-churn.jpg', aspectRatio: '9:16', durationSeconds: 54 }],
        platformSpecific: { duetEnabled: true, stitchEnabled: false },
        status: 'failed',
        scheduledAt: '2026-03-18T17:00:00Z',
        publishedAt: '2026-03-18T17:00:22Z',   // did go live briefly
        failedReason: 'Post went live then removed by TikTok after competitor report. Flagged for "unsubstantiated business performance claims" (34% churn reduction). Requires third-party data citation or removal of specific percentage. Currently in appeal.',
        metrics: { impressions: 2100, reach: 1800, views: 1800, likes: 94, comments: 12, shares: 8, watchTimeSeconds: 4320, completionRate: 18, engagementRate: 4.7 },
        // Partial metrics captured before removal
      },
      {
        id: 'cv_010_facebook',
        platform: 'facebook',
        platformAccountId: 'acc_facebook',
        hook: 'We cut churn by 34% last quarter. Here\'s what we actually changed.',
        caption: '[DRAFT — not finished. Pulled back after TikTok issue. Resume after legal clears the 34% stat or we reframe without the specific number.]\n\nOriginal draft: Our churn was killing us. We fixed it in 90 days...',
        hashtags: ['#saas', '#retention', '#startup'],
        mentions: [],
        primaryCTA: 'Read the full breakdown',
        media: [],   // ⚠ no media — never finalised
        platformSpecific: { targetingAgeMin: 28, targetingAgeMax: 50, boostBudget: 0 },
        status: 'drafting',   // still sitting in drafts, deprioritised
      },
    ],
  },

  // ─── ci_011 ─── BLOCKED WORKFLOW ─────────────────────────────────────────
  // Full block at the ContentItem level. Two separate dependencies are
  // broken: (1) legal hasn't cleared the partnership claim, (2) partner
  // brand assets haven't been delivered. Nothing can move until both resolve.
  {
    id: 'ci_011',
    title: 'Announcing our partnership with [PARTNER] — what it means for you',
    type: 'video',
    status: 'blocked',
    priority: 'high',
    estimatedValue: 8500,
    publishIntent: 'awareness',
    hook: 'We just partnered with one of the biggest names in the space. Here\'s what you get.',
    primaryCTA: 'Sign up for early access through the partnership',
    campaignId: 'camp_002',
    tags: ['partnership', 'announcement', 'collab', 'growth'],
    notes: 'BLOCKED on two dependencies: (1) Legal review of co-marketing terms not complete — ETA April 4. (2) Partner has not delivered approved brand assets or approved our messaging. Do not publish anything until both are resolved. Escalated to tm_001.',
    createdBy: 'tm_002',
    assignedTo: 'tm_001',
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-28T09:00:00Z',
    variants: [
      {
        id: 'cv_011_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'We just partnered with [PARTNER NAME — PENDING LEGAL]. Here\'s what it unlocks for you.',
        caption: 'Big news: we\'ve partnered with [PARTNER — NAME EMBARGOED UNTIL LEGAL CLEARS] to bring you [BENEFIT — PENDING PARTNER APPROVAL OF MESSAGING].\n\nWhat this means for current customers: [TBC — waiting on partner comms brief].\n\nMore details dropping [DATE TBC].',
        hashtags: ['#partnership', '#announcement', '#saas'],
        mentions: [],
        primaryCTA: 'Sign up for early access — link in comments',
        media: [],   // ⚠ partner brand assets not delivered
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'blocked',
        blockedReason: 'Dependency 1: Legal review of co-marketing agreement incomplete (ETA April 4). Dependency 2: Partner brand team has not delivered approved logo, imagery, or messaging sign-off.',
      },
      {
        id: 'cv_011_x',
        platform: 'x',
        platformAccountId: 'acc_x',
        hook: 'Big announcement coming. Partnership with a name you\'ll recognise.',
        caption: 'Big announcement coming this week.\n\nWe\'ve partnered with [NAME EMBARGOED] — and it changes what\'s possible for [USER BENEFIT TBC].\n\nDropping full details [DATE TBC]. Watch this space.',
        hashtags: ['#announcement', '#partnership'],
        mentions: [],
        primaryCTA: 'Turn on notifications so you don\'t miss it',
        media: [],
        platformSpecific: { isThread: false, replySettings: 'everyone' },
        status: 'blocked',
        blockedReason: 'Same as LinkedIn — cannot tease without legal clearance. Partner NDA prohibits naming before agreed embargo date.',
      },
      {
        id: 'cv_011_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: 'We just made a move that changes everything. Announcement dropping this week.',
        caption: '[Script TBC — cannot write until partner name and benefit messaging are approved. Placeholder hook above for now.]',
        hashtags: ['#announcement', '#collab', '#fyp'],
        mentions: [],
        primaryCTA: 'Follow so you don\'t miss the drop',
        media: [],
        platformSpecific: { duetEnabled: false, stitchEnabled: false },
        status: 'blocked',
        blockedReason: 'Full script blocked pending partner approval of messaging. Video cannot be recorded without confirmed partner name and approved use case language.',
      },
    ],
  },

  // ─── ci_012 ─── DRAFT CHAOS ───────────────────────────────────────────────
  // Real-world messy draft state. Created in a hurry, half-written,
  // inconsistent across variants. Hook missing on one variant. Caption is
  // a brain-dump. Media is a placeholder. No approval anywhere near.
  {
    id: 'ci_012',
    title: 'something about the new dashboard feature — ideas TBD',
    type: 'video',
    status: 'idea',   // genuine early idea stage
    priority: 'low',
    // estimatedValue intentionally omitted — not even close to that stage
    publishIntent: 'educational',
    hook: '',   // ⚠ hook is empty — not written yet
    primaryCTA: 'TBD',
    campaignId: undefined,
    tags: ['dashboard', 'product', 'feature', 'ideas'],
    notes: 'Brain dump from the Monday standup. Someone mentioned the new filter feature is actually interesting content. Needs a proper angle. Not assigned yet. Do not schedule.',
    createdBy: 'tm_003',
    createdAt: '2026-03-25T11:32:00Z',
    updatedAt: '2026-03-25T11:45:00Z',
    variants: [
      {
        id: 'cv_012_tiktok',
        platform: 'tiktok',
        platformAccountId: 'acc_tiktok',
        hook: '',   // ⚠ empty — not written
        caption: 'something about how the filter works?? maybe show the before/after of finding content without it vs with it. could be good. need to test the filter more first tbh',
        hashtags: ['#saas', '#productfeature'],   // bare minimum, not researched
        mentions: [],
        primaryCTA: '',   // ⚠ empty
        media: [],   // nothing
        platformSpecific: { duetEnabled: false, stitchEnabled: false },
        status: 'idea',
      },
      {
        id: 'cv_012_linkedin',
        platform: 'linkedin',
        platformAccountId: 'acc_linkedin',
        hook: 'We built a filter feature. Here\'s why it matters.',   // hook exists but generic
        caption: 'We shipped a new filter feature in the dashboard last week.\n\nI think there\'s actually a good story here about why we built it the way we did — the original version was too complex and nobody used it.\n\n[TODO: expand this into actual post — what problem did it solve, what did we cut, what do users say]\n\nMaybe 400 words? Ask Sarah if she has user feedback quotes we can use.',
        hashtags: ['#saas', '#productdevelopment'],
        mentions: [],
        primaryCTA: 'Tell me if this feature would help your workflow',
        media: [{ id: 'm_120', type: 'image', url: '/mock/DRAFT_dashboard_screenshot.png', aspectRatio: '16:9', altText: 'dashboard screenshot placeholder' }],
        platformSpecific: { documentType: 'none', sponsored: false },
        status: 'drafting',
      },
      {
        id: 'cv_012_threads',
        platform: 'threads',
        platformAccountId: 'acc_threads',
        hook: 'quick thought on building features nobody uses',
        caption: 'quick thought on building features nobody uses\n\nwe shipped a filter in v1. nobody used it. spent 3 weeks building it.\n\ntore it down. rebuilt it in 4 days. people actually use it now.\n\nthe difference was one conversation with a customer.\n\n[this might actually be better than the LinkedIn angle — think about this more]',
        hashtags: [],
        mentions: [],
        primaryCTA: 'have you shipped something nobody used?',
        media: [],
        platformSpecific: { crosspostToInstagram: false, replyControl: 'everyone' },
        status: 'idea',
        // note: Threads angle is accidentally better than LinkedIn draft
        // but nobody has noticed yet
      },
    ],
  },
];
