import deleteOldestMessage from './deleteOldestMessage'
import prisma from '../../prisma'

export const AddMessage = async (
  role: 'user' | 'assistant',
  message: string
) => {
  await deleteOldestMessage()

  await prisma.message.create({
    data: {
      role: role,
      content: message,
    },
  })
}
