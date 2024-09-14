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
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewVehicleModel = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [vehicleModel, setVehicleModel] = useState([]);
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const { toast } = useToast();
  const fetchVehicleModel = async () => {
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/admin-api/vehicle-model`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setVehicleModel(resClassData.data);
      console.log(resClassData.data, "resClassData.data");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVehicleModel();
    }
  }, [user]);

  const deleteVehicleModel = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.modelId || event.target.id;
    if (!id) {
      toast({
        title: "Vehicle Model",
        description: "Vehicle Model ID not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/admin-api/vehicle-model/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Vehicle Model",
        description: "Vehicle Model Deleted successfully",
      });
      fetchVehicleModel();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Vehicle Model</Heading>
        <Button className="rounded-3xl h-auto active:scale-95 duration-100">
          <Link
            to="/vehicles/create/model"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Model
          </Link>
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Vehicle Image</TableHead>
              <TableHead>Vehicle Class</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead>Manufacturer Name</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleModel &&
              vehicleModel?.map((_, i) => {
                return (
                  <TableRow key={i + "-all-fares"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{_.id}</TableCell>
                    <TableCell>
                      <Avatar className="w-16 h-14 rounded-md">
                        <AvatarImage
                          src={`${_?.model_image}`}
                          className="object-contain"
                        />
                        <AvatarFallback className="text-xs font-semibold bg-gradient-to-l from-indigo-600 to-purple-600 text-white">
                          {`${_?.model_image}`}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell>{_.cabtype?.cab_type}</TableCell>
                    <TableCell>{_.model}</TableCell>
                    <TableCell>{_.maker?.maker}</TableCell>
                    <TableCell>{_.is_active ? "Active" : "Inactive"}</TableCell>
                    <TableActionItem
                      data={_}
                      deleteUrl="/admin-api/vehiclemodel/delete/"
                      fetchData={fetchVehicleModel}
                      edit={true}
                      pathname="/vehicles/edit/model"
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default ViewVehicleModel;
