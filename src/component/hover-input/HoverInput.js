import produce from "immer";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import 'stylesheet/hover-text-input/hover-text-input-media-query.css';

class HoverTextStorage {

    _text;

    static _hoverTextStorage;

    constructor(id) {

        if (!HoverTextStorage._hoverTextStorage) {

            HoverTextStorage._hoverTextStorage = {};
        }

        HoverTextStorage._hoverTextStorage[id] = this;

        this._text = '';
    }


    static _getHoverTextStorage(id) {

        if (HoverTextStorage._hoverTextStorage) {

            if (HoverTextStorage._hoverTextStorage[id]) {

                return HoverTextStorage._hoverTextStorage[id];
            }
        }

        return new HoverTextStorage(id);
    }

    static getText(id) {

        if (id) {

            const hoverTextStorage = HoverTextStorage._getHoverTextStorage(id);

            return hoverTextStorage._text;
        }

        return null;
    }

    static setText(id, text) {

        if (id) {

            const hoverTextStorage = HoverTextStorage._getHoverTextStorage(id);

            return hoverTextStorage._text = text;
        }

    }
}

function useHoverInputTextState(textStateId) {

    const getText = (inputTextValueId) => {

        if (inputTextValueId) {

            return HoverTextStorage.getText(inputTextValueId);
        }

        return HoverTextStorage.getText(textStateId);

    }

    const setText = (text) => {

        HoverTextStorage.setText(textStateId, text);

    }

    const [state, setState] = useState({

        letterCount: (getText()) ? getText().length : 0,

    });

    const onTextInput = (event) => {

        event.stopPropagation();

        setState(
            produce(draft => {

                //textRef.current.text = event.target.value;
                //HoverTextStorage.setText(textStateId, event.target.value);

                setText(event.target.value);

                draft.letterCount = event.target.value.length;

            })
        );
    }

    const getLetterCount = () => { return state.letterCount; }

    return [getLetterCount, getText, setText, onTextInput];
}

//-----props------

/*

        id -- textarea id
        serverItemId -- actual server item id
        isContinued -- is used to track form input continuation
        title
        defaultText
        maxLetterCount
        isCancleable
        onHoverInputCancel
        hasHistoryBackward
        onHoverInputBack
        hasHistoryForward
        onHoverInputForward
        isTextAreaLarge
*/

//-----------
export function HoverInput(props) {

    const [state, setState] = useState({
        id: props.id,
        serverItemId: props.serverItemId,
        previousInputTextValueId: props.previousInputTextValueId,
        isContinued: props.isContinued,
        title: props.title,
        defaultText: props.defaultText,
        maxLetterCount: props.maxLetterCount,
        isCancleable: props.cancleable,
        hasHistoryBackward: props.hasHistoryBackward,
        hasHistoryForward: props.hasHistoryForward,
        isTextAreaLarge: Boolean(props.large)
    });

    const [getLetterCount, getText, setText, onHoverTextInput] = useHoverInputTextState(state.id);

    const textareaRef = useRef();

    const isNotInputValid = () => {

        console.log(getLetterCount());

        if (getLetterCount() > state.maxLetterCount || getLetterCount() < 20) {

            return true;
        }

        return false;
    }

    const onHoverInputCancel = (event) => {
        event.stopPropagation();

        props.onHoverInputCancel(event);
    }

    const cancelButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionCancel" className="btn cancel" onClick={onHoverInputCancel}>
                <span className="button-text">Cancel</span>
                <span className="cancel-icon material-symbols-rounded">
                    cancel
                </span>
            </button>
        );
    }

    const onHoverInputBack = (event) => {
        event.stopPropagation();

        props.onHoverInputBack(event);
    }

    const backButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionBack" className="btn back" onClick={onHoverInputBack}>
                <span className="back-icon material-symbols-outlined">
                    arrow_back_ios
                </span>
                <span className="button-text">Back</span>
            </button>
        );
    }

    const onHoverInputForward = (event) => {
        event.stopPropagation();

        props.onHoverInputForward(event, state.id);
    }


    const forwardButton = () => {

        return (
            <button
                type="button"
                name="hoverTextareaInputActionSubmit"
                className="btn next"
                onClick={onHoverInputForward}
                disabled={isNotInputValid()}>
                <span className="button-text">Next</span>
                <span className="next-icon material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </button>
        );
    }

    const onHoverInputSubmit = (event) => {
        event.stopPropagation();

        if (state.previousInputTextValueId) {

            props.onHoverInputSubmit(getText(state.previousInputTextValueId), getText(), state.serverItemId);

        } else {

            props.onHoverInputSubmit(getText(), state.serverItemId);
        }
    }

    const submitButton = () => {

        return (
            <button
                type="button"
                name="hoverTextareaInputActionSubmit"
                className="btn submit"
                disabled={isNotInputValid()}
                onClick={onHoverInputSubmit}>

                <span className="button-text">Submit</span>
                <span className="submit-icon material-symbols-outlined">
                    done_outline
                </span>

            </button>
        );
    }

    const actionToolbar = () => {

        return (
            <div className="action">
                {(state.isCancleable) ? cancelButton() : <></>}
                {(state.hasHistoryBackward) ? backButton() : <></>}
                {(state.hasHistoryForward) ? forwardButton() : <></>}
                {(state.hasHistoryForward) ? <></> : submitButton()}
            </div>
        )
    }

    const onTextInput = (event) => {

        event.stopPropagation();

        onHoverTextInput(event);
    }

    useEffect(() => {

        console.log(state.isContinued);

        if (typeof state.defaultText === 'string') {

            if (state.defaultText.length > 0) {

                if (!state.isContinued) {

                    setText(state.defaultText);
                }

                // console.log(state.defaultText);
            }

        }

    }, [])

    useEffect(() => {

        textareaRef.current.textContent = getText();
    });


    return (
        <div className="hover-text-input">
            <div className="hover-text-input-background"></div>

            <div className="hover-text-input-area">

                <div className="card-title">{state.title}</div>

                <div className="form-floating">

                    <textarea
                        ref={textareaRef}
                        id="hoverTextareaInput"
                        className={`form-control ${(state.isTextAreaLarge) ? "large" : ''}`}
                        placeholder="Leave a comment here"
                        onInput={onTextInput}></textarea>

                    <label htmlFor="hoverTextareaInput">Your text</label>

                    <div className="letter-count">
                        <span className="remaining-letters exceeded">{getLetterCount()}</span>
                        <span className="divider">/</span>
                        <span className="total-letters">{state.maxLetterCount}</span>
                    </div>

                </div>

                <div className="hover-text-input-action">
                    {actionToolbar()}
                </div>
            </div>
        </div>
    );

}