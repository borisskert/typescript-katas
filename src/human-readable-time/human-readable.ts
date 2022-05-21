/**
 * https://www.codewars.com/kata/52685f7382004e774f0001f7/train/typescript
 */
export function humanReadable (seconds: number): string {
  const secondsPart = seconds % SECONDS_PER_MINUTE
  const minutes = (seconds - secondsPart) / SECONDS_PER_MINUTE
  const minutesPart = minutes % MINUTES_PER_HOUR
  const hours = (minutes - minutesPart) / MINUTES_PER_HOUR

  return `${padZeros(hours)}:${padZeros(minutesPart)}:${padZeros(secondsPart)}`
}

const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

const padZeros = (n: number): string => {
  return String(n).padStart(2, '0')
}
