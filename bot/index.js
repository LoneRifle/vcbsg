import { addActions } from './actions'

const { Telegraf } = require('telegraf')

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided!')
}

const chatId = process.env.TELEGRAM_CHAT_ID
if (!chatId) {
  throw new Error('TELEGRAM_CHAT_ID must be provided!')
}

export const bot = new Telegraf(token, {
  telegram: { webhookReply: true }
})

addActions(bot)