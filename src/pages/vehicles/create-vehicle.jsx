import Container from "@/components/container";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const schema = z.object({
  phone: z.string().min(10).max(10).optional().default(""),
  number_plate: z.string().optional().default(""),
  driver: z.string().optional(),
  maker: z.string().optional(),
  model: z.string().optional(),
  cab_type: z.string().optional(),
  // cab_class: z.string().optional(),
});

const object = {
  phone: "9749880501",
  number_plate: "ABCDE651",
  driver: null,
  maker_id: 1,
  model_id: 6,
  cab_type_id: 13,
  cab_class_id: 1,
  insurance_certiifcate:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  registration_certiifcate:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  mot_certiifcate:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  addtional_document:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  front:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  back: "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  left: "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  right:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  inside_driver_seat:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  inside_passanger_seat:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  front_head_light:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  back_head_light:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  sound:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
  pollutions:
    "https://jlp108-my-ride.s3.amazonaws.com/media/myride/8900044488/OIP_XGWE2ix.jpg",
};

const CreateVehicle = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState({
    insurance_certiifcate: null,
    registration_certiifcate: null,
    mot_certiifcate: null,
    addtional_document: null,
    front_image: null,
    back_image: null,
    left_image: null,
    right_image: null,
    inside_driver_seat_image: null,
    inside_passenger_seat_image: null,
    front_head_light_image: null,
    back_head_light_image: null,
    sound_document: null,
    pollution_document: null,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    console.log(data);
    const vehicleObject = {
      phone: data.phone,
      number_plate: data.number_plate,
      // driver: parseInt(data.driver),
      maker_id: parseInt(data.maker) || "",
      model_id: parseInt(data.model) || "",
      cab_type_id: parseInt(data.cab_type) || "",
      // cab_class_id: parseInt(data.cab_class) || "",
      insurance_certiifcate: files.insurance_certiifcate,
      registration_certiifcate: files.registration_certiifcate,
      mot_certiifcate: files.mot_certiifcate,
      addtional_document: files.addtional_document,
      front: files.front_image,
      back: files.back_image,
      left: files.left_image,
      right: files.right_image,
      inside_driver_seat: files.inside_driver_seat_image,
      inside_passenger_seat: files.inside_passenger_seat_image,
      front_head_light: files.front_head_light_image,
      back_head_light: files.back_head_light_image,
      sound: files.sound_document,
      pollutions: files.pollution_document,
    };

    console.log(vehicleObject, "vehicleObject");

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/cab-booking-admin-api/vehicles/`,
        vehicleObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Created",
        description: "Vehicle Created successfully",
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

  //upload a image file to the server using /account/upload endpoint and get the url of the image file

  const handleUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true);
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
      setFiles({ ...files, [name]: resData.url });
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

  const fetchVehicleDetails = async () => {
    try {
      setIsLoadingData(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/vehicle-manufacturer/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicleDetails(resClassData);
      console.log(resClassData, "resClassData.data");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVehicleDetails();
    }
  }, [user]);

  if (isLoadingData) return <Loader />;

  return (
    <Container>
      <Heading>Create Vehicle</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-2.5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number_plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Vehicle Number Plate{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Driver ID <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cab_type"
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
                        {vehicleDetails &&
                          vehicleDetails.map((vehicleType) => (
                            <SelectItem
                              key={vehicleType?.cab_type_id}
                              value={vehicleType?.cab_type_id.toString()}
                            >
                              {vehicleType?.cab_type_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="cab_class"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Vehicle Class
                      <span className="text-red-500">*</span>
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
                        {vehicleDetails && (
                          <SelectGroup>
                            {vehicleDetails.map((vehicleType) => {
                              const cab_type = parseInt(form.watch("cab_type"));

                              if (cab_type == vehicleType.cab_type_id) {
                                return vehicleType.cab_class.map((cabClass) => (
                                  <SelectItem
                                    key={cabClass.cab_class_id}
                                    value={cabClass.cab_class_id.toString()}
                                  >
                                    {cabClass.cab_class_name}
                                  </SelectItem>
                                ));
                              }
                            })}
                          </SelectGroup>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="maker"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Manufacturer <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vehicle Manufacturer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {vehicleDetails && (
                          <SelectGroup>
                            {vehicleDetails.map((vehicleType) => {
                              const cab_type = parseInt(form.watch("cab_type"));
                              if (cab_type == vehicleType.cab_type_id) {
                                return vehicleType.vehicle_maker.map(
                                  (vehicleMaker) => (
                                    <SelectItem
                                      key={vehicleMaker.maker_id}
                                      value={vehicleMaker.maker_id.toString()}
                                    >
                                      {vehicleMaker.maker_name}
                                    </SelectItem>
                                  )
                                );
                              }
                            })}
                          </SelectGroup>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Model <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vehicle Model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {vehicleDetails &&
                          vehicleDetails.map((type) => {
                            const maker_id = parseInt(form.watch("maker"));
                            // console.log(maker, "maker");
                            return type?.vehicle_maker?.map((maker) => {
                              // console.log(maker, "maker");
                              return maker?.vehicle_model?.map((model) => {
                                // console.log(model, "model");
                                if (maker_id == model.maker_id) {
                                  return (
                                    <SelectItem
                                      key={model.model_id}
                                      value={model.model_id.toString()}
                                    >
                                      {model.model_name}
                                    </SelectItem>
                                  );
                                }
                              });
                            });
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Front Image</Label>
                <Input type="file" name="front_image" onChange={handleUpload} />
              </div>
              <div className="space-y-2">
                <Label>Back Image</Label>
                <Input type="file" name="back_image" onChange={handleUpload} />
              </div>
              <div className="space-y-2">
                <Label>Left Image</Label>
                <Input type="file" name="left_image" onChange={handleUpload} />
              </div>
              <div className="space-y-2">
                <Label>Right Image</Label>
                <Input type="file" name="right_image" onChange={handleUpload} />
              </div>
              <div className="space-y-2">
                <Label>Inside Driver Seat Image</Label>
                <Input
                  type="file"
                  name="inside_driver_seat_image"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Inside Passenger Seat Image</Label>
                <Input
                  type="file"
                  name="inside_passenger_seat_image"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Front Head Light Image</Label>
                <Input
                  type="file"
                  name="front_head_light_image"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Back Head Light Image</Label>
                <Input
                  type="file"
                  name="back_head_light_image"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Sound Document</Label>
                <Input
                  type="file"
                  name="sound_document"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Pollution Document</Label>
                <Input
                  type="file"
                  name="pollution_document"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Insurance Certificate</Label>
                <Input
                  type="file"
                  name="insurance_certiifcate"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Registration Certificate</Label>
                <Input
                  type="file"
                  name="registration_certiifcate"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>MOT Certificate</Label>
                <Input
                  type="file"
                  name="mot_certiifcate"
                  onChange={handleUpload}
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Document</Label>
                <Input
                  type="file"
                  name="addtional_document"
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="flex justify-end items-center w-full py-2.5">
              <Button type="submit">
                {isLoading ? "Creating Maker..." : "Create Manufacturer"}
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

export default CreateVehicle;
