import mapboxgl, { FeatureIdentifier, MercatorCoordinate } from 'mapbox-gl'
import { createRoot } from 'react-dom/client'
import MapMarker from '../components/Marker'

const newMarker = (feature: any, image?: string): mapboxgl.Marker => {
  const container = document.createElement('div')
  const root = createRoot(container)
  root.render(<MapMarker image={image} />)

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
    //offset: { center: [100, 10000] }
  })
    .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
    //.setHt
    .setHTML(`<div className="bg-white h-52 w-52 absolute bottom-1 transition-all"> HELLOO </div>`)
    .setOffset(35)

  return new mapboxgl.Marker({
    element: container,
    clickTolerance: 25,
    scale: 4
  })
    .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
    .setPopup(popup)
}

export { newMarker }
