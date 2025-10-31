"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';

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
      side: 'left',
    },
  }
);

const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

interface SheetProps extends VariantProps<typeof sheetVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  side = 'left',
  children,
}: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export const SheetTrigger = React.forwardRef<HTMLElement, SheetTriggerProps>(
  ({ asChild, children }, ref) => {
    const { onOpenChange } = React.useContext(SheetContext);

    if (asChild) {
      return React.cloneElement(children, {
        ...children.props,
        ref,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e);
          onOpenChange(true);
        },
      });
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={() => onOpenChange(true)}
        type="button"
      >
        {children}
      </button>
    );
  }
);

SheetTrigger.displayName = "SheetTrigger";

interface SheetContentProps extends VariantProps<typeof sheetVariants> {
  children: React.ReactNode;
  className?: string;
}

export const SheetContent = ({
  children,
  className,
  side = 'left',
}: SheetContentProps) => {
  const { open, onOpenChange } = React.useContext(SheetContext);

  return (
    <Drawer
      anchor={side ?? 'left'}
      open={open}
      onClose={() => onOpenChange(false)}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        className: cn(sheetVariants({ side }), className),
      }}
    >
      <div className="flex flex-col h-full">
        {children}
        <div className="mt-auto p-4 border-t">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X className="w-4 h-4" />
            Close Menu
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export const SheetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col space-y-2 p-6 border-b",
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
  <h2 className={cn("text-lg font-semibold", className)}>
    {children}
  </h2>
);

export const SheetDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
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
      "flex justify-end gap-2 p-4 border-t",
      className
    )}
  >
    {children}
  </div>
);