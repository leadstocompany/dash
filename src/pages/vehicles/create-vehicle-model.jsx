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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const schema = z.object({
  vehicleModel: z.string().min(1, { message: "Vehicle model cannot be empty" }),
  vehicleManufacturer: z
    .string()
    .min(1, { message: "Vehicle manufacturer cannot be empty" }),
  vehicleType: z.string().min(1, { message: "Vehicle class cannot be empty" }),
  vehicleClass: z.string().min(1, { message: "Vehicle class cannot be empty" }),
});

const CreateVehicleModel = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]);
  const [vehicleClass, setVehicleClass] = useState([]);
  const [file, setFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [vehicleType, setVehicleType] = useState([]);
  const [v_type, setV_type] = useState("");
  const [v_maker, setV_maker] = useState("");
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicleClass = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/cab/${v_type}/cab-class/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleClass(resData);
        console.log(resData, "vehicle class");
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      //fetchVehicleModel();
      fetchVehicleClass();
    }
  }, [v_type]);

  useEffect(() => {
    const fetchVehicleModel = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/cab/${v_type}/vehicle-maker`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
          }
        );
        const resData = await res.data;
        setVehicleManufacturer(resData);
        console.log("vehicle model");
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleModel();
  }, [v_type]);

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
  console.log(file, "file");
  const onSubmit = async (data) => {
    const cab_id = vehicleType.find(
      (vehicleType) => vehicleType.cab_type === data.vehicleType
    );

    if (!user) {
      toast({
        title: "Please login to continue",
      });
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("model_image", file);
      formData.append("model", data.vehicleModel);
      formData.append("maker", data.vehicleManufacturer);
      formData.append("cabclass", data.vehicleClass);
      formData.append("cabtype", data.vehicleType);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/vehicle-model`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      // if (resData.success === "true") {
      //   toast({
      //     title: resData.message,
      //   });
      // }
      toast({
        title: resData.message || "Vehicle modal added.",
      });
      console.log(resData, "vehicle type");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description:
          error?.response?.data?.error ||
          error?.response?.data?.model_image[0] ||
          error?.message ||
          "",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      setIsUploading(false);
    }
  };
  return (
    <Container>
      <Heading>Create Vehicle Model</Heading>
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
              render={({ field, fieldState }) => {
                //console.log(field.value);
                setV_type(field.value);
                return (
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
                );
              }}
            />
            <FormField
              control={form.control}
              name="vehicleManufacturer"
              render={({ field }) => {
                setV_maker(field.value);
                return (
                  <FormItem>
                    <FormLabel>
                      Vehicle Manufacturer{" "}
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
                        {vehicleManufacturer?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.maker}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="vehicleClass"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Class <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleClass?.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id.toString()}>
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
              control={form.control}
              name="vehicleModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Model <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-2">
              <Label>Vehicle Image</Label>
              <Input
                type="file"
                name="vehicle_image"
                onChange={handleUpload}
                // onChange={(e) => {
                //   // console.log(e.target.files[0], "file");
                //   setFile(e.target.files[0]);
                // }}
              />
            </div>
            <div className="flex justify-end items-center w-full py-2.5 pr-2.5 col-span-2">
              <Button type="submit">
                {isLoading ? "Creating Model..." : "Create Model"}
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

export default CreateVehicleModel;
