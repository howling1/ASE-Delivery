import React from "react";
import {Box, Button, Chip, Paper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import DeleteDialog from "./DeleteDialog";
import ApproveDialog from "./ApproveDialog";

const UserDetail = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Typography>
                Role: {props.role}
            </Typography>
            <Typography>
                ID: {props.id}
            </Typography>
            <Typography>
                Email: {props.email}
            </Typography>
            {props.rfid && <Typography>
                RFID_ID: {props.rfid}
            </Typography>}
            <Chip sx={{width: 80}} label={props.status}
                  color={props.status === "IDLE" ? "success" : "warning"}/>
            <Box sx={{ml: 'auto'}}>
                <Button onClick={handleOpen}>Edit</Button>
                <DeleteDialog
                    userId={props.id}
                    userRole={props.role}
                    userStatus={props.status}
                    onDelete={props.onDeleteUser}
                />
            </Box>
            <ApproveDialog
                open={open}
                handleClose={handleClose}
                role={props.role}
                email={props.email}
                createMode={false}
                userId={props.id}
                userStatus={props.status}
            />
        </Paper>
    )

};

UserDetail.propTypes = {
    role: PropTypes.string,
    id: PropTypes.string,
    email: PropTypes.string,
    rfid: PropTypes.string,
    status: PropTypes.string,
    onDeleteUser: PropTypes.func.isRequired,
}

export default UserDetail;