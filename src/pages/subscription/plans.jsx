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
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import dayjs from "dayjs";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { TableActionItem } from "@/components/TableAction";
import PropTypes from "prop-types";

// const couponsData = [
//   {
//     id: "01HBFSZ85E0MH8CR84GBZ0G6T8",
//     couponCode: "8281YTV7",
//     createdDate: "3/10/2023",
//     expiryDate: "6/27/2023",
//     couponAmount: 33,
//     noOfCoupons: 198,
//     noOfCouponsUsed: 99,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ85QAWFJ6M9S4V4YAYV9",
//     couponCode: "9046UPLZ",
//     createdDate: "11/9/2022",
//     expiryDate: "1/30/2023",
//     couponAmount: 187,
//     noOfCoupons: 163,
//     noOfCouponsUsed: 118,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ85SHPECSJ7JT6CZHGNP",
//     couponCode: "975BFHJM",
//     createdDate: "12/22/2022",
//     expiryDate: "11/10/2022",
//     couponAmount: 156,
//     noOfCoupons: 156,
//     noOfCouponsUsed: 121,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ85V9XP4YR37YMWSNKPD",
//     couponCode: "871CXBSQ",
//     createdDate: "3/23/2023",
//     expiryDate: "8/9/2023",
//     couponAmount: 12,
//     noOfCoupons: 186,
//     noOfCouponsUsed: 59,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ85WFEAW0DKDTP8MGAWJ",
//     couponCode: "324SLFRP",
//     createdDate: "2/19/2023",
//     expiryDate: "7/21/2023",
//     couponAmount: 163,
//     noOfCoupons: 191,
//     noOfCouponsUsed: 12,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ85XTG94CCTWYEKJEK1V",
//     couponCode: "431DPNUQ",
//     createdDate: "6/24/2023",
//     expiryDate: "12/29/2022",
//     couponAmount: 43,
//     noOfCoupons: 153,
//     noOfCouponsUsed: 52,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ85YHK2PRG3WKN0HSNGF",
//     couponCode: "182QSLD0",
//     createdDate: "11/16/2022",
//     expiryDate: "1/6/2023",
//     couponAmount: 34,
//     noOfCoupons: 186,
//     noOfCouponsUsed: 53,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ860AXHJ0B873FKSYAY1",
//     couponCode: "766NHNAU",
//     createdDate: "4/12/2023",
//     expiryDate: "11/18/2022",
//     couponAmount: 138,
//     noOfCoupons: 166,
//     noOfCouponsUsed: 136,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ862A0Z0FG4S8SA5GDJD",
//     couponCode: "538HFGZB",
//     createdDate: "4/9/2023",
//     expiryDate: "3/10/2023",
//     couponAmount: 136,
//     noOfCoupons: 199,
//     noOfCouponsUsed: 146,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ864WPXQQSGX4WSS58QE",
//     couponCode: "123OEFG2",
//     createdDate: "3/17/2023",
//     expiryDate: "10/9/2022",
//     couponAmount: 69,
//     noOfCoupons: 189,
//     noOfCouponsUsed: 63,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ8676CRJKFW3PFVHAHWT",
//     couponCode: "8485NSBE",
//     createdDate: "9/20/2023",
//     expiryDate: "5/27/2023",
//     couponAmount: 77,
//     noOfCoupons: 195,
//     noOfCouponsUsed: 13,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ869XY47PJDZ87Z6GNZY",
//     couponCode: "627YTRTF",
//     createdDate: "11/21/2022",
//     expiryDate: "3/23/2023",
//     couponAmount: 142,
//     noOfCoupons: 153,
//     noOfCouponsUsed: 31,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ86BMSTNWVJJWAHD3ZNA",
//     couponCode: "7650GRMU",
//     createdDate: "6/7/2023",
//     expiryDate: "12/25/2022",
//     couponAmount: 75,
//     noOfCoupons: 170,
//     noOfCouponsUsed: 195,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ86DS7XBRPVMR47DY7WM",
//     couponCode: "402XZIYM",
//     createdDate: "9/16/2023",
//     expiryDate: "5/9/2023",
//     couponAmount: 115,
//     noOfCoupons: 155,
//     noOfCouponsUsed: 41,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ86GTXA1JDZHDQM2MP23",
//     couponCode: "144NJZU3",
//     createdDate: "12/9/2022",
//     expiryDate: "1/3/2023",
//     couponAmount: 190,
//     noOfCoupons: 162,
//     noOfCouponsUsed: 193,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ86J9016AJX7G766X4BX",
//     couponCode: "6981DDQZ",
//     createdDate: "9/19/2023",
//     expiryDate: "12/24/2022",
//     couponAmount: 188,
//     noOfCoupons: 172,
//     noOfCouponsUsed: 29,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ86MB2YRNPAGTNRTFHN3",
//     couponCode: "020TSWCV",
//     createdDate: "11/5/2022",
//     expiryDate: "8/18/2023",
//     couponAmount: 97,
//     noOfCoupons: 158,
//     noOfCouponsUsed: 197,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ86QNJZCKR1MVK66Q5WT",
//     couponCode: "9833QJPS",
//     createdDate: "9/2/2023",
//     expiryDate: "10/24/2022",
//     couponAmount: 49,
//     noOfCoupons: 168,
//     noOfCouponsUsed: 94,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ86S348XEE6AN6CD5RAT",
//     couponCode: "839PUDD2",
//     createdDate: "6/25/2023",
//     expiryDate: "6/16/2023",
//     couponAmount: 147,
//     noOfCoupons: 175,
//     noOfCouponsUsed: 98,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ86VXN1FADH570SCH1K0",
//     couponCode: "011IQISK",
//     createdDate: "1/10/2023",
//     expiryDate: "8/25/2023",
//     couponAmount: 23,
//     noOfCoupons: 195,
//     noOfCouponsUsed: 67,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ86XPRBN85X1E0BW5EHV",
//     couponCode: "6877BDW3",
//     createdDate: "10/14/2022",
//     expiryDate: "2/1/2023",
//     couponAmount: 180,
//     noOfCoupons: 168,
//     noOfCouponsUsed: 126,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ870MQ7R4E1W97B64ST7",
//     couponCode: "631UMXS9",
//     createdDate: "10/10/2022",
//     expiryDate: "2/14/2023",
//     couponAmount: 28,
//     noOfCoupons: 172,
//     noOfCouponsUsed: 105,
//     status: "Active",
//   },
//   {
//     id: "01HBFSZ8725DGSFEJNRW417X97",
//     couponCode: "251NFZWI",
//     createdDate: "3/1/2023",
//     expiryDate: "2/18/2023",
//     couponAmount: 194,
//     noOfCoupons: 195,
//     noOfCouponsUsed: 62,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ874B5P8CSQR9A7SN5VS",
//     couponCode: "354PDWKR",
//     createdDate: "10/8/2022",
//     expiryDate: "2/6/2023",
//     couponAmount: 153,
//     noOfCoupons: 169,
//     noOfCouponsUsed: 10,
//     status: "InActive",
//   },
//   {
//     id: "01HBFSZ877J1B750G7FJSJQB8Y",
//     couponCode: "4661KJL5",
//     createdDate: "6/13/2023",
//     expiryDate: "4/18/2023",
//     couponAmount: 98,
//     noOfCoupons: 174,
//     noOfCouponsUsed: 63,
//     status: "Active",
//   },
// ];

const plan =[
    {
        id: 1,
            planName: "Gold plan",
            rideNumbers:100,
            price:2500,
            Discount:'25',
          
    }
]

const Plans = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refresh, setRefresh] = useState(false); // [1
  const [couponsData, setCouponsData] = useState([]);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/cab-booking-admin-api/coupon-code-setting/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${user.token}`,
          },
        }
      );
      const resClassData = await resClass.data;
      setCouponsData(resClassData);
      console.log(resClassData, "resClassData");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCoupons();
    }
  }, [user]);
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading>Subscription plans</Heading>
        <Button className="rounded-3xl h-auto active:scale-95 duration-100">
          <Link
            to="/subscription/generate"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create new Plan
          </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >S.No</TableHead>
              <TableHead>Plan Name</TableHead>
              <TableHead>Ride numbers</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couponsData &&
              plan.map((_, i) => {
                return (
                  <TableRow key={i + "-all-coupons"}>
                    <TableCell center className="font-medium">{_.id}</TableCell>
                    <TableCell>
                    {_?.planName}
                    </TableCell>
                    <TableCell >{_?.rideNumbers}</TableCell>
                    <TableCell>
                      {_?.price}
                    </TableCell>
                    <TableCell>{_.Discount}%</TableCell>
                 
                  <TableActionItem
                      data={_}
                      edit={true}
                      fetchData={fetchCoupons}
                      deleteUrl="/cab-booking-admin-api/coupon-code-setting/"
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

// const TableActionItem = ({ data, fetchCoupons }) => {
//   const { user } = useSelector((state) => state.user);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const deleteCoupon = async (id) => {
//     try {
//       setIsDeleting(true);
//       const res = await axios.delete(
//         `${SERVER_URL}/cab-booking-admin-api/coupon-code-setting/${id}/`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `token ${user.token}`,
//           },
//         }
//       );
//       console.log(res);
//       fetchCoupons();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <TableCell className="flex justify-end gap-2.5">
//       <Button className="rounded-3xl h-auto" id={data.id}>
//         <Edit className="w-3.5 h-3.5" />
//         {data.id}
//       </Button>
//       <Button
//         id={data.id}
//         isLoading={isDeleting}
//         variant="outline"
//         className="rounded-3xl h-auto"
//         onClick={() => deleteCoupon(data.id)}
//       >
//         <Trash className="w-3.5 h-3.5" />
//       </Button>
//     </TableCell>
//   );
// };

// TableActionItem.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.string,
//     coupon_code: PropTypes.string,
//     expire_date: PropTypes.string,
//     coupon_discount: PropTypes.number,
//     is_active: PropTypes.bool,
//   }),
//   fetchCoupons: PropTypes.func,
// };

export default Plans;
