import React from "react";
import {
    Avatar,
    Card, CardContent,
    Typography
} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles({
    title: {
        fontSize: "larger",
        fontWeight: "bold",
        marginLeft: '1rem',
    },
    dialog:{
        Height: '50%',
    },
    Card: {
        minWidth: '1000px',
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    Info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    avatar: {
        display: "flex",
        alignItems:"center",
        marginRight: "10px",
    }
    }
)

const DeliveryDetail = (props) => {
    const classes = useStyles();
    return (
        <Card>
            <Typography className={classes.title}>Delivery: {props.delivery && props.delivery.deliveryId}</Typography>
            <Card className={classes.Card}>
                <div className={classes.avatar}>
                    <Avatar
                        alt={"User"}
                        src={"/images/user.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                </div>
                <CardContent className={classes.Info}>
                    <Typography>
                        Customer: {props.delivery && props.delivery.customerEmail}
                    </Typography>
                    <Typography>
                        Customer ID: {props.delivery && props.delivery.customerId}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.Card}>
                <div className={classes.avatar}>
                    <Avatar
                        alt={"Deliverer"}
                        src={"/images/user.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                </div>
                <CardContent className={classes.Info}>
                    <Typography>
                        Deliverer: {props.delivery && props.delivery.delivererEmail}
                    </Typography>
                    <Typography>
                        Deliverer ID: {props.delivery && props.delivery.delivererId}
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.Card}>
                <div className={classes.avatar}>
                    <Avatar
                        alt={"Box"}
                        src={"/images/parcel.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                </div>
                <CardContent className={classes.Info}>
                    <Typography>
                        Name: {props.delivery && props.delivery.boxName}
                    </Typography>
                    <Typography>
                        Address: {props.delivery && props.delivery.address}
                    </Typography>
                    <Typography>
                        Station: {props.delivery && props.delivery.station}
                    </Typography>
                    <Typography>
                        ID: {props.delivery && props.delivery.boxId}
                    </Typography>
                </CardContent>
            </Card>
            <Typography>
                Date of creation: {props.delivery && props.delivery.date}
            </Typography>
            <Typography>
                Status: {props.delivery && props.delivery.status}
            </Typography>
        </Card>
    )
};

export default DeliveryDetail;
