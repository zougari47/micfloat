import { useEffect, useState } from "react"
import { load } from "@tauri-apps/plugin-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STORE_NAME = "settings.json"
const API_KEY_KEY = "api_key"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export function Settings() {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [status, setStatus] = useState<SaveStatus>("idle")

  useEffect(() => {
    const loadKey = async () => {
      try {
        const store = await load(STORE_NAME)
        const key = await store.get<string>(API_KEY_KEY)
        if (key) setApiKey(key)
      } catch {
        // store doesn't exist yet, that's fine
      }
    }
    loadKey()
  }, [])

  const handleSave = async () => {
    try {
      setStatus("saving")
      const store = await load(STORE_NAME)
      await store.set(API_KEY_KEY, apiKey)
      await store.save()
      setStatus("saved")
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-foreground">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your MicFloat preferences.
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="api-key"
          className="text-sm font-medium text-foreground"
        >
          Speechmatics API Key
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <Button
            onClick={handleSave}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving..." : "Save"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Your API key is stored locally on your device.
        </p>
        {status === "saved" && (
          <p className="text-xs text-success">API key saved successfully.</p>
        )}
        {status === "error" && (
          <p className="text-xs text-error">Failed to save API key.</p>
        )}
      </div>
    </div>
  )
}
