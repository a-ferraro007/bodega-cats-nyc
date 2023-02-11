import React from 'react'

const SearchIcon = ({ color = 'white', width = 25, height = 25 }) => {
  //console.log({ color })

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="3.5" stroke={color} />
      <path
        d="M11.5463 10.5972C11.8761 10.8478 12.3466 10.7836 12.5972 10.4537C12.8478 10.1239 12.7836 9.65343 12.4538 9.40283L11.5463 10.5972ZM6.54623 6.79795L11.5463 10.5972L12.4538 9.40283L7.45374 5.60361L6.54623 6.79795Z"
        fill={color}
      />
    </svg>
  )
}

export default SearchIcon
