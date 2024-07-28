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
import { TagPicker } from 'rsuite';

const schema = z.object({
  name: z.string().min(3, {
    message: "Name should be atleast 3 characters long",
  }),
  //set amount or percentage value based on coupon type
//   document: z.string().min(1, {
//     message: "Document should not be empty",
//   }),
  suggestion: z.string().min(1, {
    message: "Suggestion should not be empty",
  }),
//   picture: z.string().min(1, {
//     message: "picture should not be empty",
//   }),
  //set expiry date but it can be null
 
  //set minimum amount
});

const data = ['Text Field' , 'Upload Images'].map(
    item => ({ label: item, value: item })
  );

  const datas = ['Front Image' , 'Back Image', 'Normal Image'].map(
    item => ({ label: item, value: item })
  );

const CreateDriverDoc = () => {
  const { user } = useSelector((state) => state.user);
 
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doc_type, setDoc_type] = useState([])
  const [pic_type, setPic_type] = useState([])

  const { toast } = useToast();

  let a = doc_type?.filter(i => i === 'Text Field');
  let b = doc_type?.filter(j=>j === 'Upload Images')

  let fi = pic_type?.filter(i=> i==='Front Image')
  let bi = pic_type?.filter(i=>i==='Back Image')
  let ni = pic_type?.filter(i=>i==='Normal Image')


  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
    name: "",
      document: "",
      suggestion:'',
      picture:'',
      
    },
  });

  const onSubmit = async (data) => {
    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
    console.log({
      ...data,
      
    });

    const submitData = {
        field_name: data.name,
  textfield: a=='Text Field'? true:false,
  filefield: b == 'Upload Images'? true:false,
  front: fi == 'Front Image'? true:false,
  back: bi == 'Back Image'? true:false,
  active: true
     
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${SERVER_URL}/admin-api/userdocumentfields/`,
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
        title: resData.message || "Document Generated.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to generate document",
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
      <Heading>Create Document For Driver</Heading>
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
              name="document_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document type</FormLabel>
                  <FormControl>
                    {/* <Input {...field} /> */}
                    <TagPicker onChange={(e)=>setDoc_type(e)} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300" placeholder="Choose Document Type" block data={data}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>


{a =='Text Field' && <FormField
            control={form.control}
            name="suggestion"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Suggestion Text</FormLabel>
                <FormControl>
                <Input {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        ></FormField>}

{b =='Upload Images' && <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pictures type</FormLabel>
                  <FormControl>
                    {/* <Input {...field} /> */}
                    <TagPicker onChange={(e)=>setPic_type(e)} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300" placeholder="Choose Document Type" block data={datas}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>}
            

             
            <div className="flex justify-end items-center col-span-2 py-2.5 pr-2.5">
              <Button isLoading={isLoading} type="submit">
                Create Document
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </Container>
  );
};

export default CreateDriverDoc;
