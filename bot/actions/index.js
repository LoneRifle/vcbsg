import { onStart } from './start'
import { onText } from './text'

export const addActions = bot => {
  bot.start(onStart)
  bot.on('text', onText)
}