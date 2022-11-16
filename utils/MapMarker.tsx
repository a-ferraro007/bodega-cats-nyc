import mapboxgl, { FeatureIdentifier, MercatorCoordinate } from 'mapbox-gl'
import { createRoot } from 'react-dom/client'
import MapMarker from '../components/Marker'
import Popup from '../components/Popup'

const newMarker = (feature: any, image?: string): mapboxgl.Marker => {
  const mContainer = document.createElement('div')
  const mRoot = createRoot(mContainer)
  mRoot.render(<MapMarker image={image} />)

  const pContainer = document.createElement('div')
  const pRoot = createRoot(pContainer)
  pRoot.render(<Popup feature={feature} />)

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset: 35
  })
    .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
    .setDOMContent(pContainer)

  return new mapboxgl.Marker({
    element: mContainer,
    clickTolerance: 25,
    scale: 4
  })
    .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
    .setPopup(popup)
}

export { newMarker }
