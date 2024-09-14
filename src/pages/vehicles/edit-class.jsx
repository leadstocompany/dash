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
  const [file, setFile] = useState(null);
  const [vehicleType, setVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serchParams, setSearchParams] = useSearchParams();
  const [fileUploads, setFileUploads] = useState({});

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      vehicleClass: data.cab_class,
      vehicleType: data.cab_type,
    },
  });
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
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
      console.log({ [key]: value });
      setData((prev) => ({ ...prev, [key]: value }));
      if (key === "vehicleClassIcon") {
        setFileUploads((prev) => ({ ...prev, [key]: value }));
      }
      console.log(`${key}: ${value}`);
    }
  }, []);
  console.log(data, "data");

  const id = serchParams.get("id");

  const onSubmit = async (data) => {
    // console.log(submit_data);
    // console.log(fileUploads, "fileUploads");
    const submitData = {
      cab_type:
        parseInt(data.vehicleTypeIdChange) || parseInt(data.vehicleTypeId),
      cab_class: data.vehicleClass,
      icon: fileUploads.vehicleClassIcon,
    };
    const formData = new FormData();
    formData.append("icon", file);
    formData.append("cab_class", data.vehicleClass);
    formData.append("cab_type", data.vehicleType);
    formData.append("is_active", true);
    try {
      setIsLoading(true);
      console.log(data.vehicleClassId, "data.vehicleClassId");
      const res = await axios.patch(
        `${SERVER_URL}/admin-api/vehicle-class/${id}/`,
        formData,
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
    //setIsUploading(true);
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
      // setFiles({ ...files, [name]: resData.url });
      console.log(resData, "image url");
      setFile(resData.url);
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
      //setIsUploading(false);
    }
  };
  return (
    <Container>
      <Heading>Update Vehicle Class</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-2.5"
          >
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-3">
              <Label>
                Vehicle Icon
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                type="file"
                name="vehicleIcon"
                onChange={handleUpload}
                // onChange={(e) => {
                //   // console.log(e.target.files[0], "file");
                //   setFile(e.target.files[0]);
                // }}
              />
            </div>
            <div className="flex justify-end items-center w-full py-2.5 pr-2.5 col-span-2">
              <Button type="submit">
                {isLoading ? "Creating Class..." : "Create Class"}
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
