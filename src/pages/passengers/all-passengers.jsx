import { TableActionItem } from "@/components/TableAction";
import Container from "@/components/container";
import Heading from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { setPassengers } from "@/store/slice/app";
import axios from "axios";
import { Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";

const passengersData = [
  {
    id: "01HBBYE80RHKKB6N0DC43EZ7V1",
    profile_pic: "http://dummyimage.com/216x187.png/ff4444/ffffff",
    name: "Wang Weetch",
    phone: "202-193-7357",
    email: "wweetch0@jugem.jp",
    address: "80 Banding Hill",
    wallet: 1120,
    no_of_trips: 66,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE80ZCH1YA22Z6TSB14WM",
    profile_pic: "http://dummyimage.com/143x248.png/dddddd/000000",
    name: "Lissa Golbourn",
    phone: "924-739-8072",
    email: "lgolbourn1@senate.gov",
    address: "897 Steensland Street",
    wallet: 1720,
    no_of_trips: 184,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE8103PJEBZT67N0SR1BZ",
    profile_pic: "http://dummyimage.com/120x168.png/dddddd/000000",
    name: "Harv Hellard",
    phone: "665-625-7442",
    email: "hhellard2@pinterest.com",
    address: "88568 Jana Place",
    wallet: 1881,
    no_of_trips: 20,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE8117CH1ATH5NA2FST97",
    profile_pic: "http://dummyimage.com/237x248.png/5fa2dd/ffffff",
    name: "Erin Gullis",
    phone: "390-227-6594",
    email: "egullis3@accuweather.com",
    address: "25487 Schlimgen Point",
    wallet: 1144,
    no_of_trips: 54,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE812SZDJN9G33Q4SEASE",
    profile_pic: "http://dummyimage.com/224x125.png/cc0000/ffffff",
    name: "Berk Frances",
    phone: "699-657-2273",
    email: "bfrances4@theglobeandmail.com",
    address: "870 Hollow Ridge Pass",
    wallet: 2415,
    no_of_trips: 148,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE8147QXWXJJ3JW0SCG9B",
    profile_pic: "http://dummyimage.com/123x219.png/ff4444/ffffff",
    name: "Rochette Stolle",
    phone: "850-673-0632",
    email: "rstolle5@umich.edu",
    address: "1654 Messerschmidt Park",
    wallet: 1452,
    no_of_trips: 70,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE815WSZ9JCP253ARSVWB",
    profile_pic: "http://dummyimage.com/109x135.png/cc0000/ffffff",
    name: "Camilla McColgan",
    phone: "583-700-5144",
    email: "cmccolgan6@scientificamerican.com",
    address: "83 Russell Circle",
    wallet: 2199,
    no_of_trips: 86,
    status: "LEAVE",
  },
  {
    id: "01HBBYE8160GVEZZKMBNB11RDE",
    profile_pic: "http://dummyimage.com/110x214.png/dddddd/000000",
    name: "Herbie Gilbey",
    phone: "456-292-2422",
    email: "hgilbey7@simplemachines.org",
    address: "7 Kropf Parkway",
    wallet: 2562,
    no_of_trips: 187,
    status: "LEAVE",
  },
  {
    id: "01HBBYE818DGWADPVT1XPYBQ7Y",
    profile_pic: "http://dummyimage.com/200x112.png/dddddd/000000",
    name: "Cinda Westwood",
    phone: "416-254-6433",
    email: "cwestwood8@google.com",
    address: "7770 Annamark Street",
    wallet: 2596,
    no_of_trips: 34,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE8195EQJ2CNGJ7H83T7A",
    profile_pic: "http://dummyimage.com/155x245.png/5fa2dd/ffffff",
    name: "Lyndsey Spurnier",
    phone: "684-442-6190",
    email: "lspurnier9@techcrunch.com",
    address: "09289 Sycamore Junction",
    wallet: 2659,
    no_of_trips: 132,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81A6PCS1G2C9MCTFCQ7",
    profile_pic: "http://dummyimage.com/101x229.png/ff4444/ffffff",
    name: "Hyacinthie Conti",
    phone: "447-974-4335",
    email: "hcontia@topsy.com",
    address: "28932 Randy Place",
    wallet: 2000,
    no_of_trips: 148,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81B3AWFGDCFX1YWGQXC",
    profile_pic: "http://dummyimage.com/202x241.png/ff4444/ffffff",
    name: "Angele Melluish",
    phone: "543-281-2845",
    email: "amelluishb@de.vu",
    address: "68542 Roxbury Street",
    wallet: 2952,
    no_of_trips: 149,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE81C5HH2TYVWS2RRG7HR",
    profile_pic: "http://dummyimage.com/233x105.png/5fa2dd/ffffff",
    name: "Alberta Yukhtin",
    phone: "601-565-2611",
    email: "ayukhtinc@clickbank.net",
    address: "531 Homewood Hill",
    wallet: 1950,
    no_of_trips: 143,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE81ETM7KZQ38BM8J7HWT",
    profile_pic: "http://dummyimage.com/175x171.png/dddddd/000000",
    name: "Lind Brettell",
    phone: "113-555-4484",
    email: "lbrettelld@yolasite.com",
    address: "09 Clove Lane",
    wallet: 2451,
    no_of_trips: 168,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81F38SRZCVAC3GTNQGX",
    profile_pic: "http://dummyimage.com/177x164.png/cc0000/ffffff",
    name: "Shaylah Kiggel",
    phone: "359-833-4360",
    email: "skiggele@smh.com.au",
    address: "1785 Sunbrook Park",
    wallet: 2205,
    no_of_trips: 160,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81GQ4TP96H442RD3JAT",
    profile_pic: "http://dummyimage.com/103x119.png/dddddd/000000",
    name: "Nancey Greenway",
    phone: "558-127-4085",
    email: "ngreenwayf@imageshack.us",
    address: "7890 Straubel Lane",
    wallet: 1440,
    no_of_trips: 140,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81HQAG52FCM9S65E7WK",
    profile_pic: "http://dummyimage.com/180x224.png/5fa2dd/ffffff",
    name: "Herve Cleaver",
    phone: "339-761-0701",
    email: "hcleaverg@sbwire.com",
    address: "46 Lakewood Gardens Place",
    wallet: 1634,
    no_of_trips: 96,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81J2Y94EDEW9W7CWT6H",
    profile_pic: "http://dummyimage.com/134x227.png/5fa2dd/ffffff",
    name: "Wakefield Tock",
    phone: "798-173-7134",
    email: "wtockh@unc.edu",
    address: "52 Clarendon Avenue",
    wallet: 1576,
    no_of_trips: 184,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81MCSWKBB0J3JGT7HZR",
    profile_pic: "http://dummyimage.com/245x166.png/5fa2dd/ffffff",
    name: "Tracy Ropp",
    phone: "114-109-9596",
    email: "troppi@guardian.co.uk",
    address: "164 Browning Hill",
    wallet: 1324,
    no_of_trips: 135,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81NJ6ESB03CBN7124SJ",
    profile_pic: "http://dummyimage.com/140x229.png/cc0000/ffffff",
    name: "Kalinda Milton",
    phone: "283-626-0742",
    email: "kmiltonj@ehow.com",
    address: "279 Dakota Center",
    wallet: 2884,
    no_of_trips: 84,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81PTDWD7S849D11JWM4",
    profile_pic: "http://dummyimage.com/102x233.png/ff4444/ffffff",
    name: "Nettle Farrier",
    phone: "314-872-5195",
    email: "nfarrierk@surveymonkey.com",
    address: "9033 Arapahoe Terrace",
    wallet: 2720,
    no_of_trips: 165,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE81QY9JAN5YV7P3W91BK",
    profile_pic: "http://dummyimage.com/159x135.png/ff4444/ffffff",
    name: "Agace Beardsley",
    phone: "805-397-6951",
    email: "abeardsleyl@friendfeed.com",
    address: "0 Holmberg Trail",
    wallet: 2520,
    no_of_trips: 128,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE81RH32RTWY9QE0JC2GH",
    profile_pic: "http://dummyimage.com/121x195.png/dddddd/000000",
    name: "Marielle Garoghan",
    phone: "366-987-7343",
    email: "mgaroghanm@hostgator.com",
    address: "6 Esch Court",
    wallet: 1598,
    no_of_trips: 82,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE81T1E5VEFZD0WB0Q259",
    profile_pic: "http://dummyimage.com/205x128.png/dddddd/000000",
    name: "Nonie Filoniere",
    phone: "658-311-9947",
    email: "nfilonieren@com.com",
    address: "171 Gale Alley",
    wallet: 1990,
    no_of_trips: 167,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81VSN14CX3A226V3NXK",
    profile_pic: "http://dummyimage.com/243x152.png/dddddd/000000",
    name: "Evelina Carsberg",
    phone: "747-785-4985",
    email: "ecarsbergo@cdc.gov",
    address: "03 Cardinal Place",
    wallet: 2527,
    no_of_trips: 182,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81W0KRRRMBFEBD82HYV",
    profile_pic: "http://dummyimage.com/245x145.png/ff4444/ffffff",
    name: "Jaimie Cutridge",
    phone: "229-465-8822",
    email: "jcutridgep@netvibes.com",
    address: "8 Claremont Junction",
    wallet: 1532,
    no_of_trips: 151,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE81X37CMZBCFCM2TZJXZ",
    profile_pic: "http://dummyimage.com/191x146.png/dddddd/000000",
    name: "Leeland Echlin",
    phone: "310-715-6012",
    email: "lechlinq@studiopress.com",
    address: "045 Sloan Lane",
    wallet: 1052,
    no_of_trips: 26,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81Y75TC6S42EMYD5RR9",
    profile_pic: "http://dummyimage.com/170x115.png/dddddd/000000",
    name: "Basilio Rowlett",
    phone: "236-879-6927",
    email: "browlettr@merriam-webster.com",
    address: "1 Portage Plaza",
    wallet: 2240,
    no_of_trips: 177,
    status: "LEAVE",
  },
  {
    id: "01HBBYE81ZEE55B4K1Z844BE5C",
    profile_pic: "http://dummyimage.com/183x179.png/5fa2dd/ffffff",
    name: "Gwendolyn Hargitt",
    phone: "265-406-6578",
    email: "ghargitts@w3.org",
    address: "3731 Jenifer Lane",
    wallet: 2963,
    no_of_trips: 182,
    status: "LEAVE",
  },
  {
    id: "01HBBYE8210Y2QR4YVXHMY1E0Z",
    profile_pic: "http://dummyimage.com/238x198.png/ff4444/ffffff",
    name: "Sylvester Raimbauld",
    phone: "142-637-8804",
    email: "sraimbauldt@auda.org.au",
    address: "0 Birchwood Street",
    wallet: 2853,
    no_of_trips: 95,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE822G8ZRF2T0HN60J91X",
    profile_pic: "http://dummyimage.com/187x186.png/dddddd/000000",
    name: "Page Boules",
    phone: "145-872-9352",
    email: "pboulesu@nifty.com",
    address: "882 Trailsway Road",
    wallet: 2685,
    no_of_trips: 26,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE823APNWP61Q5NE376P3",
    profile_pic: "http://dummyimage.com/209x107.png/dddddd/000000",
    name: "Grantley Lilleyman",
    phone: "359-123-6600",
    email: "glilleymanv@zdnet.com",
    address: "23708 Lerdahl Pass",
    wallet: 1165,
    no_of_trips: 22,
    status: "ON TRIP",
  },
  {
    id: "01HBBYE824JCFQCMY1YR7SKA0S",
    profile_pic: "http://dummyimage.com/163x190.png/dddddd/000000",
    name: "Kirbie Matthias",
    phone: "798-629-1549",
    email: "kmatthiasw@tinypic.com",
    address: "53 Fairfield Plaza",
    wallet: 1307,
    no_of_trips: 23,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE82553518SZGWDJ5PB4W",
    profile_pic: "http://dummyimage.com/194x201.png/cc0000/ffffff",
    name: "Luca Burniston",
    phone: "503-204-2799",
    email: "lburnistonx@homestead.com",
    address: "5515 Heffernan Junction",
    wallet: 1792,
    no_of_trips: 33,
    status: "AVAILABLE",
  },
  {
    id: "01HBBYE826WGBD5QF72W1JVZW5",
    profile_pic: "http://dummyimage.com/222x138.png/cc0000/ffffff",
    name: "Ronni Farfull",
    phone: "414-471-5706",
    email: "rfarfully@addtoany.com",
    address: "37259 Lakewood Crossing",
    wallet: 2702,
    no_of_trips: 28,
    status: "AVAILABLE",
  },
];

const AllPassengers = () => {
  const { user } = useSelector((state) => state.user);
  // const { passengers } = useSelector((state) => state.app);
  const [passengers, setPassengers] = useState(null); // [
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  //initializers
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")

  const fetchPassengers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${SERVER_URL}/admin-api/passengers/?page=${pagination.page}&page_size=${pagination.page_size}`,
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
      // dispatch(setPassengers(data.results));
      setPassengers(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Passengers",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchPassengers();
    }
    fetchPassengers();
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

  const deletePassenger = async (event) => {
    event.preventDefault();
    // const id = event.target.id;
    const id = event.target.dataset.passengerId;
    if (!id) {
      toast({
        title: "Passenger",
        description: "Passenger id not found",
      });
      return;
    }
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${SERVER_URL}/cab-booking-admin-api/passengers/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      toast({
        title: "Passenger",
        description: "Passenger Deleted successfully",
      });
      fetchPassengers();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNavigation = (data) => {
    return navigate({
      pathname: "/passengers/edit",
      search: createSearchParams(data).toString(),
    });
  };

  return (
    <Container>
      <Heading>All Passengers</Heading>
      <div className="border rounded-md w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              {/* <TableHead>Wallet</TableHead> */}
              <TableHead>Trips</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers &&
              passengers?.map((_, i) => {
                const name = _.first_name + " " + _.last_name;
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {
                        <Avatar>
                          <AvatarImage src={_.photo_upload} alt={name} />
                          <AvatarFallback>
                            {name.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                      }
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{_.phone}</TableCell>
                    <TableCell className="max-w-[150px] break-words">
                      {_.email}
                    </TableCell>
                    <TableCell className="max-w-[150px] break-words">
                      {_.full_address}
                    </TableCell>
                    {/* <TableCell>{_.wallet}$</TableCell> */}
                    <TableCell>{_.total_trips}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          _.status === "ACTIVE"
                            ? ""
                            : _.status === "ON TRIP"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {_.status}
                      </Badge>
                    </TableCell>
                    <TableActionItem
                      data={_}
                      deleteUrl="/admin-api/passenger/"
                      edit={true}
                      fetchData={fetchPassengers}
                      pathname="/passengers/edit"
                    />
                    {/* <TableCell className="text-right space-x-2 flex items-center">
                      <Button
                        id={_.id}
                        data-passenger-id={_.id}
                        isLoading={isDeleting}
                        variant="outline"
                        className="rounded-3xl h-auto"
                        onClick={deletePassenger}
                      >
                        <Trash className="w-3.5 h-3.5" />
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

export default AllPassengers;
