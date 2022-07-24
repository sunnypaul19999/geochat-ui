import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import 'stylesheet/list-item/list-item.css';

function ListItemActionToolbar(props) {

    const [state, setState] = useState({
        canEdit: props.canEdit,
        canDelete: props.canDelete
    });


    const onClickEdit = (event) => {

        event.stopPropagation();

    };


    const onClickDelete = (event) => {

        event.stopPropagation();

    };


    const editActionItem = () => {

        if (state.canEdit) {

            return (
                <span
                    className="list-item-icon press-effect edit material-symbols-outlined"
                    onClick={onClickEdit}>
                    edit
                </span>
            );

        }

        return (<></>);
    }


    const deleteActionItem = () => {

        if (state.canDelete) {

            return (
                <span
                    className="list-item-icon press-effect delete material-symbols-outlined"
                    onClick={onClickDelete}>
                    delete
                </span>
            );

        }

        return (<></>);
    }


    return (
        <div className="list-item-action-toolbar">

            {editActionItem()}

            {deleteActionItem()}

        </div>
    );

}


export function ListItem(props) {

    const [state, setState] = useState({
        isTopic: props.isTopic,
        isSubTopic: props.isSubTopic,
        itemId: props.itemId,
        title: props.title,
        canEdit: props.canEdit,
        canDelete: props.canDelete
    });

    const params = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const itemRef = useRef();

    useEffect(() => {

        if (props.observe) {

            props.observe(itemRef.current);

        }

        return () => {

            if (props.unobserve) {

                //console.log(itemRef.current)
                if (itemRef.current) props.unobserve(itemRef.current);
            }
        }
    }, [])

    const onClickListItem = (event) => {

        event.stopPropagation();

        if (state.isTopic) {

            const topicId = state.itemId;

            navigate(`${topicId}/subTopic`);

        } else {

            const subTopicId = state.itemId

            navigate(`${subTopicId}/meta`);

        }

    }


    return (
        <div
            ref={itemRef}
            className="list-item" onClick={onClickListItem}>
            <div className="card">
                <div className="card-body">
                    <p className="card-title">
                        {state.title}
                    </p>
                </div>
                <ListItemActionToolbar canDelete={state.canDelete} canEdit={state.canEdit} />
            </div>
        </div>
    );
}