/**
 * Content for the supporting service pages and privacy policy. Written fresh
 * for the new site — not reused from the old production site's copy,
 * pricing, process claims or named technologies. No pricing is published
 * anywhere; enquiries are directed to get in touch for a tailored quote.
 *
 * The `caseStudy` project facts and figures mirror the live "Client work"
 * and "Kind words" content in Sanity (workItem/testimonial documents) as of
 * writing — if those are edited in Studio, check these stay in sync.
 */

type FocusArea = { title: string; description: string };
type Capability = { title: string; description: string; benefit: string };
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
	/** Last time this page's copy was edited in code. Update when you change it: the sitemap reports it. */
	lastUpdated: '2026-09-30',
	title: 'Web Design in Watford | Website Designer | Roy Sheppard',
	description:
		'Freelance web design in Watford from Roy Sheppard: sites that look like your business, work properly on mobile, and give visitors a clear next step.',
	eyebrow: 'Web Design',
	heading: 'Web design in Watford that looks like your business, not a template',
	intro:
		"If your site could belong to any business in your industry, it isn't doing its job. I design every site around your business (how it looks, how people move through it, and what you want them to do next) rather than starting from a theme. I'm based in Watford and design for businesses there and further afield.",
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
		eyebrow: 'Showcase',
		name: 'LH Plumbing & Heating',
		meta: 'Home services: plumbing, heating & electrical, Harrow',
		url: 'https://www.lhplumbing-harrow.co.uk/',
		contribution: [
			'Designed the full site around a long-established family business, so it looks and feels like them rather than a template.',
			'Structured plumbing, gas, electrical and carpentry services so a multi-service business reads as one coherent site.',
			'Added an image gallery of past work, testimonials and a clear contact route on every page.',
		],
		quote:
			'Got Roy to create a website for my family owned company, could not be happier! He has done an amazing job and has been super helpful throughout the whole process. Would 100% recommend him!',
		quoteName: 'James Sumner',
		quoteCompany: 'LH Plumbing and Heating',
	} satisfies CaseStudy,
	process: [
		{
			title: 'A discovery chat',
			description:
				'We talk through your business, your customers, and what you need the site to achieve.',
		},
		{
			title: 'Key pages designed first',
			description:
				"I design the key pages and share them with you before anything gets built, so you're not seeing a finished site for the first time at launch.",
		},
		{
			title: 'Reviewed together, then live',
			description: 'We go through the finished site together before it goes live.',
		},
	] satisfies FocusArea[],
	faqs: [
		{
			question: 'Do you design around branding I already have?',
			answer:
				"Yes. Send over what you've got (logo, colours, fonts, brand guidelines if you have them) and I'll build the site to match. If you don't have that yet, we'll shape a simple visual direction together as part of the design stage.",
		},
		{
			question: "Will I see the design before it's built?",
			answer:
				"Yes. I design the key pages first and share them with you before any of it gets built, so you can give feedback early rather than only seeing a finished site.",
		},
		{
			question: 'Is the design mobile-first?',
			answer:
				'Yes. Layouts are designed for mobile and desktop together from the start, since most visitors will find you on a phone before a laptop.',
		},
	] satisfies Faq[],
	related: [
		{ label: 'Web Development', href: '/web-development-watford' },
		{ label: 'E-Commerce', href: '/ecommerce-watford' },
	],
};

export const webDevelopment = {
	/** Last time this page's copy was edited in code. Update when you change it: the sitemap reports it. */
	lastUpdated: '2026-10-11',
	title: 'Web Developer in Watford | Custom Web Development | Roy Sheppard',
	description:
		'Freelance web developer in Watford building custom websites: booking systems, customer accounts and bespoke functionality built around your business.',
	eyebrow: 'Web Development',
	heading: 'Web development in Watford for websites that do more than look good',
	intro:
		"I build websites that take bookings, give customers their own accounts and take repetitive admin off your plate. Every project is custom-built around how your business actually works, so you get functionality that fits, not a template that almost does. I'm based in Watford and take on development work there and further afield.",
	capabilities: [
		{
			title: 'Booking and appointment systems',
			description:
				'Customers choose a date and time on your site, and the booking lands in your diary with a confirmation sent automatically.',
			benefit: 'Fewer calls and back-and-forth messages, and less chance of double bookings.',
		},
		{
			title: 'Customer accounts and portals',
			description:
				'A private area where customers log in to see their bookings, orders, documents or account details.',
			benefit: 'Customers get answers without having to ask, so you spend less time on status emails and calls.',
		},
		{
			title: 'Quote calculators and tailored enquiry forms',
			description:
				'Forms that ask the right questions for your service, with a calculator that gives an instant estimate where it suits.',
			benefit: 'You receive complete, useful enquiries, and visitors get an answer without waiting.',
		},
		{
			title: 'Connections with your existing software',
			description:
				'Link the website to the tools you already use, such as a CRM, accounting software or an email service.',
			benefit: 'Information is entered once, instead of being copied between systems by hand.',
		},
		{
			title: 'Tools and workflows built around your business',
			description:
				'If a process eats up hours or lives in spreadsheets, it can often become a purpose-built tool, such as an internal dashboard or an approval workflow.',
			benefit: 'Repetitive admin gets quicker and less error-prone, and your team works from one place.',
		},
	] satisfies Capability[],
	focusAreas: [
		{
			title: 'Built around your requirements',
			description:
				"I start with what your business needs the site to do, then build to meet those requirements, so you're not fitting your process around what a template allows.",
		},
		{
			title: 'Content you can manage yourself',
			description:
				"If you want to update pages, add content or swap images without coming back to me, that's set up as part of the build, with a proper editing interface, and I'll show you how to use it.",
		},
		{
			title: 'Performance, not an afterthought',
			description:
				'Fast loading is a requirement of the build, not something patched in later, because it affects both visitors and search rankings.',
		},
		{
			title: 'Looked after once it’s live',
			description:
				"I'm on hand after launch to keep everything running, so the features you've paid for keep working as your business changes.",
		},
	] satisfies FocusArea[],
	caseStudy: {
		eyebrow: 'Showcase',
		name: 'Kingsley Estates',
		meta: 'Real estate: sales & lettings, Watford',
		url: 'https://www.kingsley-estates.co.uk/',
		contribution: [
			'Designed and built the site around buyers, sellers, landlords and tenants, each with a clearly different path through it.',
			'Brought valuations, listings and landlord/tenant information together into one consistent, custom-built system rather than a bolt-on for each.',
			'Built in the accreditations, complaints procedure and contact routes that matter for trust in estate agency, with ongoing aftercare.',
		],
		quote:
			'Roy developed my website, and I couldn’t be happier with both the look and functionality of it, as well as the excellent aftercare. I would highly recommend Roy and his company and will definitely be using them again going forward. A fantastic service from start to finish!',
		quoteName: 'Jack Kingsley',
		quoteCompany: 'Kingsley Estates',
	} satisfies CaseStudy,
	processIntro:
		"Start with a problem or an idea. You don't need a technical specification, and you don't need to know how it should be built.",
	process: [
		{
			title: 'Tell me the problem',
			description:
				'We talk through how your business works and what you want the site to do, and I turn that into clear requirements.',
		},
		{
			title: 'Agree the approach',
			description:
				"I recommend how to build it, whether that's an existing service, custom development or a mix, so you know what you're getting before I start.",
		},
		{
			title: 'Review it in stages',
			description:
				'You see it come together as it goes and can react to it, instead of waiting for one big reveal at the end.',
		},
		{
			title: 'Launch and aftercare',
			description:
				"There's a proper review before it goes live, and I'm on hand afterwards to keep it running.",
		},
	] satisfies FocusArea[],
	faqs: [
		{
			question: 'Can you build booking systems, customer accounts or other custom functionality?',
			answer:
				"Yes, that's a big part of what I do. Because each site is custom-built around your business rather than fitted into a template, I can build booking and appointment systems, customer accounts and portals, quote calculators, tailored enquiry forms and connections to software you already use. If you have a process that is repetitive or awkward, it's worth asking whether the website can handle it.",
		},
		{
			question: 'Do I need to know exactly how my system should work?',
			answer:
				"No. Most people start with a problem, such as too many phone calls to arrange bookings, not a finished plan. We talk it through and I work out what's needed. Depending on your needs, the answer might be an existing service connected to your site, something custom-built, or a combination of the two. I'll explain the options and recommend what fits, rather than building custom where an existing service already does the job well.",
		},
		{
			question: 'What do you build sites with?',
			answer:
				'It depends on what your project needs to do. Many projects pair a custom-built site with a headless CMS, the same approach behind this site, so content is easy to edit. I’ll recommend the right setup once I understand what you need.',
		},
		{
			question: 'Can I update the content myself once it’s live?',
			answer:
				"That's up to you. I can hand the site over with an editing setup so you make changes yourself, or you can send me updates and I'll make them. Plenty of clients do a mix of both.",
		},
	] satisfies Faq[],
	related: [
		{ label: 'Web Design', href: '/web-design-watford' },
		{ label: 'E-Commerce', href: '/ecommerce-watford' },
	],
};

export const ecommerce = {
	/** Last time this page's copy was edited in code. Update when you change it: the sitemap reports it. */
	lastUpdated: '2026-10-02',
	title: 'E-Commerce Web Development in Watford | Roy Sheppard',
	description:
		'Freelance e-commerce development from Roy Sheppard, based in Watford: online stores built around your products, on Shopify or a custom storefront.',
	eyebrow: 'E-Commerce',
	heading: 'Online stores built around what you sell, not a fixed platform',
	intro:
		"Whether you're launching a new shop or adding online sales to a site you already have, the right setup depends on what you sell and how, not a one-size-fits-all platform. Depending on your catalogue, that might mean building on Shopify or a fully custom build, and not every product business needs a checkout at all. For Product Zone, a Watford-based custom headwear supplier, I designed and built a bespoke B2B catalogue website around how the business sells. I'm based in Watford and take on e-commerce projects there and further afield.",
	focusAreas: [
		{
			title: 'The right platform for your catalogue',
			description:
				"Sometimes Shopify is the better fit, sometimes a custom-built store makes more sense. I'll recommend the right approach once I understand what you're selling and how.",
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
		eyebrow: 'Showcase',
		name: 'Product Zone',
		meta: 'B2B catalogue: custom headwear',
		url: 'https://productzone.co.uk/',
		contribution: [
			"Designed and built Product Zone's first website: a bespoke B2B catalogue rather than an off-the-shelf shop, presenting its fully bespoke, made-to-order service alongside its plain stock range.",
			'Structured the catalogue with product search, filters for product type, colour and size, and a dedicated page for every product.',
			'Added client accounts designed to give approved clients catalogue pricing once signed in, with products managed in Prismic so the range can grow without a rebuild.',
		],
		quote: 'Great job, but more than that Roy has been fantastic at communicating. Top guy',
		quoteName: 'Paul Franklin',
		quoteCompany: 'Koala B2B',
	} satisfies CaseStudy,
	process: [
		{
			title: 'What you sell, and how',
			description:
				"Every online shop is different, so I start by talking through what you sell, who you're selling to, and how you want the buying experience to work.",
		},
		{
			title: 'The right setup for your catalogue',
			description:
				'That might mean building on Shopify or a fully custom build, and not every product business needs a checkout at all.',
		},
		{
			title: 'Built around your products',
			description: 'Then I build around that, rather than forcing your products into a fixed platform.',
		},
	] satisfies FocusArea[],
	faqs: [
		{
			question: 'Do you build on Shopify, or something custom?',
			answer:
				'It depends on your catalogue and how you want to run the shop. Sometimes Shopify is the better fit; sometimes a custom build makes more sense. And some product businesses don’t need online checkout at all, like Product Zone, where a custom B2B catalogue was the right answer. I’ll recommend the right approach once I understand what you’re selling.',
		},
		{
			question: 'Can you set up payments for me?',
			answer: 'Yes. I integrate payment providers like Stripe or PayPal so customers can pay securely at checkout.',
		},
		{
			question: 'Can you add online sales to a site I already have?',
			answer:
				"Yes. Plenty of e-commerce projects are about adding online sales to an existing site rather than starting from nothing. I'll look at what you've got and build the shop in around it.",
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
				'This policy explains how roysheppard.digital ("this website"), operated by Roy Sheppard, handles information when you visit it. It applies to visitors browsing the public website. It does not cover Sanity Studio, the separate content editing tool used to manage this site’s content.',
			],
		},
		{
			heading: 'Information collected through the website itself',
			paragraphs: [
				'The contact form at /contact collects your name, email address, company or organisation (optional), and the project details you enter. There is no field for pricing or budget information.',
				'Submitting the form does not store your information in a database on this website. It is sent as an email, via Resend (a third-party email delivery service; see ‘Delivery provider’ below), to Roy Sheppard’s inbox, where it’s kept as an ordinary email for as long as any other business correspondence.',
				'The form also runs automated checks to filter out spam before anything is sent. These don’t collect any extra information about you.',
				'If you’ve accepted cookies, submitting the form also tells Meta that an enquiry was made. See ‘Advertising measurement (Meta)’ below.',
				'If you get in touch by email or phone directly instead, using the details in the footer, that’s handled as an ordinary email or phone conversation, not stored in any system by this website.',
			],
		},
		{
			heading: 'Delivery provider',
			paragraphs: [
				'Contact form submissions are relayed using Resend (resend.com), a third-party transactional email service. Under Resend’s Data Processing Agreement, Resend acts as a data processor for this message content. It processes it strictly to deliver the email on Roy Sheppard’s behalf, not for its own purposes.',
				'Resend’s infrastructure is US-based (it uses providers including Amazon Web Services, also US-based, to send and host email). Because this involves transferring personal data out of the UK, Resend’s DPA specifies this is done under Standard Contractual Clauses (the EU SCCs plus the UK Addendum), the standard legal mechanism for that kind of international transfer.',
				'Resend’s DPA commits to deleting customer account data within 90 days of an account being closed.',
			],
		},
		{
			heading: 'Hosting',
			paragraphs: [
				'This website is hosted by Railway (railway.com). Like any web host, Railway processes technical information about each request (such as your IP address and browser details) to deliver the site and protect it from abuse.',
			],
		},
		{
			heading: 'Analytics and cookies',
			paragraphs: [
				'This website uses Google Tag Manager to load two tools: Google Analytics 4, which shows how visitors find and use the site, and the Meta Pixel, which measures the results of adverts on Facebook and Instagram. These may set cookies and collect technical information such as your IP address, browser and device details, and the pages you visit.',
				'Google Tag Manager and Google Analytics are loaded through this website’s own address (roysheppard.digital/tg/) rather than directly from Google’s domains. This doesn’t change what’s collected or who receives it. The information still goes to Google, and your cookie choice still applies.',
				'A cookie banner asks for your consent first. Until you choose ‘Accept’, analytics and advertising cookies are not set. You can change your choice at any time using ‘Cookie settings’ in the footer.',
			],
		},
		{
			heading: 'Advertising measurement (Meta)',
			paragraphs: [
				'If you’ve accepted cookies and send an enquiry through the contact form, this website tells Meta (the company behind Facebook and Instagram) that an enquiry was made, so adverts can be measured and improved. This is sent directly from this website’s server, and includes your email address and name in hashed form (scrambled so they can’t be read, only matched against existing Meta accounts), your IP address, browser details, and Meta’s own cookie identifiers if present. The content of your message is never sent to Meta.',
				'If you haven’t accepted cookies, or you’ve rejected them, nothing is sent to Meta when you submit the form.',
				'Meta processes this information under its own privacy policy (facebook.com/privacy/policy), and may transfer it outside the UK.',
			],
		},
		{
			heading: 'Why your information is used',
			paragraphs: [
				'Replying to an enquiry you’ve sent is based on legitimate interests: you’ve asked to be contacted, and your details are used only to respond. Analytics, the Meta Pixel and the Meta enquiry measurement described above are based on your consent, which you can withdraw at any time using ‘Cookie settings’ in the footer.',
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
				'This website doesn’t sell personal information. Service providers only receive what they need to run the site: Railway to host it, Resend to deliver contact form submissions, and Sanity to serve site content. With your consent, Google receives analytics data and Meta receives advertising measurement data, as described above.',
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
				'This policy may be updated as the website changes, for example if the analytics setup changes or a new feature is added. The date at the top shows when it was last revised.',
			],
		},
];

export const privacyPolicy = {
	title: 'Privacy Policy | Roy Sheppard',
	description: 'How Roy Sheppard handles data on this website: what is and isn’t collected, and how to get in touch about it.',
	heading: 'Privacy Policy',
	lastUpdated: '30 September 2026',
	sections: privacyPolicySections,
};
