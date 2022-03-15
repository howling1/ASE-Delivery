import React, {useEffect} from "react";
import ManagementDrawer from "./ManagementDrawer";
import {Box, Toolbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAsync, selectCurrentUser} from "../features/authentication/authenticationSlice";
import ErrorPage from "../pages/ErrorPage";

const DrawerContainer = (props) => {
    const dispatch = useDispatch()

    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        if (!currentUser) {
            dispatch(getCurrentUserAsync())
        }
    }, [currentUser, dispatch])

    return (
        <>
            {currentUser ?
                <>
                    <ManagementDrawer role={currentUser.role}/>
                    <Box component={"main"} sx={{flexGrow: 1, pl: 3, pr: 3,}}>
                        <Toolbar/>
                        {props.children}
                    </Box>
                </> :
                <ErrorPage/>
            }
        </>
    );
};

export default DrawerContainer;
