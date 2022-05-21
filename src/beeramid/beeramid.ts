/**
 * https://www.codewars.com/kata/51e04f6b544cf3f6550000c1/train/typescript
 */
export function beeramid (bonus: number, price: number): number {
  const amount = bonus / price

  function countLevels (sum = 0, level = 0): number {
    const nextLevel = level + 1
    const nextSum = sum + nextLevel * nextLevel

    if (nextSum > amount) {
      return level
    }

    return countLevels(nextSum, nextLevel)
  }

  return countLevels()
}
