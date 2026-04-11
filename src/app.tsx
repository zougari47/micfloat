import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Launch } from "@/components/launch"
import { Setup } from "@/components/setup"
import { Settings } from "@/components/settings"

export function App() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-[600px] space-y-6">
        <h1 className="text-xl font-semibold text-foreground">MicFloat</h1>

        <Tabs defaultValue="launch">
          <TabsList>
            <TabsTrigger value="launch">Launch</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="launch">
            <Launch />
          </TabsContent>
          <TabsContent value="setup">
            <Setup />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
