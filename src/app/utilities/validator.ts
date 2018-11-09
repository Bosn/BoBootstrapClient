export function vText(val: string | number | undefined) {
  if (typeof val === 'string') {
    return !!val.trim()
  } else if (typeof val === 'number') {
    return val > 0
  } else if (val === null || val === undefined) {
    return false
  } else {
    throw new Error('Unexpected val type')
  }
}
