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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  cab_type: z.string().min(1, { message: "Vehicle type cannot be empty" }),
});

const EditVehicleType = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [file, setFile] = useState("");

  const [serchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      cab_type: data.cab_type,
    },
  });

  useEffect(() => {
    for (const [key, value] of serchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      console.log(`${key}: ${value}`);
    }
  }, []);

  const { toast } = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");

  const onSubmit = async (d) => {
    console.log(d);
    try {
      setIsUpdating(true);
      const res = await axios.put(
        `${SERVER_URL}/admin-api/vehicle-type/${data.id}/`,
        { cab_type: d.cab_type, icon: file },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Type",
        description: "Vehicle Type Updated successfully",
      });
      console.log(resData, "vehicle type");
      navigate("/vehicles/view/type");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update vehicle class",
      });
    } finally {
      setIsUpdating(false);
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
      <Heading>Update Vehicle Type</Heading>
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
              name="cab_type"
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
              <Button isLoading={isUpdating} type="submit">
                Update Vehicle Type
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default EditVehicleType;
