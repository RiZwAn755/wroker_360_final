
import { Navigate , Outlet } from "react-router";

function Private()
{
    const auth = localStorage.getItem("email");
    return auth ? <Outlet/>:<Navigate to = "/login"></Navigate>
}

export default Private;