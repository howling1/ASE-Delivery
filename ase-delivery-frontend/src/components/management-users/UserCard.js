import React from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    userCard: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    userInfo: {
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

const UserCard = (props) => {

    const classes = useStyles();

    const navigate = useNavigate();

    return (
        <Card className={classes.userCard}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={"User"}
                        src={"/images/user.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                }
            />
            <CardContent className={classes.userInfo}>
                <Typography>
                    Role: {props.role}
                </Typography>
                <Typography>
                    ID: {props.id}
                </Typography>
                <Typography>
                    Email: {props.email}
                </Typography>
                <Chip sx={{width: 80}} label={props.status} color={props.status === "IDLE" ? "success" : "warning"}/>
            </CardContent>
            <CardActions className={classes.buttons}>
                <Button variant={"contained"}
                        onClick={() => navigate(`/management/users/${props.id}`)}>Details</Button>
            </CardActions>
        </Card>
    )
};

UserCard.propTypes = {
    role: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string,
}

export default UserCard;