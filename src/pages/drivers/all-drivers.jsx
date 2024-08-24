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

const driversData = [
  {
    id: "01HBBV919ENFM8QX1CTMTR8BS0",
    name: "Reggis Lembcke",
    profile_pic: "http://dummyimage.com/247x141.png/5fa2dd/ffffff",
    phone_number: "354-338-3630",
    email: "rlembcke0@netlog.com",
    address: "680 Raven Hill",
    joining_date: "2/6/2023",
    no_of_trips: 63,
    status: "LEAVE",
    rating: 3,
  },
  {
    id: "01HBBV919P6DF4DXC3BJGM9SSD",
    name: "Blondelle Kennermann",
    profile_pic: "http://dummyimage.com/129x150.png/ff4444/ffffff",
    phone_number: "705-806-1845",
    email: "bkennermann1@shop-pro.jp",
    address: "24525 Acker Pass",
    joining_date: "10/17/2022",
    no_of_trips: 64,
    status: "AVAILABLE",
    rating: 5,
  },
  {
    id: "01HBBV919QRSXQ1TQ3JCP4V51R",
    name: "Analiese McCluney",
    profile_pic: "http://dummyimage.com/191x137.png/cc0000/ffffff",
    phone_number: "101-153-7507",
    email: "amccluney2@wikimedia.org",
    address: "6655 Calypso Place",
    joining_date: "7/4/2023",
    no_of_trips: 69,
    status: "AVAILABLE",
    rating: 1,
  },
  {
    id: "01HBBV919SGNSKRCNP5VK5TCDV",
    name: "Ivett Cheyenne",
    profile_pic: "http://dummyimage.com/195x109.png/5fa2dd/ffffff",
    phone_number: "114-337-5466",
    email: "icheyenne3@apple.com",
    address: "456 Colorado Parkway",
    joining_date: "1/13/2023",
    no_of_trips: 58,
    status: "ON TRIP",
    rating: 4,
  },
  {
    id: "01HBBV919TXYKFE7HNB2R4WYXS",
    name: "Curcio Schumacher",
    profile_pic: "http://dummyimage.com/209x202.png/ff4444/ffffff",
    phone_number: "970-932-9402",
    email: "cschumacher4@liveinternet.ru",
    address: "803 Lukken Place",
    joining_date: "3/2/2023",
    no_of_trips: 83,
    status: "AVAILABLE",
    rating: 2,
  },
  {
    id: "01HBBV919WZ2MBE1FB1M9P660Q",
    name: "Cicily Libreros",
    profile_pic: "http://dummyimage.com/151x199.png/ff4444/ffffff",
    phone_number: "540-503-0149",
    email: "clibreros5@fastcompany.com",
    address: "068 Bellgrove Lane",
    joining_date: "10/10/2022",
    no_of_trips: 103,
    status: "AVAILABLE",
    rating: 4,
  },
  {
    id: "01HBBV919YB4FWCMZXWYXWS6DR",
    name: "Lauren McGraw",
    profile_pic: "http://dummyimage.com/196x196.png/dddddd/000000",
    phone_number: "680-475-7949",
    email: "lmcgraw6@amazon.de",
    address: "27 Logan Lane",
    joining_date: "3/20/2023",
    no_of_trips: 106,
    status: "ON TRIP",
    rating: 1,
  },
  {
    id: "01HBBV919Z4EGN50H5TVXBXT8R",
    name: "Stephani Bland",
    profile_pic: "http://dummyimage.com/185x213.png/5fa2dd/ffffff",
    phone_number: "470-512-8635",
    email: "sbland7@ask.com",
    address: "40951 Surrey Drive",
    joining_date: "10/30/2022",
    no_of_trips: 36,
    status: "AVAILABLE",
    rating: 3,
  },
  {
    id: "01HBBV91A1W9YBVPHWD00FCPX5",
    name: "Isacco Feldfisher",
    profile_pic: "http://dummyimage.com/154x205.png/5fa2dd/ffffff",
    phone_number: "825-302-5666",
    email: "ifeldfisher8@amazonaws.com",
    address: "588 Mariners Cove Drive",
    joining_date: "8/16/2023",
    no_of_trips: 74,
    status: "LEAVE",
    rating: 3,
  },
  {
    id: "01HBBV91A44SSC97M2EVTQ9P8J",
    name: "Corry Dict",
    profile_pic: "http://dummyimage.com/105x144.png/dddddd/000000",
    phone_number: "440-606-7852",
    email: "cdict9@sphinn.com",
    address: "0268 8th Alley",
    joining_date: "5/4/2023",
    no_of_trips: 26,
    status: "ON TRIP",
    rating: 2,
  },
  {
    id: "01HBBV91A5N1R5S2Q399D4Y1SQ",
    name: "Lorens Guiducci",
    profile_pic: "http://dummyimage.com/207x158.png/5fa2dd/ffffff",
    phone_number: "640-174-7165",
    email: "lguiduccia@typepad.com",
    address: "57 Columbus Plaza",
    joining_date: "1/26/2023",
    no_of_trips: 62,
    status: "AVAILABLE",
    rating: 1,
  },
  {
    id: "01HBBV91A8EJXGGNX6S4HB5ACR",
    name: "Booth Martine",
    profile_pic: "http://dummyimage.com/167x193.png/dddddd/000000",
    phone_number: "657-324-6578",
    email: "bmartineb@drupal.org",
    address: "3830 Buell Court",
    joining_date: "8/30/2023",
    no_of_trips: 117,
    status: "ON TRIP",
    rating: 4,
  },
  {
    id: "01HBBV91AA9KB2W4C9QD7S03A4",
    name: "Pernell Egle",
    profile_pic: "http://dummyimage.com/235x113.png/dddddd/000000",
    phone_number: "658-696-7182",
    email: "peglec@zdnet.com",
    address: "5 Judy Park",
    joining_date: "9/18/2023",
    no_of_trips: 102,
    status: "AVAILABLE",
    rating: 5,
  },
  {
    id: "01HBBV91ACE5EFXWF5697HTC6C",
    name: "Rodge Sorel",
    profile_pic: "http://dummyimage.com/236x170.png/ff4444/ffffff",
    phone_number: "678-789-0265",
    email: "rsoreld@craigslist.org",
    address: "4453 American Court",
    joining_date: "8/10/2023",
    no_of_trips: 118,
    status: "ON TRIP",
    rating: 3,
  },
  {
    id: "01HBBV91ADBRRWXTPV22NS966P",
    name: "Lavina Shirtcliffe",
    profile_pic: "http://dummyimage.com/147x240.png/dddddd/000000",
    phone_number: "833-817-3245",
    email: "lshirtcliffee@answers.com",
    address: "07018 Hayes Point",
    joining_date: "10/4/2022",
    no_of_trips: 48,
    status: "LEAVE",
    rating: 3,
  },
  {
    id: "01HBBV91AGH082B1J2TJ9T4YVM",
    name: "Cheslie Hallibone",
    profile_pic: "http://dummyimage.com/197x201.png/ff4444/ffffff",
    phone_number: "414-472-2312",
    email: "challibonef@lulu.com",
    address: "76299 Holy Cross Avenue",
    joining_date: "11/2/2022",
    no_of_trips: 73,
    status: "AVAILABLE",
    rating: 1,
  },
  {
    id: "01HBBV91AHMH7Q92WCXWA2EMAT",
    name: "Jarrad MacCaughey",
    profile_pic: "http://dummyimage.com/199x182.png/5fa2dd/ffffff",
    phone_number: "474-359-9374",
    email: "jmaccaugheyg@indiegogo.com",
    address: "23 South Junction",
    joining_date: "12/1/2022",
    no_of_trips: 41,
    status: "ON TRIP",
    rating: 3,
  },
  {
    id: "01HBBV91AKF85XQ65ZGP3P7F50",
    name: "Elwood Saffell",
    profile_pic: "http://dummyimage.com/234x145.png/5fa2dd/ffffff",
    phone_number: "507-645-4624",
    email: "esaffellh@youtube.com",
    address: "721 Farragut Point",
    joining_date: "1/9/2023",
    no_of_trips: 49,
    status: "LEAVE",
    rating: 4,
  },
  {
    id: "01HBBV91AN7HZ6FXNV8XTJQPTD",
    name: "Gunter Reschke",
    profile_pic: "http://dummyimage.com/117x154.png/ff4444/ffffff",
    phone_number: "877-791-0427",
    email: "greschkei@redcross.org",
    address: "59221 Doe Crossing Park",
    joining_date: "2/5/2023",
    no_of_trips: 101,
    status: "LEAVE",
    rating: 1,
  },
  {
    id: "01HBBV91APQ5P0JF9P67NJV703",
    name: "Rosamund Kisting",
    profile_pic: "http://dummyimage.com/165x124.png/5fa2dd/ffffff",
    phone_number: "915-409-4663",
    email: "rkistingj@answers.com",
    address: "67697 Welch Hill",
    joining_date: "7/31/2023",
    no_of_trips: 60,
    status: "AVAILABLE",
    rating: 5,
  },
  {
    id: "01HBBV91AQZXVTXJYC453Z1R8F",
    name: "Lin Jordine",
    profile_pic: "http://dummyimage.com/238x212.png/dddddd/000000",
    phone_number: "996-822-5546",
    email: "ljordinek@ovh.net",
    address: "3 Blackbird Center",
    joining_date: "2/22/2023",
    no_of_trips: 86,
    status: "LEAVE",
    rating: 5,
  },
  {
    id: "01HBBV91AR83Q1MXMRPCGVVC66",
    name: "Elwyn Dufaur",
    profile_pic: "http://dummyimage.com/233x120.png/dddddd/000000",
    phone_number: "280-572-1661",
    email: "edufaurl@feedburner.com",
    address: "4153 Lotheville Pass",
    joining_date: "12/2/2022",
    no_of_trips: 52,
    status: "ON TRIP",
    rating: 2,
  },
  {
    id: "01HBBV91AT8ETABZC63KZRQFN3",
    name: "Anatollo Mushett",
    profile_pic: "http://dummyimage.com/207x160.png/dddddd/000000",
    phone_number: "114-203-9347",
    email: "amushettm@yahoo.com",
    address: "69 Surrey Junction",
    joining_date: "1/19/2023",
    no_of_trips: 88,
    status: "ON TRIP",
    rating: 1,
  },
  {
    id: "01HBBV91BS6695159D8E8PX0HM",
    name: "Kimberley Tilbrook",
    profile_pic: "http://dummyimage.com/175x221.png/ff4444/ffffff",
    phone_number: "603-968-7412",
    email: "ktilbrookn@google.com.hk",
    address: "1 Sauthoff Place",
    joining_date: "4/23/2023",
    no_of_trips: 42,
    status: "LEAVE",
    rating: 4,
  },
  {
    id: "01HBBV91BV3JNQ6A6T3NCPQQMR",
    name: "Kath Gylle",
    profile_pic: "http://dummyimage.com/155x222.png/ff4444/ffffff",
    phone_number: "254-254-9793",
    email: "kgylleo@mysql.com",
    address: "86 Bay Center",
    joining_date: "10/15/2022",
    no_of_trips: 73,
    status: "AVAILABLE",
    rating: 3,
  },
  {
    id: "01HBBV91BXQ99T0CBEKBFEE799",
    name: "Wendie Mazzia",
    profile_pic: "http://dummyimage.com/228x104.png/dddddd/000000",
    phone_number: "761-229-6067",
    email: "wmazziap@cyberchimps.com",
    address: "8 Johnson Street",
    joining_date: "12/4/2022",
    no_of_trips: 68,
    status: "AVAILABLE",
    rating: 3,
  },
  {
    id: "01HBBV91BZMGBVA30NWMGZJ66P",
    name: "Xever Blanshard",
    profile_pic: "http://dummyimage.com/244x189.png/ff4444/ffffff",
    phone_number: "723-168-4157",
    email: "xblanshardq@moonfruit.com",
    address: "310 Autumn Leaf Plaza",
    joining_date: "1/7/2023",
    no_of_trips: 49,
    status: "ON TRIP",
    rating: 4,
  },
  {
    id: "01HBBV91C0ZV9M5132FEVX6XMX",
    name: "Josephina Chappelle",
    profile_pic: "http://dummyimage.com/182x130.png/5fa2dd/ffffff",
    phone_number: "378-794-8575",
    email: "jchappeller@freewebs.com",
    address: "02461 Old Gate Road",
    joining_date: "2/27/2023",
    no_of_trips: 53,
    status: "ON TRIP",
    rating: 3,
  },
  {
    id: "01HBBV91C18DHEM8AJXW20KKS3",
    name: "Adiana Kahane",
    profile_pic: "http://dummyimage.com/242x121.png/ff4444/ffffff",
    phone_number: "182-632-2584",
    email: "akahanes@g.co",
    address: "945 Golf Course Drive",
    joining_date: "6/11/2023",
    no_of_trips: 90,
    status: "ON TRIP",
    rating: 3,
  },
  {
    id: "01HBBV91C3QD1Z1ZVCSBY4CCAC",
    name: "Maitilde Arnhold",
    profile_pic: "http://dummyimage.com/134x116.png/dddddd/000000",
    phone_number: "271-246-5881",
    email: "marnholdt@google.ru",
    address: "528 Vernon Court",
    joining_date: "5/16/2023",
    no_of_trips: 106,
    status: "AVAILABLE",
    rating: 4,
  },
  {
    id: "01HBBV91C4NAC7WVGZD56FB7HZ",
    name: "Peggi McGow",
    profile_pic: "http://dummyimage.com/176x185.png/dddddd/000000",
    phone_number: "493-611-2439",
    email: "pmcgowu@tuttocitta.it",
    address: "7808 Claremont Crossing",
    joining_date: "12/29/2022",
    no_of_trips: 24,
    status: "AVAILABLE",
    rating: 5,
  },
  {
    id: "01HBBV91C60TW8RPA3QG5696VR",
    name: "Fawnia Laughtisse",
    profile_pic: "http://dummyimage.com/203x118.png/cc0000/ffffff",
    phone_number: "684-514-3843",
    email: "flaughtissev@chronoengine.com",
    address: "3856 Transport Trail",
    joining_date: "10/16/2022",
    no_of_trips: 81,
    status: "LEAVE",
    rating: 1,
  },
  {
    id: "01HBBV91C7465RDSNPSXSRSR9M",
    name: "Shauna Katzmann",
    profile_pic: "http://dummyimage.com/113x137.png/5fa2dd/ffffff",
    phone_number: "731-253-2734",
    email: "skatzmannw@comcast.net",
    address: "6 Mendota Trail",
    joining_date: "5/30/2023",
    no_of_trips: 40,
    status: "AVAILABLE",
    rating: 5,
  },
  {
    id: "01HBBV91C9A6JD9SQ2XMWMQTSW",
    name: "Benni Ackeroyd",
    profile_pic: "http://dummyimage.com/163x193.png/dddddd/000000",
    phone_number: "405-216-1531",
    email: "backeroydx@arstechnica.com",
    address: "8953 Grayhawk Plaza",
    joining_date: "7/25/2023",
    no_of_trips: 32,
    status: "LEAVE",
    rating: 4,
  },
  {
    id: "01HBBV91CAFR8C4S5CFR094E51",
    name: "Thayne Pettegre",
    profile_pic: "http://dummyimage.com/201x174.png/cc0000/ffffff",
    phone_number: "118-795-3857",
    email: "tpettegrey@theglobeandmail.com",
    address: "21369 Lillian Hill",
    joining_date: "6/22/2023",
    no_of_trips: 74,
    status: "AVAILABLE",
    rating: 5,
  },
];

const AllDrivers = () => {
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

  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
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
      fetchAllDrivers();
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
        <Heading>All Drivers</Heading>
      </div>
      <Tabs defaultValue="list-view" className="w-full rounded-md">
        <div className="flex justify-between items-center">
          <TabsList className="w-[340px] rounded-md">
            <TabsTrigger value="list-view" className="w-full rounded-md">
              List View
            </TabsTrigger>
            <TabsTrigger value="grid-view" className="w-full rounded-md">
              Grid View
            </TabsTrigger>
          </TabsList>
          <Button className="rounded-3xl h-auto">
            <Link
              to="/drivers/create"
              className="flex items-center justify-center active:scale-95 duration-100"
            >
              <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
              Add Driver
            </Link>
          </Button>
        </div>
        <TabsContent value="list-view">
          <div className="border rounded-md w-full overflow-x-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Vehicle Class</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Rides</TableHead>
                  
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
                        <TableCell>{i+1}</TableCell>
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
                        <TableCell>
                        {_?.vehicle_class}
                        </TableCell>
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
                          deleteUrl="/admin-api/driver/"
                          edit={true}
                          fetchData={fetchAllDrivers}
                          pathname="/drivers/edit"
                          viewPath={`/drivers/view/${_.id}`}
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

export default AllDrivers;
