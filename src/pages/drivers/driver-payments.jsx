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
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const paymentsData = [
  {
    id: "01HBBW0XNWHP3TMSK8KK7Z0G25",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5412" },
    name: "Bekki Weatherall",
    profile_pic: "http://dummyimage.com/202x120.png/5fa2dd/ffffff",
    date: "9/10/2023",
    amount: 2273,
    status: "LEAVE",
    commission: 25.1,
  },
  {
    id: "01HBBW0XP1KC9BQ8FBESNP24NN",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5413" },
    name: "Stacia Donalson",
    profile_pic: "http://dummyimage.com/104x210.png/cc0000/ffffff",
    date: "8/16/2023",
    amount: 1907,
    status: "AVAILABLE",
    commission: 8.54,
  },
  {
    id: "01HBBW0XP2CJDXQXQD7E7SEN13",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5414" },
    name: "Chas Babon",
    profile_pic: "http://dummyimage.com/108x228.png/cc0000/ffffff",
    date: "8/26/2023",
    amount: 2596,
    status: "ON TRIP",
    commission: 21.12,
  },
  {
    id: "01HBBW0XP3ZTJJX362JMXSE94R",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5415" },
    name: "Kaycee Meldrum",
    profile_pic: "http://dummyimage.com/218x158.png/cc0000/ffffff",
    date: "1/22/2023",
    amount: 2090,
    status: "LEAVE",
    commission: 10.09,
  },
  {
    id: "01HBBW0XP4XW52ZWKPQHCPQ709",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5416" },
    name: "Philippe Bunson",
    profile_pic: "http://dummyimage.com/193x146.png/ff4444/ffffff",
    date: "9/7/2023",
    amount: 2225,
    status: "LEAVE",
    commission: 21.93,
  },
  {
    id: "01HBBW0XP53A19GJN2ZYT9PGXW",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5417" },
    name: "Celie Gabbett",
    profile_pic: "http://dummyimage.com/163x217.png/cc0000/ffffff",
    date: "7/25/2023",
    amount: 2795,
    status: "LEAVE",
    commission: 17.16,
  },
  {
    id: "01HBBW0XP6W1TM7855486KXPWN",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5418" },
    name: "Courtnay Assinder",
    profile_pic: "http://dummyimage.com/169x208.png/cc0000/ffffff",
    date: "9/4/2023",
    amount: 2224,
    status: "ON TRIP",
    commission: 21.69,
  },
  {
    id: "01HBBW0XP7SJS9TH6EJ908Q5MY",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5419" },
    name: "Katuscha Kibard",
    profile_pic: "http://dummyimage.com/141x183.png/5fa2dd/ffffff",
    date: "12/8/2022",
    amount: 2473,
    status: "ON TRIP",
    commission: 27.9,
  },
  {
    id: "01HBBW0XP8BQ4K71VC86GMMH5G",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541a" },
    name: "Michelina Dudney",
    profile_pic: "http://dummyimage.com/166x212.png/cc0000/ffffff",
    date: "10/28/2022",
    amount: 1703,
    status: "AVAILABLE",
    commission: 13.09,
  },
  {
    id: "01HBBW0XP9GZMKY5ZX6FG77R2X",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541b" },
    name: "Shawn Andrus",
    profile_pic: "http://dummyimage.com/193x199.png/ff4444/ffffff",
    date: "11/2/2022",
    amount: 2507,
    status: "AVAILABLE",
    commission: 26.85,
  },
  {
    id: "01HBBW0XPAPKV3RSDH635RHM2J",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541c" },
    name: "Humberto Kubanek",
    profile_pic: "http://dummyimage.com/156x238.png/5fa2dd/ffffff",
    date: "9/25/2023",
    amount: 1720,
    status: "AVAILABLE",
    commission: 11.86,
  },
  {
    id: "01HBBW0XPBFQC8CQC74C76Y4Y3",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541d" },
    name: "Verine Fentem",
    profile_pic: "http://dummyimage.com/193x239.png/cc0000/ffffff",
    date: "10/17/2022",
    amount: 2667,
    status: "LEAVE",
    commission: 20.3,
  },
  {
    id: "01HBBW0XPCM12C3GX0F4Y102QE",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541e" },
    name: "Niall Boller",
    profile_pic: "http://dummyimage.com/216x114.png/5fa2dd/ffffff",
    date: "8/31/2023",
    amount: 1714,
    status: "ON TRIP",
    commission: 6.05,
  },
  {
    id: "01HBBW0XPDE3QJ2YN1CJ27QNCM",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd541f" },
    name: "Fayre Castri",
    profile_pic: "http://dummyimage.com/151x220.png/5fa2dd/ffffff",
    date: "12/2/2022",
    amount: 2186,
    status: "ON TRIP",
    commission: 23.08,
  },
  {
    id: "01HBBW0XPEDNE6BXYWFYCXNP39",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5420" },
    name: "Leonid Francombe",
    profile_pic: "http://dummyimage.com/207x241.png/5fa2dd/ffffff",
    date: "8/24/2023",
    amount: 1461,
    status: "ON TRIP",
    commission: 7.57,
  },
  {
    id: "01HBBW0XPFPK6CTBGQW5NNSPHM",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5421" },
    name: "Ingaberg Mence",
    profile_pic: "http://dummyimage.com/175x119.png/cc0000/ffffff",
    date: "8/22/2023",
    amount: 1755,
    status: "ON TRIP",
    commission: 15.03,
  },
  {
    id: "01HBBW0XPGYHPRY0VK3MBMTA0M",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5422" },
    name: "Dane Duguid",
    profile_pic: "http://dummyimage.com/120x175.png/ff4444/ffffff",
    date: "4/14/2023",
    amount: 1765,
    status: "ON TRIP",
    commission: 25.09,
  },
  {
    id: "01HBBW0XPHX78BKYC5WQ7ZNEAF",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5423" },
    name: "Karl Windham",
    profile_pic: "http://dummyimage.com/227x114.png/cc0000/ffffff",
    date: "6/5/2023",
    amount: 1279,
    status: "LEAVE",
    commission: 19.72,
  },
  {
    id: "01HBBW0XPJVJDQHHJ816H6Z5RT",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5424" },
    name: "Marthe Colenutt",
    profile_pic: "http://dummyimage.com/139x130.png/dddddd/000000",
    date: "9/4/2023",
    amount: 2381,
    status: "AVAILABLE",
    commission: 8.72,
  },
  {
    id: "01HBBW0XPKFQCNAVB2VKB27QYV",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5425" },
    name: "Emmalynn Braim",
    profile_pic: "http://dummyimage.com/183x117.png/dddddd/000000",
    date: "9/11/2023",
    amount: 1236,
    status: "ON TRIP",
    commission: 24.58,
  },
  {
    id: "01HBBW0XPMQBVDJQVMMAKQA9TP",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5426" },
    name: "Dorthea Joice",
    profile_pic: "http://dummyimage.com/206x236.png/ff4444/ffffff",
    date: "9/18/2023",
    amount: 1979,
    status: "AVAILABLE",
    commission: 20.36,
  },
  {
    id: "01HBBW0XPNV9W84QW399659XPW",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5427" },
    name: "Helge Mayte",
    profile_pic: "http://dummyimage.com/126x216.png/ff4444/ffffff",
    date: "6/13/2023",
    amount: 1310,
    status: "AVAILABLE",
    commission: 20.9,
  },
  {
    id: "01HBBW0XPPHXX4ZZA62EKM2WKK",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5428" },
    name: "Barbabra Linck",
    profile_pic: "http://dummyimage.com/226x242.png/cc0000/ffffff",
    date: "9/2/2023",
    amount: 1760,
    status: "LEAVE",
    commission: 25.45,
  },
  {
    id: "01HBBW0XPQTVPF5ZH1JEVE4CNY",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5429" },
    name: "Nicol Minghi",
    profile_pic: "http://dummyimage.com/221x174.png/ff4444/ffffff",
    date: "4/8/2023",
    amount: 2851,
    status: "ON TRIP",
    commission: 27.98,
  },
  {
    id: "01HBBW0XPRAYTAS7SYYXTB3EBF",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542a" },
    name: "Maddi Weaver",
    profile_pic: "http://dummyimage.com/181x128.png/5fa2dd/ffffff",
    date: "2/1/2023",
    amount: 2625,
    status: "LEAVE",
    commission: 18.9,
  },
  {
    id: "01HBBW0XPSAY5YBZ2XKR33JQNM",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542b" },
    name: "Maddie Organer",
    profile_pic: "http://dummyimage.com/238x111.png/ff4444/ffffff",
    date: "3/17/2023",
    amount: 2758,
    status: "LEAVE",
    commission: 25.04,
  },
  {
    id: "01HBBW0XPTHGXRH699BNMYJ5SP",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542c" },
    name: "Noby Awde",
    profile_pic: "http://dummyimage.com/244x195.png/dddddd/000000",
    date: "10/16/2022",
    amount: 2081,
    status: "LEAVE",
    commission: 27.7,
  },
  {
    id: "01HBBW0XPWRBPHSYEY1G14FRA6",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542d" },
    name: "Karola Baldacchino",
    profile_pic: "http://dummyimage.com/228x199.png/5fa2dd/ffffff",
    date: "9/25/2023",
    amount: 2512,
    status: "ON TRIP",
    commission: 8.23,
  },
  {
    id: "01HBBW0XPYZSQS8P5Z1S48M49S",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542e" },
    name: "Effie Eve",
    profile_pic: "http://dummyimage.com/160x186.png/dddddd/000000",
    date: "9/1/2023",
    amount: 2978,
    status: "AVAILABLE",
    commission: 18.07,
  },
  {
    id: "01HBBW0XPZEW52AZ44GQS0N7D7",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd542f" },
    name: "Dorelle Gyngyll",
    profile_pic: "http://dummyimage.com/145x126.png/dddddd/000000",
    date: "10/12/2022",
    amount: 1200,
    status: "AVAILABLE",
    commission: 8.22,
  },
  {
    id: "01HBBW0XQ01PJVXWJ5HSGWNT6G",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5430" },
    name: "Dante McTrustam",
    profile_pic: "http://dummyimage.com/250x156.png/cc0000/ffffff",
    date: "11/6/2022",
    amount: 1622,
    status: "LEAVE",
    commission: 22.58,
  },
  {
    id: "01HBBW0XQ1NR4CBTH3YQGG1XTN",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5431" },
    name: "Martica Burkett",
    profile_pic: "http://dummyimage.com/194x160.png/5fa2dd/ffffff",
    date: "7/17/2023",
    amount: 1475,
    status: "ON TRIP",
    commission: 27.3,
  },
  {
    id: "01HBBW0XQ24EJCS21FD57B08VA",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5432" },
    name: "Noemi Durdy",
    profile_pic: "http://dummyimage.com/247x230.png/5fa2dd/ffffff",
    date: "10/19/2022",
    amount: 1082,
    status: "ON TRIP",
    commission: 27.9,
  },
  {
    id: "01HBBW0XQ3XB2FQY9SBCWXVPJZ",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5433" },
    name: "Lulita Washtell",
    profile_pic: "http://dummyimage.com/206x142.png/dddddd/000000",
    date: "3/14/2023",
    amount: 2034,
    status: "AVAILABLE",
    commission: 21.62,
  },
  {
    id: "01HBBW0XQ46E8K0KEKCS7S7NFY",
    transaction_id: { $oid: "65146a9dfc13ae70f9fd5434" },
    name: "Sophie Cathrall",
    profile_pic: "http://dummyimage.com/121x194.png/dddddd/000000",
    date: "8/4/2023",
    amount: 2831,
    status: "ON TRIP",
    commission: 15.58,
  },
];

const DriverPayments = () => {
  //set states
  const [firstRow, setFirstRow] = useState(0);
  const [lastRow, setLastRow] = useState(10);
  const [data, setData] = useState([]);

  //initializers
  // const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    setData(paymentsData.slice(firstRow, lastRow));
  }, [firstRow, lastRow]);
  //set next page
  const nextPage = () => {
    if (lastRow >= paymentsData.length) {
      return;
    }
    setFirstRow((prev) => prev + 10);
    setLastRow((prev) => prev + 10);
  };

  //set previous page
  const prevPage = () => {
    if (firstRow === 0) {
      return;
    }
    setFirstRow((prev) => prev - 10);
    setLastRow((prev) => prev - 10);
  };
  return (
    <Container>
      <Heading>Driver Payments</Heading>
      <div className="border rounded-md w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {
                      <Avatar>
                        <AvatarImage src={_.profile_pic} alt={_.name} />
                        <AvatarFallback>
                          {_.name.split(" ")[0][0]}
                        </AvatarFallback>
                      </Avatar>
                    }
                  </TableCell>
                  <TableCell>
                    #
                    {_.transaction_id.$oid.length >= 7
                      ? _.transaction_id.$oid.slice(0, 7) + "..."
                      : _.transaction_id.$oid}
                  </TableCell>
                  <TableCell>{_.name}</TableCell>
                  <TableCell>{_.date}</TableCell>
                  <TableCell>{_.amount}$</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        _.status === "AVAILABLE"
                          ? ""
                          : _.status === "ON TRIP"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{_.commission}%</TableCell>
                  <TableCell className="text-right space-x-2 flex">
                    <Button className="rounded-3xl h-auto" id={_.id}>
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-3xl h-auto"
                      id={_.id}
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </Button>
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
            // disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default DriverPayments;
