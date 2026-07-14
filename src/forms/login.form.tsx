'use client';

import {
	Button,
	FieldError,
	Form,
	Input,
	Spinner,
	TextField,
} from '@heroui/react';
import { useAuthSubmit } from './useAuthSubmit';
import { validateEmail, validateRequiredPassword } from './validation';
import { LoginData } from '../types/index';
import { useAuth } from '@/hooks/useAuth';

interface IProps {
	onClose: () => void;
}

const INITIAL_DATA: LoginData = { email: '', password: '' };

const LoginForm = ({ onClose }: IProps) => {
	const { login } = useAuth();

	const { formData, setField, isSubmitting, error, handleSubmit } =
		useAuthSubmit<LoginData>(
			INITIAL_DATA,
			async (data) => {
				await login(data.email, data.password);
			},
			onClose,
		);

	return (
		<Form
			className='w-full flex flex-col gap-2'
			onSubmit={handleSubmit}
		>
			{error && (
				<div className='bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3'>
					{error}
				</div>
			)}
			<TextField
				isRequired
				aria-label='Email'
				name='email'
				type='email'
				className='w-full'
				validate={validateEmail}
			>
				<Input
					aria-label='Email'
					placeholder='Введите email'
					value={formData.email}
					onChange={(e) => setField('email', e.target.value)}
				/>
				<FieldError />
			</TextField>

			<TextField
				isRequired
				aria-label='Пароль'
				name='password'
				type='password'
				className='w-full'
				validate={validateRequiredPassword}
			>
				<Input
					aria-label='Пароль'
					placeholder='Введите пароль'
					value={formData.password}
					onChange={(e) => setField('password', e.target.value)}
				/>
				<FieldError />
			</TextField>

			<div className='flex w-full gap-4 items-center pt-8 justify-end'>
				<Button
					onPress={onClose}
					isDisabled={isSubmitting}
				>
					Отмена
				</Button>
				<Button
					type='submit'
					isPending={isSubmitting}
				>
					{({ isPending }) => (
						<>
							{isPending && (
								<Spinner
									color='current'
									size='sm'
								/>
							)}
							{isPending ? 'Отправка...' : 'Войти'}
						</>
					)}
				</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
