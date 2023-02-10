import mapboxgl, {FeatureIdentifier, MercatorCoordinate} from 'mapbox-gl'
import {createRoot} from 'react-dom/client'
import LocationPin from '../components/LocationPin'
import MapMarker from '../components/Marker'
import Popup from '../components/Popup'
import {LngLat} from '../constants/types'

const returnNewMarker = (
  feature: any,
  setPopup = true,
  image?: string
): mapboxgl.Marker => {
  const mContainer = document.createElement('div')
  const mRoot = createRoot(mContainer)
  mRoot.render(<MapMarker image={image} />)

  if (!setPopup) {
    return new mapboxgl.Marker({
      element: mContainer,
      clickTolerance: 25,
      scale: 1,
    }).setLngLat(feature.geometry.coordinates)
  }
  const pContainer = document.createElement('div')
  const pRoot = createRoot(pContainer)
  pRoot.render(<Popup feature={feature} />)

  //console.log(setPopup)

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset: 35,
  })
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(pContainer)

  return new mapboxgl.Marker({
    element: mContainer,
    clickTolerance: 25,
    scale: 1,
  })
    .setLngLat(feature.geometry.coordinates)
    .setPopup(popup)
}

const returnUserLocationMarker = (lnglat: LngLat): mapboxgl.Marker => {
  const mContainer = document.createElement('div')
  const mRoot = createRoot(mContainer)
  mRoot.render(<LocationPin />)

  return new mapboxgl.Marker({
    element: mContainer,
    clickTolerance: 25,
    scale: 1,
  }).setLngLat(lnglat)
}

export {returnNewMarker, returnUserLocationMarker}
