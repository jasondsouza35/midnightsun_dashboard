import { useState } from 'react'
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'

const center = { lat: 40.8829378816515, lng: -98.37406855532743 }
 

const App = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.AIzaSyAbxFhk7ujGEOVsirxtumApUmvId1gSgWI,
    libraries: ['places'],
  })

  return (
    // Initialize the map
    <> 
       
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      
    </>
  )
}

export default App
