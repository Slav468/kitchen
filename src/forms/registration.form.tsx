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

interface IProps {
	onClose: () => void;
}

const INITIAL_DATA: RegistrationData = {
	email: '',
	password: '',
	confirmPassword: '',
};

const RegistrationForm = ({ onClose }: IProps) => {
	const { formData, setField, isSubmitting, handleSubmit } =
		useAuthSubmit<RegistrationData>(
			INITIAL_DATA,
			async (data) => {
				// TODO: реальный вызов API регистрации
				console.log('register', data);
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
