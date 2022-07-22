import { ListItem } from "component/list-item/ListItem";

export function getTopicListItems(topics) {

    //return spinner when topics is falsy
    if (!topics) return (<></>);

    let listItems = [];

    const topicIds = Object.keys(topics);

    topicIds.forEach(topicId => {

        const topic = topics[topicId];

        listItems.push(
            <ListItem
                key={`topic_${topicId}`}
                itemId={topicId}
                title={topic.topic_title}
                canEdit
                canDelete
            />
        );

    });

    return listItems;
}