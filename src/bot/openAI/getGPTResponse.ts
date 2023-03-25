import { ChatCompletionRequestMessage } from 'openai'
import { initialMessage } from '../../config'
import prisma from '../../prisma'
import openai from './openai'

export const getGPTResponse = async () => {
  const previousMessages = await prisma.message.findMany({
    select: { id: false, role: true, content: true, createdAt: false },
    orderBy: {
      createdAt: 'asc',
    },
  })

  // @ts-ignore
  const messages: ChatCompletionRequestMessage[] = previousMessages

  if (initialMessage) {
    previousMessages.unshift({ role: 'assistant', content: initialMessage })
  }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    n: 1,
  })

  return completion.data.choices[0].message?.content || 'NO RESPONSE'
}
