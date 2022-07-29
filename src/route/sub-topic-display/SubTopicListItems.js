import { ListItem } from "component/list-item/ListItem";

export function getSubTopicListItems(subTopics, onEditSubTopic, onDeleteSubTopic, observer, unobserver) {

    //return spinner when subTopics is falsy
    if (!subTopics) return (<></>);

    let listItems = [];

    const subTopicIds = Object.keys(subTopics);

    const lastSubTopicIndex = subTopicIds.length - 1;

    subTopicIds.forEach((subTopicId, index) => {

        const subTopic = subTopics[subTopicId];

        let props = {
            key: `sub_topic_${subTopicId}`,
            isSubTopic: true,
            serverItemId: subTopicId,
            title: subTopic.sub_topic_title,
            description: subTopic.sub_topic_description,
            canEdit: true,
            onEdit: onEditSubTopic,
            canDelete: true,
            onDelete: onDeleteSubTopic,
            observe: null,
            unobserve: null
        }

        //observe the last sub-topic
        if (index === lastSubTopicIndex) {

            props.observe = observer;
            props.unobserve = unobserver;

        }

        listItems.push(<ListItem {...props} />);

    });

    return listItems;
}