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
import { Label } from "@/components/ui/label";
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
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const { toast } = useToast();
  const [file, setFile] = useState("");

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
        { cab_type: data.vehicleType, icon: file },
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
  const handleUpload = async (event) => {
    event.preventDefault();
    //setIsUploading(true);
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
      //setIsUploading(false);
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
