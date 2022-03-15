import React, {useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import SearchBar from "../../components/management-users/SearchBar";
import DrawerContainer from "../../components/DrawerContainer";
import BoxCard from "../../components/management-boxes/BoxCard";
import {selectAllBoxes, loadBoxesAsync, searchBoxesByIdOrNameAsync, loadBoxesByCustomerIdAsync, loadBoxesByDelivererIdAsync} from "../../features/box/boxesSlice";
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentUser} from "../../features/authentication/authenticationSlice";


const BoxListPage = () => {

    const dispatch = useDispatch()
    const boxes = useSelector(selectAllBoxes)

    const [searchInput, setSearchInput] = React.useState('');


    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        if(currentUser){
            if(currentUser.role === "CUSTOMER"){
                dispatch(loadBoxesByCustomerIdAsync(currentUser.id));
            }
            else if(currentUser.role === "DELIVERER"){
                dispatch(loadBoxesByDelivererIdAsync(currentUser.id));
            }
            else if(currentUser.role === "DISPATCHER"){
                dispatch(loadBoxesAsync())
            }
        }
    }, [currentUser, dispatch])

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        if (searchInput) {
            dispatch(searchBoxesByIdOrNameAsync(searchInput))
        } else {
            dispatch(loadBoxesAsync())
        }
    }

    return (
        <DrawerContainer>
            <h1>Manage the Boxes</h1>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4}>
                    <SearchBar placeholder={"Search by ID or station name..."}
                    input={searchInput}
                    handleChange={handleChangeInput}
                    handleSearch={handleSearch}
                    />
                </Grid>
            </Grid>
            { boxes && boxes.length > 0 ?
                boxes.map((box, i) => (
                <BoxCard
                    key={i}
                    boxId={box.id}
                    box_name={box.name}
                    stationName={box.stationName}
                    address={box.address}
                    status={box.status}
                    delivery={box.deliveries} //this field is optional
                />
            )) :  (<Typography sx={{mt: 3}} variant={'h6'}>No Results</Typography>) }
        </DrawerContainer>
    )
}

export default BoxListPage;