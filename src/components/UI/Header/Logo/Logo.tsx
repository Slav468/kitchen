'use client';

import { Link } from '@heroui/react';
import Image from 'next/image';

export function Logo() {
	return (
		<Link
			href='/'
			className='flex items-center gap-2 no-underline'
		>
			<Image
				src='/logo.png'
				alt='Logo татарская кухня'
				width={48}
				height={48}
			/>
			<span className='hidden sm:inline font-bold text-lg text-gray-900'>
				Татарская кухня
			</span>
		</Link>
	);
}
