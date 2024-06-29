import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { memo, useCallback, useState } from "react";

const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const MapComponent = ({ containerStyle, coordinates, center, ...props }) => {
  const { isLoaded } = useJsApiLoader({
    id: MAP_ID,
    googleMapsApiKey: MAP_API_KEY,
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(
    function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds();
      if (coordinates?.length > 0) {
        coordinates.forEach((taxi) => {
          bounds.extend(new window.google.maps.LatLng(taxi.lat, taxi.lng));
        });
      } else {
        bounds.extend(new window.google.maps.LatLng(center.lat, center.lng));
      }
      map.fitBounds(bounds);

      setMap(map);
    },
    [center, coordinates]
  );
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapContainerClassName={props.className || ""}
      {...props}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        // set zoom level to show all markers
        // https://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
      }}
    >
      {coordinates?.length > 0
        ? coordinates.map((taxi, index) => (
            <Marker
              key={index}
              position={{ lat: taxi.lat, lng: taxi.lng }}
              icon={{
                url: "./car.png", // Replace with the actual path to your taxi icon image
                scaledSize: new window.google.maps.Size(30, 24),
              }}
              onMouseUp={(e) => {
                console.log("clicked", e);
                const { latLng } = e;
                const domElement = e.domEvent.target;
                console.log("domElement", domElement);
                const lat = latLng.lat();
                const lng = latLng.lng();
                console.log("lat", lat);
                console.log("lng", lng);
              }}
            />
          ))
        : null}
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

MapComponent.propTypes = {
  containerStyle: PropTypes.object,
  coordinates: PropTypes.array,
  center: PropTypes.object,
  className: PropTypes.string,
};

const MemoizedMapComponent = memo(MapComponent);

export default MemoizedMapComponent;
