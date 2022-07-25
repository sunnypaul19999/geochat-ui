import { ListItem } from "component/list-item/ListItem";
import { MessageItem } from "component/message-item/MessageItem";

export function getMessageItems(messages, onSendMessageScrollIntoView, observer, unobserver) {

    //return spinner when messages is falsy
    if (!messages) return (<></>);

    let messageItem = [];

    const messageIds = Object.keys(messages);

    const lastMessageIndex = messageIds.length - 1;

    messageIds.forEach((messageId, index) => {

        const message = messages[messageId];

        let props = {
            key: `meta_dicuss_message_${message.message_id}`,
            messageId: message.message_id,
            username: message.sender_username,
            message: message.message,
            //scrollIntoView: false,
            scrollMessageItemIntoView: null,
            observe: null,
            unobserve: null,
        }

        //observe the last message
        if (index === lastMessageIndex) {

            //props.scrollIntoView = true;
            props.scrollMessageItemIntoView = onSendMessageScrollIntoView;
            props.observe = observer;
            props.unobserve = unobserver;

        }

        messageItem.push(<MessageItem {...props} />);

    });

    return messageItem;
}