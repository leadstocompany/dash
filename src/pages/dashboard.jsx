import Container from "@/components/container";
import Heading from "@/components/heading";
import MemoizedMapComponent from "@/components/map-component";
import OverviewIncomeGraph from "@/components/overview-income-graph";
import OverviewSurveyGraph from "@/components/overview-survey-graph";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  BadgeDollarSign,
  Edit,
  Scissors,
  Star,
  Trash,
  User,
  Users,
} from "lucide-react";

const taxisCoordinates = [
  // { lat: 37.7749, lng: -122.4194 },
  // { lat: 37.7749, lng: -122.4058 },
  // { lat: 37.7749, lng: -122.3922 },
  { lat: 23.0201581, lng: 72.4149317 },
  { lat: 23.531082, lng: 87.2177726 },
  { lat: 25.17338, lng: 75.7645636 },
  { lat: 22.5721673, lng: 88.4315872 },
  // Add more taxi locations as needed
];

const monthlyData = [
  {
    // first week 2nd week labels

    name: "1-7",
    amt: 400,
  },
  {
    name: "8-14",
    amt: 1210,
  },
  {
    name: "15-21",
    amt: 3290,
  },
  {
    name: "22-28",
    amt: 600,
  },
  {
    name: "29-30",
    amt: 200,
  },
];

const yearlyData = [
  {
    name: "Jan",
    amt: 400,
  },
  {
    name: "Feb",
    amt: 1210,
  },
  {
    name: "Mar",
    amt: 3290,
  },
  {
    name: "Apr",
    amt: 600,
  },
  {
    name: "May",
    amt: 200,
  },
  {
    name: "Jun",
    amt: 400,
  },
  {
    name: "Jul",
    amt: 1210,
  },
  {
    name: "Aug",
    amt: 3290,
  },
  {
    name: "Sep",
    amt: 600,
  },
  {
    name: "Oct",
    amt: 200,
  },
  {
    name: "Nov",
    amt: 400,
  },
  {
    name: "Dec",
    amt: 1210,
  },
];

const tableData = [
  {
    id: 1,
    name: "Jens Brincker",
    joinDate: "23/05/2016",
    vehicleType: "SUV",
    status: "ON TRIP",
    phone: "123456789",
    vehicleNumber: "XN 01 1235",
  },
  {
    id: 2,
    name: "Mark Hay",
    joinDate: "12/12/2021",
    vehicleType: "SEDAN",
    status: "AVAILABLE",
    phone: "1234567890",
    vehicleNumber: "Xp 09 4354",
  },
  {
    id: 3,
    name: "John Doe",
    joinDate: "12/12/2021",
    vehicleType: "Car",
    status: "Active",
    phone: "1234567890",
    vehicleNumber: "1234567890",
  },
];

const reviewData = [
  {
    id: 1,
    name: "Rajesh Mishra",
    profile_pic: "/avatars/01.png",
    review: "Awesome!!! Highly recommend",
    rating: 4,
  },
  {
    id: 2,
    name: "Sara Smith",
    profile_pic: "/avatars/02.png",
    review: "Very bad service :(",
    rating: 1,
  },
  {
    id: 3,
    name: "John Simensh",
    profile_pic: "/avatars/03.png",
    review: "Good service",
    rating: 3,
  },
];

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.375rem",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Dashboard = () => {
  return (
    <Container>
      <Heading>Dashboard</Heading>
      <MemoizedMapComponent
        containerStyle={containerStyle}
        coordinates={taxisCoordinates}
        center={center}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="p-3 flex flex-col w-full gap-5 rounded-md bg-slate-50 border border-slate-200">
          <div className="flex justify-center gap-2.5 items-center p-2.5 flex-wrap">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">50$</h1>
              <p className="text-gray-500 text-sm">Todays income</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">
                {monthlyData[monthlyData.length - 1].amt} $
              </h1>
              <p className="text-gray-500 text-sm">This weeks income</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">
                {monthlyData.reduce((acc, curr) => acc + curr.amt, 0)} $
              </h1>
              <p className="text-gray-500 text-sm">This months income</p>
            </div>
          </div>
          <OverviewIncomeGraph data={monthlyData} />
        </div>
        <div className="grid grid-cols-2 w-full gap-5 rounded-md grid-rows-2">
          <Card className="flex flex-col border-none justify-center gap-2.5 bg-gradient-to-t from-blue-700 to-blue-400 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Booked Trips
              </CardTitle>
              <p className="text-white">
                <Users className="h-4 w-4" />
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+450</div>
              <p className="mt-2.5 text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-none justify-center gap-2.5 bg-gradient-to-t from-indigo-700 to-indigo-400 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cancelled Trips
              </CardTitle>
              <p className="text-white">
                <User className="h-4 w-4" />
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+155</div>
              <p className="mt-2.5 text-xs text-muted-foreground">
                +40% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-none justify-center gap-2.5 bg-gradient-to-t from-emerald-700 to-emerald-400 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <p className="text-white">
                <Scissors className="h-4 w-4" />
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+52</div>
              <p className="mt-2.5 text-xs text-muted-foreground">
                +80% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-none justify-center gap-2.5 bg-gradient-to-t from-rose-700 to-rose-400 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <p className="text-white">
                <BadgeDollarSign className="h-4 w-4" />
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">2300$</div>
              <p className="mt-2.5 text-xs text-muted-foreground">
                +120% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Heading>Chart Survey</Heading>
      <div className="p-3 flex flex-col w-full gap-5 rounded-md bg-slate-50 border border-slate-200">
        <div className="flex justify-between gap-2.5 items-center p-2.5 flex-wrap">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">50$</h1>
            <p className="text-gray-500 text-sm">Todays income</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">
              {monthlyData[monthlyData.length - 1].amt} $
            </h1>
            <p className="text-gray-500 text-sm">This weeks income</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">
              {yearlyData[yearlyData.length - 1].amt} $
            </h1>
            <p className="text-gray-500 text-sm">This months income</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">
              {yearlyData.reduce((acc, curr) => acc + curr.amt, 0)} $
            </h1>
            <p className="text-gray-500 text-sm">This years income</p>
          </div>
        </div>
        <OverviewSurveyGraph data={yearlyData} />
      </div>
      <Heading>Driver Details</Heading>
      <div className="border rounded-md">
        <Table>
          <TableCaption className="py-5">
            A list of all the drivers
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Vehicle Number</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{_.name}</TableCell>
                  <TableCell>{_.joinDate}</TableCell>
                  <TableCell>{_.vehicleType}</TableCell>
                  <TableCell>{_.status}</TableCell>
                  <TableCell>{_.phone}</TableCell>
                  <TableCell>{_.vehicleNumber}</TableCell>
                  <TableCell className="text-right space-x-2">
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
      </div>
      <Heading>Guest Review</Heading>
      <div className="flex justify-start w-full">
        <div className="basis-4/6 flex flex-col space-y-8 border p-5 rounded-md">
          {reviewData.map((r, i) => {
            return (
              <div key={i} className="flex items-center w-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={r.profile_pic} alt="Avatar" />
                  <AvatarFallback>{r.name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{r.name}</p>
                  <p className="text-sm text-slate-500">{r.review}</p>
                </div>
                <div className="ml-auto font-medium flex gap-1.5 items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => {
                      return (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            r.rating <= i
                              ? "fill-gray-200 stroke-gray-200"
                              : "fill-yellow-300 stroke-yellow-300"
                          )}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
          <p className="text-sm text-slate-500 text-center">
            <span className="font-medium">See all reviews</span> (12)
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
