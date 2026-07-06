/**
 * Common utility functions
 */

export const classNames = (
	...classes: (string | undefined | null | false)[]
) => {
	return classes.filter(Boolean).join(' ');
};

export const formatDate = (date: Date): string => {
	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
};

export const slugify = (str: string): string => {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/^-+|-+$/g, '');
};
