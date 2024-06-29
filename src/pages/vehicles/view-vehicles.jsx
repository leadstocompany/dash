import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
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
// import { setVehicles } from "@/store/slice/app";
import axios from "axios";
import { Edit, Loader, Loader2, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewVehicles = () => {
  const { user } = useSelector((state) => state.user);
  // const { vehicles } = useSelector((state) => state.app);
  const [vehicles, setVehicles] = useState(null); // [vehicles, setVehicles
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  //initializers
  const dispatch = useDispatch();
  const { toast } = useToast();

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER_URL}/cab-booking-admin-api/vehicles/?page=${pagination.page}&page_size=${pagination.page_size}`,
        {
          headers: {
            Authorization: `token ${user.token}`,
          },
        }
      );
      const data = res.data;
      if (data.next === null) {
        setPagination({
          ...pagination,
          next_null: true,
        });
      }
      setVehicles(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchVehicles();
    }
    fetchVehicles();
  }, [pagination.page, pagination.page_size, user]);

  //set next page
  const nextPage = (e) => {
    e.preventDefault();
    if (pagination.next_null) {
      return;
    }
    setPagination((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  //set previous page
  const prevPage = () => {
    if (pagination.page === 1) {
      return;
    }
    setPagination((prev) => {
      return { ...prev, page: prev.page - 1, next_null: false };
    });
  };

  const handleDeleteVehicle = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.vehicleId || event.target.id;
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
        `${SERVER_URL}/cab-booking-admin-api/vehicles/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      toast({
        title: "Vehicle Model",
        description: "Vehicle Model Deleted successfully",
      });
      fetchVehicles();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>All Vehicles</Heading>
        <Button className="rounded-3xl h-auto">
          <Link
            to="/vehicles/create"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create Vehicle
          </Link>
        </Button>
      </div>
      <div className="border rounded-md w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>V.Type</TableHead>
              <TableHead>V.Class</TableHead>
              <TableHead>Specs</TableHead>
              <TableHead>Number</TableHead>
              {/* <TableHead>Active</TableHead> */}
              {/* <TableHead>Approved</TableHead> */}
              {/* <TableHead>Location</TableHead> */}
              {/* <TableHead>Reg Cert.</TableHead> */}
              {/* <TableHead>Mot Cert.</TableHead> */}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles &&
              vehicles.map((_, i) => {
                const name = _?.driver_first_name + " " + _?.driver_last_name;
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="max-w-[100px] break-words">
                      {name?.replace(" ", "").length > 0 ? name : "N/A"}
                    </TableCell>
                    <TableCell>{_?.cab_type_name}</TableCell>
                    <TableCell className="max-w-[100px] break-words">
                      {_.cab_class_name ? _.cab_class_name : "N/A"}
                    </TableCell>
                    <TableCell className="w-[250px] break-words flex flex-wrap gap-2">
                      <Avatar className="h-auto w-16 rounded-sm">
                        <AvatarImage
                          className="w-full h-auto object-cover rounded-md"
                          src={_?.front}
                          alt={_.front}
                        />
                        <AvatarFallback>N/A</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-auto w-16 rounded-sm">
                        <AvatarImage
                          className="w-full h-auto object-cover rounded-md"
                          src={_?.right}
                          alt={_?.right}
                        />
                        <AvatarFallback>N/A</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-auto w-16 rounded-sm">
                        <AvatarImage
                          className="w-full h-auto object-cover rounded-md"
                          src={_?.back}
                          alt={_?.back}
                        />
                        <AvatarFallback>N/A</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="max-w-[100px] break-words">
                      {_.number_plate}
                    </TableCell>
                    {/* <TableCell>
                    {_?.last_location ? _?.last_location : "N/A"}
                  </TableCell> */}
                    {/* <TableCell>
                    <Link to={_.mot_certiifcate} target="_blank">
                      <Button variant="outline" className="rounded-3xl h-auto">
                        View
                      </Button>
                    </Link>
                  </TableCell> */}

                    <TableActionItem
                      data={_}
                      deleteUrl="/cab-booking-admin-api/vehicles/"
                      edit={true}
                      pathname={`/vehicles/edit/vehicle`}
                      view={true}
                      viewPath={`/vehicles/view/${_?.id}`}
                    />

                    {/* <TableCell className="text-right space-x-2 flex items-center">
                      <Link to={`/vehicles/view/${_?.id}`} target="_blank">
                        <Button
                          variant="outline"
                          className="rounded-3xl h-auto"
                        >
                          View
                        </Button>
                      </Link>
                      <Button className="rounded-3xl h-auto" id={_.id}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        id={_.id}
                        data-vehicle-id={_.id}
                        variant="outline"
                        className="rounded-3xl h-auto"
                        onClick={handleDeleteVehicle}
                      >
                        {isDeleting ? (
                          <Loader className="w-4 h-4" />
                        ) : (
                          <Trash className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            isDisabled={pagination.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            isDisabled={pagination.next_null}
          >
            Next Page{" "}
            {isLoading && (
              <Loader2 className="w-4 h-4 ml-2 animate-spin">...</Loader2>
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ViewVehicles;
