import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	const users = await prisma.user.findMany({
		select: { email: true, role: true },
	});
	console.log('Пользователи в БД:');
	console.table(users);
}

main()
	.catch((e) => {
		console.error('Ошибка:', e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
