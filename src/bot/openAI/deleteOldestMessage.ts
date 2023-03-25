import { memorizedMessages } from '../../config'
import prisma from '../../prisma'

const deleteOldestMessage = async () => {
  const messageCount = await prisma.message.count()

  if (messageCount >= memorizedMessages) {
    const oldestMessage = await prisma.message.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (!oldestMessage) {
      throw new Error('No oldest message found')
    }

    await prisma.message.delete({
      where: {
        id: oldestMessage.id,
      },
    })
  }
}

export default deleteOldestMessage
