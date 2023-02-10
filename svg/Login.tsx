type Props<T> = T

const Login = ({ classNames }: Props<any>) => {
  return (
    <svg
      className={classNames}
      width="30"
      height="30"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12" stroke="black" strokeWidth="0" />
      <circle cx="12.5" cy="10.5" r="5" stroke="black" />
      <path
        d="M21.5 19.5C21.5 20.4369 20.6801 21.4359 19.0035 22.2301C17.3649 23.0063 15.0662 23.5 12.5 23.5C9.93382 23.5 7.63506 23.0063 5.99653 22.2301C4.31986 21.4359 3.5 20.4369 3.5 19.5C3.5 18.5631 4.31986 17.5641 5.99653 16.7699C7.63506 15.9937 9.93382 15.5 12.5 15.5C15.0662 15.5 17.3649 15.9937 19.0035 16.7699C20.6801 17.5641 21.5 18.5631 21.5 19.5Z"
        stroke="black"
      />
    </svg>
  )
}

export default Login
