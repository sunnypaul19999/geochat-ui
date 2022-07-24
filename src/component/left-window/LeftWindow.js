import { RightWindow } from "component/right-window/RightWindow";
import { Outlet } from "react-router-dom";

export function LeftWindow(props) {

    return (
        <div className="left-window" id="leftWindow">

            {props.children}

        </div>
    );
}