import { useState } from "react";

import 'stylesheet/hover-text-input/hover-text-input-media-query.css';


export function HoverInput(props) {

    const [state, setState] = useState({
        title: props.title,
        currentLetterCount: 0,
        maxLetterCount: props.maxLetterCount,
        isCancleable: props.cancleable,
        hasHistoryBackward: props.hasHistoryBackward,
        hasHistoryForward: props.hasHistoryForward,
    });

    const cancelButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionCancel" className="btn cancel">
                <span className="button-text">Cancel</span>
                <span className="cancel-icon material-symbols-rounded">
                    cancel
                </span>
            </button>
        );
    }

    const backButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionBack" className="btn back">
                <span className="back-icon material-symbols-outlined">
                    arrow_back_ios
                </span>
                <span className="button-text">Back</span>
            </button>
        );
    }



    const forwardButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionSubmit" className="btn next">
                <span className="button-text">Next</span>
                <span className="next-icon material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </button>
        );
    }

    const submitButton = () => {

        return (
            <button type="button" name="hoverTextareaInputActionSubmit" className="btn submit">
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

    return (
        <div className="hover-text-input">
            <div className="hover-text-input-background"></div>
            <div className="hover-text-input-area">
                <div className="card-title">{state.title}</div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="hoverTextareaInput"></textarea>
                    <label htmlFor="hoverTextareaInput">Your text</label>

                    <div className="letter-count">
                        <span className="remaining-letters exceeded">{state.currentLetterCount}</span>
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