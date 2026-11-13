import Image from 'next/image';
import Link from 'next/link';
import { serviceLinks, services as fallbackServices } from '@/content/site';
import { sanityFetch } from '@/sanity/lib/live';
import { servicesQuery } from '@/sanity/lib/queries';

/**
 * Homepage services. Each row starts from the visitor's situation ("My site looks dated") and
 * leads to the matching service page. Links, situations and illustrations come from the same
 * list as the Services page; the one-line description comes from the service documents edited
 * in Studio when there is one.
 */
export async function Services() {
	const { data } = await sanityFetch({ query: servicesQuery });
	const details = data && data.length > 0 ? data : fallbackServices;

	const rows = serviceLinks.map(link => ({
		...link,
		description:
			details.find(detail => detail.title === link.title)?.description ??
			link.summary,
	}));

	return (
		<div
			id='services'
			className='flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25'
		>
			<h2 className='text-3xl font-semibold lg:text-[42px]'>
				Which of these sounds like you?
			</h2>
			<ul className='flex flex-col border-b border-border-tan'>
				{rows.map(row => (
					<li key={row.href} className='border-t border-border-tan'>
						<Link
							href={row.href}
							className='group grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-5 gap-y-3 py-6 outline-offset-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-x-7 lg:grid-cols-[132px_minmax(0,1fr)_auto] lg:gap-x-10 lg:py-8'
						>
							<Image
								src={`/images/focus/${row.image}.webp`}
								alt=''
								width={400}
								height={400}
								sizes='(min-width: 1024px) 132px, (min-width: 640px) 96px, 72px'
								className='h-18 w-18 object-contain transition-transform duration-200 ease-out-strong motion-reduce:transition-none sm:h-24 sm:w-24 lg:h-33 lg:w-33 group-hover:-rotate-3 group-hover:scale-105'
							/>
							<div className='flex flex-col gap-1.5 lg:gap-2'>
								<h3 className='text-xl font-medium leading-tight lg:text-[30px]'>
									{row.choice}
								</h3>
								<p className='max-w-130 text-[15px] leading-relaxed text-muted-strong lg:text-base'>
									{row.description}
								</p>
							</div>
							<span className='col-start-2 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent-text sm:col-start-2 lg:col-start-3'>
								{row.title}
								<span
									aria-hidden='true'
									className='transition-transform duration-200 ease-out-strong motion-reduce:transition-none group-hover:translate-x-1'
								>
									→
								</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
