import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorPage";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Library from "../screens/Library";
import Playlist from "../screens/Playlist";
import Wishlist from "../screens/Wishlist";

const MainRouter = createBrowserRouter([
    {
        element:(
         <>
            <App />
         </>
        ),
        errorElement: <ErrorPage />,
        // on déclare les route avvec leurs vues
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/library",
                element: <Library />,
            },
            {
                path: "/add-playlist",
                element: <Playlist />,
            },
            {
                path: "/wishlist",
                element: <Wishlist />,
            },
        ],
    },
])

export default MainRouter