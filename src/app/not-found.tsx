'use client';

import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div className='flex flex-col items-center justify-center grow'>
			<div className='text-8xl font-bold text-gray-300'>404</div>
			<h1 className='text-cyan-300xl font-bold tracking-tight'>
				Оооой! Страница не найдена.
			</h1>
			<div className='pt-6'>
				<Link
					className='bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out'
					href='/'
				>
					На главную
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
