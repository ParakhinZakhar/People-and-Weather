"use client";

import * as React from 'react';
import TextField from '@mui/material/TextField';
import { cn } from '@/lib/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextField> {
  label?: string;
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, errorText, ...props }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const muiTheme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode: isDark ? 'dark' : 'light',
            primary: {
              main: isDark ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 9%)',
            },
            background: {
              default: isDark ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
              paper: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 100%)',
            },
            text: {
              primary: isDark ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 3.9%)',
              secondary: isDark ? 'hsl(0, 0%, 63.9%)' : 'hsl(0, 0%, 45.1%)',
            },
          },
          components: {
            MuiOutlinedInput: {
              styleOverrides: {
                root: {
                  backgroundColor: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 100%)',
                  '& fieldset': {
                    borderColor: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 89.8%)',
                  },
                  '&:hover fieldset': {
                    borderColor: isDark ? 'hsl(0, 0%, 63.9%)' : 'hsl(0, 0%, 45.1%)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDark ? 'hsl(0, 0%, 83.1%)' : 'hsl(0, 0%, 3.9%)',
                    borderWidth: '2px',
                  },
                },
              },
            },
            MuiInputLabel: {
              styleOverrides: {
                root: {
                  color: isDark ? 'hsl(0, 0%, 63.9%)' : 'hsl(0, 0%, 45.1%)',
                  '&.Mui-focused': {
                    color: isDark ? 'hsl(0, 0%, 83.1%)' : 'hsl(0, 0%, 3.9%)',
                  },
                },
              },
            },
          },
        }),
      [isDark]
    );

    return (
      <ThemeProvider theme={muiTheme}>
        <div className="w-full flex flex-col gap-1">
          <TextField
            inputRef={ref}
            variant="outlined"
            size="small"
            label={label}
            className={cn("rounded-md transition-all duration-200", className)}
            {...props}
          />
          {errorText && (
            <span className="text-xs text-destructive mt-1">{errorText}</span>
          )}
        </div>
      </ThemeProvider>
    );
  }
);

Input.displayName = 'Input';

export { Input };