import Container from "@/components/container";
import Heading from "@/components/heading";
import MemoizedMapComponent from "@/components/map-component";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const RouteMap = () => {
  const [data, setData] = useState([]);
  const [center, setCenter] = useState(null);
  const [newData, setNewData] = useState({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    // Initialize an object to store the extracted data
    const extractedData = {};
    const queryParams = new URLSearchParams(location.search);
    // Iterate through the query parameters and extract the data
    queryParams.forEach((value, key) => {
      if (key === "lat") return setCenter((prev) => ({ ...prev, lat: value }));
      if (key === "lng") return setCenter((prev) => ({ ...prev, lng: value }));
      if (value == undefined || value == "undefined") return;
      if (value == null || value === "null" || value == "") return;
      if (key === "otp") return;

      extractedData[key] = value;
    });
    setData(Object.entries(extractedData));
    console.log("Extracted data:", extractedData);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serializedData = queryParams.get("data");

    // Parse the serialized data
    const data = JSON.parse(serializedData);
    setNewData(data);
  }, []);

  console.log({ newData });

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  const source = {
    lat: parseFloat(newData?.pickup_latitude),
    lng: parseFloat(newData?.pickup_longitude),
  };

  const destination = {
    lat: parseFloat(newData?.dropup_latitude),
    lng: parseFloat(newData?.dropup_longitude),
  };

  console.log(destination);
  const path = [source, destination];
  return (
    <Container>
      <Heading>Route Map</Heading>
      <Container className="bg-white rounded-md border p-5 gap-1.5">
        <Heading className={"text-xl font-normal"}>Route Details</Heading>
        {/* {data &&
          data.map((key, value, i) => {
            console.log(key[1]);
            return ( */}
        <div
          // key={i + "-route-map"}
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"id"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData.id}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Customer name"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.customer?.first_name + " " + newData?.customer?.last_name}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Customer phone"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.customer?.phone}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Driver name"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.driver?.first_name + " " + newData?.driver?.last_name}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Driver phone"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.driver?.phone}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Number plate"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.cab?.number_plate}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Cab class"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.ride_type?.cab_class}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Cab type"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.ride_type?.cab_type?.cab_type}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Status"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.status}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Source"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.source}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Destination"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.destination}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Distance"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.distance}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Time"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.time}
          </h3>
        </div>
        {/* <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
           
            {"Ride Type"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData.id}
          </h3>
        </div> */}
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Otp Count"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.otp_count}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Rent Price"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.rent_price}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Payment Type"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.payment_type}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Waiting Time"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.waiting_time}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Waiting Charge"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.waiting_charge}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Total Fare"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.total_fare}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Payment Status"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.payment_status}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Pickup Latitude"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.pickup_latitude}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Pickup Longitude"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.pickup_longitude}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Dropup Latitude"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.dropup_latitude}
          </h3>
        </div>
        <div
          className={
            "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
          }
        >
          <h3 className={"text-gray-500 basis-2/6 capitalize"}>
            {/* {key.replace("_", " ")} */}
            {"Dropup Longitude"}
          </h3>
          <h3 className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}>
            {newData?.dropup_longitude}
          </h3>
        </div>

        {/* );
          })} */}
      </Container>
      <Container className="bg-white rounded-md border p-5 gap-1.5">
        <Heading className={"text-xl font-normal"}>Route Map</Heading>
        <div className={"h-96 bg-gray-100 rounded-md"}>
          {/* {center && (
            <MemoizedMapComponent
              className={"h-full w-full rounded-md border"}
              center={center}
            />
          )} */}
          <LoadScript googleMapsApiKey="AIzaSyDqhCNH8_WG5DODgEIcICL7Z-s6Ge9Vgfc">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={source}
              zoom={6}
            >
              <Marker position={source} label="Source" />
              <Marker position={destination} label="Destination" />
              <Polyline
                path={path}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </Container>
    </Container>
  );
};

export default RouteMap;
