import React from "react";
import DrawerContainer from "../components/DrawerContainer";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/authentication/authenticationSlice";

const LandingPage = () => {

    const currentUser = useSelector(selectCurrentUser)

    return (
        <DrawerContainer>
            <h1>Welcome! {currentUser && currentUser.email}</h1>
            <h2>You are now logged in as a {currentUser && currentUser.role}</h2>
        </DrawerContainer>
    )
}

export default LandingPage;