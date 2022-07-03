import { handleSubmission } from 'common'

export const onText = async ctx => {
  const { telegram, update: { message: { text } } } = ctx
  const onError = message => ctx.reply(message)
  await handleSubmission(text, { telegram, onError })
}
