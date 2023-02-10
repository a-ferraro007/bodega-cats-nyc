import React from 'react'
import BoroughBadge from './BoroughBadge'

const NearbyList = ({ nearby }: any) => {
    return (
        <div>
            <ul className="mt-2">
                {nearby.length &&
                    nearby.map((feature: any) => {
                        //console.log(feature)
                        const { id, properties } = feature
                        const { address, name, locality } = properties

                        return (
                            <li
                                key={id}
                                className="my-4 cursor-pointer list-none rounded-[15px] border-[1px] border-[#dad8d2] px-4 py-6 transition-all duration-200 last:mb-0 hover:bg-[#f5f4f1]"
                                tabIndex={0}>
                                <span className="text-md block pb-1 font-nunito font-bold">
                                    {name}
                                </span>
                                <p className="mb-4 font-roboto text-xs font-normal  ">
                                    {' '}
                                    {address}
                                </p>
                                <div className="border-b-[1px] border-solid border-[#dad8d2]"></div>
                                {locality && (
                                    <div className="pt-4">
                                        <BoroughBadge locality={locality} />
                                    </div>
                                )}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default NearbyList
