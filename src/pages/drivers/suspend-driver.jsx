import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { setAllDrivers } from "@/store/slice/app";
import axios from "axios";
import dayjs from "dayjs";
import { Edit, Loader2, Plus, Star, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SuspendDrivers = () => {
  const { user } = useSelector((state) => state.user);
  // const { drivers } = useSelector((state) => state.app);
  const [drivers, setDrivers] = useState(null); //[{id, price, model, model_name, platformCharge}
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");
  const fetchAllDrivers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER_URL}/admin-api/drivers/?page=${pagination.page}&page_size=${pagination.page_size}`,
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
      setDrivers(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      //   fetchAllDrivers();
    }
  }, [pagination.page, user]);

  // initializers
  const dispatch = useDispatch();
  const { toast } = useToast();

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

  const deleteDriver = async (event) => {
    event.preventDefault();
    const id = event.target.dataset.driverId || event.target.id;
    if (!id) {
      toast({
        title: "Driver",
        description: "Driver ID not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/cab-booking-admin-api/drivers/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Vehicle Driver",
        description: "Vehicle Driver Deleted successfully",
      });
      fetchAllDrivers();
    } catch (error) {
      console.log(error);
      toast({
        title: "Vehicle Driver",
        description: "Vehicle Driver Deletion Failed",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Suspended Driver List</Heading>
      </div>
      <Tabs defaultValue="list-view" className="w-full rounded-md">
        <TabsContent value="list-view">
          <div className="border rounded-md w-full overflow-x-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Vehicle Class</TableHead>
                  <TableHead>Suspend Date and Time</TableHead>

                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers &&
                  drivers?.map((_, i) => {
                    return (
                      <TableRow
                        key={i + "-table-view"}
                        className="items-center"
                      >
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          {
                            <Avatar>
                              <AvatarImage
                                src={_.photo_upload}
                                alt={_.first_name}
                              />
                              <AvatarFallback>
                                {_.first_name.split(" ")[0][0]}
                              </AvatarFallback>
                            </Avatar>
                          }
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <p className="">
                            {_.first_name} {_.last_name}
                          </p>
                        </TableCell>
                        <TableCell className="break-keep block whitespace-nowrap">
                          {_.phone}
                        </TableCell>
                        <TableCell className="max-w-[150px] break-words">
                          {_.city}
                        </TableCell>
                        <TableCell>{_?.vehicle_class}</TableCell>
                        <TableCell>
                          {dayjs(_.date_joined).format("DD MMMM hh:mm a")}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              _.rides_status?.status === "Available"
                                ? ""
                                : _.rides_status?.status === "on trip"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {_.rides_status?.status}
                          </Badge>
                        </TableCell>
                        <TableActionItem
                          data={_}
                          //   deleteUrl="/admin-api/driver/"
                          edit={true}
                          fetchData={fetchAllDrivers}
                          //   pathname="/drivers/edit"
                          viewPath={`/drivers/new_request_driver/view/${_.id}`}
                          view={true}
                        />
                        {/* <TableCell className="text-right space-x-2 flex">
                          <Button className="rounded-3xl h-auto" id={_.id}>
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            id={_.id}
                            data-driver-id={_.id}
                            variant="outline"
                            className="rounded-3xl h-auto"
                            onClick={deleteDriver}
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {isLoading && (
              <div className="flex items-center justify-center py-5 w-full px-5">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            <div className="flex items-center justify-end space-x-2 py-4 pr-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                isDisabled={pagination.page === 1}
                // disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                isDisabled={pagination.next_null}
              >
                Next Page
                {isLoading && (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin">...</Loader2>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="grid-view"
          className="bg-white rounded-md p-2.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {drivers &&
            drivers?.map((_, i) => {
              return (
                <Card key={i + "-grid-view"} className="p-2.5">
                  <CardHeader className="flex flex-col items-center text-center">
                    <CardTitle>{_.first_name}</CardTitle>
                    <CardDescription>{_.total_trips} Trips</CardDescription>
                  </CardHeader>
                  <CardDescription className="mt-5 bg-slate-100 rounded-md px-2.5 pt-2.5 pb-5 flex flex-col gap-2.5 items-center z-10 relative">
                    <Avatar className="w-20 h-20 -mt-11 z-20 relative border-[4px] border-white">
                      <AvatarImage src={_.photo_upload} alt={_.first_name} />
                      <AvatarFallback>
                        {_.first_name.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex gap-1.5 justify-center">
                      {Array(5)
                        .fill(0)
                        ?.map((x, i) => {
                          return (
                            <Star
                              key={i + "-star"}
                              className={cn(
                                "w-5 h-5",
                                _.rating <= i
                                  ? "fill-gray-300 stroke-gray-300"
                                  : "fill-black stroke-black"
                              )}
                            />
                          );
                        })}
                    </span>
                    <CardDescription className="text-base text-black">
                      {_.address}
                    </CardDescription>
                    <CardDescription className="text-sm break-keep">
                      {_.phone}
                    </CardDescription>
                  </CardDescription>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default SuspendDrivers;
