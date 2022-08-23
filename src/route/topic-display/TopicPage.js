
import React, { useCallback } from "react";
import { ListItem } from "component/list-item/ListItem";
import produce from "immer";
import { useEffect, useRef, useState } from "react"
import { fetchTopicPage } from "./TopicQuery";


/*
---- props ----
    topics
    onEditTopicButtonClick
    onDeleteTopicButtonClick
    observer
    unobserver
----------------
*/

function updateState(pageDetails, setState) {

    setState(
        produce(draft => {

            //array of topics type: []
            const fetchedTopics = pageDetails.topics;

            const serverFetchedTopicsIds = Object.keys(fetchedTopics);

            const currTopicsIds = Object.keys(draft.topics);

            serverFetchedTopicsIds.forEach(serverItemId => {

                //checking if topic is already present in state
                if (draft.topics[serverItemId]) {

                    //updating curr topic in state if title is updated
                    if (fetchedTopics[serverItemId].topic_title !== draft.topics[serverItemId].topic_title) {

                        draft.topics[serverItemId].topic_title = fetchedTopics[serverItemId].topic_title;

                        draft.topics[serverItemId].timestamp = Date.now();

                        console.log(fetchedTopics[serverItemId]);
                    }

                } else {

                    //if topic does not exist in state then delete topic
                    // delete draft.topics[currTopicId];

                    draft.topics[serverItemId] = fetchedTopics[serverItemId];
                }
            })

            currTopicsIds.forEach(topicId => {

                if (!fetchedTopics[topicId]) {

                    delete draft.topics[topicId];
                }
            })
        })
    );

}

export function TopicPage(props) {

    const lastListItemRef = useRef();

    const isMounted = useRef(true);

    const isRefreshing = useRef(false);


    const [state, setState] = useState({
        pageNumber: props.pageNumber,
        /*
            pageTopics = {
                    plus_code: null,
                    id: null,
                    topic_title: null
            }
        */
        topics: {},
    })


    const getTopicListItems = (topics, onEditTopic, onDeleteTopic, observer, unobserver) => {

        // console.log(Object.keys(topics).length > 0);

        if (Object.keys(topics).length > 0) {

            // console.log(topics);

            const listItems = [];

            const topicIds = Object.keys(topics);

            const lastTopicIndex = topicIds.length - 1;

            topicIds.forEach((topicId, index) => {

                const topic = topics[topicId];

                if (topic.timestamp) {

                    console.log(topic);
                }

                const updateTimeStamp = (topic.timestamp) ? topic.timestamp : 0;

                const props = {
                    key: `topic_${topicId}${updateTimeStamp}`,
                    isTopic: true,
                    serverItemId: topicId,
                    title: topic.topic_title,
                    canEdit: true,
                    onEdit: onEditTopic,
                    canDelete: true,
                    onDelete: onDeleteTopic,
                    observe: null,
                    unobserve: null
                }

                if (index === lastTopicIndex) {

                    if (observer && unobserver) {

                        //attach observer and unobserver to the last topic
                        props.observe = observer;
                        props.unobserve = unobserver;

                    }

                    // const ForwardListItemRef = React.forwardRef((props, ref) => {

                    //     return <ListItem {...props} _ref={ref} />
                    // })

                    // ForwardListItemRef.displayName = props.key;


                    // listItems.push(<ForwardListItemRef {...props} ref={lastListItemRef} />);
                }

                listItems.push(<ListItem {...props} />);
            });

            // console.log(listItems);

            return listItems;
        }


        return (<></>);
    }

    const refresh = async () => {

        const pageDetails = await fetchTopicPage(state.pageNumber);

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

        const listItems = getTopicListItems(
            state.topics,
            props.onEditTopicButtonClick,
            props.onDeleteTopicButtonClick,
            props.observer,
            props.unobserver
        );

        // return <></>;

        return listItems;
    }


    return call();
}