import { useEffect } from "react";


export function LeftWindow(props) {

    return (
        <div className="left-window" id="leftWindow">

            {props.children}

        </div>
    );
}