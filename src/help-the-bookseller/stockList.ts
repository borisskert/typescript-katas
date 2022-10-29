/**
 * https://www.codewars.com/kata/54dc6f5a224c26032800005c/train/typescript
 */
export const stockList = (listOfArt: string[], listOfCat: string[]): string => {
  if (listOfArt.length < 1) {
    return ''
  }

  const stock: Stock = listOfArt
    .map(toStockItem)
    .reduce(pushInto, {})

  function friendlyFormat (category: string): string {
    const quantity = stock[category] ?? 0
    return `(${category} : ${quantity})`
  }

  return listOfCat
    .map(friendlyFormat)
    .join(' - ')
}

interface Stock {
  [key: string]: number
}

function pushInto (stock: Stock, item: StockItem): Stock {
  const stockQuantity = stock[item.category] ?? 0

  return {
    ...stock,
    [item.category]: item.quantity + stockQuantity,
  }
}

interface StockItem {
  category: string
  quantity: number
}

function toStockItem (input: string): StockItem {
  const [, parsedCategory, parsedQuantity] = /([A-Z])[A-Z]+ ([0-9]+)/.exec(input) ?? []

  const category = parsedCategory ?? ''
  const quantity = Number.parseInt(parsedQuantity ?? '0')

  return { category, quantity }
}
