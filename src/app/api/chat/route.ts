import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import linkedin from "../../../../public/linkedin_json.json"
import resume from "../../../../public/resume_json.json"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const name="Ethan Wiegert"
  console.log(resume)
  console.log(linkedin)
  const result = streamText({
    model: openai('o4-mini'),
    messages,
    system: ``
  });
  console.log(result)
  return result.toDataStreamResponse();

}