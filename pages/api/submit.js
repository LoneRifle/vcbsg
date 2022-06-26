import path from 'path'
import { bot } from 'bot'

// Expected path for API handler. Keep consistent with file structure
const API_PATH = 
  '/' + path.relative(__dirname+'/..', __filename).replace(/\..*$/, '')

export default bot.webhookCallback(API_PATH)
