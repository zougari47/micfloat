import { invoke } from "@tauri-apps/api/core"
import { Button } from "@/components/ui/button"

export function Launch() {
  const openOverlay = async () => {
    await invoke("toggle_overlay", { visible: true })
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-foreground">
          Ready to transcribe
        </h3>
        <p className="text-sm text-muted-foreground">
          Launch the MicFloat overlay to start transcribing your speech to text.
        </p>
      </div>
      <Button onClick={openOverlay} size="lg">
        Open Overlay
      </Button>
      <p className="text-xs text-muted-foreground">
        Or use your keyboard shortcut to launch directly.
      </p>
    </div>
  )
}
