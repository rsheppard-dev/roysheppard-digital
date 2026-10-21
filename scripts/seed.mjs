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
        "Website design",
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
      bullets: ["A look that matches your business", "Looks right on phones first", "Easy for customers to find what they need"],
    },
    {
      _id: "service-2",
      _type: "service",
      order: 2,
      title: "Development",
      description:
        "Custom-built websites and functionality, tailored to how your business works and easy to look after once they are live.",
      bullets: ["Bookings, accounts and bespoke tools", "Content you can edit yourself", "Support after launch"],
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
