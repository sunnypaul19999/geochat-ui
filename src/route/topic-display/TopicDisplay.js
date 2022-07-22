import { useCallback, useEffect, useMemo, useState } from "react";

import { LeftWindow } from "component/left-window/LeftWindow";

import { getTopicListItems } from "./TopicListItems";

import { getTopicsByPage } from "server/topic/GetTopicsByPage";

import produce from "immer";

async function nextPage(topicPageNumber) {

    try {

        const page = await getTopicsByPage(topicPageNumber);

        let topics = {};

        page.forEach(topic => {

            topics[topic.id] = {
                ...topic
            };

        });

        return {

            pageNumber: topicPageNumber,

            topics: topics

        };

    } catch (e) {

        //toast the error message here

        return;
    }

}


export function TopicDisplay() {

    const [state, setState] = useState({
        pageNumber: 1,
        topics: null
    });

    //next state callback
    const nextState = useCallback(async () => {

        const page = await nextPage(state.pageNumber);

        if (page) {

            setState(
                produce(draft => {

                    draft.pageNumber = page.pageNumber;

                    draft.topics = page.topics;

                })
            );

        }

    }, [state.pageNumber]);


    //run on inital render
    useEffect(() => {

        nextState();

    }, []);


    return (
        <LeftWindow >

            {getTopicListItems(state.topics)}

        </LeftWindow>
    )
}