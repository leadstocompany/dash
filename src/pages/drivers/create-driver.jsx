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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { List, Rate, Avatar } from "rsuite";
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
  // fullAddress: z.string().min(2, { message: "Full address cannot be empty" }),
  // streetAddress: z.string().nullable(),
  // houseOrBuildingAddress: z.string().nullable(),
  // city: z
  //   .string()
  //   .min(2, {
  //     message: "City must be atleast 2 characters long",
  //   })
  //   .max(20, {
  //     message: "City must be less than 20 characters long",
  //   })
  //   .nonempty({
  //     message: "City cannot be empty",
  //   }),
  // state: z
  //   .string()
  //   .min(2, {
  //     message: "State must be atleast 2 characters long",
  //   })
  //   .max(20, {
  //     message: "State must be less than 20 characters long",
  //   })
  //   .nonempty({
  //     message: "State cannot be empty",
  //   }),
  pinCode: z.string().nullable(),
  email: z
    .string()
    .email({
      message: "Email must be a valid email address",
    })
    .nullable(),
  phone: z.string().nullable(),
  // alternateNumber: z.string().nullable(),
  // panCardNumber: z.string().nullable(),
  // vehicleModel: z.string().min(1, { message: "Vehicle model cannot be empty" }),
  // vehicleManufacturer: z
  //   .string()
  //   .min(1, { message: "Vehicle manufacturer cannot be empty" }),
  // vehicleType: z.string().min(1, { message: "Vehicle class cannot be empty" }),
  // vehicleClass: z.string().min(1, { message: "Vehicle class cannot be empty" }),
});

// const DriverObject = {
//   first_name: "Driver Name",
//   last_name: "Driver Name",
//   full_address: "Full Addres",
//   road_or_area: "Street Address",
//   house_or_building: "House or building",
//   city: "city",
//   state: "state",
//   pincode: "1234567",
//   email: "email@gmail.com",
//   phone: "7872368185",
//   alternate_number: "2345678900",
//   pan_number: "234567890",
//   aadhar_upload_front:
//     "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-28_205305_BAkEDCk.png",
//   aadhar_upload_back:
//     "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-28_205305_LA9BAGO.png",
//   pan_upload: null,
//   licence_upload_front: null,
//   licence_upload_back: null,
//   photo_upload:
//     "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/Screenshot_2023-11-29_104827_qtWQ5Xi.png",
// };

const AddDriver = () => {
  const { user } = useSelector((state) => state.user);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]);
  const [vehicleClass, setVehicleClass] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState([]);

  const { toast } = useToast();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const [fileUploads, setFileUploads] = useState({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    licenceFront: null,
    licenceBack: null,
    profilePicture: null,
    pollution: null,
    insurance: null,
    sound: null,
    rc: null,
    front: null,
    back: null,
    right: null,
    left: null,
  });

  const formInfo = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      // fullAddress: "",
      // streetAddress: "",
      // houseOrBuildingAddress: "",
      // city: "",
      // state: "",
      pinCode: "",
      email: "",
      phone: "",
      // alternateNumber: "",
      // aadharNumber: "",
      // panCardNumber: "",
      // licenceNumber: "",
      // vehicleClass: "",
      // vehicleManufacturer: "",
      // vehicleModel: "",
      // vehicleType: "",
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
        `${SERVER_URL}/admin-api/driver/`,
        driverObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
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
          Authorization: `token ${token}`,
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
  // console.log(fileUploads);

  return (
    <Container>
      <Heading>Create Driver</Heading>
      <Container className="rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50">
        <Form {...formInfo}>
          <form
            // className="grid grid-cols-4 gap-4 place-items-center"
            onSubmit={formInfo.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-4 place-items-center">
              <FormField
                control={formInfo.control}
                name="firstName"
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
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
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
                name="phone"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
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
                      <FormLabel>Email Id(optional)</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="w-full flex flex-col gap-3">
                <Label>Profile Picture</Label>
                <Input
                  type="file"
                  name="profilePicture"
                  onChange={handleUpload}
                />
              </div>
            </div>

            {/* <FormField
              control={formInfo.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                     
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
                
              </Label>
              <Input type="file" name="aadharFront" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Aadhar Card Back
               
              </Label>
              <Input type="file" name="aadharBack" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Pan Card
               
              </Label>
              <Input type="file" name="panCard" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Front
               
              </Label>
              <Input type="file" name="licenceFront" onChange={handleUpload} />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Label>
                Licence Back
               
              </Label>
              <Input type="file" name="licenceBack" onChange={handleUpload} />
            </div>
            <div className="col-span-2 flex justify-end items-center w-full">
              <Button type="submit" className="px-10">
                Submit
              </Button>
            </div> */}

            <div className="mt-4">
              <h1>Address</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  <form
                    className="grid grid-cols-2 gap-4  place-items-center"
                    // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={formInfo.control}
                      name="pinCode"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>Pincode</FormLabel>
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
                      name="country"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>Country</FormLabel>
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
                            <FormLabel>State</FormLabel>
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
                            <FormLabel>City</FormLabel>
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
                      name="house"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>House no, Building Name</FormLabel>
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
                      name="area"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>Road Name, Area, Colony</FormLabel>
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
                      name="landmark"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>
                              Near by famous shop /mall /landmark
                            </FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </form>
                </List.Item>
              </List>
            </div>
            <div className="mt-4">
              <h1>Personal Documents</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  <div>
                    <h1>Pan Card</h1>
                  </div>
                  {/* <List.Item> */}
                  <form
                  //className="grid grid-cols-2 gap-4  place-items-center"
                  // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        gap: 20,
                        marginTop: 10,
                      }}
                    >
                      <FormField
                        control={formInfo.control}
                        name="pan_number"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full">
                              <FormLabel>Pan Number</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <div className="w-full flex flex-col gap-3">
                        <Label>Front Image</Label>
                        <Input
                          type="file"
                          name="panCard"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>

                    {/* </List.Item> */}
                    <div style={{ display: "flex", marginTop: 20 }}>
                      <h1>Aadhar Card</h1>
                    </div>
                    {/* <List.Item> */}

                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        marginTop: 10,
                        gap: 20,
                      }}
                    >
                      <FormField
                        control={formInfo.control}
                        name="aadhar_number"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full">
                              <FormLabel>Aadhar Number</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <div className="w-full flex flex-col gap-3">
                        <Label>Front Image</Label>
                        <Input
                          type="file"
                          name="aadharFront"
                          onChange={handleUpload}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3">
                        <Label>Back Image</Label>
                        <Input
                          type="file"
                          name="aadharBack"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>
                  </form>
                  {/* </List.Item> */}
                </List.Item>
              </List>
            </div>
            <div className="mt-4">
              <h1>Create Vehicle</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  <form
                    className="grid grid-cols-2 gap-4"
                    //className="grid grid-cols-2 gap-4  place-items-center"
                    // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={formInfo.control}
                      name="vehicleClass"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose Vehicle Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleClass?.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                  >
                                    {item.cab_class}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formInfo.control}
                      name="vehicleClass"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Manufacturer</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose Manufacturer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleClass?.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                  >
                                    {item.cab_class}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formInfo.control}
                      name="vehicleClass"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose Model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleClass?.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                  >
                                    {item.cab_class}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formInfo.control}
                      name="plate_number"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>Plate Number</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </form>
                </List.Item>
              </List>
            </div>
            <div className="mt-4">
              <h1>Vehicle Images</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  {/* <List.Item> */}
                  <form
                  //className="grid grid-cols-2 gap-4  place-items-center"
                  // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        gap: 20,
                        marginTop: 10,
                      }}
                    >
                      <div className="w-full flex flex-col gap-3">
                        <Label>Front</Label>
                        <Input
                          type="file"
                          name="front"
                          onChange={handleUpload}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3">
                        <Label>Back</Label>
                        <Input
                          type="file"
                          name="back"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        marginTop: 10,
                        gap: 20,
                      }}
                    >
                      <div className="w-full flex flex-col gap-3">
                        <Label>Right</Label>
                        <Input
                          type="file"
                          name="right"
                          onChange={handleUpload}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3">
                        <Label>Left</Label>
                        <Input
                          type="file"
                          name="left"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>
                  </form>
                  {/* </List.Item> */}
                </List.Item>
              </List>
            </div>
            <div className="mt-4">
              <h1>Vehicle Documents</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  {/* <List.Item> */}
                  <form
                  //className="grid grid-cols-2 gap-4  place-items-center"
                  // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        gap: 20,
                        marginTop: 10,
                      }}
                    >
                      <div className="w-full flex flex-col gap-3">
                        <Label>Pollution</Label>
                        <Input
                          type="file"
                          name="pollution"
                          onChange={handleUpload}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3">
                        <Label>RC</Label>
                        <Input type="file" name="rc" onChange={handleUpload} />
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-2"
                      style={{
                        // display: "flex",
                        marginTop: 10,
                        gap: 20,
                      }}
                    >
                      <div className="w-full flex flex-col gap-3">
                        <Label>Insurance</Label>
                        <Input
                          type="file"
                          name="insurance"
                          onChange={handleUpload}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3">
                        <Label>Sound</Label>
                        <Input
                          type="file"
                          name="sound"
                          onChange={handleUpload}
                        />
                      </div>
                    </div>
                  </form>
                  {/* </List.Item> */}
                </List.Item>
              </List>
            </div>
            <div className="mt-4">
              <h1>Bank Account Details</h1>
            </div>
            <div className="border rounded-md ">
              <List bordered>
                <List.Item>
                  <form
                    className="grid grid-cols-2 gap-4  place-items-center"
                    // onSubmit={formInfo.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={formInfo.control}
                      name="pincode"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>Account Number</FormLabel>
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
                      name="country"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel>IFSC Code</FormLabel>
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
                            <FormLabel>Bank Name</FormLabel>
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
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </form>
                </List.Item>
              </List>
            </div>
            <div className="flex justify-center items-center col-span-2 py-2.5 pr-2.5">
              <Button isLoading={isLoading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default AddDriver;
