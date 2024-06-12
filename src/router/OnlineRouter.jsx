import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Dashboard/Home";
import Account from "../screens/OnlineScreens/Account";
import ProjectsList from "../screens/OnlineScreens/ProjectsList";
import PostList from "../screens/OnlineScreens/Posts/PostList";
import Editinfo from "../screens/OnlineScreens/Account/Editinfo";
import Settings from "../screens/OnlineScreens/Account/Settings";
import CreatePost from "../screens/OnlineScreens/Posts/CreatePost";

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
            },
            {
                path: "/edit-info",
                element: <Editinfo />
            },
            {
                path: "/settings",
                element: <Settings />
            },
            {
                path: "/CreatePost",
                element: <CreatePost />
            }
            
        ]
    }
])

export default OnlineRouter