"use client";

import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { Info } from 'lucide-react'

interface EmptyBannerProps {
  message: string;
}

export const EmptyBanner: React.FC<EmptyBannerProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center my-20">
      <Alert
        severity="info"
        icon={false} 
        className="w-full max-w-3xl bg-white shadow-md rounded-lg border border-gray-200 p-4 flex flex-col"
      >
        <div className="flex items-center space-x-2">
          <Info className="w-6 h-6 text-blue-500" />
          <AlertTitle className="text-2xl font-semibold text-gray-700 m-0">
            Notice
          </AlertTitle>
        </div>

        <div className="text-gray-600 text-lg mt-4 mb-6 w-full text-center">
          {message}
        </div>
      </Alert>
    </div>
  );
};
