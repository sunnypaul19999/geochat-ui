
//Dispatches event 'fetch-next-topic-page'
//This event is used to notification for making a fetch request for next page for topics
function dispatchFetchNextTopicPageEvent(targetElement, detail) {

    const event = new CustomEvent('fetch-next-topic-page', {

        bubbles: true,

        cancelable: true,

        detail: detail
    });

    targetElement.dispatchEvent(event);

}


export { dispatchFetchNextTopicPageEvent };