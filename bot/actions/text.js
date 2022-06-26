import { extractLink, parseMetadata } from 'common'

const { TELEGRAM_CHAT_ID } = process.env

export const onText = async ctx => {
  try {
    const { telegram, update: { message: { text } } } = ctx
    const link = extractLink(text)
    if (!link) {
      ctx.reply(
        'No valid ShopBack voucher link was given.\n' + 
        'Either there was no link, the link is invalid,\n' +
        'or the link has been shared before.'
      )
      return
    }
    const metadata = await parseMetadata(link)
    if (!metadata) {
      ctx.reply(
        'Unable to look up information about the voucher.\n' + 
        'The link may not be for a voucher (eg, a referral link).'
      )
      return
    }
    const { cashback, amount, merchant } = metadata
    await telegram.sendMessage(
      TELEGRAM_CHAT_ID,
      // Escape . to appease MarkdownV2 parser
      `
*Merchant:* ${merchant.replace(/\./g, '\\.')}
*Amount:* ${amount.replace(/\./g, '\\.')}
*Cashback:* ${cashback.replace(/\./g, '\\.')}
${link.replace(/\./g, '\\.')}
      `, 
      { parse_mode: 'MarkdownV2', disable_web_page_preview: true }
    )
  } catch (error) {
    console.error(error)
    ctx.reply(`The following unexpected error occurred: ${error.message}`)
  }
}