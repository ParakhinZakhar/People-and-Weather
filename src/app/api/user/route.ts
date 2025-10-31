import { NextResponse } from 'next/server';
import type { apiRandomUser } from '@/app/types/apiUser';
import type { User } from '@/app/types/user';
import { mapApiUserToUser } from '@/lib/mapping/userMapper';

export const GET = async () => {
  try {
    const res = await fetch('https://randomuser.me/api/');
    if (!res.ok) throw new Error('Failed to fetch user');

    const { results }: { results: apiRandomUser[] } = await res.json();
    const apiUser = results[0];

    const user: User = mapApiUserToUser(apiUser);

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
};