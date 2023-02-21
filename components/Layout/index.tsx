import { useEffect, useState } from 'react'
import { useIsMobile, useSetHeight } from '../../hooks'

const Layout = ({ children }: any) => {
  const height = useSetHeight()
  const isMobile = useIsMobile()
  const [styleHeight, setStyleHeight] = useState<any>({
    height: height && isMobile ? `${height}px` : '100vh',
  })

  useEffect(() => {
    setStyleHeight({
      height: height && isMobile ? `${height}px` : '100vh',
    })
  }, [height, setStyleHeight, isMobile])

  if (!isMobile) {
    return <div style={{ height: '100vh' }}>{children}</div>
  }

  return <>{height ? <div style={styleHeight}>{children}</div> : <></>}</>
}

export default Layout
