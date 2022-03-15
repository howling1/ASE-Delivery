import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/styles";
import {Alert, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import DeliveryIcon from "./DeliveryIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    createdDelivery,
    createDeliveryAsync,
    clearCreatedDelivery,
    createError,
    clearCreateError,
    setCreateError,
} from "../../features/delivery/deliveriesSlice";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    createCard: {
        display: "flex",
        flexDirection: "column",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    createInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    input: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "30px",
    },
    inputLabel: {
        width: "200px",
        marginRight: "20px",
        paddingBottom: "10px",
    }
});

const CreateDelivery = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [customerId, setcustomerId] = React.useState('');
    const [boxId, setBoxId] = React.useState('');
    const [delivererId, setDelivererId] = React.useState('');

    const created_delivery = useSelector(createdDelivery)
    const global_error = useSelector(createError)

    useEffect(() => {
        dispatch(clearCreateError())
    }, [dispatch])

    useEffect(() => {
        if (created_delivery) {
            dispatch(clearCreatedDelivery())
            dispatch(clearCreateError())
            navigate('/management/deliveries/all')
        }
    }, [created_delivery, dispatch, navigate])

    const onInputCustomerId = (e) => {
        setcustomerId(e.target.value);
        dispatch(clearCreateError())
    };

    const onInputBoxId = (e) => {
        setBoxId(e.target.value)
        dispatch(clearCreateError())
    }

    const onInputDelivererId = (e) => {
        setDelivererId(e.target.value)
        dispatch(clearCreateError())
    }
    const onCreate = async () => {
        if (!customerId) {
            dispatch(setCreateError('Customer ID cannot be empty'))
            return;
        }
        if (!delivererId) {
            dispatch(setCreateError('Deliverer ID cannot be empty'))
            return;
        }
        if (!boxId) {
            dispatch(setCreateError('Box ID cannot be empty'))
            return;
        }
        const newDelivery = {
            customerId: customerId,
            delivererId: delivererId,
            boxId: boxId,
        }
        dispatch(createDeliveryAsync(newDelivery))
    }

    return (
        <Card className={classes.createCard}>
            <CardContent className={classes.createInfo}>
                <DeliveryIcon/>
                <div className={classes.input}>
                    <Typography className={classes.inputLabel}>
                        Customer ID:
                    </Typography>
                    <TextField fullWidth label="Please enter ID of the customer" id="customer_id"
                               onChange={onInputCustomerId}/>
                </div>
                <div className={classes.input}>
                    <Typography className={classes.inputLabel}>
                        Deliverer ID:
                    </Typography>
                    <TextField fullWidth label="Please enter ID of the deliverer" id="deliverer_id"
                               onChange={onInputDelivererId}/>
                </div>
                <div className={classes.input}>
                    <Typography className={classes.inputLabel}>
                        Box ID:
                    </Typography>
                    <TextField fullWidth label="Please enter ID of the box" id="box_id" onChange={onInputBoxId}/>
                </div>
                {global_error && <Alert severity="error">
                    {global_error}
                </Alert>}
            </CardContent>
            <CardActions>
                <Button variant={"contained"} onClick={onCreate}>Save</Button>
            </CardActions>
        </Card>
    );
}

export default CreateDelivery;
