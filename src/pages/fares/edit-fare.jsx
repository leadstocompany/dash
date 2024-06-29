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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  cab_class: z.string().min(1, { message: "Vehicle type cannot be empty" }),
  price: z.string().min(1, {
    message: "Fare per km cannot be empty",
  }),
  platform_charge: z
    .string()
    .min(1, { message: "Platform charge cannot be empty" }),
});

const EditFare = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState({});
  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      cab_class: data.cab_class,
      price: data.price,
      platform_charge: data.platform_charge,
    },
  });

  console.log(data);

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      console.log(`${key}: ${value}`);
    }
  }, [searchParams]);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleClass = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-class`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        });
        const resData = await res.data;
        setVehicleModels(resData.data);
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchVehicleClass();
    }
  }, [user]);

  const onSubmit = async (d) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${SERVER_URL}/cab-booking-admin-api/price-settings/${data.id}/`,
        {
          price: parseInt(d.price),
          platform_charge: d.platform_charge,
          cab_class: d.cab_class,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Fare",
        description: "Vehicle Fare Updated successfully",
      });
      navigate("/fares/all");
      console.log(resData);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Updating fare",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading>Update Fare</Heading>
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
                    value={data?.cab_class}
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
                      {vehicleModels.map((vehicleModel) => (
                        <SelectItem
                          key={vehicleModel.id}
                          value={vehicleModel.id.toString()}
                        >
                          {vehicleModel.cab_class}
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
              name="price"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Fare Per Km <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform_charge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    platform Charge <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" max="100" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center py-2.5 pr-2.5">
              <Button type="submit" isLoading={isLoading}>
                Update Fare{" "}
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditFare;
