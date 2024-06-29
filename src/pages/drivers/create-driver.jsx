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
import { SERVER_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be atleast 2 characters long",
    })
    .max(20, {
      message: "First name must be less than 20 characters long",
    })
    .nonempty({
      message: "First name cannot be empty",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be atleast 2 characters long",
    })
    .max(20, {
      message: "Last name must be less than 20 characters long",
    })
    .nonempty({
      message: "Last name cannot be empty",
    }),
  fullAddress: z.string().min(2, { message: "Full address cannot be empty" }),
  streetAddress: z.string().nullable(),
  houseOrBuildingAddress: z.string().nullable(),
  city: z
    .string()
    .min(2, {
      message: "City must be atleast 2 characters long",
    })
    .max(20, {
      message: "City must be less than 20 characters long",
    })
    .nonempty({
      message: "City cannot be empty",
    }),
  state: z
    .string()
    .min(2, {
      message: "State must be atleast 2 characters long",
    })
    .max(20, {
      message: "State must be less than 20 characters long",
    })
    .nonempty({
      message: "State cannot be empty",
    }),
  pinCode: z.string().nullable(),
  email: z
    .string()
    // .email({
    //   message: "Email must be a valid email address",
    // })
    .nullable(),
  phone: z.string().nullable(),
  alternateNumber: z.string().nullable(),
  panCardNumber: z.string().nullable(),
});

const DriverObject = {
  first_name: "Driver Name",
  last_name: "Driver Name",
  full_address: "Full Addres",
  road_or_area: "Street Address",
  house_or_building: "House or building",
  city: "city",
  state: "state",
  pincode: "1234567",
  email: "email@gmail.com",
  phone: "7872368185",
  alternate_number: "2345678900",
  pan_number: "234567890",
  aadhar_upload_front:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-28_205305_BAkEDCk.png",
  aadhar_upload_back:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-28_205305_LA9BAGO.png",
  pan_upload: null,
  licence_upload_front: null,
  licence_upload_back: null,
  photo_upload:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-29_104827_qtWQ5Xi.png",
};

const AddDriver = () => {
  const { user } = useSelector((state) => state.user);

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const [fileUploads, setFileUploads] = useState({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    licenceFront: null,
    licenceBack: null,
    profilePicture: null,
  });

  const formInfo = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      fullAddress: "",
      streetAddress: "",
      houseOrBuildingAddress: "",
      city: "",
      state: "",
      pinCode: "",
      email: "",
      phone: "",
      alternateNumber: "",
      aadharNumber: "",
      panCardNumber: "",
      licenceNumber: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    console.log(fileUploads);
    const driverObject = {
      first_name: values.firstName,
      last_name: values.lastName,
      full_address: values.fullAddress,
      road_or_area: values.streetAddress,
      house_or_building: values.houseOrBuildingAddress,
      city: values.city,
      state: values.state,
      pincode: parseInt(values.pinCode) || "",
      email: values.email,
      phone: values.phone,
      alternate_number: values.alternateNumber,
      aadhar_number: values.aadharNumber,
      pan_number: values.panCardNumber,
      licence_number: values.licenceNumber,
      aadhar_upload_front: fileUploads.aadharFront,
      aadhar_upload_back: fileUploads.aadharBack,
      pan_upload: fileUploads.panCard,
      licence_upload_front: fileUploads.licenceFront,
      licence_upload_back: fileUploads.licenceBack,
      photo_upload: fileUploads.profilePicture,
    };
    console.log(driverObject);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/cab-booking-admin-api/drivers/`,
        driverObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Driver Added",
        description: "Driver Added successfully",
      });
      console.log(resData, "vehicle type");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error?.response?.data?.error || error?.message || "",
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
          Authorization: `token ${user.token}`,
        },
      });
      const resData = await res.data;
      setFileUploads({ ...fileUploads, [name]: resData.url });
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
      setIsUploading(false);
    }
  };

  return (
    <Container>
      <Heading>Add Driver</Heading>
      <Container className="rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50">
        <Form {...formInfo}>
          <form
            className="grid grid-cols-2 gap-4 place-items-center"
            onSubmit={formInfo.handleSubmit(onSubmit)}
          >
            <FormField
              control={formInfo.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      // name="name"
                      // id="name"
                      // className="rounded-md p-2 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formInfo.control}
              name="lastName"
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
              name="fullAddress"
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
              name="streetAddress"
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
              name="houseOrBuildingAddress"
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
              name="pinCode"
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={formInfo.control}
              name="alternateNumber"
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
              name="aadharNumber"
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
              name="panCardNumber"
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
              name="licenceNumber"
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
              <Input
                type="file"
                name="profilePicture"
                onChange={handleUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Aadhar Card Front
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="aadharFront" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Aadhar Card Back
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="aadharBack" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Pan Card
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="panCard" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Front
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="licenceFront" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Back
                {/* <span className="text-red-500">*</span> */}
              </Label>
              <Input type="file" name="licenceBack" onChange={handleUpload} />
            </div>
            <div className="col-span-2 flex justify-end items-center w-full">
              <Button type="submit" className="px-10">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default AddDriver;
