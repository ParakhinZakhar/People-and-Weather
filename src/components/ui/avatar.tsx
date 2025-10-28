"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallback?: string;
}

const sizeValues = {
  sm: 32,   // 32px
  md: 64,   // 64px
  lg: 96,   // 96px
  xl: 128,  // 128px
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  className,
}) => {
  const initials = React.useMemo(() => {
    if (fallback) return fallback;
    if (alt)
      return alt
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    return "?";
  }, [alt, fallback]);

  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: sizeValues[size],
        height: sizeValues[size],
        fontSize: sizeValues[size] / 2.5,
        bgcolor: "gray.200",
        color: "gray.700",
      }}
      className={className}
    >
      {!src && initials}
    </Avatar>
  );
};
