import React from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography, Chip} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    boxCard: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    boxInfo: {
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

const BoxCard = (props) => {

    const classes = useStyles();

    const navigate = useNavigate();

    return (
        <Card className={classes.boxCard}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={"Box"}
                        src={"/images/box.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                }
            />
            <CardContent className={classes.boxInfo}>
                <Typography>
                    ID: {props.boxId}
                </Typography>
                <Typography>
                    Name: {props.box_name}
                </Typography>
                <Typography>
                    Station: {props.stationName}
                </Typography>
                <Typography>
                    Address: {props.address}
                </Typography>
                {props.status && <Typography>
                    Status: &nbsp;
                    <Chip label={props.status} color={props.status ==="AVAILABLE" ? "success" : "error"}/>
                </Typography>}
            </CardContent>
            <CardActions className={classes.buttons}>
                <Button variant={"contained"} onClick={() => navigate(`/management/box/${props.boxId}`)}>Details</Button>
                
            </CardActions>
        </Card>
    )
};

BoxCard.propTypes = {
    boxId: PropTypes.number.isRequired,
    box_name: PropTypes.string.isRequired,
    station_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    status: PropTypes.string,
    delivery: PropTypes.array,
}

export default BoxCard;