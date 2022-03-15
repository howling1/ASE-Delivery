import React, {useEffect} from "react";
import DrawerContainer from "../../components/DrawerContainer";
import {Grid, Typography} from "@mui/material";
import SearchBar from "../../components/management-users/SearchBar";
import DeliveryCard from "../../components/management-deliveries/DeliveryCard";
import {useDispatch, useSelector} from "react-redux";
import {
    loadDeliveriesAsync,
    SearchByIdAsync,
    selectAllDeliveries
} from "../../features/delivery/deliveriesSlice";
import { useParams } from "react-router-dom";
import {selectCurrentUser} from "../../features/authentication/authenticationSlice";

const DeliveryListPage = () => {
    const dispatch = useDispatch()
    const deliveries = useSelector(selectAllDeliveries)
    const {type} = useParams();
    
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        const data = {
            type: type,
            id: currentUser.id,
        }
        dispatch(loadDeliveriesAsync(data))
    }, [type, currentUser.id, dispatch])

    const [searchInput, setSearchInput] = React.useState('');

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        if (searchInput) {
            dispatch(SearchByIdAsync(searchInput))
        } else {
            dispatch(loadDeliveriesAsync())
        }
    }

    return (
        <DrawerContainer>
            <h1>Manage the Deliveries</h1>
            <Grid container spacing={2} justify="flex-end">
                <Grid item xs={4} sx={{ml: 'auto'}}>
                    <SearchBar
                        placeholder={"Search by ID"}
                        input={searchInput}
                        handleChange={handleChangeInput}
                        handleSearch={handleSearch}
                    />
                </Grid>
            </Grid>
            {deliveries && deliveries.length > 0? deliveries.map((delivery, i) => (
                <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                />
            )) : (<Typography sx={{mt: 3}} variant={'h6'}>No Results</Typography>)
            }
        </DrawerContainer>
    )
}

export default DeliveryListPage;
