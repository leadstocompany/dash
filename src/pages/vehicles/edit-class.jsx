import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  vehicleType: z.string().min(1, { message: "Vehicle type cannot be empty" }),
  vehicleClass: z.string().min(1, { message: "Vehicle class cannot be empty" }),
});

const EditCLass = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [vehicleType, setVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serchParams, setSearchParams] = useSearchParams();
  const [fileUploads, setFileUploads] = useState({});

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      vehicleClass: data.vehicleClass,
    },
  });
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();
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
        setVehicleType(resData.data);
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
      console.log(key, value);
      setData((prev) => ({ ...prev, [key]: value }));
      if (key === "icon") {
        setFileUploads((prev) => ({ ...prev, [key]: value }));
      }
    }
    // console.log(fileUploads, "fileUploads");
  }, []);
  console.log(data, "data");

  const onSubmit = async (submit_data) => {
    console.log(submit_data);
    console.log(fileUploads, "fileUploads");
    const submitData = {
      cab_type:
        parseInt(data.vehicleTypeIdChange) || parseInt(data.vehicleTypeId),
      cab_class: data.vehicleClass,
      icon: fileUploads.vehicleClassIcon,
    };
    try {
      setIsLoading(true);
      console.log(data.vehicleClassId, "data.vehicleClassId");
      const res = await axios.put(
        `${SERVER_URL}/admin-api/vehicle-class/${data.vehicleClassId}/`,
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
  console.log(data, "data");
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
      setFileUploads({ ...fileUploads, vehicleClassIcon: resData.url });
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
        <Form {...form} className="grid grid-cols-2 gap-2.5">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setData((prev) => ({
                        ...prev,
                        vehicleTypeIdChange: value,
                      }));
                    }}
                    onOpenChange={(value) => {
                      if (value === false && data.vehicleTypeIdChange) {
                        setData((prev) => ({
                          ...prev,
                          vehicleTypeId: data.vehicleTypeIdChange,
                        }));
                      }
                    }}
                    value={data.vehicleTypeId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleType?.map((vehicleModel) => (
                        <SelectItem
                          key={vehicleModel.id}
                          value={vehicleModel.id.toString()}
                        >
                          {vehicleModel.cab_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Class <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          vehicleClass: e.target.value,
                        }));
                      }}
                      value={data.vehicleClass}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-3">
              <Label>Vehicle Icon</Label>
              <Input
                type="file"
                name="vehicleClassIcon"
                onChange={handleUpload}
              />
            </div>
            <div className="flex justify-end items-center w-full py-2.5 pr-2.5 col-span-2">
              <Button type="submit">
                {isLoading ? "Updating Class..." : "Update Class"}
                {isLoading && (
                  <Loader2 className="animate-spin ml-2" size={20} />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditCLass;
