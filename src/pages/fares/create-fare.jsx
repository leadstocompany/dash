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

// z.enum(["suv", "sedan", "crossover", "coupe", "wan", "wagon"])

const schema = z.object({
  vehicleType: z.string().nonempty({ message: "Vehicle type cannot be empty" }),
  base_fare: z.string().nonempty({
    message: "Fare per km cannot be empty",
  }),
  extra_km_fare: z
    .string()
    .nonempty({ message: "Platform charge cannot be empty" }),
    waiting_fare: z
    .string()
    .nonempty({ message: "Platform charge cannot be empty" }),
});

const CreateFare = () => {
  const { user } = useSelector((state) => state.user);

  const [vehicleModels, setVehicleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-class`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleModels(resData);
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchVehicleModels();
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/cabbookingprices/`,
        {
          
          cab_class: data.vehicleType,
          base_fare:data.base_fare,
          extra_km_fare:data.extra_km_fare,
          waiting_fare_per_minute: data.waiting_fare,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Fare",
        description: "Vehicle Fare Created successfully",
      });
      console.log(resData);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating fare",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading>Create Fare</Heading>
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
                      {vehicleModels?.map((vehicleModel) => (
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
              name="base_fare"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Base Fare <span className="text-red-500">*</span>
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
              name="extra_km_fare"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Extra Km Fare <span className="text-red-500">*</span>
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
              name="waiting_fare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Waiting Fare <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" max="100" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center py-2.5 pr-2.5">
              <Button type="submit">
                {isLoading ? "Creating Fare..." : "Create Fare"}
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

export default CreateFare;
