import React, {useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import SearchBar from "../../components/management-users/SearchBar";
import DrawerContainer from "../../components/DrawerContainer";
import UserCard from "../../components/management-users/UserCard";
import {selectAllUsers, loadUsersAsync, searchUsersByIdOrEmailAsync} from "../../features/user/usersSlice";
import {useDispatch, useSelector} from "react-redux";


const UserListPage = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const [searchInput, setSearchInput] = React.useState('');

    useEffect(() => {
        dispatch(loadUsersAsync())
    }, [dispatch])

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        if (searchInput) {
            dispatch(searchUsersByIdOrEmailAsync(searchInput))
        } else {
            dispatch(loadUsersAsync())
        }
    }

    return (
        <DrawerContainer>
            <h1>Manage the Users</h1>
            <Grid item xs={4} sx={{ml: 'auto'}}>
                <SearchBar
                    placeholder={"Search by ID or Email..."}
                    input={searchInput}
                    handleChange={handleChangeInput}
                    handleSearch={handleSearch}
                />
            </Grid>
            {users && users.length > 0 ?
                users.map((user, i) =>
                    (
                        <UserCard
                            key={i}
                            role={user.role}
                            id={user.id}
                            email={user.email}
                            status={user.status}
                        />
                    )) : (<Typography sx={{mt: 3}} variant={'h6'}>No Results</Typography>)
            }
        </DrawerContainer>
    )
}

export default UserListPage;