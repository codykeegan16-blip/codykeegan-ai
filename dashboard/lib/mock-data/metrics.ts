import { Platform, PlatformMetrics } from '@/lib/types';

// ─── Base metric profiles ──────────────────────────────────────────────────
// Platform-agnostic shapes. Use getXxxMetrics(platform) for tuned versions.

export const METRIC_PROFILES = {

  viral: {
    impressions: 820000,
    reach: 540000,
    clicks: 18700,
    likes: 48200,
    comments: 6800,
    shares: 14200,
    saves: 22400,
    watchTimeSeconds: 32400000,
    ctr: 2.3,
    engagementRate: 9.4,
    completionRate: 64,
  },

  highPerforming: {
    impressions: 180000,
    reach: 120000,
    clicks: 7200,
    likes: 11400,
    comments: 1800,
    shares: 3600,
    saves: 6800,
    watchTimeSeconds: 8640000,
    ctr: 4.0,
    engagementRate: 7.2,
    completionRate: 52,
  },

  average: {
    impressions: 38000,
    reach: 24000,
    clicks: 1140,
    likes: 1600,
    comments: 280,
    shares: 520,
    saves: 880,
    watchTimeSeconds: 1440000,
    ctr: 3.0,
    engagementRate: 3.6,
    completionRate: 38,
  },

  lowPerforming: {
    impressions: 8400,
    reach: 5200,
    clicks: 168,
    likes: 210,
    comments: 28,
    shares: 48,
    saves: 62,
    watchTimeSeconds: 252000,
    ctr: 2.0,
    engagementRate: 0.9,
    completionRate: 22,
  },

  earlyStage: {
    impressions: 2200,
    reach: 1400,
    clicks: 44,
    likes: 68,
    comments: 9,
    shares: 14,
    saves: 18,
    watchTimeSeconds: 66000,
    ctr: 2.0,
    engagementRate: 1.8,
    completionRate: 28,
  },

  failed: {
    impressions: 0,
    reach: 0,
    clicks: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    watchTimeSeconds: 0,
    ctr: 0,
    engagementRate: 0,
    completionRate: 0,
  },

} satisfies Record<string, PlatformMetrics>;

export type MetricProfile = keyof typeof METRIC_PROFILES;

// ─── Platform multipliers ──────────────────────────────────────────────────
// Scale the base profile by platform-realistic ratios.
// Reflects real-world platform behaviour differences.

const PLATFORM_MULTIPLIERS: Record<Platform, {
  impressions: number;
  reach: number;
  clicks: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  watchTimeSeconds: number;
  ctr: number;
  engagementRate: number;
  completionRate: number;
}> = {
  // TikTok: high impressions, lower CTR, high saves + completion
  tiktok: {
    impressions: 3.2,
    reach: 2.8,
    clicks: 0.6,
    likes: 2.4,
    comments: 1.6,
    shares: 2.2,
    saves: 2.8,
    watchTimeSeconds: 2.4,
    ctr: 0.6,
    engagementRate: 1.4,
    completionRate: 1.4,
  },
  // Facebook: moderate reach, lower organic engagement
  facebook: {
    impressions: 0.8,
    reach: 0.7,
    clicks: 1.1,
    likes: 0.6,
    comments: 0.5,
    shares: 0.8,
    saves: 0.4,
    watchTimeSeconds: 0.7,
    ctr: 1.1,
    engagementRate: 0.7,
    completionRate: 0.7,
  },
  // LinkedIn: lower impressions, higher CTR, high saves (professional intent)
  linkedin: {
    impressions: 0.5,
    reach: 0.5,
    clicks: 1.4,
    likes: 0.8,
    comments: 1.4,
    shares: 1.0,
    saves: 1.6,
    watchTimeSeconds: 0.6,
    ctr: 1.4,
    engagementRate: 1.5,
    completionRate: 0.8,
  },
  // Threads: smaller platform, lower absolutes, moderate engagement
  threads: {
    impressions: 0.4,
    reach: 0.4,
    clicks: 0.4,
    likes: 0.9,
    comments: 1.2,
    shares: 0.6,
    saves: 0.3,
    watchTimeSeconds: 0.3,
    ctr: 0.8,
    engagementRate: 1.0,
    completionRate: 0.5,
  },
  // YouTube: highest watchTime, high saves, moderate CTR from thumbnails
  youtube: {
    impressions: 1.2,
    reach: 1.1,
    clicks: 1.0,
    likes: 0.9,
    comments: 0.8,
    shares: 0.7,
    saves: 1.4,
    watchTimeSeconds: 6.0,
    ctr: 1.2,
    engagementRate: 0.8,
    completionRate: 0.9,
  },
  // X: volatile impressions, low saves, high shares (retweet culture)
  x: {
    impressions: 2.2,
    reach: 1.8,
    clicks: 0.9,
    likes: 1.0,
    comments: 1.1,
    shares: 1.8,
    saves: 0.2,
    watchTimeSeconds: 0.4,
    ctr: 0.8,
    engagementRate: 0.9,
    completionRate: 0.4,
  },
};

// ─── Helper: apply multiplier to a base profile ────────────────────────────

function applyMultiplier(
  base: PlatformMetrics,
  multiplier: typeof PLATFORM_MULTIPLIERS[Platform]
): PlatformMetrics {
  return {
    impressions:       Math.round((base.impressions       ?? 0) * multiplier.impressions),
    reach:             Math.round((base.reach             ?? 0) * multiplier.reach),
    clicks:            Math.round((base.clicks            ?? 0) * multiplier.clicks),
    likes:             Math.round((base.likes             ?? 0) * multiplier.likes),
    comments:          Math.round((base.comments          ?? 0) * multiplier.comments),
    shares:            Math.round((base.shares            ?? 0) * multiplier.shares),
    saves:             Math.round((base.saves             ?? 0) * multiplier.saves),
    watchTimeSeconds:  Math.round((base.watchTimeSeconds  ?? 0) * multiplier.watchTimeSeconds),
    ctr:               parseFloat(((base.ctr              ?? 0) * multiplier.ctr).toFixed(1)),
    engagementRate:    parseFloat(((base.engagementRate   ?? 0) * multiplier.engagementRate).toFixed(1)),
    completionRate:    parseFloat(((base.completionRate   ?? 0) * multiplier.completionRate).toFixed(1)),
  };
}

// ─── Exported helper functions ─────────────────────────────────────────────

export function getMetrics(profile: MetricProfile, platform: Platform): PlatformMetrics {
  if (profile === 'failed') return { ...METRIC_PROFILES.failed };
  return applyMultiplier(METRIC_PROFILES[profile], PLATFORM_MULTIPLIERS[platform]);
}

export function getViralMetrics(platform: Platform): PlatformMetrics {
  return getMetrics('viral', platform);
}

export function getHighPerformingMetrics(platform: Platform): PlatformMetrics {
  return getMetrics('highPerforming', platform);
}

export function getLowPerformingMetrics(platform: Platform): PlatformMetrics {
  return getMetrics('lowPerforming', platform);
}

export function getAverageMetrics(platform: Platform): PlatformMetrics {
  return getMetrics('average', platform);
}

export function getEarlyStageMetrics(platform: Platform): PlatformMetrics {
  return getMetrics('earlyStage', platform);
}

// ─── Analytics overview: 30-day blended dataset ───────────────────────────
// Used by the Analytics page for charts and KPI cards.

const days30 = Array.from({ length: 30 }, (_, i) => {
  const d = new Date('2026-03-30');
  d.setDate(d.getDate() - (29 - i));
  return d.toISOString().split('T')[0];
});

// Seed for deterministic-looking but varied data
function wave(i: number, base: number, amp: number, period = 7): number {
  return Math.round(base + amp * Math.sin((i / period) * Math.PI * 2) + (i / 30) * base * 0.15);
}

export const ANALYTICS_OVERVIEW = {
  period: '30d' as const,
  totalReach: 1840000,
  totalImpressions: 2960000,
  totalEngagements: 128400,
  avgEngagementRate: 6.1,
  totalFollowerGrowth: 11240,
  topPerformingPlatform: 'tiktok' as const,
  topPerformingContentId: 'ci_001',
  platformBreakdown: {
    tiktok:   { impressions: 1240000, reach: 820000,  engagementRate: 7.2, followerGrowth: 4200, likes: 52000, comments: 8400, shares: 16000 },
    linkedin: { impressions: 420000,  reach: 310000,  engagementRate: 7.8, followerGrowth: 1840, likes: 22000, comments: 4800, shares: 8200  },
    youtube:  { impressions: 480000,  reach: 320000,  engagementRate: 5.2, followerGrowth: 2800, likes: 28000, comments: 4200, shares: 6800  },
    x:        { impressions: 840000,  reach: 580000,  engagementRate: 5.8, followerGrowth: 1680, likes: 38000, comments: 7200, shares: 14800 },
    facebook: { impressions: 420000,  reach: 280000,  engagementRate: 3.2, followerGrowth: 1100, likes: 18000, comments: 2900, shares: 7800  },
    threads:  { impressions: 210000,  reach: 148000,  engagementRate: 5.4, followerGrowth:  920, likes: 18000, comments: 3600, shares: 4200  },
  },
  dailyMetrics: days30.map((date, i) => ({
    date,
    reach:       wave(i, 61000,  18000),
    impressions: wave(i, 98000,  28000),
    engagements: wave(i,  4280,   1400),
    tiktok:      wave(i, 41000,  14000),
    linkedin:    wave(i, 10000,   3200),
    youtube:     wave(i, 10500,   3800),
    x:           wave(i, 18000,   8400),
    facebook:    wave(i,  9200,   2600),
    threads:     wave(i,  4800,   1600),
  })),
};
