import React from 'react';
import {Button, Card, Container, Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import NewGameButton from "../components/NewGameButton";

const Main = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight-500}}>

                <Card className="justify-content-center align-items-center" style = {{width: 600}}>
                    <h1>The sum game</h1>
                    <Container className="d-flex justify-content-center align-items-center">

                        <Nav className="m-lg-4 align-items-left">
                            <NewGameButton variant="outline-dark">Start new game</NewGameButton>
                        </Nav>
                    </Container>
                </Card>
            </Container>
        </div>
    );
};

export default Main;