import { testimonials as fallbackTestimonials } from '@/content/site';
import { Eyebrow } from '@/components/ui/eyebrow';
import { RevealGroup } from '@/components/ui/reveal-group';
import { Signature } from '@/components/ui/signature';
import { Stars } from '@/components/ui/stars';
import { sanityFetch } from '@/sanity/lib/live';
import { testimonialsQuery } from '@/sanity/lib/queries';

/** Alternating paper tilt for the notes on desktop, echoing the pinned cards in Services. */
const NOTE_TILTS = ['lg:-rotate-1', 'lg:rotate-1'];

type Testimonial = {
	quote?: string | null;
	name?: string | null;
	company?: string | null;
};

function QuoteParagraphs({
	quote,
	openMark = true,
}: {
	quote: string;
	openMark?: boolean;
}) {
	const paragraphs = quote.split(/\n\s*\n/).filter(Boolean);
	return paragraphs.map((paragraph, i) => (
		<p key={paragraph}>
			{i === 0 && openMark && <span className='ml-[-0.4em]'>&ldquo;</span>}
			{paragraph}
			{i === paragraphs.length - 1 && '”'}
		</p>
	));
}

export async function Testimonials() {
	const { data } = await sanityFetch({ query: testimonialsQuery });
	const testimonials: Testimonial[] =
		data && data.length > 0 ? data : fallbackTestimonials;
	const [featured, ...notes] = testimonials;

	return (
		<div className='border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:px-35 lg:py-25'>
			<RevealGroup className='flex flex-col gap-8 lg:gap-12'>
				<Eyebrow as='h2'>Kind words</Eyebrow>

				<div className='flex min-w-0 flex-col gap-8 lg:gap-12'>
					{featured && (
						<figure className='reveal-item flex flex-col gap-6 rounded-card bg-ink px-7 py-9 sm:px-10 lg:px-12 lg:py-12'>
							<div className='flex items-start justify-between gap-6'>
								<span
									aria-hidden='true'
									className='-mb-8 -mt-2 text-[96px] font-semibold leading-none text-accent'
								>
									&ldquo;
								</span>
								<Stars size={16} className='reveal-stars mt-2' />
							</div>
							<blockquote className='flex max-w-220 flex-col gap-3 text-pretty text-xl font-medium leading-relaxed text-cream lg:text-[24px] lg:leading-[1.55]'>
								<QuoteParagraphs
									quote={featured.quote ?? ''}
									openMark={false}
								/>
							</blockquote>
							<Signature
								name={featured.name}
								company={featured.company}
								onDark
							/>
						</figure>
					)}

					<div
						role='region'
						aria-label='More client reviews'
						tabIndex={0}
						className='-mx-6 flex items-start snap-x contain-[paint] lg:contain-none snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 outline-none focus-visible:ring-2 focus-visible:ring-accent sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-12 lg:overflow-visible lg:px-0 lg:pb-12'
					>
						{notes.map((testimonial, index) => {
							const quote = testimonial.quote ?? '';
							const isLastOdd =
								notes.length % 2 === 1 && index === notes.length - 1;
							const isRightColumn = index % 2 === 1;

							return (
								<figure
									key={`${testimonial.name ?? ''}-${quote}`}
									className={`reveal-item flex w-[82%] shrink-0 snap-start flex-col justify-between gap-8 rounded-md border border-border-tan bg-paper p-7 shadow-[0_14px_26px_-16px_rgba(23,23,26,0.3)] sm:w-[46%] lg:w-auto ${
										isLastOdd
											? 'lg:col-span-2 lg:rotate-0'
											: NOTE_TILTS[index % 2]
									} ${isRightColumn ? 'lg:translate-y-12' : ''}`}
								>
									<div className='flex flex-col gap-5'>
										<Stars size={14} className='reveal-stars' />
										<blockquote
											className={`flex flex-col gap-3 text-pretty text-[15px] leading-relaxed text-ink lg:text-base ${
												isLastOdd ? 'lg:max-w-160' : ''
											}`}
										>
											<QuoteParagraphs quote={quote} />
										</blockquote>
									</div>
									<Signature
										name={testimonial.name}
										company={testimonial.company}
									/>
								</figure>
							);
						})}
					</div>
				</div>
			</RevealGroup>
		</div>
	);
}
