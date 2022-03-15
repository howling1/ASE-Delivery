import React, { useEffect } from "react";
import {Grid} from "@mui/material";
import DrawerContainer from "../../components/DrawerContainer";
import BoxDetailCard from "../../components/management-boxes/BoxDetailCard";
import BoxDeliveriesCard from "../../components/management-boxes/BoxDeliveriesCard";
import { selectBoxDetail, loadBoxByIdAsync } from "../../features/box/boxesSlice";
import { useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import { selectCurrentUser } from "../../features/authentication/authenticationSlice";
import { loadDeliveriesByBoxIdAsync, selectAllDeliveries } from "../../features/delivery/deliveriesSlice";
import BackButton from "../../components/BackButton";


const BoxDetailPage = () => {


    const {id} = useParams()
    const dispatch = useDispatch()
    const deliveries = useSelector(selectAllDeliveries)
    const box = useSelector(selectBoxDetail)
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        dispatch(loadBoxByIdAsync(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(loadDeliveriesByBoxIdAsync(id))
    }, [dispatch, id])


    return (
        <DrawerContainer>
            <BackButton link='/management/boxes' />
            <h1>Box Detail</h1>
            {box && box.id === id &&
                <BoxDetailCard
                    userRole = {currentUser.role}
                    boxId={id}
                    boxName={box.name}
                    stationName={box.stationName}
                    address={box.address}
                    status={box.status}
                    raspberry={box.raspberry}
                />
            }
<Grid>
    {box && box.status !== "AVAILABLE"?
    <h1>Delivery Details </h1> : null
}
    {deliveries && deliveries.map((delivery, i) => (
        <BoxDeliveriesCard
            delivery_id={delivery.id}
            customer_id={delivery.customerId}
            deliverer_id={delivery.delivererId}
            status={delivery.status} //this field is optional
        />
    ))
}
</Grid>


        </DrawerContainer>
    )
}

export default BoxDetailPage;
