
import React from "react";

import produce from "immer";

import { useEffect, useRef, useState } from "react"

import { fetchMetaDiscussPage } from "./MetaDiscussQuery";

import { MessageItem } from "component/message-item/MessageItem";


/*
---- props ----
    pageNumber (message page number)
    topicId
    subTopicId
    observer
    unobserver
----------------
*/

function updateState(pageDetails, setState) {

    setState(
        produce(draft => {

            //array of messages type: []
            const fetchedMessages = pageDetails.messages;

            const serverFetchedMessageIds = Object.keys(fetchedMessages);

            const currMessageIds = Object.keys(draft.messages);

            serverFetchedMessageIds.forEach(serverItemId => {

                //checking if topic is already present in state
                if (draft.messages[serverItemId]) {

                    //updating curr topic in state if title is updated
                    if (fetchedMessages[serverItemId].topic_title !== draft.messages[serverItemId].topic_title) {

                        draft.messages[serverItemId].topic_title = fetchedMessages[serverItemId].topic_title;

                        draft.messages[serverItemId].timestamp = Date.now();

                        console.log(fetchedMessages[serverItemId]);
                    }

                } else {

                    //if topic does not exist in state then delete topic
                    // delete draft.messages[currTopicId];

                    draft.messages[serverItemId] = fetchedMessages[serverItemId];
                }
            })

            currMessageIds.forEach(topicId => {

                if (!fetchedMessages[topicId]) {

                    delete draft.messages[topicId];
                }
            })
        })
    );

}

export function MessagePage(props) {

    const lastListItemRef = useRef();

    const isMounted = useRef(true);

    const isRefreshing = useRef(false);


    const [state, setState] = useState({
        pageNumber: props.pageNumber,

        topicId: props.topicId,

        subTopicId: props.subTopicId,

        /*
            pageTopics = {
                [message_id]:{
                    message_id: null,
                    sender_username: null,
                    message: null
                }
            }              
        */
        messages: {},
    })


    const getMessageItems = (messages, observer, unobserver) => {

        // console.log(Object.keys(messages).length > 0);

        if (Object.keys(messages).length > 0) {

            // console.log(messages);

            let messageItem = [];

            const messageIds = Object.keys(messages);

            messageIds.forEach((messageId, index) => {

                const message = messages[messageId];

                let props = {
                    key: `meta_dicuss_message_${message.message_id}`,
                    messageId: message.message_id,
                    username: message.sender_username,
                    message: message.message,
                    observe: null,
                    unobserve: null,
                }

                //observe the last message
                if (index === 0) {

                    if (observer && unobserver) {

                        props.observe = observer;
                        props.unobserve = unobserver;
                    }
                }

                messageItem.push(<MessageItem {...props} />);

            });

            return messageItem;
        }


        return (<></>);
    }

    const refresh = async () => {

        const pageDetails = await fetchMetaDiscussPage(state.topicId, state.topicId, state.pageNumber);

        // console.log(`updateState page topic ${state.pageNumber}`);

        updateState(pageDetails, setState);

        // console.log(pageDetails);

        if (isMounted.current) {

            if (!isRefreshing.current) {

                isRefreshing.current = true;

                // console.log(`refreshing page topic ${state.pageNumber}`);

                setTimeout(() => {

                    refresh()
                        .then(() => {

                            isRefreshing.current = false;

                            refresh();
                        })
                }, 3000)
            }
        }
    }

    useEffect(() => {

        refresh();

    }, [])


    useEffect(() => {

        isMounted.current = true;


        return () => {

            isMounted.current = false;
        }
    })


    const call = () => {

        const listItems = getMessageItems(
            state.messages,
            props.observer,
            props.unobserver
        );

        // return <></>;

        return listItems;
    }


    return call();
}