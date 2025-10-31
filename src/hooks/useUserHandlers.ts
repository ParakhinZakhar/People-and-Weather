"use client";

import { Dispatch, SetStateAction } from 'react'
import type { User } from '@/app/types/user'

type ToastFn = (msg: string, type?: 'success' | 'error') => void;

export const useUserHandlers = (
  setUsers: Dispatch<SetStateAction<User[]>>,
  showToast?: ToastFn
) => {

  const handleInputChange = (index: number, fieldPath: string, value: string) => {
    setUsers(prev =>
      prev.map((user, i) => {
        if (i !== index) return user;

        const updated = structuredClone(user);
        const keys = fieldPath.split(".");
        let current: unknown = updated;

        for (let j = 0; j < keys.length - 1; j++) {
          if (!current[keys[j]]) current[keys[j]] = {};
          current = current[keys[j]];
        }
        current[keys[keys.length - 1]] = value;
        return updated;
      })
    );
  };

  const handleSaveUser = (user: User) => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
      saved.push(user);
      localStorage.setItem('savedUsers', JSON.stringify(saved));

      showToast?.(`Saved: ${user.name.first} ${user.name.last}`, 'success');
    } catch {
      showToast?.('Save failed', 'error');
    }
  };

  const handleDeleteUser = (index: number) => {
    setUsers(prev => {
      const user = prev[index];
      const updated = prev.filter((_, i) => i !== index);

      showToast?.(`Removed: ${user.name.first} ${user.name.last}`, 'error');
      return updated;
    });
  };

  const handleDeleteSavedUser = (index: number) => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
      const user = saved[index];
      const updated = saved.filter((_, i) => i !== index);

      localStorage.setItem('savedUsers', JSON.stringify(updated));
      setUsers(updated);

      showToast?.(`Deleted: ${user.name.first} ${user.name.last}`, 'error');
    } catch {
      showToast?.('Delete failed', 'error');
    }
  };

  return { handleInputChange, handleSaveUser, handleDeleteUser, handleDeleteSavedUser };
};