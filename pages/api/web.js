import { handleSubmission } from 'common'
import { bot } from 'bot'

const { telegram } = bot

export default async (req, res) => {
  const onError = message => { 
    throw new Error(message)
  }
  try {
    await handleSubmission(req.body, { telegram, onError })
    res.json({ message: "Submission successful" })
  } catch (error) {
    const message = error.message.replace('The following unexpected error occurred: ', '')
    res.status(400).json({ message })
  }
}