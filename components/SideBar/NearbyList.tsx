import React from 'react'
import BoroughBadge from './BoroughBadge'

const NearbyList = ({ nearby }: any) => {
  return (
    <div>
      <p className="font-nunito font-bold text-lg">Nearby</p>
      <div>
        {nearby &&
          nearby.map((feature: any) => {
            console.log(feature)
            const { id, properties } = feature
            const { address, name, locality } = properties

            return (
              <li
                key={id}
                className="my-4 px-4 py-6 cursor-pointer border-[1px] border-[#dad8d2] rounded-[15px] hover:bg-[#f5f4f1] transition-all duration-200 last:mb-0 list-none"
                tabIndex={0}
              >
                <span className="block font-nunito font-bold text-md pb-1">{name}</span>
                <p className="font-roboto font-normal text-xs mb-4  "> {address}</p>
                <div className="border-b-[1px] border-solid border-[#dad8d2]"></div>
                {locality && (
                  <div className="pt-4">
                    <BoroughBadge locality={locality} />
                  </div>
                )}
              </li>
            )
          })}
      </div>
    </div>
  )
}

export default NearbyList
