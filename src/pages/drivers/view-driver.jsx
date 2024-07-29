import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL, cn } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

const ViewDriver = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${SERVER_URL}/admin-api/driver/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
          }
        );
        const data = await res.data;
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchDriver();
    }
  }, [id, user]);
  if (isLoading) return <Loader />;
  console.log(data);
  return (
    <div className="p-5 flex flex-col justify-start items-start w-full gap-5">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-semibold">
            {data?.first_name + " " + data?.last_name}
          </h1>
          <p className="text-base font-medium text-gray-500">
            {data?.email || "No Email"} | {data?.phone_number || "No Phone"}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col leading-[.75] text-gray-500 text-sm items-start justify-start">
            Date Joined
            <span className="text-black text-lg font-semibold">
              {dayjs(data?.date_joined).format("DD MMM YYYY")}
            </span>
          </div>
          <div className="flex flex-col leading-[.75] text-gray-500 text-sm items-start justify-start">
            Status
            <span className="text-black text-lg font-semibold">
              {data?.status}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full p-2 bg-gray-100 rounded-xl">
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.photo_upload}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Profile photo - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.photo_upload}
            target={data?.photo_upload ? "_blank" : "_self"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.photo_upload ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.aadhar_upload_front}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Aadhar Front - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.aadhar_upload_front}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.aadhar_upload_front ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.aadhar_upload_back}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Aadhar Back - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.aadhar_upload_back}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.aadhar_upload_back ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.pan_upload}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              PAN - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.pan_upload}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.pan_upload ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.license_upload_front}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              License Front - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.license_upload_front}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.license_upload_front ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={data?.license_upload_back}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs text-center px-5 py-8 rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              License Back - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={data?.license_upload_back}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              data?.license_upload_back ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-2.5">Details</h1>
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Street Address
            </p>
            <p className="text-base font-medium text-black">
              {data?.house_or_building}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Full Address</p>
            <p className="text-base font-medium text-black">
              {data?.full_address}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">City</p>
            <p className="text-base font-medium text-black">{data?.city}</p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">State</p>
            <p className="text-base font-medium text-black">{data?.state}</p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Phone Number</p>
            <p className="text-base font-medium text-black">{data?.phone}</p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Alternate Phone Number
            </p>
            <p className="text-base font-medium text-black">
              {data?.alternate_number}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Aadhar Number</p>
            <p className="text-base font-medium text-black">
              {data?.aadhar_number}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Pan Number</p>
            <p className="text-base font-medium text-black">
              {data?.pan_number}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center col-span-2">
            <p className="text-base font-medium text-gray-600">Licence</p>
            <p className="text-base font-medium text-black">
              {data?.license_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDriver;
