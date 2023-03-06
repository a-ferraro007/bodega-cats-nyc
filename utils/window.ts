export const getHeight = () => {
  if (!isClient()) return null
  return {
    height: `${innerHeight}px`,
  }
}

export const isClient = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
