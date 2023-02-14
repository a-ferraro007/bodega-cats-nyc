type Props<T> = T // WHY?

const Login = ({ classNames }: Props<any>) => {
  return (
    <svg
      className={classNames}
      fill="#000000"
      width="25"
      height="25"
      viewBox="0 0 24 24"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z"></path>
      </g>
    </svg>
  )
}

export default Login
