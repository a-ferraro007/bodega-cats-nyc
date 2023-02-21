import { ReactNode, useEffect, useState } from 'react'
import { useSetHeight } from '../../hooks'
type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const height = useSetHeight()
  return <>{height ? <div style={height}>{children}</div> : <></>}</>
}

export default Layout
