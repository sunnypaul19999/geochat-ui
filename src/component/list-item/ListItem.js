import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateSubTopic } from "server/subtopic/UpdateSubTopic";

import 'stylesheet/list-item/list-item.css';

function ListItemActionToolbar(props) {

    const [state, setState] = useState({
        canEdit: props.canEdit,
        canDelete: props.canDelete
    });


    const onClickEdit = (event) => {

        props.onEdit(event);

    };


    const onClickDelete = (event) => {

        props.onDelete(event);

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
        serverItemId: props.serverItemId,
        title: props.title,
        description: props.description,
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

            const topicId = state.serverItemId;

            navigate(`${topicId}/subTopic`);

        } else {

            const subTopicId = state.serverItemId

            navigate(`${subTopicId}/meta`, {
                state: {
                    title: state.title,
                    description: props.description
                }
            });

        }

    }


    const onEditListItem = (event) => {
        event.stopPropagation();

        //console.trace(state.serverItemId);

        props.onEdit(state.serverItemId);
    }


    const onDeleteListItem = (event) => {
        event.stopPropagation();

        props.onDelete(state.serverItemId);
    }


    return (
        <div
            ref={itemRef}
            className="list-item"
            onClick={onClickListItem}>
            <div className="card">
                <div className="card-body">
                    <p className="card-title">
                        {state.title}
                    </p>
                </div>
                <ListItemActionToolbar
                    canEdit={state.canEdit}
                    onEdit={onEditListItem}
                    canDelete={state.canDelete}
                    onDelete={onDeleteListItem} />
            </div>
        </div>
    );
}