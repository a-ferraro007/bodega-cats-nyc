import Image from 'next/image'
import { useStore } from '../store'
import FeatureMarker from '../svg/FeatureMarker'
type MapMarkerProps = {
  image: string | undefined
  //ClickHandler: () => void
}

const MapMarker = ({ image }: MapMarkerProps) => {
  return (
    <>
      {' '}
      <div className="group">
        <button
          className="relative  h-full w-full transition-all duration-300 group-hover:-translate-y-1"
          onClick={() => {}}
        >
          <FeatureMarker />
        </button>
        <div className="absolute top-[33px] left-0 right-0 mx-auto h-1 w-1 rounded-full bg-black shadow-lg blur-[3px] transition-all duration-300 group-hover:blur-[4px]"></div>
      </div>
    </>
  )
}

export default MapMarker
