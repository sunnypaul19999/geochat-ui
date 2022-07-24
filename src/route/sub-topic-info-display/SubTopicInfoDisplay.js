import { LeftWindow } from "component/left-window/LeftWindow";
import { RightWindow } from "component/right-window/RightWindow";
import { MessageDisplay } from "route/meta-discuss/MetaDiscussDisplay";


export function SubTopicInfoDisplay(props) {


    return (

        <>
            <LeftWindow></LeftWindow>

            <RightWindow>
                <MessageDisplay />
            </RightWindow>
        </>

    );
}