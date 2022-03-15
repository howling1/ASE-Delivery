import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const LoginForm = (props) => {
    return (
        <form>
            <TextField
                value={props.loginEmail}
                required
                label="Email"
                id="email"
                onChange={props.onChangeEmail}
            />
            <br/><br/>
            <TextField
                value={props.loginPassword}
                required
                label="Password"
                type="password"
                autoComplete="current-password"
                id="password"
                onChange={props.onChangePassword}
            />
            <br/><br/>
            <Typography color={'error'}>{props.error}</Typography>
            <Button variant="contained" style={{width: 195, height: 40, fontSize: 18}}
                    onClick={props.onLogin}>Login</Button>
        </form>
    )
}

export default LoginForm;