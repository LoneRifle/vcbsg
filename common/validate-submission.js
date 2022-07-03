import { extractLink, parseMetadata } from 'common'

export const validateSubmission = async (text, onError) => {
  const link = extractLink(text)
  if (!link) {
    onError(
      'No valid ShopBack voucher link found.\n' +
      'The link is either missing or invalid.'
    )
    return {}
  }
  const metadata = await parseMetadata(link)
  if (!metadata) {
    onError(
      'Unable to look up info about the voucher.\n' +
      'The link may not be for a voucher (eg, a referral link).'
    )
    return {}
  }
  return { link, metadata }
}