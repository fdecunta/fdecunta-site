"use client"


// Minimal custom Dialog implementation (no Radix UI)
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// Minimal custom Dialog implementation (no Radix UI)
function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);
  return <>{children}</>;
}

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogContent({ children, className = "", ...props }, ref) {
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (contentRef.current) contentRef.current.focus();
    }, []);
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/50"
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
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
DialogContent.displayName = "DialogContent";

const DialogClose = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" aria-label="Close dialog" {...props}>{children}</button>
);


const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<HTMLDivElement>,
  React.ComponentPropsWithoutRef<typeof HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  React.ElementRef<HTMLDivElement>,
  React.ComponentPropsWithoutRef<typeof HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
