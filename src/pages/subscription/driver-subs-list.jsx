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



const plan =[
    {
        id: 1,
        driverName:'Driver',
        mobileNumber:'8627834356',
            planName: "Gold plan",
            date:'11July,2024',
            time:'10:25 am'
          
    }
]

const driversubslist = () => {
  const { user } = useSelector((state) => state.user);
  let a = JSON.parse(user.token)
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refresh, setRefresh] = useState(false); // [1
  const [couponsData, setCouponsData] = useState([]);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/subscriptions/admin/subscriptions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${a.token}`,
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
        <Heading>Drivers Subscription list</Heading>
        {/* <Button className="rounded-3xl h-auto active:scale-95 duration-100">
          <Link
            to="/subscription/generate"
            className="flex items-center justify-center active:scale-95 duration-100"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3px]" />
            Create new Plan
          </Link>
        </Button> */}
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >S.No</TableHead>
              <TableHead>Driver Name</TableHead>
              <TableHead>Mobile numbers</TableHead>
              <TableHead>Plan Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              {/* <TableHead className="text-right">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {couponsData &&
              couponsData.map((_, i) => {
                return (
                  <TableRow key={i + "-all-coupons"}>
                    <TableCell center className="font-medium">{_?.id}</TableCell>
                    <TableCell>
                    {_?.driverName}
                    </TableCell>
                    <TableCell >{_?.mobileNumber}</TableCell>
                    <TableCell>
                      {_?.planName}
                    </TableCell>
                    <TableCell>{_?.date}</TableCell>
                    <TableCell>{_?.time}</TableCell>
                    {/* <TableActionItem
                      data={_}
                      fetchData={fetchCoupons}
                     edit={true}
                    /> */}

                    {/* <TableActionItem
                      data={_}
                      fetchData={fetchCoupons}
                      deleteUrl="/cab-booking-admin-api/coupon-code-setting/"
                    /> */}
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

export default driversubslist;
