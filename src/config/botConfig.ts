import fs from 'fs'

export interface BotConfig {
  memorizedMessages?: number
  initialMessage?: string
}

const userConfig = JSON.parse(fs.readFileSync('bot.config.json', 'utf8'))

const botConfig: BotConfig = { ...userConfig }

export const memorizedMessages = botConfig.memorizedMessages || 25
export const initialMessage = botConfig.initialMessage || null
