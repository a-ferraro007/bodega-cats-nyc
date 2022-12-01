import Image from 'next/image'
import { useStore } from '../../store'
type MapMarkerProps = {
  image: string | undefined
  //ClickHandler: () => void
}

const MapMarker = ({ image }: MapMarkerProps) => {
  const setDrawerState = useStore((state) => state.setDrawerState)
  const map = useStore((state) => state.mapRef)
  return (
    <>
      {!image && (
        <div className="relative w-[35px] h-[35px] cursor-pointer z-10 bg-primaryGold border-[3px] border-primaryGold rounded-full">
          {' '}
          <button
            className="h-full w-full font-normal font-nunito text-white"
            onClick={() => {
              setDrawerState({ searchDrawerIsActive: true, featureDrawerIsActive: true })
            }}
          >
            {' '}
            add
          </button>
        </div>
      )}
      {image && (
        <div className="w-[45px] h-[45px] border-[3px] border-primaryGold rounded-full">
          <Image
            alt="marker image"
            className=" cursor-pointer rounded-full pointer-events-auto z-10"
            src={image}
            width={45}
            height={45}
          />
        </div>
      )}
    </>
  )
}

export default MapMarker

{
  /*<div className="relative  cursor-pointer z-10">
<svg
  className=""
  width="50"
  height="70"
  viewBox="0 0 112 178"
  fill="black"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="56" cy="55" r="55" fill="#e89a25" />
  <path d="M54.9966 176.45L8.42507 81.5411L103.682 82.6078L54.9966 176.45Z" fill="#e89a25" />
</svg>
{image && (
  <div className="absolute top-1 right-0 left-0 mx-auto w-[35px] h-[35px]">
    <Image
      alt="marker image"
      className=" cursor-pointer rounded-full pointer-events-auto z-10"
      src={image}
      width={35}
      height={35}
    />
  </div>
)}
</div>*/
}
