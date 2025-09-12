import { Client } from "@gradio/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

export async function generateAudio(text: string): Promise<string> {
  try {
    const client = await Client.connect("NihalGazi/Text-To-Speech-Unlimited");
    const result = await client.predict("/text_to_speech_app", {
      prompt: text,
      voice: "shimmer",
      emotion: "calm",
      use_random_seed: true,
      specific_seed: 3,
    });

    const data = result?.data as Array<{ url: string }>;
    return data?.[0]?.url || "";
  } catch (err) {
    console.error("Audio generation failed:", err);
    return "";
  }
}
