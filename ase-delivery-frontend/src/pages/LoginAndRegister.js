import React, {useEffect} from "react";
import SimpleContainer from "../components/SimpleContainer";
import Title from "../components/login-and-register/Title.js";
import LoginBox from "../components/login-and-register/LoginBox.js";
import RegisterBox from "../components/login-and-register/RegisterBox.js";
import {useDispatch, useSelector} from "react-redux";
import {
    createRequestAsync,
    setRegisterError,
    clearRegisterError,
    selectRegisterError,
} from "../features/request/requestsSlice";
import {
    loginAsync,
    setLoginError,
    clearLoginError,
    selectCurrentUser,
    selectLoginError,
} from "../features/authentication/authenticationSlice";
import {useNavigate} from "react-router-dom";

const LoginAndRegister = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginError = useSelector(selectLoginError)
    const registerError = useSelector(selectRegisterError)
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        if (currentUser) {
            console.log("Successfully logged in!")
            navigate('/management/boxes')
        }
    }, [currentUser, navigate])

    useEffect(() => {
        dispatch(clearLoginError())
        dispatch(clearRegisterError())
    }, [dispatch])

    // Login
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    const onChangeLoginEmail = (e) => {
        setLoginEmail(e.target.value)
        dispatch(clearLoginError())
    }

    const onChangeLoginPassword = (e) => {
        setLoginPassword(e.target.value)
        dispatch(clearLoginError())
    }

    const onLogin = () => {
        if (!loginEmail) {
            dispatch(setLoginError('Email cannot be empty'))
            return;
        }
        if (!loginPassword) {
            dispatch(setLoginError('Password cannot be empty'))
            return;
        }
        dispatch(loginAsync({
            email: loginEmail,
            password: loginPassword,
        }));
    }

    // Register
    const [registerEmail, setRegisterEmail] = React.useState('');
    const [registerRole, setRegisterRole] = React.useState('');

    const onChangeRegisterEmail = (e) => {
        setRegisterEmail(e.target.value)
        dispatch(clearRegisterError())
    }

    const onChangeRegisterRole = (e) => {
        setRegisterRole(e.target.value)
        dispatch(clearRegisterError())
    }

    const onRegister = () => {
        if (!registerEmail) {
            dispatch(setRegisterError('Email cannot be empty'))
            return
        }
        if (!registerRole) {
            dispatch(setRegisterError('Role cannot be empty'))
            return
        }
        dispatch(createRequestAsync({
            email: registerEmail,
            role: registerRole,
        }));
    }

    return (
        <SimpleContainer>
            <Title/>
            <div>
                <LoginBox
                    loginEmail={loginEmail}
                    loginPassword={loginPassword}
                    onChangeEmail={onChangeLoginEmail}
                    onChangePassword={onChangeLoginPassword}
                    onLogin={onLogin}
                    error={loginError}
                />
                <RegisterBox
                    email={registerEmail}
                    role={registerRole}
                    onChangeEmail={onChangeRegisterEmail}
                    onChangeRole={onChangeRegisterRole}
                    onRegister={onRegister}
                    error={registerError}
                />
            </div>
        </SimpleContainer>
    );
}

export default LoginAndRegister;
