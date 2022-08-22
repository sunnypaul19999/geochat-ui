import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function MainUI() {

    return (
        <div className="main-ui">

            <Outlet />

        </div>
    );
}
