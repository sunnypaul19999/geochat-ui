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

    const validation = useRef({
        isUsernameValid: false,
        isPasswordValid: false,
        isConfirmPasswordValid: (confirmPasswordRef.current) ? false : true
    })

    const validatePasswordText = (password) => {

        //Minimum eight characters

        const regex = new RegExp('^[A-Za-z\d#$@!%&*?]{8,30}$');

        return regex.test(password);
    }

    const validatePassword = () => {

        const password = passwordInputRef.current.value;

        const isValid = validatePasswordText(password);

        if (isValid) {

            validation.current.isPasswordValid = true;

            // setState(
            //     produce(draft => {

            //         if (!draft.isPasswordValid) {

            //             draft.isPasswordValid = true;
            //         }

            //     })
            // )
        } else {

            validation.current.isPasswordValid = false;

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

        const confirmPassword = confirmPasswordRef.current.value;

        if (confirmPassword === passwordInputRef.current.value) {

            validation.current.isConfirmPasswordValid = true;

        } else {

            validation.current.isConfirmPasswordValid = false;
        }
    }

    const validateUsername = () => {

        const username = usernameInputRef.current.value;

        if (username) {

            // console.log(username.length >= 5)

            if (username.length >= 5 && username.length < 50) {

                validation.current.isUsernameValid = true;

                // setState(
                //     produce(draft => {

                //         if (!draft.isUsernameValid) {

                //             draft.isUsernameValid = true;

                //             console.log(`username is greater than 5 50 ${draft.isUsernameValid}`)
                //         }

                //     })
                // )

            } else {

                validation.current.isUsernameValid = false;

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

    const isValid = () => {

        console.log(JSON.stringify(validation.current, null, 2));

        return (validation.current.isUsernameValid && validation.current.isPasswordValid && validation.current.isConfirmPasswordValid);
    }

    const validate = (inputRef) => {

        validateUsername();

        validatePassword();

        if (confirmPasswordRef.current) { validateConfirmPassword() }

        // console.log(isValid());

        if (isValid()) {

            submitButtonRef.current.classList.remove('disabled');
        } else {

            submitButtonRef.current.classList.add('disabled');
        }

        if (inputRef.current === usernameInputRef.current) {

            return validation.current.isUsernameValid;

        } else if (inputRef.current === passwordInputRef.current) {

            return validation.current.isPasswordValid;

        } else if (inputRef.current === confirmPasswordRef.current) {

            return validation.current.isConfirmPasswordValid;

        }

    }


    return validate;

}

function Auth(props) {

    const [state, setState] = useState({
        signin: props.signin,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const submitButtonRef = useRef();

    const errDisp = {
        username: useRef(),
        password: useRef(),
        confirmPassword: useRef(),
    }

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

    const onFormInput = (event) => {
        event.stopPropagation();

        if (validate(usernameInputRef)) {
            errDisp.username.current.classList.add('hide-inline-error');
            errDisp.username.current.classList.remove('show-inline-error');

            setState(
                produce(draft => {
                    draft.isValidUsername = true;
                })
            )
        } else {
            errDisp.username.current.classList.remove('hide-inline-error');
            errDisp.username.current.classList.add('show-inline-error');

            setState(
                produce(draft => {
                    draft.isValidUsername = false;
                })
            )
        }

        if (validate(passwordInputRef)) {
            errDisp.password.current.classList.add('hide-inline-error');
            errDisp.password.current.classList.remove('show-inline-error');

            setState(
                produce(draft => {
                    draft.isValidPassword = true;
                })
            )
        } else {
            errDisp.password.current.classList.remove('hide-inline-error');
            errDisp.password.current.classList.add('show-inline-error');

            setState(
                produce(draft => {
                    draft.isValidPassword = false;
                })
            )
        }

        if (validate(confirmPasswordRef)) {
            errDisp.confirmPassword.current.classList.add('hide-inline-error');
            errDisp.confirmPassword.current.classList.remove('show-inline-error');


            setState(
                produce(draft => {
                    draft.isValidConfirmPassword = true;
                })
            )
        } else {
            errDisp.confirmPassword.current.classList.remove('hide-inline-error');
            errDisp.confirmPassword.current.classList.add('show-inline-error');

            setState(
                produce(draft => {
                    draft.isValidConfirmPassword = false;
                })
            )
        }

    }

    // const onPasswordInput = (event) => {
    //     event?.stopPropagation();

    //     if (validate(passwordInputRef)) {
    //         errDisp.password.current.classList.add('hide-inline-error');
    //         errDisp.password.current.classList.remove('show-inline-error');

    //         setState(
    //             produce(draft => {
    //                 draft.isValidPassword = true;
    //             })
    //         )
    //     } else {
    //         errDisp.password.current.classList.remove('hide-inline-error');
    //         errDisp.password.current.classList.add('show-inline-error');

    //         setState(
    //             produce(draft => {
    //                 draft.isValidPassword = false;
    //             })
    //         )
    //     }


    //     onUsernameInput();
    //     onConfirmPasswordInput();

    // }

    // const onConfirmPasswordInput = (event) => {
    //     event?.stopPropagation();

    //     if (validate(confirmPasswordRef)) {
    //         errDisp.confirmPassword.current.classList.add('hide-inline-error');
    //         errDisp.confirmPassword.current.classList.remove('show-inline-error');


    //         setState(
    //             produce(draft => {
    //                 draft.isValidConfirmPassword = true;
    //             })
    //         )
    //     } else {
    //         errDisp.confirmPassword.current.classList.remove('hide-inline-error');
    //         errDisp.confirmPassword.current.classList.add('show-inline-error');

    //         setState(
    //             produce(draft => {
    //                 draft.isValidConfirmPassword = false;
    //             })
    //         )
    //     }

    //     onUsernameInput();
    //     onPasswordInput();
    // }

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

            navigate('/geochat', { replace: true });

        } catch (e) {

            console.log(e);

            if (e.response.status == 409) {

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

            // signInWithToken();
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
                                                onInput={onFormInput} />

                                            <span
                                                ref={errDisp.username}
                                                className='hide-inline-error'>
                                                must be atleast 5 characters</span>

                                            <input
                                                ref={passwordInputRef}
                                                type="password"
                                                id='password'
                                                className="form-control"
                                                placeholder="password"
                                                onInput={onFormInput} />

                                            <span
                                                ref={errDisp.password}
                                                className='hide-inline-error'>
                                                must be atleast 8 characters</span>

                                            {
                                                (state.signin)
                                                    ? <></> :
                                                    (
                                                        <>
                                                            <input
                                                                ref={confirmPasswordRef}
                                                                type="password"
                                                                id='confirmPassword'
                                                                className="form-control"
                                                                placeholder="confirm password"
                                                                onInput={onFormInput} />
                                                            <span
                                                                ref={errDisp.confirmPassword}
                                                                className='hide-inline-error'>
                                                                must match with password</span>
                                                        </>
                                                    )
                                            }

                                            <div className="hstack justify-content-between">
                                                <a
                                                    href=""
                                                    className="link-dark"
                                                    onClick={
                                                        (event) => {

                                                            event.stopPropagation();

                                                            if (state.signin) {

                                                                navigate('signUp');
                                                            } else {

                                                                navigate('/geochat');
                                                            }

                                                        }
                                                    }>{goToText()}</a>
                                                <div className="submit d-flex justify-content-end p-1">
                                                    <div
                                                        ref={submitButtonRef}
                                                        className="btn btn-dark"
                                                        onClick={onSubmit}>submit</div>
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