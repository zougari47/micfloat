import { useEffect, useRef, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { load } from "@tauri-apps/plugin-store"
import { useMic } from "@/hooks/mic"
import { transcribeAudio } from "@/lib/speechmatics"
import { writeText } from "@tauri-apps/plugin-clipboard-manager"

type Status = "listening" | "processing" | "success" | "error"

export function OverlayApp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { getAudioBlob, stop } = useMic(canvasRef)
  const [status, setStatus] = useState<Status>("listening")
  const [errorMessage, setErrorMessage] = useState("")

  const closeOverlay = () => {
    setStatus("listening")
    setErrorMessage("")
    stop()
    invoke("toggle_overlay", { visible: false })
  }

  const handleSubmit = async () => {
    if (status !== "listening") return
    try {
      setStatus("processing")
      const store = await load("settings.json")
      const apiKey = await store.get<string>("api_key")
      if (!apiKey) {
        throw new Error("No API key found. Please set it in Settings.")
      }
      const blob = await getAudioBlob()
      const file = new File([blob], "recording.wav")
      const text = await transcribeAudio(file, apiKey)
      await writeText(text)
      setStatus("success")
      setTimeout(() => closeOverlay(), 500)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Transcription failed.")
      setStatus("error")
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay()
      if (e.key === "Enter") handleSubmit()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [status])

  if (status === "error")
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-background text-foreground rounded-2xl p-6 w-full max-w-[600px] shadow-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-error">
              Transcription Failed
            </h2>
            <button
              onClick={closeOverlay}
              className="text-muted-foreground hover:text-foreground transition text-sm"
            >
              ✕
            </button>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <p>{errorMessage}</p>
            <button
              onClick={() => {
                setStatus("listening")
                setErrorMessage("")
              }}
              className="mt-4 bg-muted px-3 py-1.5 rounded hover:bg-accent transition text-xs"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )

  if (status === "success")
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-background text-foreground rounded-2xl p-6 w-full max-w-[600px] shadow-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-success">
              Copied to Clipboard!
            </h2>
            <button
              onClick={closeOverlay}
              className="text-muted-foreground hover:text-foreground transition text-sm"
            >
              ✕
            </button>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <p>Text has been copied to your clipboard.</p>
          </div>
        </div>
      </div>
    )

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-background text-foreground rounded-2xl p-6 w-full max-w-[600px] shadow-2xl flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium text-muted-foreground">
            {status === "processing" ? "Processing..." : "Listening..."}
          </h2>
          <button
            onClick={closeOverlay}
            className="text-muted-foreground hover:text-foreground transition text-sm"
          >
            ✕
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={560}
          height={80}
          className="w-full rounded-lg bg-muted"
        />

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {status === "processing" ? "Transcribing audio..." : "Speak now"}
          </span>
          <span>
            <kbd className="bg-muted px-2 py-1 rounded">Enter</kbd> to submit
            &nbsp;&middot;&nbsp;
            <kbd className="bg-muted px-2 py-1 rounded">Esc</kbd> to cancel
          </span>
        </div>
      </div>
    </div>
  )
}
