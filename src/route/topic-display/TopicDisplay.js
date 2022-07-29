import { useCallback, useEffect, useRef, useState } from "react";

import { produce } from 'immer';

import { useDisplayObserver } from "../DisplayObserver";

import { LeftWindow } from "component/left-window/LeftWindow";

import { getTopicListItems } from "./TopicListItems";

import { fetchTopicById, fetchTopicPage } from "./TopicQuery";

import { dispatchFetchNextTopicPageEvent } from "./TopicDisplayEvent";

import { RightWindow } from "component/right-window/RightWindow";
import { BottomToolbar } from "component/bottom-toolbar/BottomToolbar";
import { HoverInput } from "component/hover-input/HoverInput";
import { updateTopic } from "server/topic/UpdateTopic";
import { addTopic } from "server/topic/AddTopic";


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

    //console.log(`total observed elements = ${observedElementEntries.length}`);

    if (observedElementEntries[0].isIntersecting) {

        dispatchFetchNextTopicPageEvent(observedElementEntries[0].target);

    }

}


export function TopicDisplay() {

    const hoverInputAreaModes = { create: Symbol.for('createTopic'), edit: Symbol.for('editTopic') }

    const [state, setState] = useState({

        nextPageNumber: 1,

        topics: {},

        hoverInputTextarea: {
            title: '',
            mode: hoverInputAreaModes.create,
            serverItemId: '',
            defaultText: '',
            stage: 1,
            stages: 1,
            display: false
        }

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

        if (listItemDisplayRef.current) {

            listItemDisplayRef.current.addEventListener('fetch-next-topic-page', onFetchNextTopicPageEventHandler);

        }

        return () => {

            if (listItemDisplayRef.current) {

                listItemDisplayRef.current.removeEventListener('fetch-next-topic-page', onFetchNextTopicPageEventHandler);

            }

            //disconnect the intersection observer
            disconnectObserver();

        }

    }, [onFetchNextTopicPageEventHandler]);


    const onCreateButtonCLick = (event) => {
        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.serverItemId = '';

                draft.hoverInputTextarea.title = 'Add topic';

                draft.hoverInputTextarea.mode = hoverInputAreaModes.create;

                draft.hoverInputTextarea.defaultText = '';

                draft.hoverInputTextarea.display = true;

            })
        );
    }

    const onHoverInputCancel = (event) => {
        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.display = false;

            })
        );
    }

    const onHoverInputSubmit = async (topicTitle, serverItemId) => {

        if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

            await addTopic(topicTitle);

        } else {

            if (state.hoverInputTextarea.mode === hoverInputAreaModes.edit) {

                await updateTopic(serverItemId, topicTitle);
            }
        }

        setState(
            produce(draft => {

                draft.hoverInputTextarea.display = false;

            })
        );
    }

    const hoverInput = () => {

        if (state.hoverInputTextarea.display) {

            if (state.hoverInputTextarea.stages == 1) {
                //input in one stage

                let idAndKey = `${state.hoverInputTextarea.mode.description}`;
                if (state.hoverInputTextarea.serverItemId) {

                    idAndKey = `${idAndKey}:serverItemId${state.hoverInputTextarea.serverItemId}`;
                }
                idAndKey = `${idAndKey}:topicHoverInputTextareaKeyStage1Stages1`.toLowerCase();

                return (
                    <HoverInput
                        key={idAndKey}
                        id={idAndKey}
                        serverItemId={state.hoverInputTextarea.serverItemId}
                        title={state.hoverInputTextarea.title}
                        defaultText={state.hoverInputTextarea.defaultText}
                        cancleable
                        onHoverInputCancel={onHoverInputCancel}
                        onHoverInputSubmit={onHoverInputSubmit}
                        maxLetterCount={50} />);

            }
        }

        return <></>;

    }

    const onEditTopicButtonClick = async (serverItemId) => {

        //console.log(`topic item id for edit ${serverItemId}`);

        const topic = await fetchTopicById(serverItemId);

        setState(
            produce(draft => {

                draft.hoverInputTextarea.title = 'Edit topic';

                draft.hoverInputTextarea.serverItemId = serverItemId;

                draft.hoverInputTextarea.mode = hoverInputAreaModes.edit;

                draft.hoverInputTextarea.defaultText = topic.topic_title;

                draft.hoverInputTextarea.display = true;

            })
        );
    }

    const onDeleteTopicButtonClick = (serverItemId) => {

        console.log(`topic item id for deletetion ${serverItemId}`);
    }


    return (

        <>
            <LeftWindow key='topicLeftWindow'>

                <div
                    ref={listItemDisplayRef}
                    id="topicListDisplay"
                    className="list-item-display"
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        'paddingTop': '2px',
                    }}>

                    {
                        getTopicListItems(state.topics, onEditTopicButtonClick, onDeleteTopicButtonClick, observer, unobserver)
                    }

                    <br /><br /><br />

                </div>

                <BottomToolbar key='topicBottomUIToolbar' create onCreateButtonCLick={onCreateButtonCLick} />

            </LeftWindow>

            <RightWindow key='topicRightWindow'>

                {hoverInput()}

            </RightWindow>
        </>

    )
}