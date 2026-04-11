import { BatchClient } from "@speechmatics/batch-client"

interface TranscriptionResult {
  results: Array<{
    alternatives?: Array<{ content: string }>
  }>
}

export async function transcribeAudio(
  file: File,
  API_KEY: string
): Promise<string> {
  const client = new BatchClient({
    apiKey: API_KEY,
    appId: "micfloat",
  })

  const response = await client.transcribe(
    file,
    {
      transcription_config: {
        language: "en",
        operating_point: "enhanced",
      },
    },
    "json-v2"
  )

  const result = response as TranscriptionResult
  const text = result.results.map((r) => r.alternatives?.[0]?.content).join(" ")

  return text
}
