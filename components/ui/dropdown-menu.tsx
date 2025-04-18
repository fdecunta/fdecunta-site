"use client"


// Minimal custom DropdownMenu implementation (no Radix UI)
import { useState, useRef, useEffect, createContext, useContext, ReactNode, HTMLAttributes, forwardRef } from "react";
// Minimal custom DropdownMenu implementation (no Radix UI)

// DropdownMenu context to manage open state
const DropdownMenuContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
} | null>(null);

function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !(document.getElementById("dropdown-content")?.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div style={{ display: "inline-block", position: "relative" }}>{children}</div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  return (
    <button
      ref={ctx.triggerRef}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...props}
    >
      {children}
    </button>
  );
}

const DropdownMenuContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DropdownMenuContent(
  { children, style, ...props }, ref
) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenuContent must be used within DropdownMenu");
  return ctx.open ? (
    <div
      id="dropdown-content"
      ref={ref}
      role="menu"
      tabIndex={-1}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        minWidth: 160,
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        zIndex: 1000,
        marginTop: 4,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ) : null;
});

const DropdownMenuItem = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function DropdownMenuItem(
  { children, style, ...props }, ref
) {
  return (
    <button
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      style={{
        display: "block",
        width: "100%",
        padding: "0.5rem 1rem",
        background: "none",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "1rem",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
