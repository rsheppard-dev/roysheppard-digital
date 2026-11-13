import Link from 'next/link';
import { services as fallbackServices } from '@/content/site';
import { sanityFetch } from '@/sanity/lib/live';
import { servicesQuery } from '@/sanity/lib/queries';

const SERVICE_PAGE_HREFS: Record<string, string> = {
	'Web Design': '/web-design-watford',
	'Web Development': '/web-development-watford',
	'E-Commerce': '/ecommerce-watford',
};

export async function Services() {
	const { data } = await sanityFetch({ query: servicesQuery });
	const services = data && data.length > 0 ? data : fallbackServices;

	return (
		<div
			id='services'
			className='flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25'
		>
			<h2 className='text-3xl font-semibold lg:text-[42px]'>What I do</h2>
			<div className='flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-stretch lg:gap-10'>
				{services.map(service => {
					const pageHref = service.title
						? SERVICE_PAGE_HREFS[service.title]
						: undefined;
					return (
						<div
							key={service.title}
							className={`flex flex-1 flex-col gap-3 rounded-md border border-border-tan bg-paper p-6 sm:gap-4 sm:p-7 shadow-[0_14px_26px_-16px_rgba(23,23,26,0.3)] transition-shadow duration-150 hover:shadow-[0_20px_32px_-16px_rgba(23,23,26,0.4)]`}
						>
							<h3 className='text-xl font-bold lg:text-[22px]'>
								{service.title}
							</h3>
							<p className='text-[15px] leading-relaxed text-muted'>
								{service.description}
							</p>
							<div className='mt-2 hidden flex-col gap-2 text-sm text-muted-strong sm:flex'>
								{service.bullets?.map(bullet => (
									<span key={bullet}>— {bullet}</span>
								))}
							</div>
							{pageHref && (
								<Link
									href={pageHref}
									className='tap-area font-hand mt-auto w-fit pt-1 text-xl leading-none text-ink underline decoration-accent decoration-2 underline-offset-4'
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
