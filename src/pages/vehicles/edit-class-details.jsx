import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EditCLassDetails = () => {
  const { user } = useSelector((state) => state.user);
  const [vehicleType, setVehicleType] = useState([]);
  const [data, setData] = useState({});
  const [fileUploads, setFileUploads] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    // resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      cab_type: data.cab_type,
      cab_class: data.cab_class,
      icon: data.icon,
    },
  });

  useEffect(() => {
    const fetchVehicleType = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-type`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleType(resData);
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchVehicleType();
    }
  }, [user]);
  useEffect(() => {
    for (const [key, value] of serchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      if (key === "vehicleClassIcon") {
        setFileUploads((prev) => ({ ...prev, [key]: value }));
      }
      console.log(`${key}: ${value}`);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const submitData = {
      cab_type: data.cab_type,
      cab_class: data.cab_class,
      icon: data.icon,
    };

    try {
      setIsLoading(true);
      console.log(data.vehicleClassId, "data.vehicleClassId");
      const res = await axios.put(
        `${SERVER_URL}/admin-api/vehicle-class/${data.id}/`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Class",
        description: "Vehicle Class Updated successfully",
      });
      console.log(resData, "vehicle type");
      navigate("/vehicles/view/class");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update vehicle class",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    try {
      console.log("uploading image");
      const res = await axios.post(`${SERVER_URL}/account/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${token}`,
        },
      });
      const resData = await res.data;
      setData({ ...data, [name]: resData.url });
      console.log(resData, "image url");
      // setFiles({ ...files, [name]: resData.data.image_url });
      toast({
        title: "Image Uploaded",
        description: "Image Uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to upload image",
      });
    } finally {
      //   setIsUploading(false);
    }
  };
  return (
    <Container>
      <Heading>Update Vehicle Class</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <form className="grid grid-cols-2 gap-2.5" onSubmit={submitHandler}>
          <div className="grid gap-2.5">
            <Label className="text-gray-500">Vehicle Type</Label>
            <Select
              value={data.cab_type}
              onValueChange={(v) => {
                setData((prev) => ({ ...prev, cab_type_change: v }));
              }}
              onOpenChange={(v) => {
                if (v === false && data.cab_type_change) {
                  setData((prev) => ({
                    ...prev,
                    cab_type: prev.cab_type_change,
                  }));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleType?.map((type) => (
                  <SelectItem
                    key={type.id.toString()}
                    value={type.id.toString()}
                  >
                    {type.cab_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2.5">
            <Label className="text-gray-500">Vehicle Class</Label>
            <Input
              type="text"
              placeholder="Enter Vehicle Class"
              className="border border-gray-200 rounded-md p-2.5"
              defaultValue={data.cab_class}
              onChange={(e) => {
                setData((prev) => ({ ...prev, cab_class: e.target.value }));
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label>Vehicle Icon</Label>
            <Input type="file" name="icon" onChange={handleUpload} />
          </div>
          <div className="col-span-2 flex justify-end items-center">
            <Button type="submit" isLoading={isLoading}>
              Update Class
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default EditCLassDetails;
