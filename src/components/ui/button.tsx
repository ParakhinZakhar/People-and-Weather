"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        link: "text-blue-600 hover:underline hover:text-blue-700",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<MuiButtonProps, "variant" | "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * ✅ Button component (MUI + Tailwind + shadcn style)
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : MuiButton

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disableElevation
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }