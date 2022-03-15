import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

const RegisterForm = (props) => {
    return (
        <form>
            <TextField required label="Email" value={props.email} onChange={props.onChangeEmail}/>
            <br/><br/>
            <FormControl required>
                <InputLabel id="role-select">Role</InputLabel>
                <Select
                    style={{width: 195, height: 55}}
                    labelId="role-select"
                    label="Role"
                    value={props.role}
                    defaultValue={''}
                    onChange={props.onChangeRole}
                >
                    <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                    <MenuItem value="DELIVERER">DELIVERER</MenuItem>
                    <MenuItem value="DISPATCHER">DISPATCHER</MenuItem>
                </Select>
            </FormControl>
            <br/><br/>
            <Typography color={'error'}>{props.error}</Typography>
            <Button
                variant="contained"
                style={{width: 195, height: 40, fontSize: 18}}
                onClick={props.onRegister}
            >
                Register
            </Button>
        </form>
    )
}

RegisterForm.propTypes = {
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangeRole: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    error: PropTypes.string,
}

export default RegisterForm;