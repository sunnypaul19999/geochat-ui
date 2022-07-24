import React from "react";

import ReactDOM from "react-dom/client";

import { Routes, Route, Link } from "react-router-dom";

import { TopicDisplay } from "route/topic-display/TopicDisplay";

import 'index.css';
import { SubTopicDisplay } from "route/sub-topic-display/SubTopicDisplay";
import { MessageDisplay } from "route/meta-discuss/MetaDiscussDisplay";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <React.StrictMode>

        <BrowserRouter>

            <Routes>
                <Route path='/'>

                    <Route path='geochat'>

                        <Route path='topic'>

                            <Route path=':topicId/subTopic'>

                                <Route index element={<SubTopicDisplay />} />

                                <Route path=':subTopicId/meta' element={<MessageDisplay />} />

                            </Route>

                        </Route>

                    </Route>

                </Route>
            </Routes>

        </BrowserRouter>

    </React.StrictMode>

);
