import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";

export default function Buttons() {

    const navigate = useNavigate()

    return (
        <Button variant="contained" sx={{ width: 200, height: 60, position: 'absolute',
            top: 520, left: 900,}} endIcon={<SendIcon />} onClick={() => navigate('/login')}>
            Start Now
        </Button>
    );
}