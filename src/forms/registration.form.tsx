'use client';

import { Button, Form, Input } from '@heroui/react';
import { useState } from 'react';

interface IProps {
	onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		onClose();
	};

	return (
		<Form
			className='w-full'
			onSubmit={handleSubmit}
		>
			<Input
				aria-label='Email'
				required
				name='email'
				placeholder='Введите email'
				type='email'
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				validate={(value: string) => {
					if (!value) return 'Почта обязательна';
					if (!validateEmail(value)) return 'Некорректный email';
					return null;
				}}
			/>
			<Input
				required
				name='password'
				placeholder='Введите пароль'
				type='password'
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				validate={(value: string) => {
					if (!value) return 'Пароль обязателен';
					if (value.length < 6) return 'Пароль должен быть не менее 6 символов';
					return null;
				}}
			/>
			<Input
				required
				name='confirmPassword'
				placeholder='Подтвердите пароль'
				type='password'
				value={formData.confirmPassword}
				onChange={(e) =>
					setFormData({ ...formData, confirmPassword: e.target.value })
				}
				validate={(value: string) => {
					if (!value) return 'Пароль для подтверждения обязателен';
					if (value !== formData.password) return 'Пароли не совпадают';
					return null;
				}}
			/>

			<div className='flex w-full gap-4 items-center pt-8 justify-end'>
				<Button onPress={onClose}>Отмена</Button>
				<Button type='submit'>Зарегистрироваться</Button>
			</div>
		</Form>
	);
};

export default RegistrationForm;
