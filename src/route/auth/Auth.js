import { getByTitle } from "@testing-library/react";
import axios from "axios";
import { serverConfig } from "config.js/ServerConfig";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import geoChatLogo from 'asset/image/geo-chat-logo.png';
import 'stylesheet/auth/auth.css';

/*
    --- props ---
    signin:
*/
function Auth(props) {

    const [state, setState] = useState({
        signin: props.signin,
    });

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const getByTitle = () => {

        if (state.signin) {

            return 'Login';
        }

        return 'SignUp';
    }

    const goToText = () => {
        if (state.signin) {

            return 'SignUp';
        }

        return 'Login';

    }

    const onUsernameInput = (event) => {

        event.stopPropagation();

    }

    const signInWithToken = async () => {

        try {
            const response = await axios.get(`${serverConfig.config.baseUrl}/user/login`, {

                withCredentials: true
            });

            console.log(response.data.message);

            navigate('/geochat/topic', { replace: true });

        } catch (e) {

            console.log(e);

            console.log(JSON.stringify(e.response.data));

        }

    }

    const signIn = async (input) => {

        try {

            const response = await axios.get(`${serverConfig.config.baseUrl}/user/login`, {

                withCredentials: true,

                auth: {

                    username: input.username,

                    password: input.password

                }
            });

            console.log(response.data.message);

            navigate('/geochat/topic', { replace: true });

        } catch (e) {

            console.log(e);

        }

    }


    const signUp = async (input) => {

        try {
            const response = await axios.get(`${serverConfig.config.baseUrl}/user/register`, {

                auth: {

                    username: input.username,

                    password: input.password,

                    confirmPassword: input.password

                }

            });

            console.log(response.data.message);

            navigate('/geochat/topic', { replace: true });

        } catch (e) {

            console.log(e);

        }

    }

    const onSubmit = async (event) => {

        event.stopPropagation();

        const input = {};

        input.username = usernameInputRef.current.value;

        input.password = passwordInputRef.current.value;

        if (props.signin) {

            console.log(input);

            signIn(input);

        } else {

            signUp(input);

        }
    }

    const onLoadPage = (event) => {

        event.stopPropagation();

        if (state.signin) {

            signInWithToken();
        }

    }

    return (
        <div className="component-login" onLoad={onLoadPage}>
            <div className="container">
                <div className="row justify-content-center d-flex  flex-wrap">
                    <div className="col-10 col-md-5">
                        <div id="geoChatLogo">
                            <img src={geoChatLogo} title="Geo Chat" />
                            <span className="appName">
                                <p>Geo Chat</p>
                            </span>
                        </div>
                        <div className="login-form">
                            <div className="card">
                                <h5 className="card-header text-muted">{getByTitle()}</h5>
                                <div className="card-body p-2">
                                    <div className="vstack gap-2">

                                        <input
                                            ref={usernameInputRef}
                                            type="text"
                                            id='username'
                                            className="form-control"
                                            placeholder="username"
                                            onInput={onUsernameInput} />

                                        <input
                                            ref={passwordInputRef}
                                            type="password"
                                            id='password'
                                            className="form-control"
                                            placeholder="password" />

                                        {
                                            (state.signin)
                                                ? <></> :
                                                (<input
                                                    ref={confirmPasswordRef}
                                                    type="password"
                                                    id='confirmPassword'
                                                    className="form-control"
                                                    placeholder="confirm password" />)
                                        }

                                        <div className="hstack justify-content-between">
                                            <a href="" className="link-dark">{goToText()}</a>
                                            <div className="submit d-flex justify-content-end p-1">
                                                <div className="btn btn-dark" onClick={onSubmit}>submit</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const SignIn = () => { return (<Auth signin />) };

export const SignUp = () => { return (<Auth />) };