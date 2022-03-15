import React, {useEffect, useState} from "react";
import DrawerContainer from "../../components/DrawerContainer";
import {useDispatch, useSelector} from "react-redux";
import {
    clearUpdatedDelivery,
    clearUpdateError,
    getDeliveryById,
    loadDeliveryByIdAsync, updatedDelivery, updateDeliveryAsync, updateError
} from "../../features/delivery/deliveriesSlice";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Avatar, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import {selectCurrentUser} from "../../features/authentication/authenticationSlice";
import StatusMenu from "../../components/management-deliveries/StatusMenu";
import BackButton from "../../components/BackButton";

const UpdateDeliveryPage = () => {
    const useStyles = makeStyles({
            createCard: {
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0 1rem 0",
                padding: "1rem",
            },
            dialog: {
                Height: '50%',
            },
            Card: {
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
                alignItems: "center",
                marginRight: "10px",
            },
            alert: {
                marginTop: "5px",
                marginBottom: "5px",
            }
        }
    )
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const delivery = useSelector(getDeliveryById)
    const {id} = useParams();
    useEffect(() => {
        dispatch(loadDeliveryByIdAsync(id))
    }, [dispatch, id])
    const [customerId, setCustomerId] = useState('');
    const [delivererId, setDelivererId] = useState('');
    const [boxId, setBoxId] = useState('');
    const updated_delivery = useSelector(updatedDelivery)
    const global_error = useSelector(updateError)
    const currentUser = useSelector(selectCurrentUser)
    const [deliveryStatus, setDeliveryStatus] = useState('');

    useEffect(() => {
        if (delivery) {
            setCustomerId(delivery.customerId);
            setDelivererId(delivery.delivererId);
            setBoxId(delivery.boxId);
            setDeliveryStatus(delivery.status);
        }
    }, [delivery])

    useEffect(() => {
        dispatch(clearUpdateError())
    }, [dispatch])

    useEffect(() => {
        if (updated_delivery) {
            dispatch(clearUpdatedDelivery())
            dispatch(clearUpdateError())
            navigate('/management/deliveries/all')
        }
    }, [updated_delivery, dispatch, navigate])

    const handleSave = async () => {
        if (!customerId) {
            alert('Customer ID cannot be empty')
            return;
        }
        if (!delivererId) {
            alert('Deliverer ID cannot be empty')
            return;
        }
        if (!boxId) {
            alert('Box ID cannot be empty')
            return;
        }
        const newDelivery = {
            id: delivery.id,
            customerId: customerId,
            delivererId: delivererId,
            boxId: boxId,
            status: deliveryStatus,
        }
        dispatch(updateDeliveryAsync(newDelivery))
    }

    return (
        <DrawerContainer>
            <BackButton link='/management/deliveries/all'/>
            <Card className={classes.createCard}>
                <h1>Update delivery: {id}</h1>
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
                        {currentUser.role === "DISPATCHER" ? (<TextField
                                fullWidth
                                id="Customer ID"
                                label="Customer ID"
                                variant="standard"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}/>) :
                            (<Typography>
                                Customer Id: {customerId}
                            </Typography>)}

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
                        {currentUser.role === "DISPATCHER" ? (<TextField
                                fullWidth
                                disabled={currentUser.role !== "DISPATCHER"}
                                id="DelivererId"
                                label="Deliverer ID"
                                variant="standard"
                                value={delivererId}
                                onChange={(e) => setDelivererId(e.target.value)}/>) :
                            (<Typography>
                                Deliverer Id: {delivererId}
                            </Typography>)}
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
                        {currentUser.role === "DISPATCHER" ? (<TextField
                                disabled={currentUser.role !== "DISPATCHER"}
                                fullWidth
                                id="BoxId"
                                label="Box ID"
                                variant="standard"
                                value={boxId}
                                onChange={(e) => setBoxId(e.target.value)}/>) :
                            (<Typography>
                                Box Id: {boxId}
                            </Typography>)}
                    </CardContent>
                </Card>
                {currentUser.role === "DELIVERER" ?
                    (<div className={classes.Card}> Status: <StatusMenu status={deliveryStatus} setStatus={setDeliveryStatus}/></div>) :
                    (<Typography>
                        Status: {delivery && delivery.status}
                    </Typography>)}

                {global_error && <Alert severity="error" className={classes.alert}>
                    {global_error}
                </Alert>}
                <Button variant={"contained"} onClick={handleSave}>{global_error === '' ? "Close" : "Save"}</Button>
            </Card>
        </DrawerContainer>
    )

}


export default UpdateDeliveryPage;
