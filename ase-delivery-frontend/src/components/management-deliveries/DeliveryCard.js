import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from "prop-types";
import DeliveryIcon from "./DeliveryIcon";
import {useDispatch, useSelector} from "react-redux";
import {deleteDeliveryAsync} from "../../features/delivery/deliveriesSlice";
import {useNavigate} from "react-router-dom";
import {selectCurrentUser} from "../../features/authentication/authenticationSlice";

const useStyles = makeStyles({
    deliveryCard: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    deliveryInfo: {
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

const DeliveryCard = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [warning, setWarning] = useState(false);

    const currentUser = useSelector(selectCurrentUser)

    const onDelete = () => {
        dispatch(deleteDeliveryAsync(props.delivery.id))
        setWarning(false)
    }

    return (
        <Card className={classes.deliveryCard}>
            <CardHeader
                avatar={
                    <DeliveryIcon status={props.delivery.status}/>
                }
            />
            <CardContent className={classes.deliveryInfo}>
                <Typography>
                    ID: {props.delivery.id}
                </Typography>
                <Typography>
                    Customer: {props.delivery.customerId}
                </Typography>
                <Typography>
                    Deliverer: {props.delivery.delivererId}
                </Typography>
                <Typography>
                    Box: {props.delivery.boxId}
                </Typography>
            </CardContent>
            <CardActions className={classes.buttons}>
                <Button variant={"contained"} onClick={() => navigate(`/management/deliveries/detail/${props.delivery.id}`,{replace: true})}>Details</Button>
                {currentUser.role !== "CUSTOMER" &&
                <IconButton onClick={() => navigate(`/management/deliveries/update/${props.delivery.id}`)}><EditIcon/></IconButton>
                }
                {currentUser.role === "DISPATCHER" &&
                <IconButton
                    disabled={props.status && (props.status === "InBox" || props.status === "InTransit")}
                    onClick={() => setWarning(true)}>
                    <DeleteIcon/>
                </IconButton>
                }
            </CardActions>
            <Dialog open={warning}>
                <DialogTitle color={'error'}>
                    Warning
                </DialogTitle>
                <DialogContent>
                    You're about to delete a delivery. This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button color={'success'} onClick={onDelete}>Confirm</Button>
                    <Button color={'error'} onClick={() => setWarning(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
};

DeliveryCard.propTypes = {
    delivery: PropTypes.object.isRequired,
}

export default DeliveryCard;
