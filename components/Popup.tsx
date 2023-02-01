import Image from 'next/image'

const Popup = ({ feature }: any) => {
  const { properties } = feature
  console.log()
  //const Rating = () => {
  //  const arr = []
  //  for (let i = 0; i < 5; i++) {
  //    arr.push(
  //<svg
  //  className={`stroke-1 ${
  //    i <= properties.rating ? 'stroke-primaryGold fill-primaryGold' : 'stroke-graphite'
  //  }`}
  //  width="10"
  //  height="10"
  //  viewBox="0 0 31 30"
  //  fill="none"
  //  xmlns="http://www.w3.org/2000/svg"
  //  key={i}
  //>
  //  <path d="M15.9755 3.84549L15.5 2.38197L15.0245 3.84549L12.3303 12.1373H3.61179H2.07295L3.3179 13.0418L10.3713 18.1664L7.67716 26.4582L7.20163 27.9217L8.44658 27.0172L15.5 21.8926L22.5534 27.0172L23.7984 27.9217L23.3228 26.4582L20.6287 18.1664L27.6821 13.0418L28.927 12.1373H27.3882H18.6697L15.9755 3.84549Z" />
  //</svg>
  //    )
  //  }
  //  return arr
  //}

  return (
    <div onClick={() => console.log('POPUP POP', feature)}>
      <div className="w-24 h-24">
        <Image
          className="rounded-[3px]"
          width="40"
          height="40"
          layout="responsive"
          src={properties.image}
          alt="cat image"
        />
      </div>
      <span className="font-bold font-nunito  text-lg"> {properties.name} </span>

      <div className="flex flex-row justify-end">
        <div className="p-1 bg-zinc-100 rounded-sm mr-1">
          <svg
            className="stroke-1 stroke-primaryGold fill-primaryGold"
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
          {(Math.round(properties.rating * 100) / 100).toFixed(1)}
        </span>
      </div>
    </div>
  )
}

export default Popup
