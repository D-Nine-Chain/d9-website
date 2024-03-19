// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^([a-zA-Z0-9]{8})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/

/**
 * Truncates an address to the format 00000000…00000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export function truncateAddress(address: string) {
  const match = address.match(truncateRegex)
  if (!match)
    return address
  return `${match[1]}…${match[2]}`
}
