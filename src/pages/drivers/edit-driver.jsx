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
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  aadhar_number: z.string().nullable(),
  //   aadhar_upload_back: z.string().nullable(),
  //   aadhar_upload_front: z.string().nullable(),
  alternate_number: z.string().nullable(),
  city: z.string().nullable(),
  //   date_joined: z.string().nullable(),
  email: z.string().nullable(),
  first_name: z.string().nullable(),
  full_address: z.string().nullable(),
  //   gender: z.string().nullable(),
  house_or_building: z.string().nullable(),
  //   id: z.string().nullable(),
  last_name: z.string().nullable(),
  license_number: z.string().nullable(),
  //   license_upload_back: z.string().nullable(),
  //   license_upload_front: z.string().nullable(),
  pan_number: z.string().nullable(),
  //   pan_upload: z.string().nullable(),
  phone: z.string().nullable(),
  //   photo_upload: z.string().nullable(),
  pincode: z.string().min(1, {
    message: "Pincode should not be empty",
  }),
  road_or_area: z.string().nullable(),
  state: z.string().nullable(),
  birth_day: z.string().min(1, {
    message: "Date of birth should not be empty",
  }),
  //   status: z.string().nullable(),
  //   total_trips: z.string().nullable(),
});

const EditDriver = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (value === "null") value = "";
      setData((prev) => ({ ...prev, [key]: value }));
    });
  }, []);
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();
  const navigate = useNavigate();
  const formInfo = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    values: {
      first_name: data.first_name,
      last_name: data.last_name,
      full_address: data.full_address,
      road_or_area: data.road_or_area,
      house_or_building: data.house_or_building,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      email: data.email,
      phone: data.phone,
      alternate_number: data.alternate_number,
      birth_day: data.birth_day,
      aadhar_number: data.aadhar_number,
      pan_number: data.pan_number,
      license_number: data.license_number,
    },
  });

  const onSubmit = async (formData) => {
    const submitData = {
      ...data,
      ...formData,
      pincode: parseInt(formData.pincode),
    };
    console.log(submitData, "submitData");
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${SERVER_URL}/admin-api/driver/${data.id}/`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Driver Updated",
        description: "Driver Updated successfully",
      });
      navigate("/drivers/all");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update driver",
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
      console.log(data, "data 1");
      setData({ ...data, [name]: resData.url });
      toast({
        title: "Image Uploaded",
        description: "Image Uploaded successfully",
      });
      console.log(data, "data 2");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to upload image",
      });
    }
  };

  console.log(data);
  return (
    <Container>
      <Heading>Edit Driver Details</Heading>
      <Container className="rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50">
        <Form {...formInfo}>
          <form
            className="grid grid-cols-2 gap-4 place-items-center"
            onSubmit={formInfo.handleSubmit(onSubmit)}
          >
            <FormField
              control={formInfo.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formInfo.control}
              name="last_name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Last Name
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="full_address"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Full Address
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="road_or_area"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Road or Street Address
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="house_or_building"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      House or Building Address
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={formInfo.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      City
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="state"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      State
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="pincode"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Zip Code
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Email
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Phone Number
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="alternate_number"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Alternate Phone Number
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="birth_day"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Date of Birth
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="aadhar_number"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Aadhar Number
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="pan_number"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Pan Card Number
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="license_number"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>
                      Licence Number
                      {/* <span className="text-red-500">*</span> */}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="w-full flex flex-col gap-3">
              <Label>
                Profile Picture
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="photo_upload" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Aadhar Card Front
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                type="file"
                name="aadhar_upload_front"
                onChange={handleUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Aadhar Card Back
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                type="file"
                name="aadhar_upload_back"
                onChange={handleUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Pan Card
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="pan_upload" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Front
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                type="file"
                name="license_upload_front"
                onChange={handleUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Back
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input
                type="file"
                name="license_upload_back"
                onChange={handleUpload}
              />
            </div>
            <div className="col-span-2 flex justify-end items-center w-full">
              <Button type="submit" isLoading={isLoading} className="px-10">
                Update Driver
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditDriver;
