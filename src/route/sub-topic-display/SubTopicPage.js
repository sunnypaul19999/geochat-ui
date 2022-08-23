
import React, { useCallback } from "react";
import { ListItem } from "component/list-item/ListItem";
import produce from "immer";
import { useEffect, useRef, useState } from "react"
import { fetchSubTopicPage } from "./SubTopicQuery";


/*
---- props ----
    topicId
    subTopics
    onEditSubTopicButtonClick
    onDeleteSubTopicButtonClick
    observer
    unobserver
----------------
*/

function updateState(pageDetails, setState) {

    setState(
        produce(draft => {

            //array of subTopics type: []
            const fetchedSubTopics = pageDetails.subTopics;

            const serverFetchedSubTopicsIds = Object.keys(fetchedSubTopics);

            const currTopicsIds = Object.keys(draft.subTopics);

            serverFetchedSubTopicsIds.forEach(serverItemId => {

                //checking if subTopic is already present in state
                if (draft.subTopics[serverItemId]) {

                    //updating curr subTopic in state if title is updated
                    if (fetchedSubTopics[serverItemId].sub_topic_title !== draft.subTopics[serverItemId].sub_topic_title) {

                        draft.subTopics[serverItemId].sub_topic_title = fetchedSubTopics[serverItemId].sub_topic_title;

                        draft.subTopics[serverItemId].timestamp = Date.now();

                        console.log(`subtopicId ${serverItemId}: updated sub_topic_title`);
                    }

                    if (fetchedSubTopics[serverItemId].sub_topic_description !== draft.subTopics[serverItemId].sub_topic_description) {

                        draft.subTopics[serverItemId].sub_topic_description = fetchedSubTopics[serverItemId].sub_topic_description;

                        draft.subTopics[serverItemId].timestamp = Date.now();

                        console.log(`subtopicId ${serverItemId}: updated sub_topic_description`);
                    }

                } else {

                    //fill subtopics if empty
                    draft.subTopics[serverItemId] = fetchedSubTopics[serverItemId];
                }
            })

            currTopicsIds.forEach(topicId => {

                if (!fetchedSubTopics[topicId]) {

                    delete draft.subTopics[topicId];
                }
            })
        })
    );

}

export function SubTopicPage(props) {

    const lastListItemRef = useRef();

    const isMounted = useRef(true);

    const [state, setState] = useState({
        pageNumber: props.pageNumber,
        topicId: props.topicId,
        /*
            subTopics = {
                [sub_topic_id]:{
                    geo_point_plus_code: null,
                    topic_id: null,
                    sub_topic_id: null,
                    sub_topic_title: null,
                    sub_topic_description: null
                }
            }
        */
        subTopics: {},
    })

    const getSubTopicListItems = (subTopics, onEditSubTopic, onDeleteSubTopic, observer, unobserver) => {


        if (Object.keys(subTopics).length > 0) {

            let listItems = [];

            const subTopicIds = Object.keys(subTopics);

            const lastSubTopicIndex = subTopicIds.length - 1;

            subTopicIds.forEach((subTopicId, index) => {

                const subTopic = subTopics[subTopicId];

                let props = {
                    key: `sub_topic_${subTopicId}`,
                    isSubTopic: true,
                    serverItemId: subTopicId,
                    title: subTopic.sub_topic_title,
                    description: subTopic.sub_topic_description,
                    canEdit: true,
                    onEdit: onEditSubTopic,
                    canDelete: true,
                    onDelete: onDeleteSubTopic,
                    observe: null,
                    unobserve: null,
                }

                //observe the last subTopic
                if (index === lastSubTopicIndex) {

                    props.observe = observer;
                    props.unobserve = unobserver;

                }

                listItems.push(<ListItem {...props} />);

            });

            return listItems;
        }


        return (<></>);
    }

    const refresh = async () => {

        const pageDetails = await fetchSubTopicPage(state.topicId, state.pageNumber);

        console.log(pageDetails);

        // updateState(pageDetails, setState);

        console.log(`refreshing page ${state.pageNumber}`);

        // setTimeout(refresh, 1000);
    }


    useEffect(() => {

        setTimeout(refresh, 0);

    }, [])


    useEffect(() => {

        isMounted.current = true;

        return () => {

            console.log('SubTopicPage unmounted');

            isMounted.current = false;
        }
    })


    const call = () => {

        const listItems = getSubTopicListItems(
            state.subTopics,
            props.onEditSubTopicButtonClick,
            props.onDeleteSubTopicButtonClick,
            props.observer,
            props.unobserver
        );

        // return <></>;

        return listItems;
    }


    return call();
}