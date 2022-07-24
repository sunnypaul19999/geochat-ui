import { useCallback, useEffect, useRef, useState } from "react";

import { produce } from 'immer';

import { useDisplayObserver } from "../DisplayObserver";

import { LeftWindow } from "component/left-window/LeftWindow";

import { getTopicListItems } from "./TopicListItems";

import { fetchTopicPage } from "./TopicQuery";

import { dispatchFetchNextTopicPageEvent } from "./TopicDisplayEvent";


function produceNextState(pageDetails, setState) {

    setState(
        produce(draft => {

            const fetchedTopicKeys = Object.keys(pageDetails.topics);

            //if topics in pageDetails has 1 or more topics
            if (fetchedTopicKeys.length > 0) {

                if (fetchedTopicKeys.length == 5) { draft.nextPageNumber = pageDetails.pageNumber + 1; }
                else {

                    //total items in page should be 5
                    //i.e, the page number nextPageNumber is not filled
                    //keep the page number to nextPageNumber to update it again
                    if (fetchedTopicKeys.length < 5) { draft.pageNumber = pageDetails.pageNumber; }
                }

                fetchedTopicKeys.forEach(fetchedTopicKey => {

                    if (draft.topics[fetchedTopicKey]) return;

                    draft.topics[fetchedTopicKey] = pageDetails.topics[fetchedTopicKey];

                });

            }

        })
    );

}

function onObservedElementVisible(observedElementEntries) {

    console.log(`total observed elements = ${observedElementEntries.length}`);

    if (observedElementEntries[0].isIntersecting) {

        dispatchFetchNextTopicPageEvent(observedElementEntries[0].target);

    }

}


export function TopicDisplay() {

    const [state, setState] = useState({

        nextPageNumber: 1,

        topics: {},

    });


    const listItemDisplayRef = useRef();


    const [observer, unobserver, disconnectObserver] = useDisplayObserver('topicListDisplay', onObservedElementVisible);


    const nextPageDetails = useCallback(async () => {

        const pageDetails = await fetchTopicPage(state.nextPageNumber);

        produceNextState(pageDetails, setState);

    }, [state]);


    //this effects loads items on page: 1
    useEffect(() => { nextPageDetails(); }, []);


    const onFetchNextTopicPageEventHandler = async (event) => {

        event.stopPropagation();

        nextPageDetails();
    }


    useEffect(() => {

        listItemDisplayRef.current.addEventListener('fetch-next-topic-page', onFetchNextTopicPageEventHandler);

        return () => {

            if (listItemDisplayRef.current) {

                listItemDisplayRef.current.removeEventListener('fetch-next-topic-page', onFetchNextTopicPageEventHandler);

            }

            //disconnect the intersection observer
            disconnectObserver();

        }

    }, [onFetchNextTopicPageEventHandler]);



    return (
        <LeftWindow>

            <div
                ref={listItemDisplayRef}
                id="topicListDisplay"
                className="list-item-display"
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto'
                }}>

                {
                    getTopicListItems(state.topics, observer, unobserver)
                }

            </div>

        </LeftWindow>
    )
}