import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";


const DeleteDialog = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                color={'error'}
                disabled={props.userStatus !== 'IDLE'}
                onClick={() => setOpen(true)}
            >
                Delete
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby={'alert-title'}
                    aria-describedby={'alert-body'}
            >
                <DialogTitle id={'alert-title'}>
                    {`Delete ${props.userRole}. Are you ABSOLUTELY SURE?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id={'alert-body'}>
                        You are deleting {props.userRole} with user id: {props.userId}.
                        This operation cannot be revoked.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        autoFocus
                        color={'error'}
                        onClick={() => {
                            handleClose()
                            props.onDelete()
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

DeleteDialog.propTypes = {
    userId: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default DeleteDialog;