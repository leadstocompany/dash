import Container from "@/components/container";
import Heading from "@/components/heading";
import MemoizedMapComponent from "@/components/map-component";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const RouteMap = () => {
  const [data, setData] = useState([]);
  const [center, setCenter] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // Initialize an object to store the extracted data
    const extractedData = {};
    // Iterate through the query parameters and extract the data
    searchParams.forEach((value, key) => {
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

  return (
    <Container>
      <Heading>Route Map</Heading>
      <Container className="bg-white rounded-md border p-5 gap-1.5">
        <Heading className={"text-xl font-normal"}>Route Details</Heading>
        {data &&
          data.map(([key, value], i) => {
            console.log(key, value);
            return (
              <div
                key={i + "-route-map"}
                className={
                  "flex justify-between items-center text-sm px-4 py-1 rounded-md bg-slate-100"
                }
              >
                <h3 className={"text-gray-500 basis-2/6 capitalize"}>
                  {key.replace("_", " ")}
                </h3>
                <h3
                  className={"text-gray-700 basis-4/6 p-2 rounded-md bg-white"}
                >
                  {value}
                </h3>
              </div>
            );
          })}
      </Container>
      <Container className="bg-white rounded-md border p-5 gap-1.5">
        <Heading className={"text-xl font-normal"}>Route Map</Heading>
        <div className={"h-96 bg-gray-100 rounded-md"}>
          {center && (
            <MemoizedMapComponent
              className={"h-full w-full rounded-md border"}
              center={center}
            />
          )}
        </div>
      </Container>
    </Container>
  );
};

export default RouteMap;
