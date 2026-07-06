'use client';

import { Logo } from './Logo';
import { Navigation } from './Navigation';

export default function Header() {
	return (
		<header className='sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<Navigation />
				</div>
			</div>
		</header>
	);
}
