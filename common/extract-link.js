
const linkRegexp = /https:\/\/app.shopback.com\/\w+/
export const extractLink = text => {
  const [ link ] = linkRegexp.exec(text) || []
  return link
}
