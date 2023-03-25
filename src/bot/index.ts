import { token, chatId } from '../config'
import TelegramBot from 'node-telegram-bot-api'
import { getGPTResponse, AddMessage } from './openAI'
import generateDalleImage from './openAI/generateDalleImage'

const bot = async () => {
  const bot = new TelegramBot(token, { polling: true })

  bot.onText(/\/dalle (.+)/, async (msg, match) => {
    try {
      if (`${msg.chat.id}` !== chatId || !match) return

      const imageURL = await generateDalleImage(match[1])

      if (!imageURL) {
        await bot.sendMessage(msg.chat.id, 'Something went wrong!')
        return
      }

      await bot.sendPhoto(msg.chat.id, imageURL, {
        caption: `Download image from <a href="${imageURL}">here</a>`,
        parse_mode: 'HTML',
      })
    } catch (err: any) {
      console.error(err)
      await bot.sendMessage(
        msg.chat.id,
        `${err.message || 'Something went wrong!'}`
      )
    }
  })

  bot.on('message', async (msg) => {
    try {
      if (
        `${msg.chat.id}` !== chatId ||
        !msg.text ||
        (!msg.text.includes('gpt') && !msg.text.includes('جي بي تي'))
      ) {
        return
      }

      const messageContent = `${msg.from?.username}: ${msg.text}`
      await AddMessage('user', messageContent)

      const gptResponse = await getGPTResponse()
      if (!gptResponse) return

      await bot.sendMessage(msg.chat.id, gptResponse)
      await AddMessage('assistant', gptResponse)
    } catch (error) {
      console.error(error)
      await bot.sendMessage(msg.chat.id, 'Something went wrong!')
    }
  })
}

export default bot
