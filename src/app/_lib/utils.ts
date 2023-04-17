import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number): Promise<void> {
  // Wait for the specified amount of time
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Render markdown to html
 * @param markdown
 * @returns
 */
export function renderMarkdown(markdown: string): string {
  return new Remarkable("full", {
    html: true,
    breaks: true,
    typographer: true,
  })
    .use(linkify)
    .render(markdown);
}
