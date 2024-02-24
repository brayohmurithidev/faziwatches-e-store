import React from 'react';
import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div>
            <h3>This an error page</h3>
            {error.message}
        </div>
    );
};

export default ErrorPage;
