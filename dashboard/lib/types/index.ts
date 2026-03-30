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

// ─────────────────────────────────────────────
// Media
// ─────────────────────────────────────────────

export interface MediaAsset {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  durationSeconds?: number;   // video / short / longform
  altText?: string;
  fileSize?: number;           // bytes
}

// ─────────────────────────────────────────────
// Platform config (constraints)
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
  optimalPostTimes: string[];  // e.g. "18:00"
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
// One per target platform.  Variant status drives scheduling + publishing.
// ─────────────────────────────────────────────

export interface ContentVariant {
  id: string;
  platform: Platform;

  // Copy
  caption: string;
  hook: string;              // first line / scroll-stopper (platform-tuned)
  hashtags: string[];
  mentions: string[];
  primaryCTA: string;        // e.g. "Link in bio", "Comment YES", "Subscribe"

  // Media
  media: MediaAsset[];

  // Platform escape hatch — carry whatever that platform needs
  // TikTok: { duetEnabled, stitchEnabled, soundId }
  // LinkedIn: { articleUrl, targetAudience }
  // YouTube: { chapters, endScreen, tags }
  // Facebook: { targetingAge, targetingGeo, boostBudget }
  // X:        { isThread, threadCount }
  // Threads:  { crosspostToInstagram }
  platformSpecific: Record<string, unknown>;

  // Workflow
  status: ContentStatus;
  blockedReason?: string;     // only when status === 'blocked'
  scheduledAt?: string;       // ISO 8601
  publishedAt?: string;
  failureReason?: string;

  // Post-publish
  metrics?: PlatformMetrics;
}

// ─────────────────────────────────────────────
// ContentItem — master / editorial intent
// Status here = editorial state (explicitly set by team).
// Variant statuses = per-platform execution state.
// ─────────────────────────────────────────────

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;

  // Editorial intent
  status: ContentStatus;           // EXPLICIT — not derived
  publishIntent: PublishIntent;
  hook: string;                    // master hook (adapted per variant)
  primaryCTA: string;              // master CTA (adapted per variant)

  // Repurposing chain
  repurposeFrom?: string;          // ContentItem.id this was derived from

  // Organisation
  campaignId?: string;
  tags: string[];
  notes?: string;

  // Team
  createdBy: string;               // TeamMember.id
  assignedTo?: string;             // TeamMember.id
  approvedBy?: string;             // TeamMember.id
  approvedAt?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Platform executions
  variants: ContentVariant[];
}

// ─────────────────────────────────────────────
// Metrics
// ─────────────────────────────────────────────

export interface PlatformMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  clicks?: number;
  impressions?: number;
  reach?: number;
  engagementRate?: number;     // 0–100
  watchTimeSeconds?: number;
  completionRate?: number;     // 0–100
  followers?: number;
  followerGrowth?: number;
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
  weeklyGrowth: number;        // %
  avgEngagementRate: number;   // %
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
  trendScore: number;          // 0–100
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
