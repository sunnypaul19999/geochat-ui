import React, { useState } from "react";

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
        itemId: props.itemId,
        title: props.title,
        canEdit: props.canEdit,
        canDelete: props.canDelete
    });

    const onClickListItem = (event) => {

        event.stopPropagation();

    }


    return (
        <div className="list-item" onClick={onClickListItem}>
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