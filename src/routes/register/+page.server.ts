import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/db/schema';

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = formData.get('name');
    const validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validPasswordRegex = /^(?=.*[a-z])(?=.*\d).{8,}$/;
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (typeof email !== 'string' || !validEmailRegex.test(email)) {
      return fail(400, {
        fullName,
        email,
        error: 'E-mail invalido'
      });
    }
    if (
      typeof password !== 'string' ||
      password.length < 8 ||
      !validPasswordRegex.test(password) ||
      password.length > 255
    ) {
      return fail(400, {
        fullName,
        email,
        error: 'Senha não atende aos requisitos mínimos de segurança.'
      });
    }

    if (
      typeof fullName !== 'string' ||
      fullName.length < 3 ||
      fullName.length > 255
    ) {
      return fail(400, {
        fullName,
        email,
        error: 'Nome completo deve ter entre 3 e 255 caracteres.'
      });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    // TODO: check if username is already used
    await db.insert(users).values({
      id: userId,
      username: email,
      fullName: fullName,
      hashedPassword: hashedPassword
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    redirect(302, '/');
  }
};
