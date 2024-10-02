import Loader from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL, cn } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleCSVDownload, handlePDFDownload } from "@/lib/utils";
import { setActiveTrips } from "@/store/slice/app";
import { Loader2, MapPin } from "lucide-react";
import { List, Rate, Avatar } from "rsuite";
import { Timeline } from "rsuite";

const ViewRejectDriver = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const { toast } = useToast();
  const [personalDocument, setPersonalDocument] = useState([]);
  const [vehicleDoc, setVehicleDoc] = useState([]);
  const [vehicleImg, setVehicleImg] = useState([]);

  const fetchVehicleImg = async () => {
    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/vehicle-photo-page/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicleImg(resClassData);
      console.log(resClassData, "vehicleImg");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVehicleDoc = async () => {
    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/vehiclecertificatefields/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicleDoc(resClassData);
      console.log(resClassData, "vehicleDoc");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPersonalDocument = async () => {
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/userdocumentfields/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setPersonalDocument(resClassData);
      console.log(resClassData, "personalDoc");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPersonalDocument();
    fetchVehicleDoc();
    fetchVehicleImg();
  }, []);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${SERVER_URL}/admin-api/driver/${id}/details`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
          }
        );
        const data = await res.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchDriver();
    }
  }, [id, user]);
  if (isLoading) return <Loader />;
  console.log(data);

  const accept = async () => {
    try {
      // setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/driver/approve/`,
        { driver_id: id },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await res.data;
      // setData(data);
      toast({
        title: "Success",
        description: data.detail,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      //setIsLoading(false);
    }
  };
  const reject = async () => {
    try {
      // setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/driver/reject/`,
        { driver_id: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await res.data;
      // setData(data);
      toast({
        title: "Success",
        description: data.detail,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      //setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="flex items-center gap-2">
        <Avatar size="lg" circle src={data?.phtoto_upload} />
        <Heading>{`${data?.first_name} ${data?.last_name}`}</Heading>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          alignSelf: "flex-end",
          gap: "25px",
        }}
      >
        <p>
          Request Date & Time
          <br />
          <span>{dayjs(data?.date_joined).format("DD MMMM hh:mm a")}</span>
        </p>
        {/* <p>
          Status <br />
          <span style={{ color: data?.driver_duty == true ? "green" : "red" }}>
            {data?.driver_duty == true ? "On-duty" : "Blocked"}
          </span>
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          marginTop: "4%",
          marginLeft: "5.5%",
        }}
      >
        <span>{`${data?.email} | ${data?.phone}`}</span>
      </div>

      <p
        style={{
          gap: 10,
          display: "flex",
          position: "relative",
          marginLeft: "8%",
        }}
      >
        <span
          style={{
            background: "orange",
            width: "25px",
            borderRadius: 5,
            textAlign: "center",
            color: "#fff",
            fontSize: "15px",
          }}
        >
          4.5
        </span>
        <Rate defaultValue={4.5} size="xs" color="yellow" allowHalf />
      </p>

      <div className="mt-5">
        <h1>Address</h1>
      </div>
      <div className="border rounded-md">
        <List bordered>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Pincode -
              <span style={{ fontWeight: "lighter" }}>{data?.pincode}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Address -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.full_address}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Country -{" "}
              <span style={{ fontWeight: "lighter" }}>{data?.country}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              State -{" "}
              <span style={{ fontWeight: "lighter" }}>{data?.state}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              City - <span style={{ fontWeight: "lighter" }}>{data?.city}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              House no, Building Name -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.house_or_building}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Road Name, Area, Colony -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.road_or_area}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Near by famous shop / mall / landmark -{" "}
              <span style={{ fontWeight: "lighter" }}>{data?.landmark}</span>
            </p>
          </List.Item>
        </List>
      </div>

      <div className="mt-4">
        <h1>Personal Documents</h1>
      </div>
      {personalDocument.map((item, index) => {
        return (
          <>
            <div className="border rounded-md">
              {item.field_name == "PAN" && (
                <List bordered>
                  <List.Item>
                    <p style={{ fontWeight: "bold" }}>
                      Pan No -
                      <span style={{ fontWeight: "lighter" }}>
                        {data?.user_doc?.PAN}
                      </span>
                    </p>
                    {item.front == true && (
                      <p style={{ fontWeight: "bold" }}>
                        Front Image -
                        <img
                          alt=""
                          style={{
                            width: "50%",
                            height: "20%",
                            display: "flex",
                            margin: 10,
                          }}
                          src={data.user_doc?.PAN_front}
                        />
                      </p>
                    )}
                    {item.back == true && (
                      <p style={{ fontWeight: "bold" }}>
                        Back Image -
                        <img
                          alt=""
                          style={{
                            width: "50%",
                            height: "20%",
                            display: "flex",
                            margin: 10,
                          }}
                          src={data.user_doc?.PAN_back}
                        />
                      </p>
                    )}
                  </List.Item>
                </List>
              )}
              {item.field_name == "Voter" && (
                <List.Item>
                  <p style={{ fontWeight: "bold" }}>
                    Voter Card -{" "}
                    <span style={{ fontWeight: "lighter" }}>
                      {data?.user_doc?.Voter_card}
                    </span>
                  </p>
                  {item.front == true && (
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Front Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data.user_doc?.voter_front}
                      />
                    </p>
                  )}
                  {item.back == true && (
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Back Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data.user_doc?.voter_back}
                      />
                    </p>
                  )}
                </List.Item>
              )}
              {item.field_name == "Adhar" && (
                <List.Item>
                  <p style={{ fontWeight: "bold" }}>
                    Aadhar No -{" "}
                    <span style={{ fontWeight: "lighter" }}>
                      {data?.user_doc?.Adhar}
                    </span>
                  </p>
                  {item.front == true && (
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Front Image -
                      <img
                        alt=""
                        style={{
                          width: "50%",
                          height: "20%",
                          display: "flex",
                          margin: 10,
                        }}
                        src={data.user_doc?.Adhar_front}
                      />
                    </p>
                  )}
                  {item.back == true && (
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Back Image -
                      <img
                        alt=""
                        style={{
                          width: "50%",
                          height: "20%",
                          display: "flex",
                          margin: 10,
                        }}
                        src={data.user_doc?.Adhar_back}
                      />
                    </p>
                  )}
                </List.Item>
              )}
            </div>
          </>
        );
      })}

      <div className="mt-5">
        <h1>Vehicle Details</h1>
      </div>
      <div className="border rounded-md">
        <List bordered>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Type -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.model?.cabtype?.cab_type}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Manufacturer -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.model?.maker?.maker}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Model -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.model?.model}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Vehicle Number -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.number_plate}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Vehicle Class -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.model?.cabclass?.cab_class}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Price / km -
              <span style={{ fontWeight: "lighter" }}>
                {data?.vehicle?.price_per_km}
              </span>
            </p>
          </List.Item>
        </List>
      </div>

      <div className="mt-4">
        <h1>Vehicle Images</h1>
      </div>
      {vehicleImg.map((item, index) => {
        return (
          <>
            <div className="border rounded-md">
              <List bordered>
                {item.field_name == "front" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Front Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_photo?.front}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "back" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Back Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_photo?.back}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "left" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Left Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_photo?.left}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "right" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Right Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_photo?.right}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "inside" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Inside Image -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_photo?.inside_driver_seat}
                      />
                    </p>
                  </List.Item>
                )}
              </List>
            </div>
          </>
        );
      })}

      <div className="mt-4">
        <h1>Vehicle Documents</h1>
      </div>
      {vehicleDoc.map((item, index) => {
        return (
          <>
            <div className="border rounded-md">
              <List bordered>
                {item.field_name == "Insurance" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Insurance Paper -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_certiifcate?.Insurance}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "Sound" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Sound -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_certiifcate?.Sound}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "Pollution" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      Pollution Paper -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src={data?.vehicle?.vehicle_certiifcate?.Pollution}
                      />
                    </p>
                  </List.Item>
                )}
                {item.field_name == "RC" && (
                  <List.Item>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: 50,
                      }}
                    >
                      RC Paper -
                      <img
                        style={{ width: "20%", display: "flex", margin: 10 }}
                        src=""
                      />
                    </p>
                  </List.Item>
                )}
              </List>
            </div>
          </>
        );
      })}

      <div className="mt-5">
        <h1>Bank Account Details</h1>
      </div>
      <div className="border rounded-md">
        <List bordered>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Bank Holder Name -
              <span style={{ fontWeight: "lighter" }}>
                {data?.bank_account?.name}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Account Number -
              <span style={{ fontWeight: "lighter" }}>
                {data?.bank_account?.account_number}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Swift Code -
              <span style={{ fontWeight: "lighter" }}>
                {data?.bank_account?.swift_code}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Bank Name -
              <span style={{ fontWeight: "lighter" }}>
                {data?.bank_account?.bank_name}
              </span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Routing Number -
              <span style={{ fontWeight: "lighter" }}>
                {data?.bank_account?.routing_number}
              </span>
            </p>
          </List.Item>
        </List>
      </div>

      {/* <div className="mt-4">
        <h1>Trip Details</h1>
      </div> */}
      {/* <div className="border rounded-md">
        <List bordered>
          <List.Item>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>
                  Pickup and Drop-up location -
                </p>
              </div>
              <div className="ml-10">
                <Timeline>
                  <Timeline.Item>16:27:41 </Timeline.Item>
                  <Timeline.Item>16:28:43 </Timeline.Item>
                </Timeline>
              </div>
            </div>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>Distance - </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>Time - </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>Total Fare - </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>Trip Status - </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>Payment method - </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Track Ride -
              <span>
                <Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
                  <Link
                    //to="/wallet/customer_wallet_detail"
                    className="flex items-center justify-center active:scale-95 duration-100"
                  >
                    Click here
                  </Link>
                </Button>
              </span>
            </p>{" "}
          </List.Item>
        </List>
      </div> */}
    </Container>
  );
};

export default ViewRejectDriver;
