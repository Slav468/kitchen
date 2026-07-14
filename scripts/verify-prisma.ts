import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function main() {
	const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
	const adapter = new PrismaPg(pool);
	const prisma = new PrismaClient({ adapter });

	try {
		const ingredientCount = await prisma.ingredient.count();
		const recipeCount = await prisma.recipe.count();

		console.log(
			`✅ Connected. Ingredients: ${ingredientCount}, Recipes: ${recipeCount}`,
		);
		process.exit(0);
	} catch (err) {
		console.error('❌ Verification failed:', err);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
