import React, {useEffect, useState} from 'react';
import {records} from "../http/gameAPI";
import {observer} from "mobx-react-lite";
import {Card, Container} from "react-bootstrap";
import RecordsTable from "../components/RecordsTable";
import {errorHandle} from "../utils/errorHandler";

const BestResults = observer(() => {

    const [results, setResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        records().then(res => {
            const {response} = res;
            if (errorHandle(res, setErrorMessage, setShowError)) return;

            setResults(response.data.records);
            setUserResults(response.data.userRecords);
        });
    }, [])

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight-300}}>
                {showError ? <div className="justify-content-center align-items-center">
                                <h1>{errorMessage}</h1>
                             </div>
                                :
                    results ?
                             <div className="justify-content-center align-items-center">
                                {userResults != undefined ? <RecordsTable className="mb-4" records={userResults}>My top scores</RecordsTable> : ''}
                                <RecordsTable className="mb-4" records={results}>Top scores</RecordsTable>
                             </div>
                            : <h2>Loading results...</h2>}

            </Container>
        </div>
    );
});

export default BestResults;