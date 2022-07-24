import { useCallback, useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { produce } from 'immer';

import { useDisplayObserver } from "route/DisplayObserver";

import { LeftWindow } from "component/left-window/LeftWindow";

import { fetchSubTopicPage } from "./SubTopicQuery";

import { getSubTopicListItems } from "./SubTopicListItems";

import { dispatchFetchNextSubTopicPageEvent } from "./SubTopicDisplayEvent";
import { RightWindow } from "component/right-window/RightWindow";
import { UIToolbar } from "component/ui-toolbar/ui-toolbar";



function produceNextState(pageDetails, setState) {

    setState(
        produce(draft => {

            const fetchedSubTopicKeys = Object.keys(pageDetails.subTopics);

            //if topics in pageDetails has 1 or more topics
            if (fetchedSubTopicKeys.length > 0) {

                if (fetchedSubTopicKeys.length == 5) { draft.nextPageNumber = pageDetails.pageNumber + 1; }
                else {

                    //total items in page should be 5
                    //i.e, the page number nextPageNumber is not filled
                    //keep the page number to nextPageNumber to update it again
                    if (fetchedSubTopicKeys.length < 5) { draft.pageNumber = pageDetails.pageNumber; }
                }

                fetchedSubTopicKeys.forEach(fetchedSubTopicKey => {

                    if (draft.subTopics[fetchedSubTopicKey]) return;

                    draft.subTopics[fetchedSubTopicKey] = pageDetails.subTopics[fetchedSubTopicKey];

                });

            }

        })
    );

}

function onObservedElementVisible(observedElementEntries) {

    console.log(`total observed elements = ${observedElementEntries.length}`);

    if (observedElementEntries[0].isIntersecting) {

        dispatchFetchNextSubTopicPageEvent(observedElementEntries[0].target);

    }

}

/*
-------props--------
topicId - topic id of subtopic
--------------------
*/

export function SubTopicDisplay(props) {

    const { topicId } = useParams();

    const [state, setState] = useState({

        nextPageNumber: 1,

        topicId: topicId,

        subTopics: {},

    });


    const listItemDisplayRef = useRef();


    const [observer, unobserver, disconnectObserver] = useDisplayObserver('subTopicListDisplay', onObservedElementVisible);


    const nextPageDetails = useCallback(async () => {

        const pageDetails = await fetchSubTopicPage(state.topicId, state.nextPageNumber);


        produceNextState(pageDetails, setState);

    }, [state]);


    //this effects loads items on page: 1
    useEffect(() => { nextPageDetails(); }, []);


    const onFetchNextTopicPageEventHandler = async (event) => {

        event.stopPropagation();

        nextPageDetails();
    }


    useEffect(() => {

        listItemDisplayRef.current.addEventListener('fetch-next-sub-topic-page', onFetchNextTopicPageEventHandler);


        return () => {

            if (listItemDisplayRef.current) {

                listItemDisplayRef.current.removeEventListener('fetch-next-sub-topic-page', onFetchNextTopicPageEventHandler);

            }

            //disconnect the intersection observer
            disconnectObserver();

        }

    }, [onFetchNextTopicPageEventHandler]);



    return (

        <>
            <LeftWindow>

                <UIToolbar />

                <div
                    ref={listItemDisplayRef}
                    id="subTopicListDisplay"
                    className="list-item-display"
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto'
                    }}>

                    {
                        getSubTopicListItems(state.subTopics, observer, unobserver)
                    }

                </div>

            </LeftWindow>

            <RightWindow></RightWindow>
        </>

    )
}