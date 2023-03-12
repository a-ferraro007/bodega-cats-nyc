import Image from 'next/image'
import BoroughBadge from '../BoroughBadge'
import { ListCardProps } from '../../../constants/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ListCard = ({ feature, classNames }: ListCardProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const { id, MapBox_Feature, name, locality, image: src } = feature
  const { address } = MapBox_Feature[0]
  const { listItem, cardContainer } = classNames

  const Variants = {
    button: {
      key_down: {
        boxShadow:
          'inset 1px 1px 3px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.05)',
        scale: 0.99,
        //outlineOffset: '1px',
        //outlineColor: 'hsl(0, 3%, 72%)',
      },
      key_up: { boxShadow: '0 2px 4px rgba(0,0,0,.05)' },
      //focus: {
      //  outlineOffset: '5px',
      //  outlineColor: 'hsl(0, 3%, 72%)',
      //},
    },
  }

  return (
    <li className={`${listItem}`} onClick={() => setIsClicked(!isClicked)}>
      <motion.button
        layout
        initial={'key_up'}
        whileTap={'key_down'}
        //whileFocus={'focus'}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, ease: 'linear', duration: 0.125 }}
        variants={Variants.button}
        key={`list-button-press-${id}`}
        className={`m-0 flex cursor-pointer gap-2 self-start rounded-default text-left transition-all duration-300 ${cardContainer} border-[rgba(0,0,0,.08)]] max-h-[16rem] border bg-white p-3`}
        tabIndex={0}
      >
        <div className="flex-grow rounded-b-default">
          <div className="px-3 py-2">
            <span className="text-md block pb-1 font-nunito font-bold">
              {name}
            </span>
            <p className="mb-2 font-roboto text-xs font-normal"> {address}</p>
            <div className=" border-b-[.5px] border-solid border-graphite transition-all duration-300 "></div>
            {locality && (
              <div className="pt-2">
                <BoroughBadge locality={locality} />
              </div>
            )}
          </div>
        </div>
        {src && (
          <div className="relative h-[7rem] w-full max-w-[7rem] flex-grow overflow-hidden rounded-[10px]">
            <Image
              className="h-full w-full object-cover"
              alt="feature image"
              src={src}
              //placeholder="blur"
              fill
            />
            <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[inset_0px_0px_0px_2px_rgba(0,0,0,.1)] "></div>
          </div>
        )}
      </motion.button>
    </li>
  )
}

export default ListCard
