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
import {
	validateConfirmPassword,
	validateEmail,
	validateNewPassword,
} from './validation';
import { RegistrationData } from '../types/index';
import { useAuth } from '@/hooks/useAuth';

interface IProps {
	onClose: () => void;
}

const INITIAL_DATA: RegistrationData = {
	email: '',
	password: '',
	confirmPassword: '',
};

const RegistrationForm = ({ onClose }: IProps) => {
	const { register } = useAuth();

	const { formData, setField, isSubmitting, error, handleSubmit } =
		useAuthSubmit<RegistrationData>(
			INITIAL_DATA,
			async (data) => {
				await register(data.email, data.password);
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
				validate={validateNewPassword}
			>
				<Input
					aria-label='Пароль'
					placeholder='Введите пароль'
					value={formData.password}
					onChange={(e) => setField('password', e.target.value)}
				/>
				<FieldError />
			</TextField>

			<TextField
				isRequired
				aria-label='Подтверждение пароля'
				name='confirmPassword'
				type='password'
				className='w-full'
				validate={(value) => validateConfirmPassword(value, formData.password)}
			>
				<Input
					aria-label='Подтверждение пароля'
					placeholder='Подтвердите пароль'
					value={formData.confirmPassword}
					onChange={(e) => setField('confirmPassword', e.target.value)}
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
							{isPending ? 'Отправка...' : 'Зарегистрироваться'}
						</>
					)}
				</Button>
			</div>
		</Form>
	);
};

export default RegistrationForm;
