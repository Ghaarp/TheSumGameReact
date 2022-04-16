import React from 'react';
import {Card, Container} from "react-bootstrap";

const RecordsTable = ({className, records, children}) => {
    return (
        <div className={className}>
            <Card className="justify-content-center align-items-center" style = {{width: 600}}>
                <h1>{children}</h1>

                {records.map((val, i) => <h1 key={i}>{i + 1} : Player: {val.userName}, score: {val.result}</h1>)}
            </Card>
        </div>

    );
};

export default RecordsTable;