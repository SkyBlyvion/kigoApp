import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";


const OnlineRouter = createBrowserRouter([
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
        ]
    }
])

export default OnlineRouter