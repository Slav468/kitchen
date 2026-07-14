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

interface IProps {
	onClose: () => void;
}

const INITIAL_DATA: LoginData = { email: '', password: '' };

const LoginForm = ({ onClose }: IProps) => {
	const { formData, setField, isSubmitting, handleSubmit } =
		useAuthSubmit<LoginData>(
			INITIAL_DATA,
			async (data) => {
				// TODO: реальный вызов API логина
				console.log('login', data);
			},
			onClose,
		);

	return (
		<Form
			className='w-full flex flex-col gap-2'
			onSubmit={handleSubmit}
		>
			<TextField
				isRequired
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
