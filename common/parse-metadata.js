import fetch from 'node-fetch'

const MOBILE_AGENT = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36'
const BRANCH_DATA_PREFIX='S.branch_data='

export const parseIntent = location => {
  const [ intentURI, intentMetadata ] = location.split('#')
  const parsedIntentURI = new URL(intentURI)
  const [ , merchant, amount ] = parsedIntentURI.pathname.split('_')
  const serializedBranchData = intentMetadata
    .split(';')
    .find(s => s.startsWith(BRANCH_DATA_PREFIX))
    .replace(BRANCH_DATA_PREFIX, '')
  
  const branchData = JSON.parse(decodeURIComponent(serializedBranchData))
  const [ cashback ] = /\d+(\.\d+)?%/.exec(branchData.$og_title) || []
  
  return {
    cashback,
    merchant, 
    amount,
  }
}

export const parseMetadata = async link => {
  const appLinkResponse = await fetch(link, { redirect: 'manual', headers: { 'user-agent': MOBILE_AGENT } })
  const appLink = appLinkResponse.headers.get('location')

  const response = await fetch(appLink, { redirect: 'manual', headers: { 'user-agent': MOBILE_AGENT } })
  const location = response.headers.get('location')

  if (!location || !location.startsWith('intent://ecommerce/checkout/')) {
    return null
  }

  return parseIntent(location)
}
