import { useCallback, useEffect, useMemo, useState } from "react";

import { LeftWindow } from "component/left-window/LeftWindow";
import { ListItem } from "component/list-item/ListItem";

import { getTopicsByPage } from "server/topic/GetTopicsByPage";

import produce from "immer";
import { registerGeoPoint } from "server/geopoint/RegisterGeoPoint";

async function nextPage(topicPageNumber) {

    let topics = {};

    let page = await getTopicsByPage(topicPageNumber);

    page.forEach(topic => {

        topics[topic.id] = {
            ...topic
        };

    });

    return {

        pageNumber: topicPageNumber,

        topics: topics

    };

}

function getListItems(topics) {

    //return spinner when topics is falsy
    if (!topics) return (<></>);

    let listItems = [];

    const topicIds = Object.keys(topics);

    topicIds.forEach(topicId => {

        const topic = topics[topicId];

        listItems.push(
            <ListItem
                key={`topic_${topicId}`}
                itemId={topicId}
                title={topic.topic_title}
                canEdit
                canDelete
            />
        );

    });

    return listItems;
}

export function TopicDisplay() {

    const [state, setState] = useState({
        pageNumber: 1,
        topics: null
    });

    //next state callback
    const nextState = useCallback(async () => {

        const page = await nextPage(state.pageNumber);

        setState(
            produce(draft => {

                draft.pageNumber = page.pageNumber;

                draft.topics = page.topics;

            })
        );

    }, [state.pageNumber]);


    //run on inital render
    useEffect(() => {

        nextState();

    }, []);


    return (
        <LeftWindow >

            {getListItems(state.topics)}

        </LeftWindow>
    )
}