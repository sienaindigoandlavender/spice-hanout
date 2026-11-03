// The Magazine: Spice Hanout's stories, built the same way as Zfriti's.
// Markdown files in content/magazine/<kind>/<slug>.md, read at build time.
//
// Kinds: spices, recipes, stories.
// Link anything with [[slug]] or [[slug|words]]: the link resolves to another entry or to a blend.
//
// Voice (Jacqueline, 3 Nov 2026): soul food with intention, never health food. Joy and gluttony stay.
// No health claims, no weight talk, no "good" or "bad" foods. Tradition is told as tradition.
// Recipes need Zahra's check before they go live (draft: true until then, if in doubt).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { SHELF, type Moment } from "./blends";

export type Kind = "spices" | "recipes" | "stories";
export const KINDS: Kind[] = ["stories", "spices", "recipes"];
export const KIND_ONE: Record<Kind, string> = { spices: "Spice", recipes: "Recipe", stories: "Story" };
export const KIND_MANY: Record<Kind, string> = { spices: "Spices", recipes: "Recipes", stories: "Stories" };
export const KIND_LINE: Record<Kind, string> = {
  stories: "The table, the hours, the people who cook. Read with something in the oven.",
  spices: "What is in the tins: where it grows, how it tastes, what Moroccan kitchens do with it.",
  recipes: "Food for second helpings. Nothing weighed twice, nothing counted.",
};

export interface Entry {
  kind: Kind;
  slug: string;
  title: string;
  dek: string;
  date: string;
  tint: string;
  arabic?: string;
  darija?: string;
  hour?: Moment;
  blends: string[];
  related: string[];
  serves?: string;
  time?: string;
  ingredients?: string[];
  steps?: string[];
  html: string;
}

const ROOT = path.join(process.cwd(), "content", "magazine");

function raw(): { kind: Kind; slug: string; data: Record<string, any>; body: string }[] {
  const out: { kind: Kind; slug: string; data: Record<string, any>; body: string }[] = [];
  for (const kind of KINDS) {
    const dir = path.join(ROOT, kind);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      if (data.draft) continue;
      out.push({ kind, slug: f.replace(/\.md$/, ""), data, body: content });
    }
  }
  return out;
}

function linkFor(slug: string, all: { kind: Kind; slug: string; data: Record<string, any> }[]): { href: string; title: string } | null {
  const e = all.find((x) => x.slug === slug);
  if (e) return { href: `/magazine/${e.kind}/${e.slug}`, title: String(e.data.short || e.data.title).toLowerCase() };
  const b = SHELF.find((x) => x.handle === slug);
  if (b) return { href: `/blends/${b.handle}`, title: b.name };
  return null;
}

function resolveLinks(body: string, all: ReturnType<typeof raw>): string {
  return body.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, slug: string, words?: string) => {
    const l = linkFor(slug, all);
    if (!l) return words || slug.replace(/-/g, " ");
    return `[${words || l.title}](${l.href})`;
  });
}

let cache: Entry[] | null = null;

export function allEntries(): Entry[] {
  if (cache) return cache;
  const all = raw();
  cache = all
    .map(({ kind, slug, data, body }) => ({
      kind,
      slug,
      title: String(data.title),
      dek: String(data.dek || ""),
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || ""),
      tint: String(data.tint || "#EBE5D9"),
      arabic: data.arabic,
      darija: data.darija,
      hour: data.hour,
      blends: data.blends || [],
      related: data.related || [],
      serves: data.serves,
      time: data.time,
      ingredients: data.ingredients,
      steps: (data.steps as string[] | undefined)?.map((s) => resolveLinks(s, all)),
      html: String(remark().use(remarkGfm).use(remarkHtml).processSync(resolveLinks(body, all))),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export const entriesOf = (kind: Kind) => allEntries().filter((e) => e.kind === kind);
export const entry = (kind: string, slug: string) => allEntries().find((e) => e.kind === kind && e.slug === slug);
export const entriesForBlend = (handle: string) => allEntries().filter((e) => e.blends.includes(handle));
export const relatedOf = (e: Entry) =>
  e.related.map((s) => allEntries().find((x) => x.slug === s)).filter((x): x is Entry => !!x);

/** Inline [[links]] inside a short string (recipe steps), as HTML. */
export function inlineHtml(s: string): string {
  return String(remark().use(remarkHtml).processSync(s)).replace(/^<p>|<\/p>\s*$/g, "");
}

export function fmtDate(iso: string) {
  const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [y, mo, d] = iso.split("-").map(Number);
  return y ? `${d} ${m[mo - 1]} ${y}` : "";
}

/** Ink for a tint: bone on dark colours, ink on light ones, always at full strength. */
export function inkFor(hex: string): string {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.42 ? "#F4F0E8" : "#1A1714";
}
