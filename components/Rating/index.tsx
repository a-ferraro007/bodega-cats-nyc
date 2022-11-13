import { useState } from 'react'

enum KittyRanking {
  'Bad Kitty' = 1,
  'Ok Kitty' = 2,
  'Good Kitty' = 3,
  'Great Kitty' = 4,
  'Best Kitty' = 5
}

const Rating = ({ rating, hover, setRating, setHover }: any) => {
  return (
    <div className="h-12">
      <div className="flex flex-row justify-center">
        {[...new Array(5)].map((e, i) => {
          i++
          return (
            <button
              className="p-[2px]"
              onClick={(e) => {
                e.preventDefault()
                setRating(i)
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(rating)}
              key={i}
            >
              <svg
                className={`stroke-1 ${
                  i <= (hover || rating) ? 'stroke-primaryGold fill-primaryGold' : 'stroke-graphite'
                }`}
                width="25"
                height="25"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.9755 3.84549L15.5 2.38197L15.0245 3.84549L12.3303 12.1373H3.61179H2.07295L3.3179 13.0418L10.3713 18.1664L7.67716 26.4582L7.20163 27.9217L8.44658 27.0172L15.5 21.8926L22.5534 27.0172L23.7984 27.9217L23.3228 26.4582L20.6287 18.1664L27.6821 13.0418L28.927 12.1373H27.3882H18.6697L15.9755 3.84549Z" />
              </svg>
            </button>
          )
        })}
      </div>
      <span className="text-md font-baloo font-bold text-center block">
        {KittyRanking[hover || rating]}
      </span>
    </div>
  )
}

export default Rating
