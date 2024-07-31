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
import { useState, useEffect } from "react";
import { useForm, } from "react-hook-form";
import { useSelector } from "react-redux";

import { z } from "zod";

const schema = z.object({
  plan_name: z.string().min(3, {
    message: "Plan name should be atleast 3 characters long",
  }),
  //set amount or percentage value based on coupon type
  ride_number: z.string().min(1, {
    message: "Ride number should not be empty",
  }),
  discount: z.string().min(0, {
    message: " Discount should not be empty",
  }),
  price: z.string().min(2, {
    message: "price should not be empty",
  }),
  //set expiry date but it can be null
  // original_price:z.string().min(2, {
  //   message: "Original price should not be empty",
  // }),
  //set minimum amount
});

const GeneratePlans = () => {
  const { user } = useSelector((state) => state.user);
 
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0)

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      plan_name: "",
       discount: "",
      ride_number:'',
      price:'',
      original_price: '',
    },
  });

  const { register, watch, setValue , getValues} = useForm()

 


  const onChangeFirst = value => {setValue('original_price', value);
    console.log(getValues());
  }
  const onSubmit = async (data) => {
    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
    console.log({
      ...data,
      
    });
    setTotal(parseInt(data.discount) + parseInt(data.price))
    console.log(getValues());
    const submitData = {
      plan_name: data.plan_name,
      discount: parseInt(data.discount) || 0,
      ride_numbers: parseInt(data.ride_number),
      price:parseInt(data.price),
      original_price:parseInt(data.discount) || 0 + parseInt(data.price),
     is_active: true
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/subscriptions/admin/subscription-plans/`,
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
        title: resData.message || "Subscription Plan Generated.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to generate subscription.",
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
      <Heading>Create Subscription plan</Heading>
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
              name="plan_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="ride_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ride Numbers</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

<FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} 
         
    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input   {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div style={{flexDirection:"column", display:'flex'}}>
            <Label >Original Price</Label>
            <Input value={total} disabled style={{backgroundColor:'#B5C0D0'}} className="mt-4" defaultValue="helo"  />
            </div>


             {/* <FormField 
              control={form.control}
              name="original_price"
              render={({ field  }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input  style={{backgroundColor:'#B5C0D0'}} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField> */}
            <div className="flex justify-end items-center col-span-2 py-2.5 pr-2.5">
              <Button isLoading={isLoading} type="submit">
                Create plan
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default GeneratePlans;
