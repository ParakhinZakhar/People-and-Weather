"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";

// ─────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────
const sheetVariants = cva(
  "flex flex-col bg-background text-foreground shadow-xl transition-transform ease-in-out duration-300",
  {
    variants: {
      side: {
        left: "sm:w-80 w-3/4",
        right: "sm:w-80 w-3/4 ml-auto",
        top: "w-full h-1/2",
        bottom: "w-full h-1/2 mt-auto",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetProps extends VariantProps<typeof sheetVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

// ─────────────────────────────────────────────
// MAIN SHEET COMPONENT
// ─────────────────────────────────────────────
export function Sheet({
  open,
  onOpenChange,
  side = "right",
  children,
}: SheetProps) {
  return (
    <Drawer
      anchor={side ?? "right"}
      open={open}
      onClose={() => onOpenChange(false)}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        className: cn(sheetVariants({ side })),
      }}
    >
      {children}
    </Drawer>
  );
}

// ─────────────────────────────────────────────
// TRIGGER (аналог Radix SheetTrigger)
// ─────────────────────────────────────────────
interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactElement<
    { onClick?: React.MouseEventHandler<HTMLButtonElement> },
    any
  >;
  onOpen: () => void;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({
  asChild,
  children,
  onOpen,
}) => {
  if (asChild) {
    // ✅ Безпечно додаємо onClick
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        children.props.onClick?.(e);
        onOpen();
      },
    });
  }

  return (
    <button onClick={onOpen} type="button">
      {children}
    </button>
  );
};


// ─────────────────────────────────────────────
// INTERNAL COMPONENTS
// ─────────────────────────────────────────────
export const SheetHeader = ({
  title,
  description,
  onClose,
  className,
}: {
  title?: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-between p-4 border-b border-gray-200",
      className
    )}
  >
    <div className="flex flex-col">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    {onClose && (
      <IconButton onClick={onClose} size="small" className="hover:bg-gray-100">
        <X className="h-5 w-5" />
      </IconButton>
    )}
  </div>
);

export const SheetContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex-1 overflow-y-auto p-4", className)}>
    {children}
  </div>
);

export const SheetFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex justify-end gap-2 p-4 border-t border-gray-200",
      className
    )}
  >
    {children}
  </div>
);

export const SheetTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
);
