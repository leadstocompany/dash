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
import dayjs from "dayjs";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewVehicleManufacturer = () => {
  const { user } = useSelector((state) => state.user);
  const [vehicleManufacturer, setVehicleManufacturer] = useState([]); //[{id, price, model, model_name, platformCharge}
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const fetchVehicleManufacturer = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-maker`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${user.token}`,
        },
      });
      const resData = await res.data;
      console.log(resData);
      setVehicleManufacturer(resData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchVehicleManufacturer();
    }
  }, [user]);

  const deleteManufacturer = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.makerId || event.target.id;
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
        `${SERVER_URL}/admin-api/vehicle-maker/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Manufacturer",
        description: "Vehicle Manufacturer Deleted successfully",
      });
      fetchVehicleManufacturer();
      console.log(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Vehicle Manufacturer</Heading>
        <Button className="rounded-3xl h-auto">
          <Link
            to="/vehicles/create/manufacturer"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Manufacturer
          </Link>
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Vehicle Manufacturer</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleManufacturer &&
              vehicleManufacturer.map((_, i) => {
                return (
                  <TableRow key={i + "-all-fares"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{_.id}</TableCell>
                    <TableCell>
                      {_?.cab_type_name ? _?.cab_type_name : "N/A"}
                    </TableCell>
                    <TableCell>{_?.maker}</TableCell>
                    <TableCell>
                      {_?.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      {dayjs(_?.created_at).format("dddd MMM YYYY")}
                    </TableCell>
                    <TableActionItem
                      data={_}
                      deleteUrl="/admin-api/vehicle-maker/"
                      fetchData={fetchVehicleManufacturer}
                      edit={true}
                      pathname="/vehicles/edit/manufacturer"
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

export default ViewVehicleManufacturer;
