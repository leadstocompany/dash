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
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  model: z.string().min(1, { message: "Vehicle model cannot be empty" }),
  maker: z.string().min(1, { message: "Vehicle manufacturer cannot be empty" }),
  cab_class: z.string().min(1, { message: "Vehicle class cannot be empty" }),
});

const EditModel = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]);
  const [vehicleClass, setVehicleClass] = useState([]);
  const [file, setFile] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      cab_class: data.cab_class,
      model: data.model,
      maker: data.maker,
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleModel = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-maker`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleManufacturer(resData.data);
        console.log("vehicle model");
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVehicleClass = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-class`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleClass(resData.data);
        console.log(resData, "vehicle class");
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchVehicleModel();
      fetchVehicleClass();
    }
  }, [user]);

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      console.log(`${key}: ${value}`);
    }
  }, [searchParams]);

  console.log(data);

  const onSubmit = async (d) => {
    if (!user) {
      toast({
        title: "Please login to continue",
      });
      return;
    }

    const formData = new FormData();
    // formData.append("model_image", file);
    formData.append("model", d.model);
    formData.append("maker", d.maker);
    formData.append("cab_class", d.cab_class);

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${SERVER_URL}/admin-api/vehicle-model/${data.id}/`,
        {
          model: d.model,
          maker: d.maker,
          cab_class: d.cab_class,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      navigate("/vehicles/view/model");
      toast({
        title: "Vehicle Model",
        description: "Vehicle Model Updated successfully",
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

  return (
    <Container>
      <Heading>Update Vehicle Model</Heading>
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
              name="cab_class"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Class <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    value={data.cab_class}
                    onValueChange={(v) =>
                      setData((prev) => ({ ...prev, cab_class_change: v }))
                    }
                    onOpenChange={(isOpen) => {
                      if (!isOpen && data.cab_class_change) {
                        setData((prev) => ({
                          ...prev,
                          cab_class: data.cab_class_change,
                        }));
                        form.setValue("cab_class", data.cab_class_change);
                      }
                    }}
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
              name="maker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Manufacturer <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    value={data.maker}
                    onValueChange={(v) =>
                      setData((prev) => ({ ...prev, maker_change: v }))
                    }
                    onOpenChange={(isOpen) => {
                      if (!isOpen && data.maker_change) {
                        setData((prev) => ({
                          ...prev,
                          maker: data.maker_change,
                        }));
                        form.setValue("maker", data.maker_change);
                      }
                    }}
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
              )}
            />
            <FormField
              control={form.control}
              name="model"
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
            {/* <div className="grid gap-2">
              <Label>Vehicle Image</Label>
              <Input
                type="file"
                name="model_image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setData((prev) => ({
                    ...prev,
                    model_image: e.target.files[0],
                  }));
                }}
              />
            </div> */}
            <div className="flex justify-end items-center w-full py-2.5 pr-2.5 col-span-2">
              <Button isLoading={isLoading} type="submit">
                Update Vehicle Model{" "}
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditModel;
