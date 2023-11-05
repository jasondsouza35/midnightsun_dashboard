import React, { useEffect, useState } from 'react';

function MapComponent() {

  const [pathCoordinates, setPathCoordinates] = useState([]);

  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.8829378816515, lng: -98.37406855532743 },
        zoom: 12,
        mapTypeId: "roadmap",
      });
      console.log('working...')

      // Fetch the CSV file
      fetch('sample_race.csv')
        .then((response) => response.text())
        .then((data) => {
          var lines = data.split('\n');
          for (var i = 1; i < lines.length; i++) {
            var parts = lines[i].split(',');
            var lat = parseFloat(parts[2]);
            var lon = parseFloat(parts[3]);
            if (!isNaN(lat) && !isNaN(lon)) {
              setPathCoordinates((pathCoordinates) => [...pathCoordinates, [lat, lon]]);
              pathCoordinates.push(new window.google.maps.LatLng(lat, lon));
            }
          }

          // Create a polyline
          const newPolyline = new window.google.maps.Polyline({
            path: pathCoordinates,
            geodesic: true,
            strokeColor: '#0096FF',
            strokeOpacity: 1.0,
            strokeWeight: 5,
          });

          newPolyline.setMap(map);
          setPolyline(newPolyline);
        });

      // Initialize the map
      window.google.maps.event.addDomListener(window, 'load', initMap);
    }
  }, []);

  const deleteElements = () => {
    // Modify this logic to delete the desired elements from pathCoordinates.
    console.log(pathCoordinates[0])
    setPathCoordinates(pathCoordinates => pathCoordinates.slice(2));
    updatePolyline();
  };

  const updatePolyline = () => {
    if (polyline) {
      polyline.setPath(pathCoordinates);
    }
  };

  return (
    <div>
      <button onClick={deleteElements}>Delete Elements</button>
      <div id="map" style={{ height: '600px', width: '100%' }}></div>
    </div>
  );
}

export default MapComponent;
