import { useNavigate, useLocation } from "react-router-dom";

import 'stylesheet/bottom-ui-toolbar/bottom-ui-toolbar.css';


export function BottomToolbar(props) {

    const location = useLocation();

    const navigate = useNavigate();

    const isRoot = () => {

        if (location.pathname.endsWith('/topic')) {

            return true;

        }

        return false;
    }

    const onBackButtonClick = (event) => {

        event.stopPropagation();

        navigate(-1);

    }

    const getBackButton = () => {

        let style = {

            visibility: 'hidden'

        }

        if (window.history.state && window.history.state.idx > 0) {

            style.visibility = 'visibile';

        }

        return (
            <span class="backward-button" title="go backward" style={style}>

                <span class="material-icons" onClick={onBackButtonClick}>

                    chevron_left

                </span>

            </span>
        );

    }

    const onForwardButtonClick = (event) => {

        event.stopPropagation();

        navigate(1);

    }


    const getForwardButton = () => {

        let style = {
            visibility: 'hidden'
        }

        return (
            <span class="forward-button" title="go forward" style={style}>
                <span class="material-icons" onClick={onForwardButtonClick}>
                    chevron_right
                </span>
            </span>
        );

    }

    const onCreateButtonCLick = (event) => {

        event.stopPropagation();

        console.log(window.history.state);

        //console.log(`${JSON.stringify(history.state, null, 2)}`);

    }

    return (
        <div class="bottom-ui-toolbar position-absolute bottom-0 start-50 translate-middle">
            <div class="hstack gap-1 pt-1 rounded-pill justify-content-center">

                {getBackButton()}

                <span class="create-button" title="create">
                    <span class="material-icons" onClick={onCreateButtonCLick}>
                        add_circle_outline
                    </span>
                </span>

                {getForwardButton()}

            </div>
        </div>
    );
}