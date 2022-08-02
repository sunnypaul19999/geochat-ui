import { getByTitle } from "@testing-library/react";
import axios from "axios";
import { serverConfig } from "config.js/ServerConfig";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


import geoChatLogo from 'asset/image/geo-chat-logo.png';
import 'stylesheet/auth/auth.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import produce from "immer";
import { flushSync } from "react-dom";

/*
    --- props ---
    signin:
*/

function useValidAuth(usernameInputRef, passwordInputRef, confirmPasswordRef, submitButtonRef) {

    //const [state, setState] = useState()

    const validation = {
        isUsernameValid: false,
        isPasswordValid: false,
        isConfirmPasswordValid: true
    }

    const validatePasswordText = (password) => {

        //Minimum eight characters

        const regex = new RegExp('^[A-Za-z\d#$@!%&*?]{8,30}$');

        return regex.test(password);
    }

    const validatePassword = () => {

        const password = passwordInputRef.current.value;

        const isValid = validatePasswordText(password);

        if (isValid) {

            validation.isPasswordValid = true;

            // setState(
            //     produce(draft => {

            //         if (!draft.isPasswordValid) {

            //             draft.isPasswordValid = true;
            //         }

            //     })
            // )
        } else {

            validation.isPasswordValid = false;

            // setState(
            //     produce(draft => {

            //         if (draft.isPasswordValid) {

            //             draft.isPasswordValid = false;
            //         }

            //     })
            // )
        }
    }


    const validateConfirmPassword = () => {

        const password = confirmPasswordRef.current.value;

        const isValid = validatePasswordText(password);

        if (isValid) {

            validation.isConfirmPasswordValid = true;

            // setState(
            //     produce(draft => {

            //         if (!draft.isConfirmPasswordValid) {

            //             draft.isConfirmPasswordValid = true;
            //         }

            //     })
            // )
        } else {

            validation.isConfirmPasswordValid = false;

            // setState(
            //     produce(draft => {

            //         if (draft.isConfirmPasswordValid) {

            //             draft.isConfirmPasswordValid = false;
            //         }

            //     })
            // )
        }
    }

    const validateUsername = () => {

        const username = usernameInputRef.current.value;

        if (username) {

            // console.log(username.length >= 5)

            if (username.length >= 5 && username.length < 50) {

                validation.isUsernameValid = true;

                // setState(
                //     produce(draft => {

                //         if (!draft.isUsernameValid) {

                //             draft.isUsernameValid = true;

                //             console.log(`username is greater than 5 50 ${draft.isUsernameValid}`)
                //         }

                //     })
                // )

            } else {

                validation.isUsernameValid = false;

                // console.log(submitButtonRef.current.classList);

                // setState(
                //     produce(draft => {

                //         if (draft.isUsernameValid) {

                //             draft.isUsernameValid = false;
                //         }

                //     })
                // )

            }
        }

    }

    const validate = () => {

        validateUsername();

        validatePassword();

        validateConfirmPassword()

        // console.log(isValid());

        if (isValid()) {

            submitButtonRef.current.classList.remove('disabled');
        } else {

            submitButtonRef.current.classList.add('disabled');
        }

    }

    const isValid = () => {

        console.log(JSON.stringify(validation, null, 2));

        return (validation.isUsernameValid && validation.isPasswordValid && validation.isConfirmPasswordValid);
    }

    return validate;

}

function Auth(props) {

    const [state, setState] = useState({
        signin: props.signin,
    });

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const submitButtonRef = useRef();

    const navigate = useNavigate();

    const validate = useValidAuth(usernameInputRef, passwordInputRef, confirmPasswordRef, submitButtonRef);

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

        validate();

    }

    const onPasswordInput = (event) => {

        event.stopPropagation();

        validate();

    }

    const onConfirmPasswordInput = (event) => {

        event.stopPropagation();

        validate();

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

            if (e.response.status == 403 || e.response.status == 401) {

                toast('Please Verify username and password');
            }


        }

    }


    const signUp = async (input) => {

        try {
            const response = await axios.post(`${serverConfig.config.baseUrl}/user/register`, {

                username: `${input.username}`,

                password: `${input.password}`,

                confirmPassword: `${input.password}`

            });

            console.log(response.data.message);

            navigate('/geochat/topic', { replace: true });

        } catch (e) {

            console.log(e);

            if (e.response.status == 405) {

                toast('Username already exists!');
            }

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
        <>
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
                                                placeholder="password"
                                                onInput={onPasswordInput} />

                                            {
                                                (state.signin)
                                                    ? <></> :
                                                    (<input
                                                        ref={confirmPasswordRef}
                                                        type="password"
                                                        id='confirmPassword'
                                                        className="form-control"
                                                        placeholder="confirm password"
                                                        onInput={onConfirmPasswordInput} />)
                                            }

                                            <div className="hstack justify-content-between">
                                                <a href="" className="link-dark">{goToText()}</a>
                                                <div className="submit d-flex justify-content-end p-1">
                                                    <div ref={submitButtonRef} className="btn btn-dark" onClick={onSubmit}>submit</div>
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

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}


export const SignIn = () => { return (<Auth signin />) };

export const SignUp = () => { return (<Auth />) };