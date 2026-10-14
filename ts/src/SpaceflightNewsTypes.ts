// Typed models for the SpaceflightNews SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Article {
  authors: any[]
  events: any[]
  featured?: boolean
  id: number
  image_url: string
  launches: any[]
  news_site: string
  published_at: string
  summary: string
  title: string
  updated_at: string
  url: string
}

export interface ArticleLoadMatch {
  id: number
}

export interface ArticleListMatch {
  event?: any[]
  has_event?: boolean
  has_launch?: boolean
  is_featured?: boolean
  launch?: any[]
  limit?: number
  news_site?: string
  news_site_exclude?: string
  offset?: number
  ordering?: any[]
  published_at_gt?: string
  published_at_gte?: string
  published_at_lt?: string
  published_at_lte?: string
  search?: string
  summary_contain?: string
  summary_contains_all?: string
  summary_contains_one?: string
  title_contain?: string
  title_contains_all?: string
  title_contains_one?: string
  updated_at_gt?: string
  updated_at_gte?: string
  updated_at_lt?: string
  updated_at_lte?: string
}

export interface Blog {
  authors: any[]
  events: any[]
  featured?: boolean
  id: number
  image_url: string
  launches: any[]
  news_site: string
  published_at: string
  summary: string
  title: string
  updated_at: string
  url: string
}

export interface BlogLoadMatch {
  id: number
}

export interface BlogListMatch {
  event?: any[]
  has_event?: boolean
  has_launch?: boolean
  is_featured?: boolean
  launch?: any[]
  limit?: number
  news_site?: string
  news_site_exclude?: string
  offset?: number
  ordering?: any[]
  published_at_gt?: string
  published_at_gte?: string
  published_at_lt?: string
  published_at_lte?: string
  search?: string
  summary_contain?: string
  summary_contains_all?: string
  summary_contains_one?: string
  title_contain?: string
  title_contains_all?: string
  title_contains_one?: string
  updated_at_gt?: string
  updated_at_gte?: string
  updated_at_lt?: string
  updated_at_lte?: string
}

export interface Info {
  news_sites: any[]
  version: string
}

export interface InfoListMatch {
  news_sites?: any[]
  version?: string
}

export interface Report {
  authors: any[]
  id: number
  image_url: string
  news_site: string
  published_at: string
  summary?: string
  title: string
  updated_at: string
  url: string
}

export interface ReportLoadMatch {
  id: number
}

export interface ReportListMatch {
  limit?: number
  news_site?: string
  news_site_exclude?: string
  offset?: number
  ordering?: any[]
  published_at_gt?: string
  published_at_gte?: string
  published_at_lt?: string
  published_at_lte?: string
  search?: string
  summary_contain?: string
  summary_contains_all?: string
  summary_contains_one?: string
  title_contain?: string
  title_contains_all?: string
  title_contains_one?: string
  updated_at_gt?: string
  updated_at_gte?: string
  updated_at_lt?: string
  updated_at_lte?: string
}

