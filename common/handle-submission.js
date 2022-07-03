import { kv, extractLink, parseMetadata } from 'common'

const { TELEGRAM_CHAT_ID } = process.env

export const handleSubmission = async (text, { telegram, onError }) => {
  try {
    const link = extractLink(text)
    if (!link) {
      onError(
        'No valid ShopBack voucher link was given.\n' +
        'Either there was no link, the link is invalid,\n' +
        'or the link has been shared before.'
      )
      return
    }
    const metadata = await parseMetadata(link)
    if (!metadata) {
      onError(
        'Unable to look up information about the voucher.\n' +
        'The link may not be for a voucher (eg, a referral link).'
      )
      return
    }
    const exists = await kv.exists(link)
    if (exists) {
      onError(
        'This voucher link has already been shared.'
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
    await kv.put(link)
  } catch (error) {
    console.error(error)
    onError(`The following unexpected error occurred: ${error.message}`)
  }
}
