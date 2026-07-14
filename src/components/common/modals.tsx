'use client';

import { Button, Modal, useOverlayState } from '@heroui/react';
import { useState } from 'react';
import LoginForm from './../../forms/login.form';
import RegistrationForm from '../../forms/registration.form';

type AuthMode = 'login' | 'register';

export default function AuthModal() {
	const state = useOverlayState();
	const [mode, setMode] = useState<AuthMode>('login');

	const handleClose = () => {
		state.close();
		// небольшая задержка, чтобы не мигало во время анимации закрытия
		setTimeout(() => setMode('login'), 300);
	};

	return (
		<Modal state={state}>
			<Button
				variant='secondary'
				onPress={state.open}
			>
				Войти
			</Button>

			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog className='sm:max-w-[400px]'>
						<Modal.CloseTrigger />
						<Modal.Header>
							<Modal.Heading className='text-center *:text-lg text-background'>
								{mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
							</Modal.Heading>
						</Modal.Header>

						<Modal.Body>
							{mode === 'login' ? (
								<LoginForm onClose={handleClose} />
							) : (
								<RegistrationForm onClose={handleClose} />
							)}

							<p className='text-sm text-center pt-4'>
								{mode === 'login' ? (
									<>
										Нет аккаунта?{' '}
										<button
											type='button'
											className='underline cursor-pointer'
											onClick={() => setMode('register')}
										>
											Зарегистрироваться
										</button>
									</>
								) : (
									<>
										Уже есть аккаунт?{' '}
										<button
											type='button'
											className='underline cursor-pointer'
											onClick={() => setMode('login')}
										>
											Войти
										</button>
									</>
								)}
							</p>
						</Modal.Body>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
