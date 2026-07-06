import { Recipe } from '@/types';

/**
 * Mock data for recipes - will be replaced with real API calls
 */
export const mockRecipes: Recipe[] = [
	{
		id: '1',
		title: 'Казанский плов',
		description: 'Традиционный татарский плов с мясом и овощами',
		ingredients: ['Рис', 'Мясо', 'Морковь', 'Лук'],
		instructions: [
			'Обжарить мясо',
			'Добавить овощи',
			'Добавить рис',
			'Варить до готовности',
		],
		cookTime: 45,
		servings: 4,
		difficulty: 'medium',
		category: 'main',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

/**
 * Recipes service - handles all recipes-related API calls
 */
export const RecipesService = {
	getAll: async (): Promise<Recipe[]> => {
		// TODO: Replace with real API call
		return mockRecipes;
	},

	getById: async (id: string): Promise<Recipe | null> => {
		// TODO: Replace with real API call
		return mockRecipes.find((r) => r.id === id) || null;
	},

	create: async (
		recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Recipe> => {
		// TODO: Replace with real API call
		return {
			...recipe,
			id: Math.random().toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	},

	update: async (
		id: string,
		recipe: Partial<Recipe>,
	): Promise<Recipe | null> => {
		// TODO: Replace with real API call
		return null;
	},

	delete: async (id: string): Promise<void> => {
		// TODO: Replace with real API call
	},
};
