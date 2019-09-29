export function formatTitle(txt) {
  if (txt.length > 26) {
    return txt.substring(0, 25) + '...'
  }
  return txt
}
