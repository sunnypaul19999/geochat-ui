import React, { useEffect } from "react";

import ReactDOM from "react-dom/client";

import { Routes, Route, Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import { TopicDisplay } from "route/topic-display/TopicDisplay";

import 'index.css';
import { SubTopicDisplay } from "route/sub-topic-display/SubTopicDisplay";
import { BrowserRouter } from "react-router-dom";
import { MainUI } from "component/main-ui/MainUI";
import { SubTopicInfoDisplay } from "route/sub-topic-info-display/SubTopicInfoDisplay";
import { SignIn, SignUp } from "route/auth/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Root() {

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {

        console.log(location.pathname);

        if (location.pathname == '/') {

            navigate('/geochat/signUp');
        }

    }, [])

    return (<Outlet />);
}

root.render(

    <React.StrictMode>

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Root />}>

                    <Route path='/geochat' element={<MainUI />}>

                        <Route index element={<SignIn />} />

                        <Route path='signUp' element={<SignUp />} />

                        <Route path='topic'>

                            <Route index element={<TopicDisplay />} />

                            <Route path=':topicId/subTopic'>

                                <Route index element={<SubTopicDisplay />} />

                                <Route path=':subTopicId/meta' element={<SubTopicInfoDisplay />} />

                            </Route>

                        </Route>

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>

    </React.StrictMode>

);
