import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

const ViewVehicleClass = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  //   const [vehicleType, setVehicleType] = useState([]);
  const [vehicleClass, setVehicleClass] = useState([]);

  const { toast } = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const fetchVehicleClass = async () => {

    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/vehicle-class`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicleClass(resClassData);
      console.log(resClassData.data, "resClassData.data");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVehicleClass();
    }
  }, [user]);

  const deleteVehicleClass = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.classId || event.target.id;
    if (!id) {
      toast({
        title: "Vehicle",
        description: "Vehicle ID not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/admin-api/vehicle-class/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Vehicle Class",
        description: "Vehicle Class Deleted successfully",
      });
      fetchVehicleClass();
      console.log("Delete");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNavigate = (data) => {
    return navigate({
      pathname: "/vehicles/edit/class",
      search: createSearchParams({
        vehicleClass: data.cab_class,
        vehicleClassId: data.id,
        vehicleClassIcon: data.icon,
        vehicleType: data.cab_type_name,
        vehicleTypeId: data.cab_type,
      }).toString(),
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Vehicle Class</Heading>
        <Button className="rounded-3xl h-auto active:scale-95 duration-100">
          <Link
            to="/vehicles/create/class"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Class
          </Link>
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Class Icon</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Vehicle Class</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleClass &&
              vehicleClass.map((_, i) => {
                return (
                  <TableRow key={i + "-all-fares"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{_.id}</TableCell>
                    <TableCell>
                      <Avatar className="w-16 h-14 rounded-md">
                        <AvatarImage
                          src={_.icon}
                          alt={_.icon}
                          className="object-contain rounded-md"
                        />
                        <AvatarFallback>{_.icon}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{_.cab_type_name}</TableCell>
                    <TableCell>{_.cab_class}</TableCell>
                    <TableCell>{_.is_active ? "Active" : "Inactive"}</TableCell>
                    <TableActionItem
                      data={_}
                      fetchData={fetchVehicleClass}
                      deleteUrl="/admin-api/vehicle-class/"
                      pathname={"/vehicles/edit/class"}
                      edit={true}
                    />
                    {/* <TableCell className="text-right space-x-2 flex justify-end">
                      <Button
                        // variant="outline"
                        className="rounded-3xl h-auto"
                        onClick={() => handleNavigate(_)}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        // variant="outline"
                        className="rounded-3xl h-auto"
                        id={_.id}
                        data-class-id={_.id}
                        onClick={deleteVehicleClass}
                      >
                        <Trash className="w-3.5 h-3.5 mr-1" />
                        {isDeleting && _.id === _.id ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default ViewVehicleClass;
