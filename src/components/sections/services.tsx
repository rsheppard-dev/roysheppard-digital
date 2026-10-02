import Link from 'next/link';
import { services as fallbackServices } from '@/content/site';
import { sanityFetch } from '@/sanity/lib/live';
import { servicesQuery } from '@/sanity/lib/queries';

const SERVICE_PAGE_HREFS: Record<string, string> = {
	'Web Design': '/web-design-watford',
	'Web Development': '/web-development-watford',
	'E-Commerce': '/ecommerce-watford',
};

/** Slight per-card tilt and the tape-corner offset it needs, so the pins land on the paper, not floating off it. */
const CARD_TILTS = [
	{ rotate: '-rotate-2', tape: 'rotate-[-5deg]' },
	{ rotate: 'rotate-1', tape: 'rotate-[4deg]', lift: 'lg:mt-3.5' },
	{ rotate: '-rotate-1', tape: 'rotate-[-3deg]' },
];

export async function Services() {
	const { data } = await sanityFetch({ query: servicesQuery });
	const services = data && data.length > 0 ? data : fallbackServices;

	return (
		<div
			id='services'
			className='flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25'
		>
			<div className='flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
				<h2 className='text-3xl font-semibold lg:text-[42px]'>What I do</h2>
				<p className='max-w-95 text-sm text-muted lg:text-right lg:text-base'>
					Everything you need to go from idea to a site that actually earns its
					keep.
				</p>
			</div>
			<div className='flex flex-col gap-8 pt-2 lg:flex-row lg:gap-10 lg:pt-3'>
				{services.map((service, index) => {
					const pageHref = service.title
						? SERVICE_PAGE_HREFS[service.title]
						: undefined;
					const tilt = CARD_TILTS[index % CARD_TILTS.length];
					return (
						<div
							key={service.title}
							className={`relative flex flex-1 flex-col gap-4 rounded-md border border-border-tan bg-paper p-7 shadow-[0_14px_26px_-16px_rgba(23,23,26,0.3)] transition-shadow duration-150 hover:shadow-[0_20px_32px_-16px_rgba(23,23,26,0.4)] ${tilt.rotate} ${tilt.lift ?? ''}`}
						>
							<span
								aria-hidden='true'
								className={`absolute -top-2.5 left-6 h-4.5 w-11 border border-[#f3d9cd] bg-accent-soft/90 ${tilt.tape}`}
							/>
							<span className='font-mono text-sm font-semibold text-accent-text'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className='text-xl font-bold lg:text-[22px]'>
								{service.title}
							</h3>
							<p className='text-[15px] leading-relaxed text-muted'>
								{service.description}
							</p>
							<div className='mt-2 flex flex-col gap-2 text-sm text-muted-strong'>
								{service.bullets?.map(bullet => (
									<span key={bullet}>— {bullet}</span>
								))}
							</div>
							{pageHref && (
								<Link
									href={pageHref}
									className='tap-area font-hand mt-1 w-fit text-xl leading-none text-ink underline decoration-accent decoration-2 underline-offset-4'
								>
									learn more
									<span className='sr-only'>
										{' '}
										about {service.title} in Watford
									</span>
								</Link>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
