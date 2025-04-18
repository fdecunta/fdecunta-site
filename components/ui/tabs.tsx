"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";

type TabsContextType = { value: string; setValue: (value: string) => void };
const TabsContext = createContext<TabsContextType | null>(null);

function Tabs({ defaultValue, children, className }: { defaultValue: string; children: ReactNode; className?: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="tablist" className={className}> {children} </div>
  );
}

function TabsTrigger({ value: tabValue, children, className }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = ctx.value === tabValue;
  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      className={className}
      onClick={() => ctx.setValue(tabValue)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value: contentValue, children, className }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  return ctx.value === contentValue ? (
    <div role="tabpanel" className={className}>{children}</div>
  ) : null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
