import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL, cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_day: "",
    gender: "",
    photo_upload: "",
  });

  const { toast } = useToast();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if (form.phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
      });
      setIsLoading(false);
      return;
    }
    if (form.email.length === 0) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email",
      });
      setIsLoading(false);
      return;
    }
    try {
      console.log("updating profile");
      const res = await axios.put(
        `${SERVER_URL}/admin-api/profile/update`,
        form,
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      );
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
    console.log(form);
  }

  const handleUpload = async (event) => {
    event.preventDefault();
    const { id } = event.target;
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
      setForm((prev) => ({
        ...prev,
        [id]: resData.url,
      }));
      console.log(resData, "image url");
      // setFiles({ ...files, [name]: resData.data.image_url });
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
    <div className="w-full h-[80vh] flex justify-center items-center ">
      <div className="max-w-lg w-full bg-white rounded-md p-8">
        <div className={cn("grid gap-6 w-full")}>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-center">Update Profile</h1>
            <h3 className="text-center font-medium text-gray-500">
              Update your profile details
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  placeholder="Enter First Name"
                  type="text"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  placeholder="Enter Last Name"
                  type="text"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  type="number"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Birth Day
                </Label>
                <Input
                  id="birth_day"
                  placeholder="Enter your birth day"
                  type="date"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1 col-span-2">
                <Label className="sr-only" htmlFor="password">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  disabled={isLoading}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Gender
                </Label>
                <Select
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      gender: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Profile Picture
                </Label>
                <Input
                  id="photo_upload"
                  placeholder="Enter your phone number"
                  type="file"
                  disabled={isLoading}
                  onChange={handleUpload}
                />
              </div>
              <div className="col-span-2">
                <Button
                  className="w-full"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
