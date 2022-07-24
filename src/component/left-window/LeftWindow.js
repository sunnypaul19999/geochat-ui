import { RightWindow } from "component/right-window/RightWindow";
import { UIToolbar } from "component/ui-toolbar/ui-toolbar";
import { Outlet } from "react-router-dom";

export function LeftWindow(props) {

    return (
        <div className="left-window" id="leftWindow">

            <UIToolbar />

            {props.children}

        </div>
    );
}