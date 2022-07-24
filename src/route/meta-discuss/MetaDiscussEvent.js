
//Dispatches event 'fetch-next-topic-page'
//This event is used to notification for making a fetch request for next page for topics
function dispatchFetchNextMetaDiscussPageEvent(targetElement) {

    const event = new Event('fetch-next-meta-discuss-page', {
        bubbles: true,
        cancelable: true,

    });

    targetElement.dispatchEvent(event);

}


export { dispatchFetchNextMetaDiscussPageEvent };