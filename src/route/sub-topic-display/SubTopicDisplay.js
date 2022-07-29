import { useCallback, useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { produce } from 'immer';

import { useDisplayObserver } from "route/DisplayObserver";

import { LeftWindow } from "component/left-window/LeftWindow";

import { fetchSubTopicById, fetchSubTopicPage } from "./SubTopicQuery";

import { getSubTopicListItems } from "./SubTopicListItems";

import { dispatchFetchNextSubTopicPageEvent } from "./SubTopicDisplayEvent";

import { RightWindow } from "component/right-window/RightWindow";
import { BottomToolbar } from "component/bottom-toolbar/BottomToolbar";
import { HoverInput } from "component/hover-input/HoverInput";





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

    const hoverInputAreaModes = { create: Symbol.for('createSubTopic'), edit: Symbol.for('editSubTopic') }

    const { topicId } = useParams();

    const [state, setState] = useState({

        nextPageNumber: 1,

        topicId: topicId,

        subTopics: {},

        hoverInputTextarea: {
            title: '',
            mode: hoverInputAreaModes.create,
            defaultText: {
                title: '',
                description: ''
            },
            customId: '',
            stage: 1,
            stages: 2,
            isContinued: false,
            display: false,
        }

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

    const onCreateButtonCLick = (event) => {
        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.customId = `createSubTopicButtonId${listItemDisplayRef.current.getAttribute('id')}`;

                draft.hoverInputTextarea.mode = hoverInputAreaModes.create;

                draft.hoverInputTextarea.defaultText.title = '';

                draft.hoverInputTextarea.defaultText.description = '';

                draft.hoverInputTextarea.stage = 1;

                draft.hoverInputTextarea.isContinued = false;

                draft.hoverInputTextarea.display = true;

            })
        );
    }

    const onHoverInputBack = (event) => {
        //to go back to stage 1

        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.stage = 1;

                draft.hoverInputTextarea.isContinued = true;

            })
        );
    }

    const onHoverInputForward = (event) => {
        //to go to stage 2

        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.stage = 2;

                draft.hoverInputTextarea.isContinued = true;

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

    const onHoverInputSubmit = (event) => {
        event.stopPropagation();
    }

    const hoverInput = () => {

        if (state.hoverInputTextarea.display) {

            let hoverInputTextareaTitle = '';
            let id = '';

            //input in two stages

            if (state.hoverInputTextarea.stage == 1) {

                //input on 1st stage

                if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

                    hoverInputTextareaTitle = 'Subtopic Title';

                } else {

                    hoverInputTextareaTitle = 'Edit Subtopic Title';
                }

                id = `${state.hoverInputTextarea.mode.description}${state.hoverInputTextarea.customId}subTopicHoverInputTextareaKeyStage1Stages2`.toLowerCase();

                return (
                    <HoverInput
                        key={id}
                        id={id}
                        isContinued={state.hoverInputTextarea.isContinued}
                        title={hoverInputTextareaTitle}
                        defaultText={state.hoverInputTextarea.defaultText.title}
                        cancleable
                        onHoverInputCancel={onHoverInputCancel}
                        hasHistoryForward
                        onHoverInputForward={onHoverInputForward}
                        maxLetterCount={50} />
                );
            } else {

                //input on 2nd stage

                if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

                    hoverInputTextareaTitle = 'Subtopic Description';

                } else {

                    hoverInputTextareaTitle = 'Edit Subtopic Description';
                }

                id = `${state.hoverInputTextarea.mode.description}${state.hoverInputTextarea.customId}subTopicHoverInputTextareaKeyStage2Stages2`.toLowerCase();

                return (
                    <HoverInput
                        key={id}
                        id={id}
                        isContinued={state.hoverInputTextarea.isContinued}
                        title={hoverInputTextareaTitle}
                        defaultText={state.hoverInputTextarea.defaultText.description}
                        large
                        hasHistoryBackward
                        onHoverInputBack={onHoverInputBack}
                        onHoverInputSubmit={onHoverInputSubmit}
                        maxLetterCount={50} />
                );
            }

        }

        return <></>;

    }


    const onEditSubTopicButtonClick = async (serverItemId) => {

        // console.log(`subtopic item id for edit ${serverItemId}`);

        const subTopic = await fetchSubTopicById(state.topicId, serverItemId);

        setState(
            produce(draft => {

                draft.hoverInputTextarea.customId = `serverItemId${serverItemId}`;

                draft.hoverInputTextarea.mode = hoverInputAreaModes.edit;

                draft.hoverInputTextarea.defaultText.title = subTopic.sub_topic_title;

                draft.hoverInputTextarea.defaultText.description = subTopic.sub_topic_description;

                draft.hoverInputTextarea.stage = 1;

                draft.hoverInputTextarea.isContinued = false;

                draft.hoverInputTextarea.display = true;

            })
        );

    }

    const onDeleteSubTopicButtonClick = (serverItemId) => {

        console.log(`subtopic item id for deletetion ${serverItemId}`);
    }


    return (

        <>
            <LeftWindow key='subTopicLeftWindow' >

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
                        getSubTopicListItems(state.subTopics, onEditSubTopicButtonClick, onDeleteSubTopicButtonClick, observer, unobserver)
                    }

                    <br /><br /><br />

                </div>

                <BottomToolbar key='topicBottomUIToolbar' create onCreateButtonCLick={onCreateButtonCLick} />

            </LeftWindow>

            <RightWindow key='subTopicRightWindow'>

                {hoverInput()}

            </RightWindow>
        </>

    )
}