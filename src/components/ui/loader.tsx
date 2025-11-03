"use client";

import React from 'react'
import { CircularProgress, Typography } from '@mui/material'

const Loader: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-12 gap-3">
      <CircularProgress 
        className="text-primary"
        sx={{ 
          color: 'hsl(var(--primary))' 
        }}
      />
      <Typography 
        variant="body2" 
        className="text-muted-foreground text-sm sm:text-base"
      >
        Loading...
      </Typography>
    </div>
  );
};

export default Loader;