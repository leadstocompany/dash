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
import { List } from 'rsuite';
import { Timeline } from 'rsuite';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const datas =[

    {name:"alex"},
    {name:"alex"},
    {name:"alex"},
    {name:"alex"},

    {name:"alex"},
    {name:"alex"},
]

const ActiveSosList = () => {
  const { user } = useSelector((state) => state.user);
  const { trips } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  //set pagination
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    next_null: false,
  });

  //initializers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${SERVER_URL}/cab-booking-admin-api/active-trip/?page=${pagination.page}&page_size=${pagination.page_size}`,
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
        dispatch(setActiveTrips(data.results));
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

  const handleRouteOpen = (data) => {
    navigate({
      pathname: "/trips/route-map",
      search: createSearchParams(data).toString(),
    });
  };
  return (
    <Container>
      <div className="flex justify-between items-center gap-5">
        <Heading>Ride Details Of Active List</Heading>
        
      </div>
      <div>
        <h1>SOS Request come from - User<span style={{color:'#F5004F'}}>(Customer)</span></h1>
      </div>
      <div style={{flexDirection:'row', display:'flex',}}>
      <div >
        <h1>Description -</h1>
      </div>
      <div className="ml-4" style={{ height:'50%', width:'80%'
            ,borderWidth:0.3, borderColor:'#000', borderRadius:3,
            padding:5,
            fontSize:'12px'
        }}><span>Lorem Ipsum.</span></div>
      </div>
      

      <div className="mt-4">
            <h1>Customer Details</h1>
        </div>
      <div className="border rounded-md">
<List bordered>
      <List.Item><p style={{fontWeight:"bold"}}>Name - </p></List.Item>
      <List.Item><p style={{fontWeight:"bold"}}>Mobile No - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Email Id - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Profile Details - <span>< Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
          <Link
             //to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            Click here
          </Link>
        </Button></span></p>  </List.Item>
        
        
  </List>
 
      </div>

      <div className="mt-4">
            <h1>Driver Details</h1>
        </div>
      <div className="border rounded-md">
<List bordered>
      <List.Item><p style={{fontWeight:"bold"}}>Name - </p></List.Item>
      <List.Item><p style={{fontWeight:"bold"}}>Mobile Number - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Vehicle Model - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Vehicle Number - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Vehicle Details - <span>< Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
          <Link
             //to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            Click here
          </Link>
        </Button></span></p>  </List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Profile Details - <span>< Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
          <Link
             //to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            Click here
          </Link>
        </Button></span></p>  </List.Item>
        
        
  </List>
 
      </div>
      <div className="mt-4">
            <h1>Trip Details</h1>
        </div>
      <div className="border rounded-md">
<List bordered>
      <List.Item>
       <div style={{flexDirection:'row', display:'flex'}}>
        <div><p style={{fontWeight:"bold"}}>Pickup and Drop-up location - 
        </p></div>
         <div className="ml-10"> <Timeline>
    <Timeline.Item>16:27:41 </Timeline.Item>
    <Timeline.Item>16:28:43 </Timeline.Item>
  </Timeline></div>
     </div> 
        </List.Item>
      <List.Item><p style={{fontWeight:"bold"}}>Distance - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Time - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Total Fare - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Trip Status - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Payment method - </p></List.Item>
    <List.Item><p style={{fontWeight:"bold"}}>Track Ride - <span>< Button className="ml-5 rounded-2xl h-auto active:scale-95 duration-100">
          <Link
             //to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            Click here
          </Link>
        </Button></span></p>  </List.Item>
        
        
  </List>
 
      </div>
      <div className="justify-center flex items-center">
        <p>If the  Problem is resolved, Please click on the below button for close this thread</p>
</div>
<div className="justify-center flex items-center">
< Button className="justify-center  rounded-2xl h-auto active:scale-95 duration-100 " style={{background:'green'}}>
          <Link
             //to="/wallet/customer_wallet_detail"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
        
            solved
          </Link>
        </Button>
</div>
    </Container>
  );
};

export default ActiveSosList;
