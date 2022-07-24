
class TopicListDisplayObserver {

    static displayObserver;

    observer;

    //observer configuration for topicListDisplay
    options = {

        root: null,

        rootMargin: '0px',

        threshold: 0.5

    }

    constructor(rootElementId, onObservedElementVisible) {

        this.options.root = document.getElementById(`#${rootElementId}`);

        Object.freeze(this.options);

        //displayObserver maintains map of root and it's intersection observer
        //and returns the same when asked
        TopicListDisplayObserver.displayObserver = {};

        TopicListDisplayObserver.displayObserver[rootElementId] = this;

        this.observer = new IntersectionObserver(onObservedElementVisible, this.options);

    }


    static getTopicListDisplayObserver(rootElementId, onObservedElementVisible) {

        if (TopicListDisplayObserver.displayObserver) {

            if (TopicListDisplayObserver.displayObserver[rootElementId]) {

                const displayObserver = TopicListDisplayObserver.displayObserver[rootElementId];

                return displayObserver;

            }
        }

        return new TopicListDisplayObserver(rootElementId, onObservedElementVisible);

    }

    observeElement(element) {

        // console.log(`suscribe`);
        // console.log(element);

        if (element) {

            this.observer.observe(element);

        }
    }

    unobserveElement(element) {

        // console.log(`unsuscribe`);
        // console.log(element);

        if (element) {

            this.observer.unobserve(element);

        }

    }

    disconnectObserver() {

        console.log('disconnectObserver');
        this.observer.disconnect();

    }

}

export function useDisplayObserver(rootElementId, onObservedElementVisible) {

    const displayObserver = TopicListDisplayObserver.getTopicListDisplayObserver(rootElementId, onObservedElementVisible);


    return [

        //observer to observe a element
        displayObserver.observeElement.bind(displayObserver),

        //unobserver for a element
        displayObserver.unobserveElement.bind(displayObserver),

        //complete disconnection of observer
        displayObserver.disconnectObserver.bind(displayObserver)
    ]

}