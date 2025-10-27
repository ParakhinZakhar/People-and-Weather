import type { User } from '@/app/types/user';

type PrimitiveType = 'string' | 'number' | 'object';

function isNonEmpty(value: unknown, type: PrimitiveType): boolean {
  if (type === 'string') return typeof value === 'string' && value.trim() !== '';
  if (type === 'number') return typeof value === 'number' && !isNaN(value);
  if (type === 'object') return value !== null && typeof value === 'object';
  return false;
}

function validateObject<T>(obj: unknown, template: T): obj is T {
  if (!obj || typeof obj !== 'object') return false;

  for (const key in template) {
    if (!(key in (obj as object))) return false;

    const templateValue = template[key];
    const objValue = (obj as Record<string, unknown>)[key];

    if (templateValue && typeof templateValue === 'object') {
      if (!validateObject(objValue, templateValue)) return false;
    } else {
      const valueType = typeof templateValue;
      if (!isNonEmpty(objValue, valueType as PrimitiveType)) return false;
    }
  }

  return true;
}

export function isUser(obj: unknown): obj is User {
  const template = {} as User;
  return validateObject(obj, template);
}