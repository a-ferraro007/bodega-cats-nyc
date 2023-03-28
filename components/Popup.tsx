import Image from 'next/image'
import { Feature } from '../constants/types'
import { useStore } from '../store'

type PopupProps = {
  feature: Feature
}
const Popup = ({ feature }: PopupProps) => {
  const { setActivePopup } = useStore((state) => state)
  return (
    <div onClick={() => {}}>
      <div className="relative h-24 w-24">
        <Image
          className="rounded-[3px]"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          src={feature.image}
          alt="cat image"
          fill
        />
      </div>
      <span className="font-nunito text-lg  font-bold"> {feature.name} </span>

      <div className="flex flex-row justify-end">
        <div className="mr-1 rounded-sm bg-[#f5f4f1] p-1">
          <svg
            className="fill-primaryGold stroke-primaryGold stroke-1"
            width="12"
            height="12"
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.9755 3.84549L15.5 2.38197L15.0245 3.84549L12.3303 12.1373H3.61179H2.07295L3.3179 13.0418L10.3713 18.1664L7.67716 26.4582L7.20163 27.9217L8.44658 27.0172L15.5 21.8926L22.5534 27.0172L23.7984 27.9217L23.3228 26.4582L20.6287 18.1664L27.6821 13.0418L28.927 12.1373H27.3882H18.6697L15.9755 3.84549Z" />
          </svg>
        </div>
        <span className="font-roboto font-semibold">
          {(Math.round(feature.rating * 100) / 100).toFixed(1)}
        </span>
      </div>
    </div>
  )
}

export default Popup
