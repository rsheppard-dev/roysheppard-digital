/** The service pages, shared by the nav dropdown, the services page and the home page cards. */
export const serviceLinks = [
	{
		title: 'Web Design',
		href: '/web-design-watford',
		summary: 'Custom, on-brand design built around how your customers decide.',
		fit: "Good for you if your site looks dated, or doesn't feel like your business.",
		image: 'brand',
	},
	{
		title: 'Web Development',
		href: '/web-development-watford',
		summary: 'Bookings, accounts and bespoke tools built around your business.',
		fit: "Good for you if you need it to do more, like bookings, customer accounts or a quote calculator.",
		image: 'requirements',
	},
	{
		title: 'E-Commerce',
		href: '/ecommerce-watford',
		summary: 'Online stores that present products clearly and make buying simple.',
		fit: 'Good for you if you want to start selling your products online.',
		image: 'product-pages',
	},
];

export const nav: {
	label: string;
	href: string;
	highlight?: boolean;
	/** Show the service pages in a dropdown under this item. */
	menu?: boolean;
}[] = [
	{ label: 'Work', href: '/work' },
	{ label: 'Services', href: '/services', menu: true },
	{ label: 'About', href: '/#about' },
	{ label: 'Free review', href: '/free-website-review', highlight: true },
];

export const hero = {
	badge: '',
	heading: 'Freelance web designer & developer in Watford',
	tagline: 'Bespoke websites built around how your business works.',
	body: "I'm Roy, a freelance web designer and developer based in Watford. I design and build fast, thoughtful websites that help businesses and organisations achieve more online.",
};

export const services = [
	{
		number: '01',
		title: 'Web Design',
		description:
			'Custom, on-brand design, never a template. Built around how your customers decide to buy.',
		bullets: [
			'A look that matches your business',
			'Looks right on phones first',
			'Easy for customers to find what they need',
		],
	},
	{
		number: '02',
		title: 'Web Development',
		description:
			'Custom-built websites and functionality, tailored to how your business works and easy to look after once they are live.',
		bullets: [
			'Bookings, customer accounts and custom tools',
			'Edit your own content, no developer needed',
			"Looked after once it's live",
		],
	},
	{
		number: '03',
		title: 'E-Commerce',
		description:
			'Online stores built to present your products clearly and make buying straightforward, not a bolted-on afterthought.',
		bullets: [
			'Clear product pages',
			'Simple, secure checkout',
			'Easy to add and update products yourself',
		],
	},
];

export const workItems = [
	{ name: '[Project Name]', meta: '[Industry]: brand site & booking system' },
	{ name: '[Project Name]', meta: '[Industry]: e-commerce rebuild' },
	{ name: '[Project Name]', meta: '[Industry]: landing page & funnel' },
];

export const about = {
	eyebrow: 'About',
	statement:
		"I'm Roy. Working from Watford, I've spent the last 6 years designing and building websites for businesses of all sizes, from new start-ups to long-established family firms, who needed something that actually worked, not just looked nice in a mockup.",
	tags: [
		'Bespoke web design',
		'Custom web development',
		'E-commerce websites',
		'Easy to update yourself',
		'SEO built in',
		'Support after launch',
	],
};

export const testimonials = [
	{
		quote:
			'[Add a short quote about the result this client got: more bookings, more sales, less stress.]',
		name: '[Client Name]',
		company: '[Company]',
	},
	{
		quote:
			'[Add another quote here about how easy the process was, or how fast you turned it around.]',
		name: '[Client Name]',
		company: '[Company]',
	},
];

export const faqs = [
	{
		question: 'How much does a website cost?',
		answer:
			"Every project is different. Get in touch with what you have in mind, and I'll put together a tailored quote based on your goals and requirements.",
	},
	{
		question: 'How long does a project take?',
		answer:
			"It depends on the size and scope of the project, and how quickly content and feedback come together. I'll give you a realistic timeline once we've talked through what you need.",
	},
	{
		question: 'Do you offer support after launch?',
		answer:
			'Yes. Ongoing support is available to help keep your site fast, secure and up to date after launch.',
	},
	{
		question: 'Can you work with my existing brand?',
		answer:
			"Absolutely. Send over your brand guidelines and I'll build the site around them.",
	},
];

export const cta = {
	heading: "Got a project in mind? Let's build it.",
	body: 'I usually reply within 24 hours. No obligation, just a chat about what you need.',
	email: 'info@roysheppard.digital',
};

export const footer = {
	name: 'Roy Sheppard',
	blurb:
		"Freelance web designer & developer based in Watford, UK. Building sites for people who'd rather be running their business.",
	email: 'info@roysheppard.digital',
	phone: '07883066944',
	social: [
		{ label: 'Facebook', url: 'https://www.facebook.com/roysheppard.digital' },
		{
			label: 'Instagram',
			url: 'https://www.instagram.com/roysheppard.digital',
		},
		{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/roy-sheppard' },
		{ label: 'Twitter', url: 'https://x.com/rsheppard_dev' },
	],
};
