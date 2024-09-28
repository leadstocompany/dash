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
import { handleCSVDownload, handlePDFDownload } from "@/lib/utils";
import { setActiveTrips } from "@/store/slice/app";
import axios from "axios";
import dayjs from "dayjs";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WalletCustomer = () => {
  const { user } = useSelector((state) => state.user);
  const { trips } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  //set pagination
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  //initializers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY");

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${SERVER_URL}/wallets/admin/cutomer/wallets/`,
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
        setData(data);
        // dispatch(setActiveTrips(data.results));
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.token) {
      fetchDrivers();
    }
    fetchDrivers();
  }, [user]);
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

  const handleRouteOpen = (data) => {
    navigate({
      pathname: "/wallet/customer_wallet_detail",
      search: createSearchParams({
        id: data.user.id,
        balance: data.balance,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        phone: data.user.phone,
        expense: data.total_expenses == null ? 0 : data.total_expenses,
      }).toString(),
    });
  };
  return (
    <Container>
      <div className="flex justify-between items-center gap-5">
        <Heading>Customer List</Heading>
        <Input className="max-w-[250px]" placeholder="Search" />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>

              <TableHead>Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Wallet Balance</TableHead>
              <TableHead>More Information</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>

                  <TableCell className="max-w-[150px] break-words">
                    {_.user?.first_name}
                  </TableCell>

                  <TableCell className="max-w-[150px] break-words">
                    {_.user?.phone}
                  </TableCell>
                  <TableCell className="max-w-[150px] break-words">
                    {_.balance}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleRouteOpen(_)}
                      className="rounded-2xl h-auto active:scale-95 duration-100"
                    >
                      {/* <Link
           to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          > */}
                      Click here
                      {/* </Link> */}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* < Button className="rounded-2xl h-auto active:scale-95 duration-100">
          <Link
             to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            Click here
          </Link>
        </Button> */}
        {/* <div className="flex items-center justify-end space-x-2 py-4 pr-4">
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
        </div> */}
      </div>
    </Container>
  );
};

export default WalletCustomer;
