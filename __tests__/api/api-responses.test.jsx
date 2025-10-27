/**
 * @jest-environment node
 */
import { GET } from '@/app/api/user/route';
import { isUser } from '../utils/helper';

describe('GET /api/user (real fetch)', () => {
  it('fetches a random user and validates structure', async () => {
    const response = await GET();
    const user = response?.data || response?.body || response;

    expect(user).toBeDefined();
    expect(isUser(user)).toBe(true);
  });
});