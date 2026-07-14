'use client';

import { Logo } from './Logo';
import { Navigation } from './Navigation';
import CustomModals from '@/components/common/modals';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
	const { user, logout, isLoading } = useAuth();

	return (
		<header className='sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<Navigation />

					<div className='flex gap-2 items-center'>
						{isLoading ? (
							<span className='text-sm text-gray-400'>Загрузка...</span>
						) : user ? (
							<div className='flex items-center gap-3'>
								<span className='text-sm text-gray-700'>
									{user.email}
									<span className='ml-1 text-xs text-gray-400'>
										({user.role})
									</span>
								</span>
								<button
									type='button'
									onClick={logout}
									className='text-sm text-red-500 hover:text-red-700 cursor-pointer'
								>
									Выйти
								</button>
							</div>
						) : (
							<CustomModals />
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
