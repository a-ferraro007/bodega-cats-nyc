import { useEffect, useState } from 'react'
import { useSetHeight } from '../../hooks'

const Layout = ({ children }: any) => {
  const height = useSetHeight()
  const [styleHeight, setStyleHeight] = useState<any>({
    height: height ? `${height}px` : '100vh',
  })

  useEffect(() => {
    const s = {
      height: height ? `${height}px` : '100vh',
    }
    setStyleHeight(s)
  }, [height, setStyleHeight])

  return <div style={styleHeight}>{children}</div>
}

export default Layout
