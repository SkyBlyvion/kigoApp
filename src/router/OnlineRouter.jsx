import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import Account from "../screens/OnlineScreens/Account";
import ProjectsList from "../screens/OnlineScreens/ProjectsList";
import PostList from "../screens/OnlineScreens/PostList";

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
            {
                path: "/account/:id",
                element: <Account />
            },
            {
                path: "/project",
                element: <ProjectsList />
            },
            {
                path: "/post",
                element: <PostList />
            }
        ]
    }
])

export default OnlineRouter