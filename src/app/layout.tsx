import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/UI';
import { siteConfig } from '@/config/site.config';
import { AuthProvider } from '@/hooks/useAuth';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='ru'
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>
				<AuthProvider>
					<Header />

					<main className='flex flex-col grow'>{children}</main>

					<footer>
						<p className='text-center text-gray-500 text-sm pt-6 pb-3'>
							&copy; {new Date().getFullYear()} {siteConfig.title}. Все права
							защищены.
						</p>
					</footer>
				</AuthProvider>
			</body>
		</html>
	);
}
