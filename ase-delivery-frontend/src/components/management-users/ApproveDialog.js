import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {createUserAsync, updateUserAsync} from "../../features/user/usersSlice";
import {deleteRequest} from "../../features/request/requestsAPI";

const ApproveDialog = (props) => {

    const dispatch = useDispatch()

    const [password, setPassword] = React.useState('');
    const [RFIDToken, setRFIDToken] = React.useState('');
    const [error, setError] = React.useState('');

    const onInputPassword = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const onInputRFID = (e) => {
        setRFIDToken(e.target.value)
        setError('');
    }

    const handleSubmit = () => {
        if (!password) {
            setError('Password cannot be empty!');
            return;
        }
        if (props.role !== 'DISPATCHER' && !RFIDToken) {
            setError('RFID cannot be empty!');
            return;
        }
        const newUser = {
            email: props.email,
            password: password,
            role: props.role,
            status: 'IDLE',
            rfid: RFIDToken,
        }
        if (props.createMode) {
            dispatch(createUserAsync(newUser))

            deleteRequest(props.requestId)
                .then(resp => {
                    props.handleClose()
                    //refresh current page
                    window.location.reload()
                })
        } else {
            newUser.id = props.userId
            newUser.status = props.userStatus

            dispatch(updateUserAsync(newUser))
            props.handleClose()
        }
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                {props.createMode? "Create new user" : "Update user"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.createMode?
                        `To create a new ${props.role} for ${props.email}, please assign the following:`:
                        `To update the following items for ${props.role} ${props.email}, please re-assign them.`
                    }
                </DialogContentText>
                <TextField
                    label={"Password"}
                    type={"password"}
                    fullWidth
                    variant={"standard"}
                    value={password}
                    onInput={onInputPassword}
                />
                {props.role !== 'DISPATCHER' && <TextField
                    label={"RFID Token"}
                    fullWidth
                    variant={"standard"}
                    value={RFIDToken}
                    onInput={onInputRFID}
                />}
                <Typography color={"error"}>
                    {error}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Approve</Button>
            </DialogActions>
        </Dialog>
    )
};

ApproveDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createMode: PropTypes.bool.isRequired,
    requestId: PropTypes.string, // used on createMode
    userId: PropTypes.string, // used on updateMode
    userStatus: PropTypes.string, // used on updateMode
};

export default ApproveDialog;