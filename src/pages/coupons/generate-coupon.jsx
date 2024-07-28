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

const schema = z.object({
  name: z.string().min(3, {
    message: "Name should be atleast 3 characters long",
  }),
  title: z.string().min(3, {
    message: "Title should be atleast 3 characters long",
  }),
  terms: z.string().min(3, {
    message: "Terms and Condition should be atleast 3 characters long",
  }),
  //set amount or percentage value based on coupon type
  discount: z.string().min(1, {
    message: "Coupon discount should not be empty",
  }),
  //set expiry date but it can be null
  valid_to: z.date().nullable(),
  //set minimum amount
});

const GenerateCoupons = () => {
  const { user } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();


  console.log(new Date().toISOString())

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      title:"",
      terms:"",
      discount: "",
      valid_to: null,
    },
  });

  const onSubmit = async (data) => {
    console.log({
      ...data,
      
    });

    const submitData = {
      name: data.name,
      title:data.title,
      terms:data.terms,
      discount: parseInt(data.discount) || 0,
      valid_from:new Date().toISOString(),
      valid_to: new Date(data.valid_to).toISOString(),
      active:true
    };

    console.log(submitData)

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/couponcode/admin/coupons/`,
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
        title: resData.message || "Coupon Generated",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to generate coupon",
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
      <Heading>Create Coupons</Heading>
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
             <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

<FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms and Conditions</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="discount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Coupon Discount Percentage</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="valid_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-slate-400"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar 
                        mode="single"
                        selected={field.value}
                        
                         onSelect={field.onChange}
                        initialFocus
                        // disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center col-span-2 py-2.5 pr-2.5">
              <Button isLoading={isLoading} type="submit">
                Create Coupons
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default GenerateCoupons;
