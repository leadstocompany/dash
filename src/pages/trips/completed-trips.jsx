import Container from "@/components/container";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";

const CompletedTrips = () => {
  const { user } = useSelector((state) => state.user);
  // const { trips } = useSelector((state) => state.app);
  const [trips, setTrips] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  //initializers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
  const fetchCompletedTrips = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER_URL}/admin-api/completed-trips/?page=${pagination.page}&page_size=${pagination.page_size}`,
        {
          headers: {
            Authorization: `token ${token}`,
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
      setTrips(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCompletedTrips();
    }
    fetchCompletedTrips();
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

  const handleNavigate = (data) => {
    navigate({
      pathname: "/trips/route-map",
      search: createSearchParams(data).toString(),
    });
  };
  return (
    <Container>
      <div className="flex justify-between items-center gap-5">
        <Heading>Completed Trips</Heading>
        <Input className="max-w-[250px]" placeholder="Search" />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Trip ID</TableHead>
              <TableHead>Driver Name</TableHead>
              <TableHead>Passenger Name</TableHead>
              <TableHead>Trip From</TableHead>
              <TableHead>Trip To</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead className="text-right">View Route</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips &&
              trips.map((_, i) => {
                return (
                  <TableRow key={i + "-completed-trips"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{_?.id}</TableCell>
                    <TableCell>
                      {_.driver_first_name + " " + _.driver_last_name}
                    </TableCell>
                    <TableCell>
                      {_.customer_first_name + " " + _.customer_last_name}
                    </TableCell>
                    <TableCell className="max-w-[200px] break-words">
                      {_.source}
                    </TableCell>
                    <TableCell className="max-w-[200px] break-words">
                      {_.destination}
                    </TableCell>
                    <TableCell>{dayjs(_.timing).format("DD/MM/YY")}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        className="rounded-3xl h-auto"
                        onClick={() => handleNavigate(_)}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
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

export default CompletedTrips;
