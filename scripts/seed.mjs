// One-off content migration: pushes the existing static content (src/content/site.ts)
// into Sanity as real, editable documents. Safe to re-run (uses createOrReplace).
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const sanityConfig = JSON.parse(
  readFileSync(path.join(process.env.HOME, ".config/sanity/config.json"), "utf-8"),
);
const token = sanityConfig.authToken;

const client = createClient({
  projectId: "u55tsnmg",
  dataset: "production",
  apiVersion: "2026-09-21",
  token,
  useCdn: false,
});

async function uploadImage(relativePath) {
  const filePath = path.join(root, "public", relativePath);
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  console.log("Uploading images…");
  const aboutImage = await uploadImage("images/about-illustration.png");
  const clientLogos = {
    "Kingsley Estates": await uploadImage("images/clients/kingsley-estates.png"),
    "Product Zone": await uploadImage("images/clients/product-zone.png"),
    LH: await uploadImage("images/clients/lh.png"),
    "Flame Corporate Clothing": await uploadImage("images/clients/flame.png"),
    Koala: await uploadImage("images/clients/koala.png"),
  };
  console.log("Images uploaded.");

  const docs = [
    { _id: "siteSettings", _type: "siteSettings", trustLabel: "Worked with" },
    {
      _id: "hero",
      _type: "hero",
      badge: "Taking on new projects for [Spring 2026]",
      heading: "Websites that make people stop scrolling.",
      body: "I design and build fast, good-looking websites for founders and small businesses who want more customers — not just a prettier homepage.",
    },
    {
      _id: "about",
      _type: "about",
      eyebrow: "About",
      statement:
        "I've spent the last [X] years designing and building websites for small businesses, founders and agencies who needed something that actually worked — not just looked nice in a mockup.",
      tags: [
        "UI / UX Design",
        "Front-end development",
        "E-commerce builds",
        "CMS & content sites",
        "Ongoing support",
      ],
      image: aboutImage,
    },
    {
      _id: "cta",
      _type: "cta",
      heading: "Got a project in mind? Let's build it.",
      body: "Usually replies within 24 hours. No obligation, just a chat about what you need.",
      email: "[youremail@example.com]",
    },
    {
      _id: "footer",
      _type: "footer",
      name: "Roy Sheppard",
      blurb:
        "Freelance web designer & developer based in [Your City], UK. Building sites for people who'd rather be running their business.",
      email: "[youremail@example.com]",
      phone: "[Your phone number]",
      social: [
        { _key: "linkedin", label: "LinkedIn", url: "#" },
        { _key: "instagram", label: "Instagram", url: "#" },
        { _key: "dribbble", label: "Dribbble", url: "#" },
      ],
    },

    {
      _id: "service-1",
      _type: "service",
      order: 1,
      title: "Web Design",
      description:
        "Custom, on-brand design — never a template. Built around how your customers actually decide to buy.",
      bullets: ["Brand-led visual design", "Mobile-first layouts", "Conversion-focused UX"],
    },
    {
      _id: "service-2",
      _type: "service",
      order: 2,
      title: "Development",
      description:
        "Fast, clean-coded builds that work properly on every screen — and don't fall over under real traffic.",
      bullets: ["Hand-built, no page-builder bloat", "Fast load times", "SEO fundamentals baked in"],
    },
    {
      _id: "service-3",
      _type: "service",
      order: 3,
      title: "Ongoing Support",
      description:
        "Sites need looking after. I keep yours updated, fast and running — so you can forget it's even there.",
      bullets: ["Monthly maintenance plans", "Content updates", "Direct line to me, always"],
    },

    {
      _id: "work-1",
      _type: "workItem",
      order: 1,
      name: "[Project Name]",
      meta: "[Industry] — brand site & booking system",
    },
    {
      _id: "work-2",
      _type: "workItem",
      order: 2,
      name: "[Project Name]",
      meta: "[Industry] — e-commerce rebuild",
    },
    {
      _id: "work-3",
      _type: "workItem",
      order: 3,
      name: "[Project Name]",
      meta: "[Industry] — landing page & funnel",
    },

    {
      _id: "testimonial-1",
      _type: "testimonial",
      order: 1,
      quote:
        "[Add a short quote about the result this client got — more bookings, more sales, less stress.]",
      name: "[Client Name]",
      company: "[Company]",
    },
    {
      _id: "testimonial-2",
      _type: "testimonial",
      order: 2,
      quote:
        "[Add another quote here — about how easy the process was, or how fast you turned it around.]",
      name: "[Client Name]",
      company: "[Company]",
    },

    {
      _id: "faq-1",
      _type: "faq",
      order: 1,
      question: "How much does a website cost?",
      answer: "It depends on scope — get in touch for a free, fixed-price quote. No surprises later.",
    },
    {
      _id: "faq-2",
      _type: "faq",
      order: 2,
      question: "How long does a project take?",
      answer:
        "Most sites launch in [X] weeks, depending on size and how quickly content comes together.",
    },
    {
      _id: "faq-3",
      _type: "faq",
      order: 3,
      question: "Do you offer support after launch?",
      answer: "Yes — monthly maintenance plans keep your site fast, secure and up to date.",
    },
    {
      _id: "faq-4",
      _type: "faq",
      order: 4,
      question: "Can you work with my existing brand?",
      answer: "Absolutely — send over your brand guidelines and I'll build the site around them.",
    },

    {
      _id: "trust-logo-1",
      _type: "trustLogo",
      order: 1,
      name: "Kingsley Estates",
      logo: clientLogos["Kingsley Estates"],
    },
    {
      _id: "trust-logo-2",
      _type: "trustLogo",
      order: 2,
      name: "Product Zone",
      logo: clientLogos["Product Zone"],
    },
    { _id: "trust-logo-3", _type: "trustLogo", order: 3, name: "LH", logo: clientLogos.LH },
    {
      _id: "trust-logo-4",
      _type: "trustLogo",
      order: 4,
      name: "Flame Corporate Clothing",
      logo: clientLogos["Flame Corporate Clothing"],
    },
    { _id: "trust-logo-5", _type: "trustLogo", order: 5, name: "Koala", logo: clientLogos.Koala },
  ];

  console.log(`Writing ${docs.length} documents…`);
  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
