import React from "react";
import ReactDOM from "react-dom/client";

import { TopicDisplay } from "route/topic-display/TopicDisplay";

import 'index.css';
import { SubTopicDisplay } from "route/sub-topic-display/SubTopicDisplay";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <React.StrictMode>

        <SubTopicDisplay topicId={1} />

    </React.StrictMode>

);
