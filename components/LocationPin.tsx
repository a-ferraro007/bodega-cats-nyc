import UserMarker from '../svg/UserMarker'

const LocationPin = () => {
  return (
    <div className="group">
      <button
        className="relative h-full w-full transition-all duration-300 group-hover:-translate-y-1"
        onClick={() => {
          console.log('location')
        }}
      >
        <UserMarker />
      </button>
      <div className="absolute top-[33px] left-0 right-0 mx-auto h-1 w-1 rounded-full bg-black shadow-lg blur-[3px] transition-all duration-300 group-hover:blur-[4px]"></div>
    </div>
  )
}

export default LocationPin

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
