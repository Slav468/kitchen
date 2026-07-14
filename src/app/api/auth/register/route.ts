import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email и пароль обязательны' },
				{ status: 400 },
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ error: 'Пароль должен быть минимум 6 символов' },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return NextResponse.json(
				{ error: 'Пользователь с таким email уже существует' },
				{ status: 409 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: 'USER',
			},
		});

		const token = signToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		return NextResponse.json(
			{
				token,
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('Register error:', error);
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 },
		);
	}
}
