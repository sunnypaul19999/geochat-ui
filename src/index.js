import React from "react";
import ReactDOM from "react-dom/client";

import { TopicDisplay } from "route/topic-display/TopicDisplay";

import 'index.css';
import { SubTopicDisplay } from "route/sub-topic-display/SubTopicDisplay";
import { MessageDisplay } from "route/meta-discuss/MetaDiscussDisplay";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <React.StrictMode>

        <MessageDisplay topicId={1} subTopicId={2} />

    </React.StrictMode>

);
