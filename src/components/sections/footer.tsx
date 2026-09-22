import { footer as fallbackFooter, nav } from '@/content/site';
import { TextLink } from '@/components/ui/text-link';
import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { sanityFetch } from '@/sanity/lib/live';
import { footerQuery } from '@/sanity/lib/queries';

function FooterColumn({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className='flex flex-col gap-3.5'>
			<span className='font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft'>
				{label}
			</span>
			{children}
		</div>
	);
}

export async function Footer() {
	const { data } = await sanityFetch({ query: footerQuery });

	const footer = {
		name: data?.name || fallbackFooter.name,
		blurb: data?.blurb || fallbackFooter.blurb,
		email: data?.email || fallbackFooter.email,
		phone: data?.phone || fallbackFooter.phone,
	};
	const social =
		data?.social && data.social.length > 0
			? data.social
			: fallbackFooter.social;

	return (
		<div className='bg-ink px-6 py-12 text-cream sm:px-10 lg:px-35 lg:py-20'>
			<div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
				<div className='flex max-w-85 flex-col gap-3.5'>
					<span className='font-display text-xl font-bold lg:text-[22px]'>
						{footer.name}
					</span>
					<p className='text-sm leading-relaxed text-[#B7B3A4]'>
						{footer.blurb}
					</p>
				</div>

				<div className='grid grid-cols-2 gap-8 sm:grid-cols-4 lg:contents'>
					<FooterColumn label='Menu'>
						{nav.map(item => (
							<TextLink key={item.href} variant='footer' href={item.href}>
								{item.label}
							</TextLink>
						))}
					</FooterColumn>

					<FooterColumn label='Services'>
						<TextLink variant='footer' href='/web-design-watford'>
							Web Design
						</TextLink>
						<TextLink variant='footer' href='/web-development-watford'>
							Web Development
						</TextLink>
						<TextLink variant='footer' href='/ecommerce-watford'>
							E-Commerce
						</TextLink>
					</FooterColumn>

					<FooterColumn label='Contact'>
						<TextLink variant='footer' href='/contact'>
							Start a project
						</TextLink>
						<TextLink variant='footer' href={`mailto:${footer.email}`}>
							{footer.email}
						</TextLink>
						<TextLink variant='footer' href={`tel:${footer.phone}`}>
							{footer.phone}
						</TextLink>
					</FooterColumn>

					<FooterColumn label='Elsewhere'>
						{social.map(item => (
							<TextLink
								key={item.label}
								variant='footer'
								href={item.url || '#'}
								target='_blank'
								rel='noopener noreferrer'
							>
								{item.label}
							</TextLink>
						))}
					</FooterColumn>
				</div>
			</div>

			<div className='mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 lg:mt-14'>
				<TextLink variant='footer' href='/privacy-policy'>
					Privacy Policy
				</TextLink>
				<CookieSettingsButton className='w-fit text-left text-sm text-[#D8D3C6] transition-colors hover:text-cream' />
			</div>
		</div>
	);
}
