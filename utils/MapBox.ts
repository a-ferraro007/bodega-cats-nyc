import mapboxgl from 'mapbox-gl'

const setUpData = (map: mapboxgl.Map, featureMap: any) => {
  console.log(featureMap)
  featureMap.forEach((feature: any, key: any) => {
    feature.marker.addTo(map)
  })
}

const createAddressString = (propertyAddress: string, context: any) => {
  if (propertyAddress) {
    return propertyAddress + ', ' + context[3]?.text + ', ' + context[5]?.text
  } else {
    return context[3]?.text + ', ' + context[5]?.text
  }
}

export { setUpData, createAddressString }
