import { LeftWindow } from "component/left-window/LeftWindow";

import { ListItem } from "component/list-item/ListItem";


export function ListItemDisplay() {


    return (
        <LeftWindow >

            <ListItem
                itemId={1}
                title="This is my hardcoded interesting tilte"
                canEdit
                canDelete
            />

            <ListItem
                itemId={1}
                title="This is my hardcoded interesting tilte"
                canEdit
                canDelete
            />

            <ListItem
                itemId={1}
                title="This is my hardcoded interesting tilte"
                canEdit
                canDelete
            />

        </LeftWindow>
    )
}