/**
 * Content for the supporting service pages and privacy policy. Written fresh
 * for the new site — not reused from the old production site's copy,
 * pricing, process claims or named technologies. No pricing is published
 * anywhere; enquiries are directed to get in touch for a tailored quote.
 *
 * The `caseStudy` project facts and figures mirror the live "Recent work"
 * and "Kind words" content in Sanity (workItem/testimonial documents) as of
 * writing — if those are edited in Studio, check these stay in sync.
 */

type FocusArea = { title: string; description: string };
type Faq = { question: string; answer: string };
type CaseStudy = {
	eyebrow: string;
	name: string;
	meta: string;
	url: string;
	contribution: string[];
	quote: string;
	quoteName: string;
	quoteCompany: string;
};

export const webDesign = {
	title: 'Web Design in Watford | Roy Sheppard',
	description:
		'Freelance web design in Watford from Roy Sheppard — sites that look like your business, work properly on mobile, and give visitors a clear next step.',
	eyebrow: 'Web Design',
	heading: 'Web design that looks like your business, not a template',
	intro:
		"If your site could belong to any business in your industry, it isn't doing its job. I design every site from scratch around your business — how it looks, how people move through it, and what you want them to do next — rather than starting from a theme. I'm based in Watford and design for businesses there and further afield.",
	focusAreas: [
		{
			title: 'Built around your brand',
			description:
				"If you've already got a logo, colours and fonts, the site is designed to feel unmistakably yours. If you're starting from nothing, shaping that direction is part of the process, not a separate project.",
		},
		{
			title: 'Designed with your real content',
			description:
				'Pages are laid out around your actual text and photos, not placeholder copy, so nothing falls apart once the real content goes in.',
		},
		{
			title: 'A clear next step on every page',
			description:
				'Whether that’s calling, enquiring, booking or buying, every page is built around getting a visitor to take that step, not just look good.',
		},
		{
			title: 'Mobile designed first, not squeezed in',
			description:
				'Most visitors will find you on their phone before their laptop, so the mobile layout is designed properly from the start, not adjusted afterward to fit.',
		},
	] satisfies FocusArea[],
	caseStudy: {
		eyebrow: 'Recent work',
		name: 'Kingsley Estates',
		meta: 'Real estate — sales & lettings, Watford',
		url: 'https://www.kingsley-estates.co.uk/',
		contribution: [
			'Designed and built the site around buyers, sellers, landlords and tenants — each with a clearly different path through it.',
			'Brought valuations, listings and landlord/tenant information together into one consistent design rather than a bolt-on for each.',
			'Built in the accreditations, complaints procedure and contact routes that matter for trust in estate agency.',
		],
		quote:
			'Roy was exceptionally professional and efficient with building us a website for our new barbershop. He had a lot of his own very useful ideas which helped us gain a further reach to our audience. Would highly recommend !',
		quoteName: 'George Thomas',
		quoteCompany: 'Studio120',
	} satisfies CaseStudy,
	howItWorks:
		"Every design starts with a discovery chat about your business, your customers, and what you need the site to achieve. From there I design the key pages first and share them with you before anything gets built, so you're not seeing a finished site for the first time at launch — then we review it together before it goes live.",
	faqs: [
		{
			question: 'Do you design around branding I already have?',
			answer:
				"Yes — send over what you've got (logo, colours, fonts, brand guidelines if you have them) and I'll build the site to match. If you don't have that yet, we'll shape a simple visual direction together as part of the design stage.",
		},
		{
			question: "Will I see the design before it's built?",
			answer:
				"Yes — I design the key pages first and share them with you before any of it gets built, so you can give feedback early rather than only seeing a finished site.",
		},
		{
			question: 'Is the design mobile-first?',
			answer:
				'Yes — layouts are designed for mobile and desktop together from the start, since most visitors will find you on a phone before a laptop.',
		},
	] satisfies Faq[],
	related: [
		{ label: 'Web Development', href: '/web-development-watford' },
		{ label: 'E-Commerce', href: '/ecommerce-watford' },
	],
};

export const webDevelopment = {
	title: 'Web Development in Watford | Roy Sheppard',
	description:
		'Freelance web development in Watford from Roy Sheppard — hand-coded sites built around what your project needs, with content you can manage yourself.',
	eyebrow: 'Web Development',
	heading: 'Web development that keeps working after launch',
	intro:
		"A site that looks right isn't enough if it's slow, breaks on mobile, or you can't touch it without calling me every time. I hand-code every project — no page-builder plugins stacked on top of each other — so what you get is faster, more reliable, and built around what your project actually needs to do. I'm based in Watford and take on development work there and further afield.",
	focusAreas: [
		{
			title: 'Hand-built, not assembled',
			description:
				'No stacks of page-builder plugins — every site is coded properly, which makes it faster to load and easier to maintain over time.',
		},
		{
			title: 'Content you can manage yourself',
			description:
				"If you want to update pages, add content or swap images without coming back to me, that's set up as part of the build, with a proper editing interface — and I'll show you how to use it.",
		},
		{
			title: 'Performance, not an afterthought',
			description:
				'Fast loading is a requirement of the build, not something patched in later, because it affects both visitors and search rankings.',
		},
		{
			title: 'Built around what the project needs',
			description:
				'Forms, bookings, or whatever else the site needs to do — built in properly around your requirements rather than forced into a fixed template.',
		},
	] satisfies FocusArea[],
	caseStudy: {
		eyebrow: 'Recent work',
		name: 'LH Plumbing & Heating',
		meta: 'Home services — plumbing, heating & electrical, Harrow',
		url: 'https://www.lhplumbing-harrow.co.uk/',
		contribution: [
			'Designed and built the full site — service pages, an image gallery of past work, testimonials and a working contact form.',
			'Structured plumbing, gas, electrical and carpentry services so a long-established, multi-service business reads as one coherent site.',
			'Set it up so content — services, testimonials, gallery images — can be updated without touching code.',
		],
		quote:
			'Got Roy to create a website for my family owned company, could not be happier! He has done an amazing job and has been super helpful throughout the whole process. Would 100% recommend him!',
		quoteName: 'James Sumner',
		quoteCompany: 'LH Plumbing and Heating',
	} satisfies CaseStudy,
	howItWorks:
		"Once I understand what your project actually needs to do, I build around those requirements rather than forcing them into an off-the-shelf template. You'll see it come together in stages rather than all at once, with a proper review before it goes live — and I'm on hand afterwards to keep it running.",
	faqs: [
		{
			question: 'What do you build sites with?',
			answer:
				'Most sites are hand-coded rather than built on a page-builder, often paired with a headless CMS — the same approach behind this site. Exactly which setup depends on what your project needs to do, and I’ll recommend that once I understand it.',
		},
		{
			question: 'Can I update the content myself once it’s live?',
			answer:
				"That's up to you. I can hand the site over with an editing setup so you make changes yourself, or you can send me updates and I'll make them — plenty of clients do a mix of both.",
		},
		{
			question: 'Can you add custom functionality, or is it a standard brochure site?',
			answer:
				'Because sites are hand-built rather than assembled from a template, I can add functionality specific to your project — forms, integrations, bespoke page layouts — rather than working within what a page-builder allows.',
		},
	] satisfies Faq[],
	related: [
		{ label: 'Web Design', href: '/web-design-watford' },
		{ label: 'E-Commerce', href: '/ecommerce-watford' },
	],
};

export const ecommerce = {
	title: 'E-Commerce Web Development in Watford | Roy Sheppard',
	description:
		'Freelance e-commerce development from Roy Sheppard, based in Watford — online stores built around your products, on Shopify or a custom storefront.',
	eyebrow: 'E-Commerce',
	heading: 'Online stores built around what you sell, not a fixed platform',
	intro:
		"Whether you're launching a new shop or adding online sales to a site you already have, the right setup depends on what you sell and how — not a one-size-fits-all platform. Depending on your catalogue, that might mean building on Shopify or a fully custom storefront, like Product Zone, a custom headwear brand I designed and built from the ground up. I'm based in Watford and take on e-commerce projects there and further afield.",
	focusAreas: [
		{
			title: 'The right platform for your catalogue',
			description:
				"Sometimes Shopify is the better fit, sometimes a custom-built store makes more sense — I'll recommend the right approach once I understand what you're selling and how.",
		},
		{
			title: 'Product pages that do the selling',
			description:
				'Clear, well-structured product pages so customers know exactly what they’re buying before they reach checkout.',
		},
		{
			title: 'Secure payments, properly integrated',
			description:
				'Payment providers like Stripe and PayPal set up so customers can pay with confidence, not bolted on as an afterthought.',
		},
		{
			title: 'Built to grow with your catalogue',
			description:
				'Whether you start with five products or five hundred, the site is structured so adding more doesn’t mean rebuilding it.',
		},
	] satisfies FocusArea[],
	caseStudy: {
		eyebrow: 'Recent work',
		name: 'Product Zone',
		meta: 'E-commerce — custom headwear & merch',
		url: 'https://productzone.co.uk/',
		contribution: [
			'Designed and built a custom storefront, rather than on an off-the-shelf e-commerce platform, to support fully bespoke, made-to-order headwear alongside ready-stock products.',
			'Structured product and category pages to handle both custom orders and standard catalogue items in one coherent shop.',
			'Set up accounts and search so the catalogue can keep growing without the site needing to be rebuilt.',
		],
		quote: 'Great job, but more than that Roy has been fantastic at communicating. Top guy',
		quoteName: 'Paul Franklin',
		quoteCompany: 'Koala B2B',
	} satisfies CaseStudy,
	howItWorks:
		"Every online shop is different, so I start by talking through what you sell, who you're selling to, and how you want the buying experience to work — then build around that, rather than forcing your products into a fixed platform.",
	faqs: [
		{
			question: 'Do you build on Shopify, or something custom?',
			answer:
				'It depends on your catalogue and how you want to run the shop. Sometimes Shopify is the better fit; sometimes a custom-built storefront makes more sense, like Product Zone. I’ll recommend the right approach once I understand what you’re selling.',
		},
		{
			question: 'Can you set up payments for me?',
			answer: 'Yes — I integrate payment providers like Stripe or PayPal so customers can pay securely at checkout.',
		},
		{
			question: 'Can you add online sales to a site I already have?',
			answer:
				"Yes — plenty of e-commerce projects are about adding online sales to an existing site rather than starting from nothing. I'll look at what you've got and build the shop in around it.",
		},
	] satisfies Faq[],
	related: [
		{ label: 'Web Design', href: '/web-design-watford' },
		{ label: 'Web Development', href: '/web-development-watford' },
	],
};

export type PolicySection = {
	heading: string;
	paragraphs?: string[];
	list?: string[];
};

const privacyPolicySections: PolicySection[] = [
		{
			heading: 'Who this policy covers',
			paragraphs: [
				'This policy explains how roysheppard.digital ("this website"), operated by Roy Sheppard, handles information when you visit it. It applies to visitors browsing the public website — it does not cover Sanity Studio, the separate content editing tool used to manage this site’s content.',
			],
		},
		{
			heading: 'Information collected through the website itself',
			paragraphs: [
				'The contact form at /contact collects your name, email address, company or organisation (optional), and the project details you enter. There is no field for pricing or budget information.',
				'Submitting the form does not store your information in a database on this website. It is sent as an email, via Resend (a third-party email delivery service — see ‘Delivery provider’ below), to Roy Sheppard’s inbox, where it’s kept as an ordinary email for as long as any other business correspondence.',
				'The form also uses standard anti-spam checks (a hidden field, and a minimum time-to-submit check) to filter out automated submissions before they’re sent. Genuine submissions are not affected by this.',
				'If you get in touch by email or phone directly instead, using the details in the footer, that’s handled as an ordinary email or phone conversation, not stored in any system by this website.',
			],
		},
		{
			heading: 'Delivery provider',
			paragraphs: [
				'Contact form submissions are relayed using Resend (resend.com), a third-party transactional email service. Under Resend’s Data Processing Agreement, Resend acts as a data processor for this message content — it processes it strictly to deliver the email on Roy Sheppard’s behalf, not for its own purposes.',
				'Resend’s infrastructure is US-based (it uses providers including Amazon Web Services, also US-based, to send and host email). Because this involves transferring personal data out of the UK, Resend’s DPA specifies this is done under Standard Contractual Clauses (the EU SCCs plus the UK Addendum) — the standard legal mechanism for that kind of international transfer.',
				'Resend’s DPA commits to deleting customer account data within 90 days of an account being closed. Published documentation doesn’t state a specific figure for how long an individual message’s content or delivery log is kept in Resend’s dashboard while the account remains active day-to-day — if that detail matters, it’s worth confirming directly with Resend or in the account’s own settings.',
			],
		},
		{
			heading: 'Analytics and cookies',
			paragraphs: [
				'This website loads Google Tag Manager, a tool that can be configured to load analytics or advertising tags. Depending on how that’s configured, it may set cookies or collect technical information such as your IP address, browser and device details, and the pages you visit.',
				'A cookie banner asks for your consent before any of that happens. By default, analytics and advertising storage are set to denied — nothing beyond what’s strictly necessary to run the site is set until you actively choose ‘Accept’. You can change your choice at any time using ‘Cookie settings’ in the footer.',
				'This covers Google’s own tags automatically. Any other, non-Google tag configured inside Google Tag Manager needs to be individually set up to respect this same consent signal — that’s configured in the Tag Manager dashboard, not something visible from this website’s code, so it hasn’t been independently verified end to end.',
			],
		},
		{
			heading: 'Fonts and other assets',
			paragraphs: [
				'This website’s typefaces are bundled and served from this website directly rather than loaded from Google’s font service at run time, so visiting this site doesn’t send a request to Google Fonts. Images are served from Sanity, the content management platform used to run this site.',
			],
		},
		{
			heading: 'Sharing your information',
			paragraphs: [
				'This website doesn’t sell or share personal information with third parties for their own marketing purposes. Where information passes through a service provider — Resend to deliver contact form submissions, Google Tag Manager for tagging, or Sanity for hosting site content — it’s only to the extent needed to run the site.',
			],
		},
		{
			heading: 'Your rights',
			paragraphs: [
				'If you’re in the UK or EU, you have rights over your personal data under UK GDPR, including the right to ask what information is held about you, to have it corrected or deleted, and to object to how it’s used. To exercise any of these, or if you have a question about this policy, email info@roysheppard.digital. You can also complain to the Information Commissioner’s Office (ico.org.uk) if you’re unhappy with how a request is handled.',
			],
		},
		{
			heading: 'Changes to this policy',
			paragraphs: [
				'This policy may be updated as the website changes — for example, if the analytics setup changes or a new feature is added. The date at the top shows when it was last revised.',
			],
		},
];

export const privacyPolicy = {
	title: 'Privacy Policy | Roy Sheppard',
	description: 'How Roy Sheppard handles data on this website — what is and isn’t collected, and how to get in touch about it.',
	heading: 'Privacy Policy',
	lastUpdated: '22 September 2026',
	sections: privacyPolicySections,
};
