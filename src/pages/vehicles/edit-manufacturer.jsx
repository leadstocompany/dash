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
  cab_type: z.string().min(1, { message: "Vehicle type cannot be empty" }),
  maker: z.string().min(1, { message: "Manufacturer cannot be empty" }),
});

const EditManufacturer = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState({});
  const [vehicleType, setVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      cab_type: data.cab_type,
      maker: data.maker,
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      console.log(`${key}: ${value}`);
    }
  }, []);

  const handleClassChange = (e) => {
    console.log(e);
    setData((prev) => ({ ...prev, cab_type_change: e }));
  };

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

  const onSubmit = async (d) => {
    console.log(d);
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${SERVER_URL}/admin-api/vehicle-maker/${data.id}/`,
        d,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Manufacturer",
        description: "Vehicle Manufacturer Updated successfully",
      });
      console.log(resData, "vehicle manufacturer");
      navigate("/vehicles/view/manufacturer");
    } catch (error) {
      console.log(error);
      toast({
        title: "Vehicle Manufacturer",
        description: "Vehicle Manufacturer Failed to Update",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading>Update Manufacturer</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-2.5">
              <FormField
                control={form.control}
                name="cab_type"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Vehicle Type <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      value={data.cab_type}
                      // onValueChange={handleClassChange}
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          setData((prev) => ({
                            ...prev,
                            cab_type: field.onChange,
                          }));
                        }
                      }}
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
                name="maker"
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
              <Button type="submit" isLoading={isLoading}>
                Update Manufacturer
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditManufacturer;
