export const getHeight = () => {
  if (!isClient()) return null
  return window.innerHeight
}

export const isClient = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
