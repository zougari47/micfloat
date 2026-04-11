import { useEffect, useRef, useCallback } from "react"
import { encodeWAV } from "@/lib/utils"

export function useMic(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animRef = useRef<number>(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const recordedChunksRef = useRef<Float32Array[]>([])
  const processorRef = useRef<ScriptProcessorNode | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !analyserRef.current) return

    const ctx = canvas.getContext("2d")!
    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    const barWidth = 3
    const gap = 2
    const barCount = Math.floor(canvas.width / (barWidth + gap))

    const render = () => {
      animRef.current = requestAnimationFrame(render)
      analyser.getByteFrequencyData(dataArray)

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--ring").trim() || "#818cf8"

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * bufferLength)
        const value = dataArray[dataIndex]
        const barHeight = Math.max(4, (value / 255) * h * 0.9)
        const x = i * (barWidth + gap)
        const y = (h - barHeight) / 2
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, 1)
        ctx.fill()
      }
    }

    render()
  }, [canvasRef])

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx

      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      source.connect(analyser)
      analyserRef.current = analyser

      //  record using ScriptProcessor instead of MediaRecorder
      const processor = audioCtx.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor
      recordedChunksRef.current = []

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0)
        recordedChunksRef.current.push(new Float32Array(input))
      }

      source.connect(processor)
      processor.connect(audioCtx.destination)

      draw()
    } catch (e) {
      console.error("Mic error:", e)
    }
  }, [draw])

  const stop = useCallback(() => {
    cancelAnimationFrame(animRef.current)
    processorRef.current?.disconnect()
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }, [])

  const getAudioBlob = useCallback((): Promise<Blob> => {
    return new Promise((resolve) => {
      const audioCtx = audioCtxRef.current
      const chunks = recordedChunksRef.current

      // merge all chunks into one Float32Array
      const totalLength = chunks.reduce((sum, c) => sum + c.length, 0)
      const merged = new Float32Array(totalLength)
      let offset = 0
      for (const chunk of chunks) {
        merged.set(chunk, offset)
        offset += chunk.length
      }

      const blob = encodeWAV(merged, audioCtx?.sampleRate ?? 48000)
      resolve(blob)
    })
  }, [])

  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  return { start, stop, getAudioBlob }
}
