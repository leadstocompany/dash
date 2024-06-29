import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SERVER_URL, cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ViewVehicleById = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const fetchVehiclebyId = async () => {
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/cab-booking-admin-api/vehicles/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicle(resClassData);
      console.log(resClassData, "resClassData");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      fetchVehiclebyId();
    }
  }, [user, id]);
  if (isLoading) <Loader />;
  return (
    <div className="p-5 flex flex-col justify-start items-start w-full gap-5">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-semibold">
            {vehicle?.model_name ? vehicle?.model_name : "{Model}"} By{" "}
            {vehicle?.maker_name ? vehicle?.maker_name : "{Maker}"}
          </h1>
          <p className="text-base font-medium text-gray-600">
            Driver -{" "}
            {vehicle?.driver_first_name + " " + vehicle?.driver_last_name}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col leading-[.75] text-gray-500 text-sm items-start justify-start">
            Number Plate
            <span className="text-black text-lg font-semibold">
              {vehicle?.number_plate}
            </span>
          </div>
          <div className="flex flex-col leading-[.75] text-gray-500 text-sm items-start justify-start">
            Is Approved
            <span className="text-black text-lg font-semibold">
              {vehicle?.is_approved ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex flex-col leading-[.75] text-gray-500 text-sm items-start justify-start">
            Is Active
            <span className="text-black text-lg font-semibold">
              {vehicle?.is_active ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full p-2 bg-gray-100 rounded-xl">
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.front}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Front View - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.front}
            target={vehicle?.front ? "_blank" : "_self"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.front ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.right}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Right View - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.right}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.right ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.back}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Back View - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.back}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.back ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.left}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Left View - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.left}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.left ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.inside_driver_seat}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Inside Driver Seat - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.inside_driver_seat}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.inside_driver_seat ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.inside_passanger_seat}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs text-center px-5 py-8 rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Inside Passanger Seat - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.inside_passanger_seat}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.inside_passanger_seat ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.front_head_light}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 py-8 text-center rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Front Head Light - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.front_head_light}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.front_head_light ? "" : "hidden"
            )}
          >
            view image
          </Link>
        </div>
        <div className="relative group">
          <Avatar className="w-full h-full rounded-xl max-h-[300px]">
            <AvatarImage
              src={vehicle?.back_head_light}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-xs px-5 text-center py-8 rounded-xl font-semibold bg-gradient-to-l from-purple-600 to-pink-300 text-white">
              Back Head Light - No Image
            </AvatarFallback>
          </Avatar>
          <Link
            to={vehicle?.back_head_light}
            target={"_blank"}
            className={cn(
              "absolute rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible inset-0 w-full h-full bg-black/70 text-white flex font-semibold justify-center items-center gap-2 duration-150",
              vehicle?.back_head_light ? "" : "hidden"
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
            <p className="text-base font-medium text-gray-600">Model Name</p>
            <p className="text-base font-medium text-black">
              {vehicle?.model_name}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Maker Name</p>
            <p className="text-base font-medium text-black">
              {vehicle?.maker_name}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Vehilce Type</p>
            <p className="text-base font-medium text-black">
              {vehicle?.cab_type_name}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">Vehicle Class</p>
            <p className="text-base font-medium text-black">
              {vehicle?.cab_class_name}
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center col-span-2">
            <p className="text-base font-medium text-gray-600">Last Location</p>
            <p className="text-base font-medium text-black">
              {vehicle?.last_location}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-2.5">Docs</h1>
        <div className="flex flex-col gap-2.5 w-full">
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Registration Certificate
            </p>
            <Link
              to={vehicle?.registration_certiifcate}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.registration_certiifcate ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              MOT Certificate
            </p>
            <Link
              to={vehicle?.mot_certiifcate}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.mot_certiifcate ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Insurance Certificate
            </p>
            <Link
              to={vehicle?.mot_certiifcate}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.insurance_certiifcate ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Pollution Document
            </p>
            <Link
              to={vehicle?.pollution}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.pollution ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Sound Document
            </p>
            <Link
              to={vehicle?.sound}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.sound ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
          <div className="px-4 py-2.5 rounded-lg bg-gray-100 flex justify-between items-center">
            <p className="text-base font-medium text-gray-600">
              Additional Document
            </p>
            <Link
              to={vehicle?.addtional_document}
              target="_blank"
              className={cn(
                "px-2 font-medium text-blue-500 text-sm",
                "hover:underline",
                vehicle?.addtional_document ? "" : "hidden"
              )}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleById;
