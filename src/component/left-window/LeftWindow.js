import { UIToolbar } from "component/ui-toolbar/ui-toolbar";

export function LeftWindow(props) {

    return (
        <div className="left-window" id="leftWindow">

            <UIToolbar />

            {props.children}

        </div>
    );
}