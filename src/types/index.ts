/**
 * Recipe type for the recipes module
 */
export interface Recipe {
	id: string;
	title: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	cookTime: number;
	servings: number;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;
	image?: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Ingredient type for the ingredients module
 */
export interface Ingredient {
	id: string;
	name: string;
	description?: string;
	quantity?: number;
	unit?: string;
}

/**
 * Category type for the categories module
 */
export interface Category {
	id: string;
	name: string;
	description?: string;
	slug: string;
	icon?: string;
}

export interface Credentials {
	email: string;
	password: string;
}

export type LoginData = Credentials;

export interface RegistrationData extends Credentials {
	confirmPassword: string;
}
