import React, {useEffect} from "react";
import DrawerContainer from "../../components/DrawerContainer";
import {Grid, Typography} from "@mui/material";
import SearchBar from "../../components/management-users/SearchBar";
import RequestCard from "../../components/management-users/RequestCard";
import {
    loadRequestsAsync,
    searchRequestsByEmailAsync,
    selectAllRequests
} from "../../features/request/requestsSlice";
import {useDispatch, useSelector} from "react-redux";
import {deleteRequest} from "../../features/request/requestsAPI";


const NewRequestsPage = () => {

    const dispatch = useDispatch()
    const requests = useSelector(selectAllRequests)

    const [searchInput, setSearchInput] = React.useState('');

    useEffect(() => {
        dispatch(loadRequestsAsync())
    }, [dispatch])

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        if (searchInput) {
            dispatch(searchRequestsByEmailAsync(searchInput))
        } else {
            dispatch(loadRequestsAsync())
        }
    }

    return (
        <DrawerContainer>
            <h1>Manage the New Requests</h1>
            <Grid item xs={4} sx={{ml: 'auto'}}>
                <SearchBar
                    placeholder={"Search by Email..."}
                    input={searchInput}
                    handleChange={handleChangeInput}
                    handleSearch={handleSearch}
                />
            </Grid>
            {requests && requests.length > 0 ? requests.map((request, i) => (
                <RequestCard
                    key={i}
                    id={request.id}
                    role={request.role}
                    userEmail={request.email}
                    onReject={() => {
                        deleteRequest(request.id)
                            .then(res => {
                                //refresh current page
                                window.location.reload()
                            })
                    }}
                />
            )) : (<Typography sx={{mt: 3}} variant={'h6'}>No Results</Typography>)}
        </DrawerContainer>
    )
};

export default NewRequestsPage;