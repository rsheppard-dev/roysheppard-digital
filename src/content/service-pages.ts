/**
 * Privacy policy content. The service pages (web design, web development,
 * e-commerce) now live in Sanity as `servicePage` documents.
 */

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
