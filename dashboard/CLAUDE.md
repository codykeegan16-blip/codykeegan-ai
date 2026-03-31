# Social Media Command Center — CLAUDE.md

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | Custom shadcn-style (Radix UI primitives) |
| Charts | Recharts |
| Icons | Lucide React |
| Date utils | Native JS Date |

All data is mock only. No API calls, no authentication, no database.

---

## Folder Structure

```
dashboard/
├── app/
│   ├── globals.css              # Dark theme base styles
│   ├── layout.tsx               # Root layout (html + body)
│   ├── page.tsx                 # Redirects → /overview
│   ├── overview/page.tsx
│   ├── content-library/page.tsx
│   ├── calendar/page.tsx
│   ├── platform-manager/page.tsx
│   ├── analytics/page.tsx
│   ├── competitor-tracker/page.tsx
│   ├── trends/page.tsx
│   ├── control-center/page.tsx
│   └── settings/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── app-layout.tsx       # Main shell (sidebar + topbar + main)
│   │   ├── sidebar.tsx          # Fixed 240px left nav
│   │   └── topbar.tsx           # h-14 top bar with search + actions
│   │
│   ├── shared/
│   │   ├── content-filters.tsx  # Reusable filter bar
│   │   ├── metric-card.tsx      # KPI card with change indicator
│   │   ├── platform-badge.tsx   # Platform name + color dot badge
│   │   └── status-badge.tsx     # Content status badge
│   │
│   ├── charts/
│   │   ├── engagement-chart.tsx # Area chart — engagement by platform
│   │   ├── reach-chart.tsx      # Area chart — reach over time
│   │   └── platform-bar-chart.tsx # Bar chart — per-platform 7-day
│   │
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
│
└── lib/
    ├── types/index.ts           # All TypeScript types
    ├── utils.ts                 # cn(), formatNumber(), constants
    └── mock-data/
        ├── content-items.part1.ts   # ci_001–ci_005
        ├── content-items.part2.ts   # ci_006–ci_008 (repurposing chain)
        ├── content-items.part3.ts   # ci_009–ci_012 (edge cases)
        ├── accounts.ts              # 12 platform accounts
        ├── competitors.ts           # 5 competitor profiles
        ├── trends.ts                # 8 trend items
        ├── metrics.ts               # Metric profiles + analytics overview
        └── index.ts                 # Combined exports + campaigns, team, notifications
```

---

## Data Models

### Core concept: master → variants

```
ContentItem  (editorial intent — explicitly set by team)
  status: ContentStatus        ← EXPLICIT, never derived
  publishIntent: PublishIntent ← educational | promotional | authority | ...
  hook: string                 ← master scroll-stopper
  primaryCTA: string           ← master call-to-action
  repurposeFrom?: string       ← ContentItem.id (repurposing chain)
  priority?: 'low'|'medium'|'high'
  estimatedValue?: number      ← USD, for ROI scoring
  variants: ContentVariant[]   ← one per target platform

ContentVariant  (execution layer — drives scheduling + publishing)
  platform: Platform
  platformAccountId?: string   ← references PlatformAccount.id
  hook: string                 ← platform-tuned version
  caption: string
  hashtags: string[]
  primaryCTA: string           ← platform-tuned version
  media: MediaAsset[]          ← each with type, aspectRatio, duration
  platformSpecific: {}         ← typed per-platform escape hatch
  status: ContentStatus        ← including 'blocked'
  blockedReason?: string
  scheduledAt?: string
  publishedAt?: string
  failedReason?: string
  metrics?: PlatformMetrics
```

### Repurposing chain
`repurposeFrom` is a `ContentItem.id`. Chains are linear:
```
ci_006 (TikTok original)
  → ci_007 (LinkedIn carousel, repurposeFrom: 'ci_006')
    → ci_008 (YouTube + X deep-dive, repurposeFrom: 'ci_007')
```

### Status workflow
```
idea → drafting → review → approved → scheduled → published
                                              ↓
                                           failed
                                           blocked (dependency)
```
`ContentItem.status` = editorial state (explicitly set).
`ContentVariant.status` = per-platform execution state.
Both can differ — this is intentional and surfaces workflow issues.

### Platform-specific payloads (typed)
Each platform has a typed interface for `platformSpecific`:
- `TikTokSpecific`: duetEnabled, stitchEnabled, soundId
- `FacebookSpecific`: targetingAge, targetingGeo, boostBudget
- `LinkedInSpecific`: articleUrl, documentType, slideCount, sponsored
- `YouTubeSpecific`: chapters, endScreenEnabled, visibility, tags
- `XSpecific`: isThread, threadCount, replySettings
- `ThreadsSpecific`: crosspostToInstagram, replyControl

### Standardised metrics (all platforms)
```typescript
PlatformMetrics {
  impressions, reach, clicks, likes, comments,
  shares, saves, watchTimeSeconds, ctr,
  engagementRate, completionRate, views,
  followers, followerGrowth
}
```

---

## Design System

### Color palette
| Role | Value |
|---|---|
| Background | `zinc-950` |
| Surface | `zinc-900` |
| Card | `zinc-900/50` |
| Border | `zinc-800` |
| Text primary | `zinc-100` |
| Text secondary | `zinc-400` |
| Text muted | `zinc-500` |
| Accent | `indigo-500 / indigo-600` |
| Success | `emerald-400` |
| Warning | `amber-400` |
| Danger | `red-400` |
| Blocked | `orange-400` |

### Platform colors
| Platform | Hex |
|---|---|
| TikTok | `#FF0050` |
| Facebook | `#1877F2` |
| LinkedIn | `#0A66C2` |
| Threads | `#E4E4E7` |
| YouTube | `#FF0000` |
| X | `#1DA1F2` |

### Typography
- Section headers: `text-xs font-semibold text-zinc-500 uppercase tracking-wider`
- Card titles: `text-sm font-semibold text-zinc-100`
- Body: `text-sm text-zinc-400`
- Monospace numbers: `tabular-nums`

### Component patterns
- Cards: `rounded-lg border border-zinc-800 bg-zinc-900/50`
- Tables: `text-sm`, header `text-xs text-zinc-500 uppercase`, rows `border-b border-zinc-800/50 hover:bg-zinc-800/30`
- Buttons: default=zinc-100/zinc-900, primary=indigo-600, outline=zinc-700 border, ghost=transparent
- Badges: inline-flex, rounded-md, small padding, background at 10-20% opacity

---

## Reusable Components

| Component | Usage |
|---|---|
| `<AppLayout title="...">` | Wraps every page |
| `<MetricCard>` | KPI display with optional change indicator |
| `<PlatformBadge platform="tiktok">` | Platform name + color dot |
| `<StatusBadge status="published">` | Workflow status pill |
| `<ContentFilters>` | Reusable filter bar (search, platform, status, campaign) |

Chart components are client-only and live in `components/charts/`.

---

## Platform Assumptions

| Platform | Key constraints | Notes |
|---|---|---|
| TikTok | 600s max video, 2200 char caption, no PDF carousel | High impression/save rates, low CTR |
| Facebook | 63K char caption, supports carousel + stories | Declining organic reach; boost budget modelled |
| LinkedIn | 3000 char, 5 hashtags max, supports carousel + longform | Highest CTR and save rates; B2B audience |
| Threads | 500 char, no carousel | Lower total reach; high comment engagement |
| YouTube | No char limit, chapters, end screens | Highest watchTime; Shorts treated separately |
| X | 280 char, threads modelled as single content item | Volatile impressions; high share rate |

### Platform-specific content types
- TikTok: `video`, `short`, `image`
- Facebook: `video`, `image`, `carousel`, `text`, `story`, `reel`
- LinkedIn: `video`, `image`, `carousel`, `text`, `article`
- Threads: `text`, `image`, `video`
- YouTube: `video`, `short`, `longform`
- X: `text`, `image`, `video`, `thread`

---

## Future Integration Strategy

### Phase 1 — Metricool integration
Metricool offers a unified API for scheduling and analytics across TikTok, Facebook, LinkedIn, Threads, YouTube, and X.

Integration path:
1. Replace `SCHEDULED_ITEMS` with Metricool schedule feed
2. Replace `PlatformMetrics` per variant with Metricool post analytics
3. Replace `PlatformAccount.dailyMetrics` with Metricool account analytics
4. Publishing actions in Control Center → Metricool publish API

Data model is already shaped to match Metricool's response structure.

### Phase 2 — Direct platform APIs
For platforms not fully covered by Metricool:

| Platform | API | Notes |
|---|---|---|
| TikTok | TikTok for Developers | Content Posting API (v2) |
| Facebook | Meta Graph API | Page posts, ad insights |
| LinkedIn | LinkedIn Marketing API | Organization posts, analytics |
| YouTube | YouTube Data API v3 | Videos, analytics |
| X | X API v2 | Tweets, media upload |
| Threads | Meta Threads API | Posts (limited analytics) |

`platformSpecific` fields map directly to each platform's publish payload.
`platformAccountId` maps to the OAuth token for each connected account.

### Phase 3 — AI content generation
- Hook generation: pass `publishIntent`, `type`, `platform` → Claude API → suggested hooks
- Caption adaptation: pass master caption → Claude → platform-tuned variant
- Trend-to-content: pass `TrendItem.platformAngles[platform]` → Claude → draft ContentVariant

`TrendItem.platformAngles` is already structured to pass directly to a prompt.

### Environment variables (future)
```
METRICOOL_API_KEY=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
META_APP_ID=
META_APP_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
YOUTUBE_API_KEY=
X_API_KEY=
X_API_SECRET=
ANTHROPIC_API_KEY=
```
