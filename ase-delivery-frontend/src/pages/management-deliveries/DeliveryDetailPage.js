import React, {useEffect} from "react";
import DeliveryDetail from "../../components/management-deliveries/DeliveryDetail";
import {useDispatch, useSelector} from "react-redux";
import {readDetail, readDetailAsync} from "../../features/delivery/deliveriesSlice";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import DrawerContainer from "../../components/DrawerContainer";
import BackButton from "../../components/BackButton";

const useStyles = makeStyles({
    Card: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0 1rem 0",
        justifyContent: 'center',
        alignItems: 'center',
        padding: "1rem",
    },
})

const DeliveryDetailPage = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const details = useSelector(readDetail)
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            dispatch(readDetailAsync(id))
        }
    }, [dispatch, id])

    return (
        <DrawerContainer>
            <>
                <BackButton link='/management/deliveries/all'/>
                <div className={classes.Card}>
                    <DeliveryDetail delivery={details}/>
                </div>
            </>
        </DrawerContainer>
    )

}

export default DeliveryDetailPage;
