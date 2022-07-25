import produce from 'immer';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMetaMessage } from 'route/meta-discuss/MetaDiscussQuery';

import 'stylesheet/message-input/message-input-media-query.css';


export function MessageInput(props) {

    const params = useParams();

    const messageInputRef = useRef();

    const messageTextInputWrapperRef = useRef();

    const sendIconButtonRef = useRef();

    const [state, setState] = useState({

        messageTextareaHasFocus: false,

        messageTextInputWrapperHasMouseOver: false,

    });

    const onMouseOverMessageTextInputWrapper = (event) => {

        event.stopPropagation();

        //console.log(`mouse-over-wrapper ${JSON.stringify(state, null, 2)}`);

        setState(produce(draft => {

            draft.messageTextInputWrapperHasMouseOver = true;

        }));

    }

    const onMouseOutMessageTextInputWrapper = (event) => {

        event.stopPropagation();

        //console.log(`mouse-out-wrapper ${JSON.stringify(state, null, 2)}`);

        setState(produce(draft => {

            draft.messageTextInputWrapperHasMouseOver = false;

        }));

    }

    const onFocusMessageInput = (event) => {

        event.stopPropagation();

        setState(produce(draft => {

            draft.messageTextareaHasFocus = true;

        }));

    }

    const onBlurMessageInput = (event) => {

        event.stopPropagation();

        setState(produce(draft => {

            draft.messageTextareaHasFocus = false;

        }));

    }

    const onClickSendIcon = async (event) => {

        event.stopPropagation();

        if (messageInputRef.current) {

            const message = messageInputRef.current.value.trim();

            if (message.length > 0) {

                await sendMetaMessage(params.topicId, params.subTopicId, message);

                messageInputRef.current.value = '';

            }

            messageInputRef.current.focus();

        }

    }

    const isTranslated = () => {

        if (state.messageTextareaHasFocus | state.messageTextInputWrapperHasMouseOver) {

            return true;
        }

        return false

    }

    const messageTextInputWrapperKey = () => {

        if (isTranslated()) {

            return 'messageTextInputWrapper_traslateXSendIcon';

        }


        return 'messageTextInputWrapper_unTraslateXSendIcon';
    }




    return (
        <div
            ref={messageTextInputWrapperRef}
            id="messageTextInputWrapper"
            className={`message-text-input ${(isTranslated()) ? 'traslateXSendIcon' : ''}`}
            onMouseOver={onMouseOverMessageTextInputWrapper}
            onMouseOut={onMouseOutMessageTextInputWrapper}
            key={messageTextInputWrapperKey()}>

            <div className="message-text-input-area" key={messageTextInputWrapperKey()}>

                <div className="form-floating">

                    <div className="message-textarea" id="messageTextAreaWrapper">

                        <textarea
                            ref={messageInputRef}
                            className="form-control"
                            placeholder="type here..."
                            id="messageInput"
                            onFocus={onFocusMessageInput}
                            onBlur={onBlurMessageInput}>
                        </textarea>

                        <div
                            ref={sendIconButtonRef}
                            id="sendIconButton"
                            className="send-message-input"
                            onClick={onClickSendIcon}>

                            <span className="send-icon material-symbols-outlined">
                                send
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}