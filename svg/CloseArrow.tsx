import React from 'react'

const CloseArrow = ({ rotate = 'rotate(0)' }) => {
  return (
    <svg
      width={40}
      height={40}
      transform={rotate}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g stroke-width="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        {' '}
        <path
          d="M16 12L8 12"
          stroke="#242424"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M13 15L15.913 12.087V12.087C15.961 12.039 15.961 11.961 15.913 11.913V11.913L13 9"
          stroke="#242424"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}

export default CloseArrow
