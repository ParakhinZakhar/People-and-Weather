"use client";

import { useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type?: 'success' | 'error';
  }>({ open: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ open: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return { toast, showToast, closeToast };
}