import { LeftWindow } from "component/left-window/LeftWindow";
import { RightWindow } from "component/right-window/RightWindow";
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

                <div className="sub-topic-info-display">
                    <div className="sub-topic-heading-container mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-wrap">{state.title}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="sub-topic-description-container">
                        <div className="card p-2">
                            <div className="card-body p-0">
                                <p className="card-text text-wrap">{state.description}</p>
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