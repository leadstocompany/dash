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
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DriverSupportMessages = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  const fetchSupportMessages = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${SERVER_URL}/cab-booking-admin-api/support-message-list/?page=${pagination.page}&page_size=${pagination.page_size}`,
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
      setData(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSupportMessages();
    }
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

  return (
    <Container>
      <Heading>Driver Support Messages</Heading>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead className="whitespace-nowrap">User ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="whitespace-nowrap">Message</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((_, i) => {
                return (
                  <TableRow key={i + "-active-trips"}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{_.user}</TableCell>
                    <TableCell className="max-w-[150px] break-words">
                      {_.subject}
                    </TableCell>
                    <TableCell className="max-w-[250px] break-words">
                      {_.message}
                    </TableCell>
                    <TableCell>
                      {dayjs(_.created_at).format("DD MMMM hh:mm a")}
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

export default DriverSupportMessages;
