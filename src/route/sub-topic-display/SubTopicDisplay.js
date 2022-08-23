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
import { updateSubTopic } from "server/subtopic/UpdateSubTopic";
import { addSubTopic } from "server/subtopic/AddSubTopic";
import { SubTopicPage } from "./SubTopicPage";





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
            serverItemId: '',
            defaultText: {
                title: '',
                description: ''
            },
            subTopicTitleInputTextValueId: '',
            stage: 1,
            stages: 2,
            isContinued: false,
            display: false,
        }

    });


    const listItemDisplayRef = useRef();


    const [observer, unobserver, disconnectObserver] = useDisplayObserver('subTopicListDisplay', 'observer#subTopicListDisplay', onObservedElementVisible);


    const nextPageDetails = useCallback(async () => {

        // const pageDetails = await fetchSubTopicPage(state.topicId, state.nextPageNumber);


        // produceNextState(pageDetails, setState);

        setState(
            produce(draft => {

                draft.nextPageNumber += 1;

            })
        )

    }, [state]);


    //this effects loads items on page: 1
    useEffect(() => {

        // nextPageDetails();

    }, []);


    const onFetchNextTopicPageEventHandler = async (event) => {

        event.stopPropagation();

        // nextPageDetails();
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

                draft.hoverInputTextarea.serverItemId = `createSubTopicButtonId${listItemDisplayRef.current.getAttribute('id')}`;

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

    const onHoverInputForward = (event, subTopicTitleInputTextValueId) => {
        //to go to stage 2

        event.stopPropagation();

        setState(
            produce(draft => {

                draft.hoverInputTextarea.stage = 2;

                draft.hoverInputTextarea.subTopicTitleInputTextValueId = subTopicTitleInputTextValueId;

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

    const onHoverInputSubmit = async (subTopicTitle, subTopicDescription, subTopicId) => {

        if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

            await addSubTopic(state.topicId, subTopicTitle, subTopicDescription);

        } else {

            await updateSubTopic(state.topicId, subTopicId, subTopicTitle, subTopicDescription);
        }

        setState(
            produce(draft => {

                draft.hoverInputTextarea.display = false;

            })
        );
    }

    const hoverInput = () => {

        if (state.hoverInputTextarea.display) {

            let hoverInputTextareaTitle = '';
            let idAndKey = '';

            //input in two stages

            if (state.hoverInputTextarea.stage == 1) {

                //input on 1st stage

                idAndKey = `${state.hoverInputTextarea.mode.description}:topicId${state.topicId}`;
                if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

                    hoverInputTextareaTitle = 'Subtopic Title';

                } else {

                    idAndKey = `${idAndKey}:subTopicId${state.hoverInputTextarea.serverItemId}`;
                    hoverInputTextareaTitle = 'Edit Subtopic Title';
                }

                idAndKey = `${idAndKey}:subTopicHoverInputTextareaKeyStage1Stages2`.toLowerCase();

                return (
                    <HoverInput
                        key={idAndKey}
                        id={idAndKey}
                        serverItemId={state.hoverInputTextarea.serverItemId}
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

                idAndKey = `${state.hoverInputTextarea.mode.description}:topicId${state.topicId}`;
                if (state.hoverInputTextarea.mode === hoverInputAreaModes.create) {

                    hoverInputTextareaTitle = 'Subtopic Description';

                } else {

                    idAndKey = `${idAndKey}:subTopicId${state.hoverInputTextarea.serverItemId}`;
                    hoverInputTextareaTitle = 'Edit Subtopic Description';
                }

                idAndKey = `${idAndKey}:subTopicHoverInputTextareaKeyStage2Stages2`.toLowerCase();

                return (
                    <HoverInput
                        key={idAndKey}
                        id={idAndKey}
                        serverItemId={state.hoverInputTextarea.serverItemId}
                        isContinued={state.hoverInputTextarea.isContinued}
                        previousInputTextValueId={state.hoverInputTextarea.subTopicTitleInputTextValueId}
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

                draft.hoverInputTextarea.serverItemId = serverItemId;

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


    const getSubTopicPage = () => {

        // getSubTopicListItems(state.subTopics, onEditSubTopicButtonClick, onDeleteSubTopicButtonClick, observer, unobserver)

        let pages = [];

        for (let pageNumber = 1; pageNumber <= state.nextPageNumber; pageNumber++) {

            let key;

            const observe = {
                observer: null,
                unobserver: null,
            }

            if (pageNumber === state.nextPageNumber) {

                key = `lastPage-topic-page-${pageNumber}`;

                observe.observer = observer;

                observe.unobserver = unobserver;

            } else {

                key = `sub-topic-page-${pageNumber}`;
            }

            pages.push(
                <SubTopicPage
                    key={key}
                    topicId={topicId}
                    pageNumber={pageNumber}
                    onEditSubTopicButtonClick={onEditSubTopicButtonClick}
                    onDeleteSubTopicButtonClick={onDeleteSubTopicButtonClick}
                    {...observe}
                />
            )
        }

        return pages;
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
                        getSubTopicPage()
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