'use client';

import { Button, Form, Input } from '@heroui/react';
import { useState } from 'react';

interface IProps {
	onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: Replace with real API call

		window.location.reload();

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
				validate={(value) => {
					if (!value) return 'Почта обязательна';
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
				validate={(value) => {
					if (!value) return 'Пароль обязателен';
					return null;
				}}
			/>

			<div className='flex w-[100%]  gap-4 items-center pt-8 justify-end'>
				<Button onPress={onClose}>Отмена</Button>
				<Button type='submit'>Войти</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
