import React from "react";
import {
    IconButton,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

const BackButton = ( {link} ) => {

    const navigate = useNavigate()
    return (
        <IconButton aria-label="add an alarm" onClick={() => navigate(link)} size="large" color="primary">
            <ArrowBackIcon />
        </IconButton>
    )
};


export default BackButton;
