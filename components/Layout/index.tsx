import { useSetHeight } from '../../hooks'

const Layout = ({ children }: any) => {
  const height = useSetHeight()
  const styleHeight = {
    height: height ? `${height}px` : '100vh',
  }
  return <div style={styleHeight}>{children}</div>
}

export default Layout
