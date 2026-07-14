/**
 * API client for making requests to the backend
 */

interface ApiOptions extends RequestInit {
	params?: Record<string, string>;
}

function getToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('auth_token');
}

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export async function apiClient<T = unknown>(
	url: string,
	options: ApiOptions = {},
): Promise<T> {
	const { params, ...fetchOptions } = options;

	const headers = new Headers(fetchOptions.headers);

	// Add auth token if available
	const token = getToken();
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	// Default content type for POST/PUT
	if (
		fetchOptions.method &&
		['POST', 'PUT', 'PATCH'].includes(fetchOptions.method.toUpperCase())
	) {
		headers.set('Content-Type', 'application/json');
	}

	// Build URL with query params
	let fullUrl = url;
	if (params) {
		const searchParams = new URLSearchParams(params);
		fullUrl += `?${searchParams.toString()}`;
	}

	const response = await fetch(fullUrl, {
		...fetchOptions,
		headers,
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new ApiError(
			response.status,
			errorData.error || `HTTP error ${response.status}`,
		);
	}

	return response.json() as Promise<T>;
}
