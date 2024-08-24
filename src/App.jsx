import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import SignIn from "./pages/auth/signin";
import UpdateProfile from "./pages/auth/update-problem";
import GenerateCoupons from "./pages/coupons/generate-coupon";
import GeneratePlans from "./pages/subscription/generate-plans";
import ViewAllCoupons from "./pages/coupons/view-all-coupons";
import Dashboard from "./pages/dashboard";
import { AllDrivers, CreateDriver, DriverPayments } from "./pages/drivers";
import EditDriver from "./pages/drivers/edit-driver";
import ViewDriver from "./pages/drivers/view-driver";
import CreateFare from "./pages/fares/create-fare";
import EditFare from "./pages/fares/edit-fare";
import ViewAllFares from "./pages/fares/view-all-fares";
import Layout from "./pages/layout";
import AllPassengers from "./pages/passengers/all-passengers";
import EditPassenger from "./pages/passengers/edit-passenger";
import CustomerSupportMessages from "./pages/support/customer-support-messages";
import DriverSupportMessages from "./pages/support/support-messages";
import {
  ActiveTrips,
  BookedTrips,
  CompletedTrips,
  RouteMap,
} from "./pages/trips";
import { WalletCustomer, WalletUser } from "./pages/wallet";
import { Active, Completed } from "./pages/sos";
import { Plans, DriverSubscriptionList } from "./pages/subscription";
import { DriverFeedback, UserFeedback } from "./pages/feedback";
import {
  CreateVehicle,
  CreateVehicleClass,
  CreateVehicleManufacturer,
  CreateVehicleModel,
  CreateVehicleType,
  EditCLass,
  ViewAllVehicletype,
  ViewVehicleById,
  ViewVehicleClass,
  ViewVehicleManufacturer,
  ViewVehicleModel,
  ViewVehicles,
} from "./pages/vehicles";
import {
  PersonalDocument,
  VehiclePhoto,
  VehicleDocument,
} from "./pages/document";
import EditCLassDetails from "./pages/vehicles/edit-class-details";
import EditManufacturer from "./pages/vehicles/edit-manufacturer";
import EditModel from "./pages/vehicles/edit-model";
import EditVehicle from "./pages/vehicles/edit-vehicle";
import EditVehicleType from "./pages/vehicles/edit-vehicle-type";
import GenerateFeedback from "./pages/feedback/generate-feedback";
import GenerateFeedbackDriver from "./pages/feedback/generate-feedback-driver";
import WalletDriver from "./pages/wallet/wallet_driver";
import CustomerWalletDetails from "./pages/wallet/customer_wallet_details";
import DriverWalletDetails from "./pages/wallet/driver_wallet_detail";
import ActiveSosList from "./pages/sos/active_sos_list";
import UpdatePlans from "./pages/subscription/update_plans";
import UpdateFeedbackUser from "./pages/feedback/update_feedback_user";
import CreateDriverDoc from "./pages/document/create_driver_doc";
import UpdateDoc from "./pages/document/update_document";
import UpdateVehicleDoc from "./pages/document/update_vehicle_doc";
import CreateVehicleDoc from "./pages/document/create_vehicle_doc";
import CreateVehicleImage from "./pages/document/create_vehicle_image";
import UpdateFeedbackDriver from "./pages/feedback/update_feedback_driver";
import ActiveSubsList from "./pages/subscription/active-subs-list";
import ExpireSubsList from "./pages/subscription/expire-subs-list";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} j />;
}

function Root() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route index element={<Dashboard />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="trips">
          <Route index path="active" element={<ActiveTrips />} />
          <Route path="booked" element={<BookedTrips />} />
          <Route path="completed" element={<CompletedTrips />} />
          <Route path="route-map" element={<RouteMap />} />
        </Route>
        <Route path="subscription">
          <Route index path="plans" element={<Plans />}></Route>
          <Route
            path="driver_subscription_list"
            element={<DriverSubscriptionList />}
          ></Route>
          <Route path="generate" element={<GeneratePlans />}></Route>
          <Route
            path="active_subscription_list"
            element={<ActiveSubsList />}
          ></Route>
          <Route
            path="expire_subscription_list"
            element={<ExpireSubsList />}
          ></Route>
          <Route path="plans/update/:id" element={<UpdatePlans />}></Route>
        </Route>

        <Route path="document">
          <Route
            index
            path="personal_document"
            element={<PersonalDocument />}
          ></Route>
          <Route path="vehicle_photos" element={<VehiclePhoto />}></Route>
          <Route path="vehicle_document" element={<VehicleDocument />}></Route>
          <Route
            path="create_driver_document"
            element={<CreateDriverDoc />}
          ></Route>
          <Route
            path="create_vehicle_document"
            element={<CreateVehicleDoc />}
          ></Route>
          <Route
            path="create_vehicle_image"
            element={<CreateVehicleImage />}
          ></Route>
          <Route
            path="personal_document/update/:id"
            element={<UpdateDoc />}
          ></Route>
          <Route
            path="vehicle_document/update/:id"
            element={<UpdateVehicleDoc />}
          ></Route>
        </Route>

        <Route path="wallet">
          <Route
            index
            path="customer_wallet"
            element={<WalletCustomer />}
          ></Route>
          <Route path="driver_wallet" element={<WalletDriver />}></Route>
          <Route
            path="customer_wallet_detail"
            element={<CustomerWalletDetails />}
          ></Route>
          <Route
            path="driver_wallet_detail"
            element={<DriverWalletDetails />}
          ></Route>
        </Route>
        <Route path="sos">
          <Route index path="active" element={<Active />}></Route>
          <Route path="completed" element={<Completed />}></Route>
          <Route path="active_sos_detail" element={<ActiveSosList />}></Route>
          <Route
            path="completed_sos_detail"
            element={<DriverWalletDetails />}
          ></Route>
        </Route>
        <Route path="feedback">
          <Route index path="user" element={<UserFeedback />}></Route>
          <Route path="driver" element={<DriverFeedback />}></Route>
          <Route
            path="generate_user_feedback"
            element={<GenerateFeedback />}
          ></Route>
          <Route
            path="generate_driver_feedback"
            element={<GenerateFeedbackDriver />}
          ></Route>
          <Route path="user/:id" element={<UpdateFeedbackUser />}></Route>
          <Route path="driver/:id" element={<UpdateFeedbackDriver />}></Route>
        </Route>

        <Route path="drivers">
          <Route path="all" element={<AllDrivers />} />
          <Route path="view">
            <Route path=":id" element={<ViewDriver />} />
          </Route>
          <Route path="edit" element={<EditDriver />} />
          <Route path="create" element={<CreateDriver />} />
          <Route path="payments" element={<DriverPayments />} />
        </Route>

        <Route path="passengers">
          <Route index path="all" element={<AllPassengers />} />
          <Route path="edit" element={<EditPassenger />} />
        </Route>
        <Route path="vehicles">
          <Route path="edit">
            <Route path="vehicle" element={<EditVehicle />} />
            <Route path="class" element={<EditCLass />} />
            <Route path="type" element={<EditVehicleType />} />
            <Route path="manufacturer" element={<EditManufacturer />} />
            <Route path="model" element={<EditModel />} />
          </Route>
          <Route path="view">
            <Route path="type" element={<ViewAllVehicletype />} />
            <Route path="class" element={<ViewVehicleClass />} />
            <Route path="manufacturer" element={<ViewVehicleManufacturer />} />
            <Route path="model" element={<ViewVehicleModel />} />
            <Route path="all" element={<ViewVehicles />} />
            <Route path=":id" element={<ViewVehicleById />} />
          </Route>
          <Route path="create">
            <Route index element={<CreateVehicle />} />
            <Route path="type" element={<CreateVehicleType />} />
            <Route path="class" element={<CreateVehicleClass />} />
            <Route
              path="manufacturer"
              element={<CreateVehicleManufacturer />}
            />
            <Route path="model" element={<CreateVehicleModel />} />
          </Route>
        </Route>
        <Route path="coupons">
          <Route index path="generate" element={<GenerateCoupons />} />
          <Route path="all" element={<ViewAllCoupons />} />
        </Route>
        <Route path="fares">
          <Route index path="create" element={<CreateFare />} />
          <Route path="all" element={<ViewAllFares />} />
          <Route path="edit" element={<EditFare />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="support">
          <Route path="driver" element={<DriverSupportMessages />} />
          <Route path="customer" element={<CustomerSupportMessages />} />
        </Route>
      </Route>
    </Routes>
  );
}
