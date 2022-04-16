import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Form, FormControl, Nav, Navbar, NavLink} from "react-bootstrap";
import {BESTRESULTS_ROUTE, MAINPAGE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NewGameButton from "./NewGameButton";
import ContinueGameButton from "./ContinueGameButton";
import NavUserComponent from "./NavUserComponent";
import NavAuthorizedComponent from "./NavAuthorizedComponent";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const isAuth = user.isAuth;
    const navigate = useNavigate();

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container className="d-flex">
                    <div className="d-flex ml-2">
                        <NavLink style={{color:'white'}} onClick={() => {navigate(MAINPAGE_ROUTE)}}>Cards game</NavLink>
                        {isAuth ? <NavAuthorizedComponent/> : ''}
                        <Button
                            className="me-2"
                            variant="outline-light"
                            onClick={() => navigate(BESTRESULTS_ROUTE)}>Top scores
                        </Button>
                    </div>
                    <Nav className="ml-auto">
                        <NavUserComponent/>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;