
//Dispatches event 'fetch-next-topic-page'
//This event is used to notification for making a fetch request for next page for topics
function dispatchFetchNextTopicPageEvent(targetElement) {

    const event = new Event('fetch-next-topic-page', {
        bubbles: true,
        cancelable: true,

    });

    targetElement.dispatchEvent(event);

}


export { dispatchFetchNextTopicPageEvent };