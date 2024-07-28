import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
import Loader from "@/components/loader";
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
import { SERVER_URL, cn } from "@/lib/utils";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewAllVehicletype = () => {
  const { user } = useSelector((state) => state.user);

  const [ViewAllVehicletype, setVehicleType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const { toast } = useToast();

  const fetchVehicleType = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${SERVER_URL}/admin-api/vehicle-type`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      const resData = await res.data;
      console.log(resData)
      setVehicleType(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchVehicleType();
    }
  }, [user]);

  const deleteVehicleType = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.typeId || event.target.id;
    if (!id) {
      toast({
        title: "Vehicle Type",
        description: "Vehicle Type ID not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/admin-api/vehicle-type/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Vehicle Type",
        description: "Vehicle Type Deleted successfully",
      });
      fetchVehicleType();
      console.log("Delete");
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
        <Heading>Vehicle Types</Heading>
        <Button className="rounded-3xl h-auto">
          <Link
            to="/vehicles/create/type"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Vehicle Type
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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ViewAllVehicletype &&
              ViewAllVehicletype?.map((_, i) => {
                return (
                  <TableRow key={i + "-all-fares"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{_.id}</TableCell>
                    <TableCell>{_.cab_type}</TableCell>
                    <TableActionItem
                      data={_}
                      deleteUrl="/admin-api/vehicle-type/"
                      fetchData={fetchVehicleType}
                      pathname="/vehicles/edit/type"
                      edit={true}
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

export default ViewAllVehicletype;
