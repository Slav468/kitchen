export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value: string): string | null => {
	if (!value) return 'Email обязателен';
	if (!EMAIL_REGEX.test(value)) return 'Некорректный формат email';
	return null;
};

export const validateRequiredPassword = (value: string): string | null => {
	if (!value) return 'Пароль обязателен';
	return null;
};

export const validateNewPassword = (value: string): string | null => {
	if (!value) return 'Пароль обязателен';
	if (value.length < MIN_PASSWORD_LENGTH) {
		return `Минимум ${MIN_PASSWORD_LENGTH} символов`;
	}
	return null;
};

export const validateConfirmPassword = (
	value: string,
	password: string,
): string | null => {
	if (!value) return 'Подтвердите пароль';
	if (value !== password) return 'Пароли не совпадают';
	return null;
};
