import { LeftWindow } from "component/left-window/LeftWindow";
import { RightWindow } from "component/right-window/RightWindow";
import { UIToolbar } from "component/ui-toolbar/ui-toolbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageDisplay } from "route/meta-discuss/MetaDiscussDisplay";

import 'stylesheet/sub-topic-info-display/sub-topic-info-display.css';

export function SubTopicInfoDisplay(props) {

    const location = useLocation();

    const [state, setState] = useState({

        title: location.state.title,

        description: location.state.description

    });


    return (

        <>
            <LeftWindow>

                <UIToolbar />

                <div class="sub-topic-info-display">
                    <div class="sub-topic-heading-container mb-1">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title text-wrap">{state.title}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="sub-topic-description-container">
                        <div class="card p-2">
                            <div class="card-body p-0">
                                <p class="card-text text-wrap">{state.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </LeftWindow>

            <RightWindow>

                <MessageDisplay />

            </RightWindow>
        </>

    );
}