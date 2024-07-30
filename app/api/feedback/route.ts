import OpenAI from 'openai'
import { NextResponse } from 'next/server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

type Prompt = {
  prompt: string
}

export const runtime = 'edge'

export async function POST(req: Request): Promise<Response> {
  try {
    const {prompt: studentWriting, learningOutcomes, markingCriteria, promptType } = await req.json()
    let generatePrompt: string;
    
    if (promptType === "feedback") {
      generatePrompt = "Generate a 110 world paragraph feedback not a list.";
    } else {
      generatePrompt = "Grade the student writing, typically in terms of grade standard, e.g., grade A, B, C, D, E. Not give any feedback";
    }

    const feedbackStruct = "According to Level of understanding demonstrated by the student, e.g., extensive, thorough, sound, basic, elementary. Level of competence in identifying and gathering information, e.g., very high, high, adequate, limited, very limited. Description of the report format used, e.g., well-organized, appropriately structured, brief, etc. Content Details: Were examples provided? Were they effective or lacking? Understanding of specific concepts, e.g., differences between cultural and physical listings, economic impacts, etc. Use of appropriate terminology and whether it was lacking? Suggestions for strengthening the work, e.g., better structuring, more detailed explanations, use of specific terminology. Also based on the learning outcomes and marking criteria provided."
    
    console.log(studentWriting, learningOutcomes, markingCriteria);

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system:
        'You are a high school teacher.',
      messages: [
        {
          role: 'user',
          content: `You are a high school teacher which is responsible for teaching Geography.
          Here is the student writing: ${studentWriting}.
          Here is the expected learning outcomes: ${learningOutcomes}.
          Here is the marking criteria: ${markingCriteria}.
          Here is points you need to consider: ${feedbackStruct}.
          You need to: ${generatePrompt}.
          `
        }
      ],
      temperature: 0.5
    })

    return result.toAIStreamResponse();
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}