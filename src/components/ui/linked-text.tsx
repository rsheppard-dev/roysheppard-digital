import { Fragment } from "react";
import Link from "next/link";

/** `[label](/path)`: the link syntax editors can use inside FAQ answers in Studio. */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
/** Site paths, https links, email and phone only. Anything else shows as plain text. */
const SAFE_HREF = /^(\/(?!\/)|https:\/\/|mailto:|tel:)/;

const linkClass =
  "font-semibold text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent-text";

/** Plain text with any `[label](/path)` links turned into real links. */
export function LinkedText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));

    if (!SAFE_HREF.test(href)) {
      nodes.push(label);
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={start} href={href} className={linkClass}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={start} href={href} className={linkClass} {...(href.startsWith("https:") ? { rel: "noopener" } : {})}>
          {label}
        </a>,
      );
    }
    last = start + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  );
}

/** The same text without the link syntax, for structured data that must match what a reader sees. */
export function stripLinks(text: string) {
  return text.replace(LINK, "$1");
}
