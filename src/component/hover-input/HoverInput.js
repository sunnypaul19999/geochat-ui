import produce from "immer";
import { useEffect, useRef, useState } from "react";

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

    const getText = () => {

        console.log(textStateId);

        return HoverTextStorage.getText(textStateId);

    }

    const [state, setState] = useState({

        letterCount: (getText()) ? getText().length : 0,

    });

    const onTextInput = (event) => {

        event.stopPropagation();

        console.log(event.target.value.length);

        setState(
            produce(draft => {

                HoverTextStorage.setText(textStateId, event.target.value);

                draft.letterCount = event.target.value.length;

            })
        );
    }

    const getLetterCount = () => { return state.letterCount; }

    return [getLetterCount, getText, onTextInput];
}

//-----props------

/*

        id -- textarea id
        title
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
        title: props.title,
        currentLetterCount: 0,
        maxLetterCount: props.maxLetterCount,
        isCancleable: props.cancleable,
        hasHistoryBackward: props.hasHistoryBackward,
        hasHistoryForward: props.hasHistoryForward,
        isTextAreaLarge: Boolean(props.large)
    });

    const [getLetterCount, getText, onHoverTextInput] = useHoverInputTextState(props.id);

    const textareaRef = useRef();


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

        props.onHoverInputForward(event);
    }


    const forwardButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionSubmit" className="btn next" onClick={onHoverInputForward}>
                <span className="button-text">Next</span>
                <span className="next-icon material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </button>
        );
    }

    const onHoverInputSubmit = (event) => {
        event.stopPropagation();

        props.onHoverInputSubmit(event);
    }

    const submitButton = () => {

        let disabled = true;

        if (state.currentLetterCount <= state.maxLetterCount) {

            disabled = false;
        }

        return (
            <button
                type="button"
                name="hoverTextareaInputActionSubmit"
                className="btn submit"
                disabled={disabled}
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