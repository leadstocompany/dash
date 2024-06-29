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
import { z } from "zod";
const schema = z.object({
  vehicleType: z.string().nonempty({ message: "Vehicle type cannot be empty" }),
  manufacturer: z
    .string()
    .nonempty({ message: "Manufacturer cannot be empty" }),
});

const CreateVehicleManufacturer = () => {
  const { user } = useSelector((state) => state.user);

  const [vehicleType, setVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicleType = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-type`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/vehicle-maker`,
        {
          maker: data.manufacturer,
          cab_type: data.vehicleType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      if (
        resData.success === "true" ||
        resData.success === "True" ||
        resData.success === true
      ) {
        toast({
          title: resData.message,
        });
      }
      console.log(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading>Create Manufacturer</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-2.5">
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
                        {vehicleType.map((vehicleModel) => (
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
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Manufacturer <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center w-full py-2.5">
              <Button type="submit">
                {isLoading ? "Creating Manufa..." : "Create Manufacturer"}
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

export default CreateVehicleManufacturer;
