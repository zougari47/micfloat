import * as React from "react"
import { Tabs } from "@base-ui-components/react"

const TabsRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Root>
>(({ className, ...props }, ref) => (
  <Tabs.Root
    ref={ref}
    className={`w-full ${className ?? ""}`}
    {...props}
  />
))
TabsRoot.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.List>
>(({ className, ...props }, ref) => (
  <Tabs.List
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full ${className ?? ""}`}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Tab>
>(({ className, ...props }, ref) => (
  <Tabs.Tab
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:shadow-sm flex-1 ${className ?? ""}`}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Panel>
>(({ className, ...props }, ref) => (
  <Tabs.Panel
    ref={ref}
    className={`mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className ?? ""}`}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent }
