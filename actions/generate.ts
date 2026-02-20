"use server";

import Groq from "groq-sdk";

export async function generateLinkedInPost(params: {
  topic: string;
  contentType: string;
  industry: string;
  tone: string;
}) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // HIGHLY RESTRICTED PROMPT DESIGN
    const prompt = `
      You are an elite, top-tier LinkedIn ghostwriter for a technical startup founder.
      Write a viral-ready LinkedIn post based on these exact parameters:
      
      Topic: ${params.topic}
      Format: ${params.contentType}
      Industry Focus: ${params.industry}
      Tone of Voice: ${params.tone}
      
      STRICT RULES:
      1. MAXIMUM LENGTH: 120 words. Be ruthlessly concise.
      2. No corporate jargon. Speak like a blunt, experienced hacker/founder.
      3. Start with a 1-sentence scroll-stopping hook.
      4. Use heavy line breaks (white space) between every single sentence.
      5. Include exactly 2 relevant hashtags at the bottom.
      6. Do NOT use emojis unless the tone specifically asks for them.
      7. OUTPUT ONLY THE POST. No introductions, no metadata, no conversational filler.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.6, // Lowered temperature for tighter, less rambling output
      max_tokens: 500,
      top_p: 1,
    });

    return {
      success: true,
      content:
        chatCompletion.choices[0]?.message?.content?.trim() ||
        "Generation failed.",
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    return { success: false, error: "Failed to connect to AI engine." };
  }
}
