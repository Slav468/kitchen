'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site.config';

export function Navigation() {
	const pathname = usePathname();
	const { navItems } = siteConfig;

	return (
		<nav className='hidden md:flex items-center gap-8'>
			{navItems.map((item) => {
				const isActive = item.href === pathname;
				return (
					<Link
						color='foreground'
						key={item.href}
						href={item.href}
						className={`px-3 py-1 ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-blue-300 hover:border-b hover:border-blue-300'} transition-all duration-200 ease-in-out`}
					>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
