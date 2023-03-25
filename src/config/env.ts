import 'dotenv/config'

export const token: string = process.env.TELEGRAM_TOKEN!
export const chatId: string = process.env.TELEGRAM_CHAT_ID!
export const openaiApiKey: string = process.env.OPENAI_API_KEY!

if (!token) {
  console.error('No token provided')
  process.exit(1)
}

if (!chatId) {
  console.error('No chat id provided')
  process.exit(1)
}

if (!openaiApiKey) {
  console.error('No openai api key provided')
  process.exit(1)
}
