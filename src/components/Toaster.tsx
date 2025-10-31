"use client";

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

interface ToastProps {
  open: boolean;
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ open, message, type = 'success', onClose }: ToastProps) {
  return (
    <Snackbar
      className="fixed top-0 left-0 w-full mt-16 shadow z-100"
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        elevation={2}
        icon={true} 
        severity={type}
        onClose={onClose}
        variant="standard"
        className={`
          font-medium text-sm rounded-lg border 
          backdrop-blur-md
          px-4 py-2
          flex items-center gap-2

          ${type === 'success' 
            ? "text-green-600 border-green-200 bg-green-50/70" 
            : "text-red-600 border-red-200 bg-red-50/70"
          }
        `}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}