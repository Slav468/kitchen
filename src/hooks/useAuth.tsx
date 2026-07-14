'use client';

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from 'react';

interface User {
	id: string;
	email: string;
	role: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('auth_token');
}

function setStoredToken(token: string | null) {
	if (typeof window === 'undefined') return;
	if (token) {
		localStorage.setItem('auth_token', token);
	} else {
		localStorage.removeItem('auth_token');
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(() => getStoredToken());
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUser = useCallback(
		async (authToken: string): Promise<User | null> => {
			try {
				const res = await fetch('/api/auth/me', {
					headers: { Authorization: `Bearer ${authToken}` },
				});
				if (!res.ok) {
					setStoredToken(null);
					setToken(null);
					return null;
				}
				const data = await res.json();
				return data.user;
			} catch {
				return null;
			}
		},
		[],
	);

	// Восстановление сессии при загрузке
	useEffect(() => {
		if (token) {
			fetchUser(token).then((u) => {
				if (u) setUser(u);
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
		}
	}, [token, fetchUser]);

	const login = useCallback(async (email: string, password: string) => {
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || 'Ошибка входа');
		}

		setStoredToken(data.token);
		setToken(data.token);
		setUser(data.user);
	}, []);

	const register = useCallback(async (email: string, password: string) => {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || 'Ошибка регистрации');
		}

		setStoredToken(data.token);
		setToken(data.token);
		setUser(data.user);
	}, []);

	const logout = useCallback(() => {
		setStoredToken(null);
		setToken(null);
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, token, isLoading, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
