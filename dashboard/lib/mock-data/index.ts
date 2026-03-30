// ─── Mock data index ────────────────────────────────────────────────────────
// Single import point for all mock data across the app.
// import { CONTENT_ITEMS, PLATFORM_ACCOUNTS, ANALYTICS_OVERVIEW, ... } from '@/lib/mock-data'

export { CONTENT_ITEMS_PART1 } from './content-items.part1';
export { CONTENT_ITEMS_PART2 } from './content-items.part2';
export { CONTENT_ITEMS_PART3 } from './content-items.part3';
export { PLATFORM_ACCOUNTS, PRIMARY_ACCOUNTS, ACCOUNT_BY_ID } from './accounts';
export { COMPETITORS, COMPETITOR_SCORES } from './competitors';
export { TRENDS } from './trends';
export {
  METRIC_PROFILES,
  ANALYTICS_OVERVIEW,
  getMetrics,
  getViralMetrics,
  getHighPerformingMetrics,
  getLowPerformingMetrics,
  getAverageMetrics,
  getEarlyStageMetrics,
} from './metrics';

// ─── Combined content items array ──────────────────────────────────────────
import { CONTENT_ITEMS_PART1 } from './content-items.part1';
import { CONTENT_ITEMS_PART2 } from './content-items.part2';
import { CONTENT_ITEMS_PART3 } from './content-items.part3';
import { ContentItem } from '@/lib/types';

export const CONTENT_ITEMS: ContentItem[] = [
  ...CONTENT_ITEMS_PART1,
  ...CONTENT_ITEMS_PART2,
  ...CONTENT_ITEMS_PART3,
];

// ─── Lookup helpers ─────────────────────────────────────────────────────────

export const CONTENT_BY_ID: Record<string, ContentItem> = Object.fromEntries(
  CONTENT_ITEMS.map(item => [item.id, item])
);

// ─── Campaigns (inline — small enough to not need a separate file) ──────────
import { Campaign } from '@/lib/types';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_001',
    name: 'Thought Leadership Q1',
    color: '#6366f1',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    status: 'completed',
    description: 'Authority-building content across all platforms. Focus on AI, productivity, and SaaS growth.',
    targetPlatforms: ['linkedin', 'tiktok', 'x', 'youtube', 'threads'],
    budget: 2000,
  },
  {
    id: 'camp_002',
    name: 'Q2 Product Launch',
    color: '#f59e0b',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    status: 'active',
    description: 'Full-funnel launch campaign for Q2 feature releases. Promotional + educational mix.',
    targetPlatforms: ['linkedin', 'tiktok', 'x', 'youtube', 'facebook'],
    budget: 8000,
  },
  {
    id: 'camp_003',
    name: 'Creator Community Series',
    color: '#10b981',
    startDate: '2026-03-15',
    endDate: '2026-05-15',
    status: 'active',
    description: 'Community-focused series: behind-the-scenes, build-in-public, audience Q&A.',
    targetPlatforms: ['threads', 'tiktok', 'x'],
    budget: 500,
  },
  {
    id: 'camp_004',
    name: 'Spring Sale Push',
    color: '#ef4444',
    startDate: '2026-03-10',
    endDate: '2026-03-20',
    status: 'completed',
    description: '40% off promotion. Short window, high-frequency posting.',
    targetPlatforms: ['linkedin', 'x', 'facebook', 'tiktok'],
    budget: 3000,
  },
  {
    id: 'camp_005',
    name: 'YouTube Growth Push',
    color: '#3b82f6',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    status: 'planned',
    description: 'Dedicated YouTube expansion: 2 videos/week, Shorts strategy, end-screen funnels.',
    targetPlatforms: ['youtube'],
    budget: 1500,
  },
];

export const CAMPAIGN_BY_ID: Record<string, Campaign> = Object.fromEntries(
  CAMPAIGNS.map(c => [c.id, c])
);

// ─── Team members ───────────────────────────────────────────────────────────
import { TeamMember } from '@/lib/types';

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm_001', name: 'Cody Keegan',   role: 'admin',    email: 'cody@codykeegan.com',     initials: 'CK' },
  { id: 'tm_002', name: 'Sarah Lin',     role: 'editor',   email: 'sarah@codykeegan.com',    initials: 'SL' },
  { id: 'tm_003', name: 'Marcus Webb',   role: 'editor',   email: 'marcus@codykeegan.com',   initials: 'MW' },
  { id: 'tm_004', name: 'Priya Sharma',  role: 'approver', email: 'priya@codykeegan.com',    initials: 'PS' },
];

export const TEAM_BY_ID: Record<string, TeamMember> = Object.fromEntries(
  TEAM_MEMBERS.map(m => [m.id, m])
);

// ─── Platform configs ───────────────────────────────────────────────────────
import { PlatformConfig } from '@/lib/types';

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#FF0050',
    maxVideoSeconds: 600,
    maxCharacters: 2200,
    maxHashtags: 30,
    supportsCarousel: false,
    supportsStories: false,
    supportsLongform: false,
    supportedContentTypes: ['video', 'short', 'image'],
    optimalPostTimes: ['07:00', '12:00', '17:00', '21:00'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    maxVideoSeconds: 14400,
    maxCharacters: 63206,
    supportsCarousel: true,
    supportsStories: true,
    supportsLongform: false,
    supportedContentTypes: ['video', 'image', 'carousel', 'text', 'story', 'reel'],
    optimalPostTimes: ['09:00', '13:00', '15:00'],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    maxVideoSeconds: 600,
    maxCharacters: 3000,
    maxHashtags: 5,
    supportsCarousel: true,
    supportsStories: false,
    supportsLongform: true,
    supportedContentTypes: ['video', 'image', 'carousel', 'text', 'article'],
    optimalPostTimes: ['08:00', '10:00', '12:00', '17:00'],
  },
  {
    id: 'threads',
    name: 'Threads',
    color: '#E4E4E7',
    maxCharacters: 500,
    supportsCarousel: false,
    supportsStories: false,
    supportsLongform: false,
    supportedContentTypes: ['text', 'image', 'video'],
    optimalPostTimes: ['09:00', '12:00', '20:00'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    maxVideoSeconds: 43200,
    maxCharacters: 5000,
    supportsCarousel: false,
    supportsStories: false,
    supportsLongform: true,
    supportedContentTypes: ['video', 'short', 'longform'],
    optimalPostTimes: ['14:00', '17:00', '20:00'],
  },
  {
    id: 'x',
    name: 'X',
    color: '#1DA1F2',
    maxCharacters: 280,
    maxHashtags: 2,
    supportsCarousel: false,
    supportsStories: false,
    supportsLongform: false,
    supportedContentTypes: ['text', 'image', 'video', 'thread'],
    optimalPostTimes: ['08:00', '12:00', '17:00', '20:00'],
  },
];

export const PLATFORM_CONFIG_BY_ID: Record<string, PlatformConfig> = Object.fromEntries(
  PLATFORM_CONFIGS.map(p => [p.id, p])
);

// ─── Notifications ──────────────────────────────────────────────────────────
import { Notification } from '@/lib/types';

export const NOTIFICATIONS: Notification[] = [
  { id: 'notif_001', type: 'approval_needed', title: 'Approval needed', message: 'ci_004 "5 positioning mistakes" is ready for review', timestamp: '2026-03-30T08:30:00Z', read: false, contentId: 'ci_004' },
  { id: 'notif_002', type: 'failed', title: 'Publish failed', message: 'ci_002 TikTok variant failed — audio licensing issue', timestamp: '2026-03-29T09:12:00Z', read: false, contentId: 'ci_002', platform: 'tiktok' },
  { id: 'notif_003', type: 'blocked', title: 'Workflow issue detected', message: 'ci_008 is scheduled without approval sign-off', timestamp: '2026-03-28T16:00:00Z', read: false, contentId: 'ci_008' },
  { id: 'notif_004', type: 'milestone', title: 'Milestone reached', message: 'ci_001 crossed 300K TikTok views', timestamp: '2026-03-27T14:22:00Z', read: true, contentId: 'ci_001', platform: 'tiktok' },
  { id: 'notif_005', type: 'published', title: 'Published', message: 'ci_007 LinkedIn carousel published successfully', timestamp: '2026-03-26T08:30:00Z', read: true, contentId: 'ci_007', platform: 'linkedin' },
  { id: 'notif_006', type: 'failed', title: 'Ad policy flag', message: 'ci_002 Facebook variant flagged for policy review', timestamp: '2026-03-25T11:00:00Z', read: true, contentId: 'ci_002', platform: 'facebook' },
  { id: 'notif_007', type: 'approval_needed', title: 'Approval needed', message: 'ci_005 behind-the-build is approved on 3 platforms, YouTube still blocked', timestamp: '2026-03-29T10:00:00Z', read: false, contentId: 'ci_005', platform: 'youtube' },
];

// ─── Scheduled items (calendar feed) ───────────────────────────────────────
import { ScheduledItem } from '@/lib/types';

export const SCHEDULED_ITEMS: ScheduledItem[] = [
  // Published
  { id: 'sched_001', contentId: 'ci_001', variantId: 'cv_001_tiktok',   platform: 'tiktok',   scheduledAt: '2026-03-05T18:00:00Z', status: 'published', title: 'AI replacing junior devs',       type: 'video',    campaignId: 'camp_001', publishIntent: 'authority'    },
  { id: 'sched_002', contentId: 'ci_001', variantId: 'cv_001_linkedin', platform: 'linkedin', scheduledAt: '2026-03-06T08:30:00Z', status: 'published', title: 'AI replacing junior devs',       type: 'video',    campaignId: 'camp_001', publishIntent: 'authority'    },
  { id: 'sched_003', contentId: 'ci_001', variantId: 'cv_001_youtube',  platform: 'youtube',  scheduledAt: '2026-03-06T14:00:00Z', status: 'published', title: 'AI replacing junior devs',       type: 'longform', campaignId: 'camp_001', publishIntent: 'authority'    },
  { id: 'sched_004', contentId: 'ci_002', variantId: 'cv_002_linkedin', platform: 'linkedin', scheduledAt: '2026-03-15T08:00:00Z', status: 'published', title: 'Spring sale 40% off',            type: 'image',    campaignId: 'camp_004', publishIntent: 'promotional'  },
  { id: 'sched_005', contentId: 'ci_002', variantId: 'cv_002_tiktok',   platform: 'tiktok',   scheduledAt: '2026-03-15T09:00:00Z', status: 'failed',   title: 'Spring sale 40% off',            type: 'short',    campaignId: 'camp_004', publishIntent: 'promotional'  },
  { id: 'sched_006', contentId: 'ci_006', variantId: 'cv_006_tiktok',   platform: 'tiktok',   scheduledAt: '2026-03-10T17:00:00Z', status: 'published', title: '5am myth debunked',             type: 'video',    campaignId: 'camp_001', publishIntent: 'authority'    },
  { id: 'sched_007', contentId: 'ci_007', variantId: 'cv_007_linkedin', platform: 'linkedin', scheduledAt: '2026-03-18T08:30:00Z', status: 'published', title: '14 studies carousel',           type: 'carousel', campaignId: 'camp_001', publishIntent: 'educational'  },
  // Upcoming
  { id: 'sched_008', contentId: 'ci_004', variantId: 'cv_004_linkedin', platform: 'linkedin', scheduledAt: '2026-04-03T09:00:00Z', status: 'scheduled', title: '5 SaaS positioning mistakes',   type: 'carousel', campaignId: 'camp_002', publishIntent: 'educational'  },
  { id: 'sched_009', contentId: 'ci_005', variantId: 'cv_005_tiktok',   platform: 'tiktok',   scheduledAt: '2026-04-05T17:00:00Z', status: 'scheduled', title: 'Behind the build',              type: 'short',    campaignId: 'camp_001', publishIntent: 'community'    },
  { id: 'sched_010', contentId: 'ci_005', variantId: 'cv_005_linkedin', platform: 'linkedin', scheduledAt: '2026-04-05T08:30:00Z', status: 'scheduled', title: 'Behind the build',              type: 'video',    campaignId: 'camp_001', publishIntent: 'community'    },
  { id: 'sched_011', contentId: 'ci_005', variantId: 'cv_005_threads',  platform: 'threads',  scheduledAt: '2026-04-05T18:00:00Z', status: 'scheduled', title: 'Behind the build',              type: 'video',    campaignId: 'camp_001', publishIntent: 'community'    },
  { id: 'sched_012', contentId: 'ci_008', variantId: 'cv_008_x',        platform: 'x',        scheduledAt: '2026-04-08T09:00:00Z', status: 'scheduled', title: 'Chronotype deep-dive thread',   type: 'thread',   campaignId: 'camp_001', publishIntent: 'educational'  },
  { id: 'sched_013', contentId: 'ci_008', variantId: 'cv_008_youtube',  platform: 'youtube',  scheduledAt: '2026-04-08T14:00:00Z', status: 'scheduled', title: 'Chronotype deep-dive video',    type: 'longform', campaignId: 'camp_001', publishIntent: 'educational'  },
  { id: 'sched_014', contentId: 'ci_009', variantId: 'cv_009_tiktok',   platform: 'tiktok',   scheduledAt: '2026-04-10T17:00:00Z', status: 'scheduled', title: 'Q2 roadmap reveal',             type: 'short',    campaignId: 'camp_002', publishIntent: 'awareness'    },
  { id: 'sched_015', contentId: 'ci_009', variantId: 'cv_009_youtube',  platform: 'youtube',  scheduledAt: '2026-04-10T14:00:00Z', status: 'scheduled', title: 'Q2 roadmap reveal',             type: 'video',    campaignId: 'camp_002', publishIntent: 'awareness'    },
  { id: 'sched_016', contentId: 'ci_009', variantId: 'cv_009_linkedin', platform: 'linkedin', scheduledAt: '2026-04-10T08:30:00Z', status: 'scheduled', title: 'Q2 roadmap reveal',             type: 'image',    campaignId: 'camp_002', publishIntent: 'awareness'    },
];
