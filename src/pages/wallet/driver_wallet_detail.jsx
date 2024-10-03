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
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { List } from "rsuite";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const datas = [
  { name: "alex" },
  { name: "alex" },
  { name: "alex" },
  { name: "alex" },

  { name: "alex" },
  { name: "alex" },
];

const DriverWalletDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { trips } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  //set pagination
  const [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");
  let balance = searchParams.get("balance");
  let first_name = searchParams.get("first_name");
  let last_name = searchParams.get("last_name");
  let phone = searchParams.get("phone");
  let expense = searchParams.get("expense");
  let [datas, setDatas] = useState([]);
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
          `${SERVER_URL}/wallets/admin/users/${id}/transactions/`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        const data = res.data;

        console.log(data?.withdraw);
        setDatas(data?.withdraw);
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
  }, []);
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
      pathname: "/trips/route-map",
      search: createSearchParams(data).toString(),
    });
  };
  return (
    <Container>
      <div className="flex justify-between items-center gap-5">
        <Heading>Driver Wallet Details</Heading>
      </div>
      <div className="border rounded-md">
        <List bordered>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Name -{" "}
              <span style={{ fontWeight: "lighter" }}>
                {first_name + " " + last_name}
              </span>{" "}
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Mobile Number -{" "}
              <span style={{ fontWeight: "lighter" }}>{phone}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Wallet Balance -{" "}
              <span style={{ fontWeight: "lighter" }}>{balance}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Total Expand From Wallet -{" "}
              <span style={{ fontWeight: "lighter" }}>{expense}</span>
            </p>
          </List.Item>
          <List.Item>
            <p style={{ fontWeight: "bold" }}>
              Profile Details -{" "}
              <span>
                <Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
                  <Link
                    //to="/wallet/customer_wallet_detail"
                    className="flex items-center justify-center active:scale-95 duration-100"
                  >
                    Click here
                  </Link>
                </Button>
              </span>
            </p>{" "}
          </List.Item>

          <List.Item>
            <p style={{ fontWeight: "bold" }}>Transaction History - </p>
            {datas?.map((item) => (
              <List.Item
                style={{
                  borderColor: "yellow",
                  borderWidth: 0.2,
                  padding: 10,
                  margin: 15,
                  borderRadius: 5,
                }}
              >
                <p
                  style={{
                    display: "flex",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  {`$ ${item?.amount}`}
                </p>
                <p
                  style={{
                    display: "flex",
                    position: "absolute",
                    right: "15px",
                    top: "55%",
                    fontSize: "70%",
                  }}
                >
                  {item?.transaction_mode}
                </p>
                <p>
                  {item?.transaction_type}
                  <br />
                  <span>{dayjs(item?.date).format("DD MMMM hh:mm a")}</span>
                </p>
              </List.Item>
            ))}
          </List.Item>
        </List>

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

export default DriverWalletDetails;
