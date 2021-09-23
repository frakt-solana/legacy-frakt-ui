export const randomItem = (array: Array<any>) =>
  array[Math.floor(Math.random() * array.length)]

export const nextItem = (array: Array<any>, currentItem: any) => {
  const currentIndex = array.indexOf(currentItem)
  const bound = array.length
  const nextIndex = (currentIndex + bound + 1) % bound
  return array[nextIndex]
}
