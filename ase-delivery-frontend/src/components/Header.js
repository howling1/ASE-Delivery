import React from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAsync, logoutAsync, selectCurrentUser} from "../features/authentication/authenticationSlice";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser = useSelector(selectCurrentUser)

    React.useEffect(() => {
        dispatch(getCurrentUserAsync())
    }, [dispatch])

    const onLogout = () => {
        dispatch(logoutAsync())
        navigate('/')
    }

    return (
        <AppBar position={"fixed"} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                <Avatar
                    alt={"ASE Logo"}
                    src={"/images/parcel.svg"}
                    variant={"rounded"}
                    sx={{mr: 2}}
                />
                <Typography variant={"h5"}>ASE Delivery</Typography>
                {currentUser ?
                    (
                        <Button color={"inherit"} sx={{ml: "auto"}} onClick={onLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button color={"inherit"} sx={{ml: "auto"}}
                                    onClick={() => navigate('/login')}>Login</Button>
                            <Button color={"inherit"} onClick={() => navigate('/login')}>Register</Button>
                        </>
                    )
                }
            </Toolbar>
        </AppBar>
    )
};

export default Header;
