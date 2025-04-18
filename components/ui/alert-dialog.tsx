"use client"

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Minimal custom AlertDialog implementation (no Radix UI)
function AlertDialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);
  return <>{children}</>;
}

const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertDialogContent({ children, className = "", ...props }, ref) {
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (contentRef.current) contentRef.current.focus();
    }, []);
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/80"
          aria-hidden="true"
          onClick={props.onClick as any}
        />
        <div
          ref={ref || contentRef}
          tabIndex={-1}
          className={
            "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg " +
            className
          }
          role="alertdialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertDialogTitle({ className = "", ...props }, ref) {
    return (
      <div ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
    );
  }
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertDialogDescription({ className = "", ...props }, ref) {
    return (
      <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
    );
  }
);
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function AlertDialogAction({ className = "", ...props }, ref) {
    return (
      <button ref={ref} className={cn(buttonVariants(), className)} {...props} />
    );
  }
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function AlertDialogCancel({ className = "", ...props }, ref) {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} {...props} />
    );
  }
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
