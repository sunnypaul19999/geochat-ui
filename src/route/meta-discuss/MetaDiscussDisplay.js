import { useCallback, useEffect, useRef, useState } from "react";

import { produce } from 'immer';

import { RightWindow } from "component/right-window/RightWindow";

import { useDisplayObserver } from "route/DisplayObserver";

import { getMessageItems } from "./MessageItems";

import { fetchMetaDiscussPage } from "./MetaDiscussQuery";

import { dispatchFetchNextMetaDiscussPageEvent } from "./MetaDiscussEvent";
import { useParams } from "react-router-dom";
import { MessageInput } from "component/message-input/MessageInput";


function produceNextState(pageDetails, setState) {

    setState(
        produce(draft => {

            const fetchedMessageKeys = Object.keys(pageDetails.messages);

            //if topics in pageDetails has 1 or more topics
            if (fetchedMessageKeys.length > 0) {

                if (fetchedMessageKeys.length == 5) { draft.nextPageNumber = pageDetails.pageNumber + 1; }
                else {

                    //total items in page should be 5
                    //i.e, the page number nextPageNumber is not filled
                    //keep the page number to nextPageNumber to update it again
                    if (fetchedMessageKeys.length < 5) { draft.pageNumber = pageDetails.pageNumber; }
                }

                fetchedMessageKeys.forEach(fetchedMessageKey => {

                    if (draft.messages[fetchedMessageKey]) return;

                    draft.messages[fetchedMessageKey] = pageDetails.messages[fetchedMessageKey];

                });

            }

        })
    );

}

function onObservedElementVisible(observedElementEntries) {

    //console.log(`total observed elements = ${observedElementEntries.length}`);

    if (observedElementEntries[0].isIntersecting) {

        dispatchFetchNextMetaDiscussPageEvent(observedElementEntries[0].target);

    }

}

/*
-------props--------
topicId - topic id of subtopic
--------------------
*/

export function MessageDisplay(props) {

    const { topicId, subTopicId } = useParams();

    const [state, setState] = useState({

        nextPageNumber: 1,

        topicId: topicId,

        subTopicId: subTopicId,

        messages: {},

    });

    const lastMessageItemRef = useRef();


    const messageDisplayRef = useRef();


    const [observer, unobserver, disconnectObserver] = useDisplayObserver('messageDisplay', onObservedElementVisible);


    const nextPageDetails = useCallback(async () => {

        const pageDetails = await fetchMetaDiscussPage(state.topicId, state.subTopicId, state.nextPageNumber);

        produceNextState(pageDetails, setState);

        // setTimeout(
        //     nextPageDetails,
        //     2000
        // );

    }, [state]);




    //this effects loads items on page: 1
    useEffect(() => { nextPageDetails(); }, []);


    const onFetchNextMetaDiscussPageEventHandler = async (event) => {

        event.stopPropagation();

        nextPageDetails();
    }

    const onMessageSendEventHandler = (event) => {

        event.stopPropagation();

        console.log('message sent');

        //dispatch 'fetch-next-meta-discuss-page' to fetch next-page or update the current page if not filled
        dispatchFetchNextMetaDiscussPageEvent(event.currentTarget);

        // const lastMessageElement = document.getElementById(lastMessageItemRef.current);

    }


    useEffect(() => {

        messageDisplayRef.current.addEventListener('fetch-next-meta-discuss-page', onFetchNextMetaDiscussPageEventHandler);

        messageDisplayRef.current.addEventListener('message-send-event', onMessageSendEventHandler);


        return () => {

            if (messageDisplayRef.current) {

                messageDisplayRef.current.removeEventListener('fetch-next-meta-discuss-page', onFetchNextMetaDiscussPageEventHandler);

                messageDisplayRef.current.removeEventListener('message-send-event', onMessageSendEventHandler);
            }

            //disconnect the intersection observer
            disconnectObserver();

        }

    }, [onFetchNextMetaDiscussPageEventHandler, onMessageSendEventHandler]);


    const messageItems = () => {

        const [messageItems, lastMessageElementId] = getMessageItems(state.messages, observer, unobserver);

        lastMessageItemRef.current = lastMessageElementId;

        return messageItems;

    }


    return (

        <>
            <div
                ref={messageDisplayRef}
                id="messageDisplay"
                className="message-display"
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto'
                }}>

                {
                    messageItems()
                }

                <br />
                <br />
                <br />

                <MessageInput />
            </div>


        </>

    )
}