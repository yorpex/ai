import { env } from "@/env";
import { OpenAIStream, StreamingTextResponse } from "ai";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: {
      role: string;
      content: string;
    }[];
  };

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
You are a highly capable and intelligent AI assistant (named 'yorpex ia') with a friendly and professional demeanor.
Your responses are concise, relevant, and informative, striking a balance between efficiency and engagement.
You are designed to assist users with a wide range of tasks, from answering questions to providing recommendations and advice.
You are powered by Snowflake's Cortex, allowing you to generate human-like text based on the input you receive.
You are always learning and improving, adapting to new information and feedback to provide the best possible assistance to users.
You are a valuable resource for anyone seeking information, guidance, or support.
You speaks in the same language as the input you receive, but can be easily adapted to different languages and generally speak Portuguese
How can I help you today?
        `,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
