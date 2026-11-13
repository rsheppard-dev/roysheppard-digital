import Image from 'next/image';
import { about as fallbackAbout } from '@/content/site';
import { Tag } from '@/components/ui/tag';
import { AboutIllustration } from '@/components/sections/about-illustration';
import { sanityFetch } from '@/sanity/lib/live';
import { aboutQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

/** Fallback links for badges that come without one (old plain tags or the built-in list). */
const TAG_HREFS: Record<string, string> = {
	'Bespoke web design': '/web-design-watford',
	'Custom web development': '/web-development-watford',
	'E-commerce websites': '/ecommerce-watford',
	'Easy to update yourself': '/services',
	'SEO built in': '/services',
	'Support after launch': '/hosting-and-care',
};

export async function About() {
	const { data } = await sanityFetch({ query: aboutQuery });
	const about = data ?? null;

	const statement = about?.statement || fallbackAbout.statement;
	// Badges set in the Studio carry their own link. Old plain tags, or the built-in fallback, take their link from TAG_HREFS.
	const studioBadges = (about?.badges ?? []).flatMap(badge =>
		badge.label
			? [{ key: badge._key, label: badge.label, href: badge.href || undefined }]
			: [],
	);
	const plainTags =
		about?.tags && about.tags.length > 0 ? about.tags : fallbackAbout.tags;
	const badges =
		studioBadges.length > 0
			? studioBadges
			: plainTags.map(tag => ({ key: tag, label: tag, href: TAG_HREFS[tag] }));

	const imageWidth = about?.imageDimensions?.width ?? 800;
	const imageHeight = about?.imageDimensions?.height ?? 1602;
	const imageSrc = about?.image?.asset
		? urlFor(about.image)
				.width(Math.min(imageWidth, 800))
				.fit('max')
				.auto('format')
				.url()
		: null;

	return (
		<div
			id='about'
			className='flex flex-col items-center gap-10 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:flex-row lg:gap-16 lg:px-35 lg:py-25'
		>
			<div className='flex flex-1 flex-col gap-5 lg:gap-6'>
				<h2 className='sr-only'>About</h2>
				<p className='max-w-145 text-xl font-medium leading-relaxed lg:text-[28px]'>
					{statement}
				</p>
				<ul className='mt-1 flex flex-wrap gap-2 sm:gap-2.5'>
					{badges.map(badge => (
						<Tag key={badge.key} href={badge.href}>
							{badge.label}
						</Tag>
					))}
				</ul>
			</div>
			<div className='flex w-full max-w-45 shrink-0 items-center justify-center lg:w-60 lg:max-w-60'>
				{imageSrc ? (
					<Image
						src={imageSrc}
						alt='Illustration of Roy Sheppard'
						width={imageWidth}
						height={imageHeight}
						sizes='(min-width: 1024px) 240px, 180px'
						style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
						className='h-auto w-full'
					/>
				) : (
					<AboutIllustration />
				)}
			</div>
		</div>
	);
}
