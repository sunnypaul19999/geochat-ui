import { useEffect, useRef, useState } from 'react';

import 'stylesheet/message-item/message-item.css';

import defualtProfilePic from 'asset/image/default-profile-image.png';


export function MessageItem(props) {

    const messageItemRef = useRef();

    const [state, setState] = useState({
        messageId: props.messageId,
        username: props.username,
        message: props.message
    });


    useEffect(() => {

        if (props.observe) {
            props.observe(messageItemRef.current);
        }


        return () => {

            if (props.unobserve) {

                props.unobserve(messageItemRef.current);

            }

        }

    }, [state]);


    return (
        <div
            ref={messageItemRef}
            key={`message_item_key_${state.messageId}`}
            id={state.messageId}
            className="message-item mb-3">
            <div className="card">
                <div className="row g-0">
                    <div className="col-auto p-1">
                        <span className="message-picture">
                            <img src={defualtProfilePic} title="Profile picture" />
                        </span>
                    </div>
                    <div className="col">
                        <div className="row g-0">
                            <div className="col">
                                <div className="card-body p-1">
                                    <div className="message-title">
                                        <h6 className="card-title">{state.username}</h6>
                                    </div>
                                    <div className="message-body">
                                        <p className="card-text">
                                            {state.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}