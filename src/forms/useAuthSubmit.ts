import { useState, type SyntheticEvent } from 'react';

export function useAuthSubmit<T extends object>(
	initialData: T,
	onSubmit: (data: T) => Promise<void> | void,
	onClose: () => void,
) {
	const [formData, setFormData] = useState<T>(initialData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const setField = <K extends keyof T>(name: K, value: T[K]) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		setError(null);
	};

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		try {
			setIsSubmitting(true);
			await onSubmit(formData);
			setFormData(initialData);
			onClose();
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Произошла ошибка';
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return { formData, setField, isSubmitting, error, handleSubmit };
}
