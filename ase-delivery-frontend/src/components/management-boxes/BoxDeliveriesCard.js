import React from "react";
import {Avatar, Card, CardContent, CardHeader, Typography, Chip} from "@mui/material";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    boxCard: {
        display: "flex",
        flexDirection: "column",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    boxInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    label: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",

    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto",
    }
 
});

const BoxDeliveriesCard = (props) => {

    const classes = useStyles();

    return (
        <Card className={classes.boxCard}>
           <CardHeader
                avatar={
                    <Avatar
                        alt={"Box"}
                        src={"/images/parcel.svg"}
                        sx={{width: 50, height: 50}}
                        variant={"rounded"}
                    />
                }
            />
  
            <CardContent className={classes.boxInfo}>
                <Typography className={classes.label}>
                    ID: {props.delivery_id}
                </Typography>
                <Typography className={classes.label}>
                    Customer: {props.customer_id}

                </Typography>

                <Typography className={classes.label}>
                    Deliverer: {props.deliverer_id}

                </Typography>

                <Typography>
                    Status: &nbsp;
                    <Chip label={props.status} />
                </Typography>
               
                
            </CardContent>

        </Card>
    )
};

export default BoxDeliveriesCard;