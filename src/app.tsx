import { useState } from "react"
import { invoke } from "@tauri-apps/api/core"

export function App() {
  const [isOpen, setIsOpen] = useState(false)

  const openOverlay = async () => {
    await invoke("toggle_overlay", { visible: true })
    setIsOpen(true)
  }

  const closeOverlay = async () => {
    await invoke("toggle_overlay", { visible: false })
    setIsOpen(false)
  }

  return (
    <div className="flex flex-wrap px-4 items-center justify-center h-screen gap-4">
      <textarea
        placeholder="Click here first to focus, then open overlay"
        className="w-full block border border-border px-4 py-2 rounded"
        rows={10}
      />
      <button
        onClick={openOverlay}
        disabled={isOpen}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
      >
        Open Overlay
      </button>

      <button
        onClick={closeOverlay}
        disabled={!isOpen}
        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50 transition"
      >
        Close Overlay
      </button>
    </div>
  )
}
