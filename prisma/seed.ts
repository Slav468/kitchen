import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	// Seed ingredients
	const tomato = await prisma.ingredient.upsert({
		where: { id: 'seed-tomato' },
		update: {},
		create: {
			id: 'seed-tomato',
			name: 'Tomato',
			category: 'VEGETABLES',
			unit: 'PIECES',
			pricePerUnit: 0.5,
		},
	});

	const chicken = await prisma.ingredient.upsert({
		where: { id: 'seed-chicken' },
		update: {},
		create: {
			id: 'seed-chicken',
			name: 'Chicken Breast',
			category: 'MEAT',
			unit: 'KILOGRAMS',
			pricePerUnit: 8.99,
		},
	});

	const salt = await prisma.ingredient.upsert({
		where: { id: 'seed-salt' },
		update: {},
		create: {
			id: 'seed-salt',
			name: 'Salt',
			category: 'SPICES',
			unit: 'GRAMS',
			pricePerUnit: 0.01,
		},
	});

	// Seed a recipe
	const recipe = await prisma.recipe.upsert({
		where: { id: 'seed-recipe-1' },
		update: {},
		create: {
			id: 'seed-recipe-1',
			name: 'Simple Tomato Salad',
			description: 'Fresh tomato salad with salt',
			ingredients: {
				create: [
					{ ingredientId: tomato.id, quantity: 3 },
					{ ingredientId: salt.id, quantity: 5 },
				],
			},
		},
	});

	console.log('✅ Seed complete:', {
		tomato: tomato.name,
		chicken: chicken.name,
		recipe: recipe.name,
	});
}

main()
	.catch((e) => {
		console.error('❌ Seed failed:', e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
