import { ReactNode } from 'react'
import { useSetHeight } from '../hooks'
type LayoutProps = {
  children: ReactNode
}

const LayoutProvider = ({ children }: LayoutProps) => {
  const height = useSetHeight()
  if (!height) return <></>
  return <div style={height}>{children}</div>
}

export default LayoutProvider
