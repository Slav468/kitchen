'use client';

import { Link } from '@heroui/react';
import Image from 'next/image';

import { siteConfig } from '@/config/site.config';

export function Logo() {
	return (
		<Link
			href='/'
			className='flex items-center gap-2 no-underline'
		>
			<Image
				src='/logo.png'
				alt={`${siteConfig.title} Logo`}
				width={48}
				height={48}
			/>
			<span className='hidden sm:inline font-bold text-lg text-gray-900'>
				{siteConfig.title}
			</span>
		</Link>
	);
}
