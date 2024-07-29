import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
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
import { Link } from "react-router-dom";

//vehicle type, fare per km, minimum fare, minimum distance, waiting fare
const faresData = [
  {
    vehicleType: "suv",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
  {
    vehicleType: "sedan",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
  {
    vehicleType: "crossover",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
  {
    vehicleType: "coupe",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
  {
    vehicleType: "wan",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
  {
    vehicleType: "wagon",
    farePerKm: 10,
    minimumFare: 100,
    minimumDistance: 10,
    waitingFare: 10,
  },
];

const ViewAllFares = () => {
  const { user } = useSelector((state) => state.user);
  const [faresList, setFaresList] = useState(null); //[{id, price, model, model_name, platformCharge}
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const fetchAllFares = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER_URL}/admin-api/cabbookingprices/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      setFaresList(resData);
      console.log(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllFares();
    }
  }, [user]);

  const deleteFare = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.fareId;
    if (!id) {
      toast({
        title: "Vehicle Fare",
        description: "Vehicle Fare ID not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/cab-booking-admin-api/price-settings/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const resData = await res.data;
      toast({
        title: "Vehicle Fare",
        description: "Vehicle Fare Deleted successfully",
      });
      fetchAllFares();
      console.log(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Fare list</Heading>
        <Button className="rounded-3xl h-auto">
          <Link
            to="/fares/create"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Fare
          </Link>
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Vehicle Class</TableHead>
              <TableHead>Base Fare</TableHead>
              <TableHead>Extra KM Fare</TableHead>
              <TableHead>Waiting Fare</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faresList &&
              faresList?.map((_, i) => {
                return (
                  <TableRow key={i + "-all-fares"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{_.cab_class?.cab_class}</TableCell>
                    <TableCell>{_.base_fare}$</TableCell>
                    <TableCell>{_.extra_km_fare}</TableCell>
                    <TableCell>{_.waiting_fare_per_minute}</TableCell>
                    <TableActionItem
                      data={_}
                      deleteUrl="/admin-api/cabbookingprices/"
                      fetchData={fetchAllFares}
                      edit={true}
                      pathname="/fares/edit/"
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

export default ViewAllFares;
