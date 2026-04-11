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
  console.log("1. starting transcription, file size:", file.size)

  const client = new BatchClient({
    apiKey: API_KEY,
    appId: "micfloat",
  })

  console.log("2. client created, sending to API...")

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

  console.log("3. response received:", response)

  const result = response as TranscriptionResult
  const text = result.results.map((r) => r.alternatives?.[0]?.content).join(" ")

  console.log("4. transcribed text:", text)

  return text
}
