import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Platform, ContentStatus, ContentType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function formatPercent(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  tiktok: '#FF0050',
  facebook: '#1877F2',
  linkedin: '#0A66C2',
  threads: '#E4E4E7',
  youtube: '#FF0000',
  x: '#1DA1F2',
};

export const PLATFORM_NAMES: Record<Platform, string> = {
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  threads: 'Threads',
  youtube: 'YouTube',
  x: 'X',
};

export const STATUS_COLORS: Record<ContentStatus, string> = {
  idea: 'text-purple-400 bg-purple-400/10',
  drafting: 'text-yellow-400 bg-yellow-400/10',
  review: 'text-blue-400 bg-blue-400/10',
  approved: 'text-green-400 bg-green-400/10',
  scheduled: 'text-cyan-400 bg-cyan-400/10',
  published: 'text-emerald-400 bg-emerald-400/10',
  failed: 'text-red-400 bg-red-400/10',
};

export const STATUS_LABELS: Record<ContentStatus, string> = {
  idea: 'Idea',
  drafting: 'Drafting',
  review: 'In Review',
  approved: 'Approved',
  scheduled: 'Scheduled',
  published: 'Published',
  failed: 'Failed',
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  video: 'Video',
  image: 'Image',
  carousel: 'Carousel',
  text: 'Text Post',
  story: 'Story',
  reel: 'Reel',
  short: 'Short',
  post: 'Post',
  article: 'Article',
};

export function getPlatformBgColor(platform: Platform): string {
  const map: Record<Platform, string> = {
    tiktok: 'bg-[#FF0050]/10 text-[#FF0050]',
    facebook: 'bg-[#1877F2]/10 text-[#1877F2]',
    linkedin: 'bg-[#0A66C2]/10 text-[#0A66C2]',
    threads: 'bg-zinc-700/50 text-zinc-300',
    youtube: 'bg-[#FF0000]/10 text-[#FF0000]',
    x: 'bg-[#1DA1F2]/10 text-[#1DA1F2]',
  };
  return map[platform];
}

export function getDateRange(days: number): string[] {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}
