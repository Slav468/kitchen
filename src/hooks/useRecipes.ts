'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import { RecipesService } from '@/services/recipes';

export const useRecipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await RecipesService.getAll();
				setRecipes(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to fetch recipes',
				);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, []);

	return { recipes, loading, error };
};

export const useRecipeById = (id: string) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await RecipesService.getById(id);
				setRecipe(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch recipe');
			} finally {
				setLoading(false);
			}
		};

		fetchRecipe();
	}, [id]);

	return { recipe, loading, error };
};
