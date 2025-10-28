"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextField> {
  label?: string;
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, errorText, ...props }, ref) => (
    <div className="w-full flex flex-col gap-1">
      {/* Floating label вбудований у TextField */}
      <TextField
        inputRef={ref}
        variant="outlined"
        size="small"
        label={label} // Label автоматично плаваючий
        className={cn(
          "bg-background rounded-md border border-input focus-within:ring-2 focus-within:ring-ring transition duration-200",
          className
        )}
        {...props}
      />
      {errorText && (
        <span className="text-xs text-red-500 mt-1">{errorText}</span>
      )}
    </div>
  )
);

Input.displayName = "Input";

export { Input };
