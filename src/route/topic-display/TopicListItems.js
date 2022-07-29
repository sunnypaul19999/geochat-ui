import { ListItem } from "component/list-item/ListItem";

export function getTopicListItems(topics, onEditTopic, onDeleteTopic, observer, unobserver) {

    //return spinner when topics is falsy
    if (!topics) return (<></>);

    let listItems = [];

    const topicIds = Object.keys(topics);

    const lastTopicIndex = topicIds.length - 1;

    topicIds.forEach((topicId, index) => {

        const topic = topics[topicId];

        let props = {
            key: `topic_${topicId}`,
            isTopic: true,
            serverItemId: topicId,
            title: topic.topic_title,
            canEdit: true,
            onEdit: onEditTopic,
            canDelete: true,
            onDelete: onDeleteTopic,
            observe: null,
            unobserve: null
        }

        //observe the last topic
        if (index === lastTopicIndex) {

            props.observe = observer;
            props.unobserve = unobserver;

        }

        listItems.push(<ListItem {...props} />);

    });

    return listItems;
}