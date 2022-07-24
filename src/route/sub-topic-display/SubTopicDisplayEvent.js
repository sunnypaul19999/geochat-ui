
//Dispatches event 'fetch-next-topic-page'
//This event is used to notification for making a fetch request for next page for topics
function dispatchFetchNextSubTopicPageEvent(targetElement) {

    const event = new Event('fetch-next-sub-topic-page', {
        bubbles: true,
        cancelable: true,

    });

    targetElement.dispatchEvent(event);

}


export { dispatchFetchNextSubTopicPageEvent };