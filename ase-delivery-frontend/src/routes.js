import HomePage from "./pages/HomePage";
import LoginAndRegister from "./pages/LoginAndRegister";
import ErrorPage from "./pages/ErrorPage";
import UserListPage from "./pages/management-users/UserListPage";
import NewRequestsPage from "./pages/management-users/NewRequestsPage";
import BoxListPage from "./pages/management-boxes/BoxListPage";
import CreateNewBoxPage from "./pages/management-boxes/CreateNewBoxPage";
import DeliveryListPage from "./pages/management-deliveries/DeliveryListPage";
import CreateDeliveryPage from "./pages/management-deliveries/CreateDeliveryPage";
import BoxDetailPage from "./pages/management-boxes/BoxDetailPage";
import UserDetailPage from "./pages/management-users/UserDetailPage";
import LandingPage from "./pages/LandingPage";
import DeliveryDetailPage from "./pages/management-deliveries/DeliveryDetailPage";
import UpdateDeliveryPage from "./pages/management-deliveries/UpdateDeliveryPage";

const routes = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/login",
        element: <LoginAndRegister/>
    },
    {
        path: "/management",
        element: <LandingPage />,
    },
    {
        path: "/management/users",
        element: <UserListPage />,
    },
    {
        path: "/management/users/:id",
        element: <UserDetailPage />,
    },
    {
        path: "/management/users/requests",
        element: <NewRequestsPage />,
    },
    {

        path: "/management/boxes/",
        element: <BoxListPage />,
    },
    {
        path: "/management/boxes/create/",
        element: <CreateNewBoxPage />,
    },
    {
        path: "/management/box/:id",
        element: <BoxDetailPage />,

    },
    {

        path: "/management/deliveries/:type",
        element: <DeliveryListPage />,
    },
    {
        path: "/management/deliveries/create",
        element: <CreateDeliveryPage />,

    },
    {
        path: "/management/deliveries/detail/:id",
        element: <DeliveryDetailPage />,
    },
    {
        path: "/management/deliveries/update/:id",
        element: <UpdateDeliveryPage />,
    },
    //TODO: add routes for different pages, paths are matched exactly by default in react-router-dom v6
    {
        // * only matches if no other paths can be matched
        path: "/*",
        element: <ErrorPage/>
    },
];

export default routes;
