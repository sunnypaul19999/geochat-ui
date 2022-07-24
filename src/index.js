import React from "react";

import ReactDOM from "react-dom/client";

import { Routes, Route, Link, Outlet } from "react-router-dom";

import { TopicDisplay } from "route/topic-display/TopicDisplay";

import 'index.css';
import { SubTopicDisplay } from "route/sub-topic-display/SubTopicDisplay";
import { MessageDisplay } from "route/meta-discuss/MetaDiscussDisplay";
import { BrowserRouter } from "react-router-dom";
import { LeftWindow } from "component/left-window/LeftWindow";
import { MainUI } from "component/main-ui/MainUI";

const root = ReactDOM.createRoot(document.getElementById("root"));
//<Route path='topic/:topicId/subTopic/:subTopicId/meta' element={<MessageDisplay />} />
root.render(

    <React.StrictMode>

        <BrowserRouter>

            <Routes>

                <Route path='/'>

                    <Route path='geochat' element={<MainUI />}>

                        <Route path='topic' element={<LeftWindow />}>

                            <Route index element={<TopicDisplay />} />

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
