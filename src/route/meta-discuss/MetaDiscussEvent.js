
//Dispatches event 'fetch-next-topic-page'
//This event is used to notification for making a fetch request for next page for topics
function dispatchFetchNextMetaDiscussPageEvent(targetElement) {

    const event = new Event('fetch-next-meta-discuss-page', {
        bubbles: true,
        cancelable: true,

    });

    targetElement.dispatchEvent(event);

}


//Dispatches event 'message-send-event'
//This event is used to notification for when the message is send
function dispatchMessageSendEvent(targetElement) {

    const event = new Event('message-send-event', {
        bubbles: true,
        cancelable: true,

    });

    targetElement.dispatchEvent(event);

}


export { dispatchFetchNextMetaDiscussPageEvent, dispatchMessageSendEvent };