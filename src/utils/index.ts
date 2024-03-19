import type { GenericAccountId } from '@polkadot/types'

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^([a-zA-Z0-9]{8})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/

/**
 * Truncates an address to the format 00000000…00000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export function truncateAddress(address: string | GenericAccountId) {
  const match = (address.toString()).match(truncateRegex)
  if (!match)
    return address.toString()
  return `${match[1]}…${match[2]}`
}

export function truncate(str: string, left = 8, end = 5) {
  return `${str.substring(0, left)}…${str.substring(str.length - end)}`
}
