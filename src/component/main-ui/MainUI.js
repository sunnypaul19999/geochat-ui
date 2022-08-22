import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function MainUI() {

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {

        console.log(location.pathname);

        if (location.pathname == '/') {

            navigate('/geochat/signUp');
        }

    }, [])

    return (
        <div className="main-ui">

            <Outlet />

        </div>
    );
}
