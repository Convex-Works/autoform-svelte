const DEFAULT_SITE_URL = "https://autoform-svelte.pages.dev";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export interface SeoMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  canonical: string;
  keywords: string;
  type: "website" | "article";
}

export function createSeoMeta(input: SeoMetaInput): SeoMeta {
  const siteUrl = trimTrailingSlash(import.meta.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL);
  const normalizedPath = input.path.startsWith("/") ? input.path : `/${input.path}`;

  return {
    title: input.title,
    description: input.description,
    path: normalizedPath,
    canonical: `${siteUrl}${normalizedPath}`,
    keywords: (input.keywords ?? []).join(", "),
    type: input.type ?? "website",
  };
}

export function jsonLd(value: object): string {
  return `<script type="application/ld+json">${JSON.stringify(value)}</script>`;
}
