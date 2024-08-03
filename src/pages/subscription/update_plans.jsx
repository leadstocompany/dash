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
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


const schema = z.object({
  plan_name: z.string().min(3, {
    message: "Plan name should be atleast 3 characters long",
  }),
  //set amount or percentage value based on coupon type
  days: z.string().min(1, {
    message: "Days should not be empty",
  }),
  vehicleClass: z.string().min(1, { message: "Vehicle class cannot be empty" }),
  // discount: z.string().min(0, {
  //   message: " Discount should not be empty",
  // }),
  // price: z.string().min(2, {
  //   message: "price should not be empty",
  // }),
  //set expiry date but it can be null
  // original_price:z.string().min(2, {
  //   message: "Original price should not be empty",
  // }),
  //set minimum amount
});

const UpdatePlans = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams()
  const [vehicleClass, setVehicleClass] = useState([]);
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('')
  const id = searchParams.get('id')
  const plan_name = searchParams.get('plan_name');
  const ride_number = searchParams.get('ride_numbers');
  const prices = searchParams.get('price');
  const discounts = searchParams.get('discount');
  const original_price = searchParams.get('original_price');
  let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();


  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    values: {
      vehicleClass:data.vehicle_class,
      plan_name: data.plan_name,
      discount: data.discount,
      days:data.days,
      price: data.price,
      original_price: data.original_price,
    },
  });


  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      setData((prev) => ({ ...prev, [key]: value }));
      setPrice(prices)
      setDiscount(discounts)
      setTotal(original_price)
      console.log(`${key}: ${value}`);
    }
  }, [searchParams]);


  useEffect(() => {
    if(!discount){
      setTotal(parseInt(price))
    }
    else{
  let a = parseInt(price)*parseInt(discount) /100
  
  let b = parseInt(price) -a
    setTotal(b)
     }
  }, [price , discount])

  useEffect(() => {

    const fetchVehicleClass = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-class`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        const resData = await res.data;
        setVehicleClass(resData);
        console.log(resData, "vehicle class");
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
     
      fetchVehicleClass();
    }
  }, [user]);



  const onSubmit = async (data) => {
    
    console.log({
      ...data,
      
    });

    const submitData = {
      vehicle_class:data.vehicleClass,
      plan_name: data.plan_name,
      discount: parseInt(discount) ||0,
      days: parseInt(data.days),
      price:parseInt(price),
      original_price:total,
     is_active: true
    };

    

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${SERVER_URL}/subscriptions/admin/subscription-plans/${id}/`,
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
      <Heading>Update Subscription plan</Heading>
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
              name="vehicleClass"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Vehicle Class <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    value={data.vehicleClass}
                    onValueChange={(v) =>
                      setData((prev) => ({ ...prev, cab_class_change: v }))
                    }
                    onOpenChange={(isOpen) => {
                      if (!isOpen && data.cab_class_change) {
                        setData((prev) => ({
                          ...prev,
                          vehicleClass: data.cab_class_change,
                        }));
                        form.setValue("vehicleClass", data.cab_class_change);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleClass?.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.cab_class}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} 
                    onChange={e => {
                      onChangePrice(e.target.value);
                      
                    }}
         
    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField> */}
            <div style={{flexDirection:"column", display:'flex'}}>
            <Label >Price</Label>
            <Input  value={price} onChange={(e)=>setPrice(e.target.value)}
              className="mt-4"  />
            </div>
            <div style={{flexDirection:"column", display:'flex'}}>
            <Label >Percentage (Optional)</Label>
            <Input value={discount} onChange={(e)=>setDiscount(e.target.value)} className="mt-4" defaultValue="helo"  />
            </div>
            {/* <FormField
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
            ></FormField> */}
            <div style={{flexDirection:"column", display:'flex'}}>
            <Label >Original Price</Label>
            <Input value={total ||0} disabled style={{backgroundColor:'#B5C0D0'}} className="mt-4" defaultValue="helo"  />
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

export default UpdatePlans;
