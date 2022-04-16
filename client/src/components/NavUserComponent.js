import React, {useContext, useEffect} from 'react';
import defaultAvatar from '../assets/default-ava.png'
import {Button, Card, Container, Nav} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAINPAGE_ROUTE, TOKEN_STORAGE_KEY} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavUserComponent = observer(() => {
    const {user} = useContext(Context);
    const isAuth = user.isAuth;
    const navigate = useNavigate();

    useEffect(() => {
        user.tryLoginByToken();
    })

    const logOut = async() => {
        user.logOut();
        navigate(MAINPAGE_ROUTE);
    }

    return (
        <div>
        {isAuth?
            <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                <img style={{width: 40, height: 40, verticalAlign: 'text-bottom'}} src={defaultAvatar}
                     className="img-fluid me-2"/>
                <h5 className='mb-0 me-3' style={{color: 'white'}}>{user.login}</h5>
                <Button
                    variant="outline-light"
                    onClick={logOut}>Log out</Button>
            </div>
                :
            <div>
                <Button
                    variant="outline-light"
                    onClick={()=>navigate(LOGIN_ROUTE)}>
                    Login
                </Button>
            </div>
        }
        </div>
    );
});

export default NavUserComponent;