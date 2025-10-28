"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-white dark:bg-neutral-900 shadow-md border border-gray-200 dark:border-neutral-700",
        hoverable && "hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200",
        "p-4 sm:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = "Card"

export { Card }