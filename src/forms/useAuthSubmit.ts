import { useState } from 'react';

export function useAuthSubmit<T extends object>(
	initialData: T,
	onSubmit: (data: T) => Promise<void> | void,
	onClose: () => void,
) {
	const [formData, setFormData] = useState<T>(initialData);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const setField = <K extends keyof T>(name: K, value: T[K]) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitting(true);
			await onSubmit(formData);
			setFormData(initialData);
			onClose();
		} catch (error) {
			// TODO: показать общую ошибку формы (например, errors.form с сервера)
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return { formData, setField, isSubmitting, handleSubmit };
}
