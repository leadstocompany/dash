import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { TagPicker } from "rsuite";

const schema = z.object({
  name: z.string().min(1, {
    message: "Name should be atleast 3 characters long",
  }),
  //set amount or percentage value based on coupon type
  //   document: z.string().min(1, {
  //     message: "Document should not be empty",
  //   }),
  //   suggestion: z.string().min(1, {
  //     message: "Suggestion should not be empty",
  //   }),
  //   picture: z.string().min(1, {
  //     message: "picture should not be empty",
  //   }),
  //set expiry date but it can be null

  //set minimum amount
});

const data = ["Text Field", "Upload Images"].map((item) => ({
  label: item,
  value: item,
}));

const datas = ["Front Image", "Back Image", "Normal Image"].map((item) => ({
  label: item,
  value: item,
}));

const CreateVehicleImage = () => {
  const { user } = useSelector((state) => state.user);

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doc_type, setDoc_type] = useState([]);
  const [pic_type, setPic_type] = useState([]);

  const { toast } = useToast();

  let a = doc_type?.filter((i) => i === "Text Field");
  let b = doc_type?.filter((j) => j === "Upload Images");

  let fi = pic_type?.filter((i) => i === "Front Image");
  let bi = pic_type?.filter((i) => i === "Back Image");
  let ni = pic_type?.filter((i) => i === "Normal Image");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
    console.log({
      ...data,
    });

    const submitData = {
      field_name: data.name,
      active: true,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/vehicle-photo-page/`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: resData.message || "Vehicle Document Generated.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to vehicle generate document",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
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
      setImage(resData.url);
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
    }
  };

  return (
    <Container>
      <Heading>Create Vehicle Image</Heading>
      <Container
        className={"rounded-md border border-gray-100 p-2.5 gap-1.5 bg-gray-50"}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-2.5"
          >
            {/* <div className="grid gap-2.5">
              <Label>Coupon Image</Label>
              <Input type="file" onChange={handleUpload} />
            </div> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="flex justify-end items-center col-span-2 py-2.5 pr-2.5">
              <Button isLoading={isLoading} type="submit">
                Create Image
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default CreateVehicleImage;
