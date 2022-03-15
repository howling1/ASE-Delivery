import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ApproveDialog from "./ApproveDialog";

const useStyles = makeStyles({
    requestCard: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    requestInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto",
    },
});

const RequestCard = (props) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card className={classes.requestCard}>
            <CardContent className={classes.requestInfo}>
                <Typography variant={"h6"}>
                    {props.role}
                </Typography>
                <Typography>
                    Email: {props.userEmail}
                </Typography>
            </CardContent>
            <CardActions className={classes.buttons}>
                <Button variant={"contained"} color={"success"} onClick={handleOpen}>Approve</Button>
                <Button variant={"contained"} color={"error"} onClick={props.onReject}>Reject</Button>
                <ApproveDialog
                    createMode
                    open={open}
                    handleClose={handleClose}
                    role={props.role}
                    email={props.userEmail}
                    requestId={props.id}
                />
            </CardActions>
        </Card>
    );
};

RequestCard.propTypes = {
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    onReject: PropTypes.func.isRequired,
};

export default RequestCard;