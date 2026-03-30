// ─────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────

export type Platform = 'tiktok' | 'facebook' | 'linkedin' | 'threads' | 'youtube' | 'x';

export type ContentStatus =
  | 'idea'
  | 'drafting'
  | 'review'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'failed'
  | 'blocked';

export type ContentType =
  | 'video'
  | 'image'
  | 'carousel'
  | 'text'
  | 'story'
  | 'reel'
  | 'short'
  | 'longform'
  | 'article'
  | 'thread';

export type MediaType = 'image' | 'video' | 'carousel' | 'short' | 'longform';

export type AspectRatio = '9:16' | '1:1' | '16:9' | '4:5';

export type PublishIntent =
  | 'educational'
  | 'promotional'
  | 'authority'
  | 'entertainment'
  | 'community'
  | 'awareness'
  | 'conversion'
  | 'engagement';

export type MetricPeriod = '7d' | '30d' | '90d' | '1y';

export type Priority = 'low' | 'medium' | 'high';

// ─────────────────────────────────────────────
// Media
// ─────────────────────────────────────────────

export interface MediaAsset {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  aspectRatio?: AspectRatio;
  width?: number;
  height?: number;
  durationSeconds?: number;
  altText?: string;
  fileSizeBytes?: number;
}

// ─────────────────────────────────────────────
// Metrics — standardised across all platforms
// ─────────────────────────────────────────────

export interface PlatformMetrics {
  impressions?: number;
  reach?: number;
  clicks?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  watchTimeSeconds?: number;
  ctr?: number;              // click-through rate, 0–100
  engagementRate?: number;   // 0–100
  completionRate?: number;   // 0–100 (video)
  views?: number;            // distinct from impressions on video platforms
  followers?: number;
  followerGrowth?: number;
}

// ─────────────────────────────────────────────
// Platform-specific payloads (typed hints)
// ─────────────────────────────────────────────

export interface TikTokSpecific {
  duetEnabled?: boolean;
  stitchEnabled?: boolean;
  soundId?: string;
  soundName?: string;
  branded?: boolean;
}

export interface FacebookSpecific {
  targetingAgeMin?: number;
  targetingAgeMax?: number;
  targetingGeo?: string[];
  boostBudget?: number;
  pageId?: string;
  callToActionType?: string;
}

export interface LinkedInSpecific {
  articleUrl?: string;
  targetAudience?: string;
  documentType?: 'carousel' | 'pdf' | 'none';
  sponsored?: boolean;
  slideCount?: number;
}

export interface YouTubeSpecific {
  chapters?: string[];
  endScreenEnabled?: boolean;
  cards?: string[];
  tags?: string[];
  category?: string;
  madeForKids?: boolean;
  visibility?: 'public' | 'unlisted' | 'private';
}

export interface XSpecific {
  isThread?: boolean;
  threadCount?: number;
  replySettings?: 'everyone' | 'followers' | 'mentioned';
  promoted?: boolean;
}

export interface ThreadsSpecific {
  crosspostToInstagram?: boolean;
  replyControl?: 'everyone' | 'followers';
}

export type PlatformSpecificPayload =
  | TikTokSpecific
  | FacebookSpecific
  | LinkedInSpecific
  | YouTubeSpecific
  | XSpecific
  | ThreadsSpecific;

// ─────────────────────────────────────────────
// Platform config (constraints + capabilities)
// ─────────────────────────────────────────────

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  maxVideoSeconds?: number;
  maxCharacters?: number;
  maxHashtags?: number;
  supportsCarousel: boolean;
  supportsStories: boolean;
  supportsLongform: boolean;
  supportedContentTypes: ContentType[];
  optimalPostTimes: string[];
}

// ─────────────────────────────────────────────
// Campaign
// ─────────────────────────────────────────────

export interface Campaign {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'completed' | 'paused';
  description?: string;
  targetPlatforms: Platform[];
  budget?: number;
}

// ─────────────────────────────────────────────
// ContentVariant — execution layer
// Status here drives scheduling + publishing per platform.
// ─────────────────────────────────────────────

export interface ContentVariant {
  id: string;
  platform: Platform;
  platformAccountId?: string;    // which connected account to publish from

  // Copy (platform-tuned)
  hook: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  primaryCTA: string;

  // Media
  media: MediaAsset[];

  // Platform-specific config
  platformSpecific: PlatformSpecificPayload;

  // Workflow
  status: ContentStatus;
  blockedReason?: string;
  scheduledAt?: string;
  publishedAt?: string;
  failedReason?: string;

  // Post-publish
  metrics?: PlatformMetrics;
}

// ─────────────────────────────────────────────
// ContentItem — master / editorial intent
// status is EXPLICITLY set by the team — never auto-derived.
// Variant statuses drive per-platform execution.
// ─────────────────────────────────────────────

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;

  // Editorial state (explicitly set)
  status: ContentStatus;
  priority?: Priority;
  estimatedValue?: number;       // USD, used for ROI scoring

  // Intent
  publishIntent: PublishIntent;
  hook: string;                  // master scroll-stopper, adapted per variant
  primaryCTA: string;            // master CTA, adapted per variant

  // Repurposing chain
  repurposeFrom?: string;        // ContentItem.id this was derived from

  // Organisation
  campaignId?: string;
  tags: string[];
  notes?: string;

  // Team
  createdBy: string;
  assignedTo?: string;
  approvedBy?: string;
  approvedAt?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Executions
  variants: ContentVariant[];
}

// ─────────────────────────────────────────────
// Platform accounts
// ─────────────────────────────────────────────

export interface PlatformAccount {
  id: string;
  platform: Platform;
  handle: string;
  displayName: string;
  followers: number;
  following: number;
  verified: boolean;
  connected: boolean;
  lastSync?: string;
  metrics: PlatformMetrics;
  dailyMetrics: Array<{ date: string } & PlatformMetrics>;
}

// ─────────────────────────────────────────────
// Competitors
// ─────────────────────────────────────────────

export interface CompetitorPost {
  id: string;
  type: ContentType;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  date: string;
}

export interface CompetitorPlatform {
  platform: Platform;
  handle: string;
  followers: number;
  weeklyGrowth: number;
  avgEngagementRate: number;
  postsPerWeek: number;
  topContentType: ContentType;
  recentPosts: CompetitorPost[];
}

export interface Competitor {
  id: string;
  name: string;
  industry: string;
  website?: string;
  platforms: CompetitorPlatform[];
  strengths: string[];
  weaknesses: string[];
  notes?: string;
}

// ─────────────────────────────────────────────
// Trends
// ─────────────────────────────────────────────

export interface PlatformAngle {
  angle: string;
  contentType: ContentType;
  hook: string;
  hashtags: string[];
  suggestedCTA: string;
}

export interface TrendItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  publishedAt: string;
  trendScore: number;
  velocity: 'rising' | 'peak' | 'fading';
  platforms: Platform[];
  platformAngles: Partial<Record<Platform, PlatformAngle>>;
  tags: string[];
}

// ─────────────────────────────────────────────
// Calendar / scheduling
// ─────────────────────────────────────────────

export interface ScheduledItem {
  id: string;
  contentId: string;
  variantId: string;
  platform: Platform;
  scheduledAt: string;
  status: ContentStatus;
  title: string;
  type: ContentType;
  campaignId?: string;
  publishIntent: PublishIntent;
}

// ─────────────────────────────────────────────
// Analytics
// ─────────────────────────────────────────────

export interface DailyMetric {
  date: string;
  reach: number;
  impressions: number;
  engagements: number;
  tiktok?: number;
  facebook?: number;
  linkedin?: number;
  threads?: number;
  youtube?: number;
  x?: number;
}

export interface AnalyticsOverview {
  period: MetricPeriod;
  totalReach: number;
  totalImpressions: number;
  totalEngagements: number;
  avgEngagementRate: number;
  totalFollowerGrowth: number;
  topPerformingPlatform: Platform;
  topPerformingContentId: string;
  platformBreakdown: Partial<Record<Platform, PlatformMetrics>>;
  dailyMetrics: DailyMetric[];
}

// ─────────────────────────────────────────────
// Team
// ─────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer' | 'approver';
  email: string;
  initials: string;
  avatar?: string;
}

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────

export interface Notification {
  id: string;
  type: 'approval_needed' | 'published' | 'failed' | 'scheduled' | 'comment' | 'milestone' | 'blocked';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  contentId?: string;
  platform?: Platform;
}
