/*global google*/
import ReactDOM from "react-dom";
import React, { useState } from "react";

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const defaultLocation = { lat: 40.756795, lng: -73.954298 };
let destination = { lat: 41.756795, lng: -78.954298 };
let origin = { lat: 40.756795, lng: -73.954298 };
let directionsService;
const Map = () => {
  const [directions, setDirections] = useState(null);
  const [bounds, setBounds] = useState(null);

  const onMapLoad = (map) => {
    directionsService = new google.maps.DirectionsService();
    //load default origin and destination
    changeDirection(origin, destination);
  };

  //function that is calling the directions service
  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div>
      <GoogleMap
        center={defaultLocation}
        zoom={5}
        onLoad={(map) => onMapLoad(map)}
        mapContainerStyle={{ height: "400px", width: "800px" }}
      >
        {directions !== null && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
