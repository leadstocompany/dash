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
import { useToast } from "@/components/ui/use-toast";

import { SERVER_URL, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const schema = z.object({
  vehicleType: z.string().min(1, { message: "Vehicle type cannot be empty" }),
});

const CreateVehicleType = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();

  const onSubmit = async (data) => {
    if (!user) {
      toast({
        title: "Please login to continue",
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/vehicle-type`,
        { cab_type: data.vehicleType },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      // if (resData.success === "true") {
        toast({
          title: resData.message || "Vehicle Type Created Successfully.",
        });
     // }
      console.log(resData, "vehicle type");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading>Create Vehicle Type</Heading>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center w-full py-2.5 pr-2.5 col-span-2">
              <Button type="submit">
                {isLoading ? "Creating Type..." : "Create Type"}
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

export default CreateVehicleType;
