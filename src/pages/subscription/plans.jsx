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
  let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")

  const fetchCoupons = async () => {

    let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")
    try {
      setIsLoading(true);
      const resClass = await axios.get(
        `${SERVER_URL}/subscriptions/admin/subscription-plans/`,
        { 
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
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
              <TableHead>Vehicle Class</TableHead>
              <TableHead>Plan Name</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couponsData &&
              couponsData.map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell center className="font-medium">{_?.id}</TableCell>
                    <TableCell>
                    {_?.vehicle_class?.cab_class}
                    </TableCell>
                    <TableCell >{_?.plan_name}</TableCell>
                    <TableCell>
                      {_?.days}
                    </TableCell>
                    <TableCell>{_?.price}</TableCell>
                    <TableCell>{_?.discount}%</TableCell>
                  <TableActionItem
                      data={_}
                      edit={true}
                      fetchData={fetchCoupons}
                      deleteUrl="/subscriptions/admin/subscription-plans/"
                      pathname={`update/${_?.id}`}
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
