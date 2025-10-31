"use client";

import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-12 gap-3">
      <CircularProgress />
      <Typography variant="body2" className="text-gray-600">
        Loading...
      </Typography>
    </div>
  );
};

export default Loader;