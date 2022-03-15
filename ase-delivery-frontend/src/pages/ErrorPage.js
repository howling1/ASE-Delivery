import React from "react";
import SimpleContainer from "../components/SimpleContainer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <SimpleContainer>
            <h1>Page Not Found</h1>
            <h1>Please check your URL</h1>
            <Button variant="contained"  onClick={() => navigate('/')}>Back to Homepage</Button>
        </SimpleContainer>
    );
}

export default ErrorPage;