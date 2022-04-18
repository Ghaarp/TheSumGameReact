import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAINPAGE_ROUTE, REG_ROUTE, TOKEN_STORAGE_KEY} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {loginOnServer, registerOnServer} from "../http/userAPI";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {errorHandle} from "../utils/errorHandler";

const Auth = observer(() => {

    const {user} = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const isLogin = location.pathname == LOGIN_ROUTE;

    const navigate = useNavigate();

    const loginOrRegisterUser = async () => {

        const minLength = 6;
        if(password.length < minLength){
            setPasswordError('At least 6 characters')
            return;
        }
        try{
            const res = isLogin ? await loginOnServer(login, password) : await registerOnServer(login, password);
            if (errorHandle(res, setErrorMessage, setShowError)) return;

            const token = res.response.data.token;
            user.updateToken(token);
            navigate(MAINPAGE_ROUTE);
        }catch(e){
            console.log(e.response.data.message);
        }
    }

    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center"
                       style={{height: window.innerHeight-500}}>
                <Card className="p-5 justify-content-center"
                      style={{width: 600}}>
                    {!showError || <h5 className="m-auto mb-4" style={{color: 'red'}}>{errorMessage}</h5>}
                    <h1 className="m-auto">{isLogin ? 'Log in' : 'Registration'}</h1>
                    <Form className="d-flex flex-column">
                        <FormControl
                            placeholder="Login"
                            className="mt-3"
                            aria-label="Login"
                            value={login}
                            onChange={e => {
                                const maxLength = 15;
                                let value = e.target.value.replace(/[^\w]/g, '');
                                if (value.length > maxLength){
                                    value = value.slice(0, maxLength);
                                }
                                if(value != e.target.value){
                                    setLoginError('Login must be max 15 characters of latin or digits')
                                }else{
                                    setLoginError('');
                                }
                                setLogin(value);
                            }}>
                        </FormControl>
                        <h5 className="mb-0" style={{color: 'red'}}>{loginError}</h5>
                        <FormControl
                            placeholder="Password"
                            className="mt-3"
                            aria-label="Password"
                            value={password}
                            type="password"
                            onChange={e => {
                                const maxLength = 16;
                                let value = e.target.value;
                                if (value.length > maxLength){
                                    e.target.value = value.slice(0, maxLength);
                                    setPasswordError('Max 16 characters');
                                }else{
                                    setPasswordError('');
                                }

                                setPassword(e.target.value);
                            }}>
                        </FormControl>
                        <h5 className="mb-0" style={{color: 'red'}}>{passwordError}</h5>
                        <Row className = "d-flex justify-content-between mt-3">
                            <div className="d-flex justify-content-between">
                                {isLogin ?
                                    <NavLink to={REG_ROUTE}>Click here to register...</NavLink>
                                    : <NavLink to={LOGIN_ROUTE}>Click here to login...</NavLink>
                                }
                                <Button variant={"outline-success"}
                                        onClick={loginOrRegisterUser}>
                                    {isLogin ? 'Log in' : 'Register'}
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default Auth;