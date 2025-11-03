"use client";

import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyBannerProps {
  message: string;
}

export const EmptyBanner: React.FC<EmptyBannerProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center my-20">
      <Alert
        severity="info"
        icon={false}
        className={cn(
          "w-full max-w-3xl p-4 flex flex-col shadow-md rounded-lg border backdrop-blur-sm",
          "bg-white text-gray-800 border-gray-200",
          "dark:bg-neutral-900/90 dark:text-gray-100 dark:border-neutral-700"
        )}
      >
        <div className="flex items-center space-x-2">
          <Info className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          <AlertTitle className="text-2xl font-semibold m-0">
            Notice
          </AlertTitle>
        </div>

        <div className="text-gray-700 dark:text-gray-300 text-lg mt-4 mb-6 w-full text-center">
          {message}
        </div>
      </Alert>
    </div>
  );
};