import React, {useEffect} from "react";
import Picture from "../components/homepage/Picture";
import Title from "../components/homepage/Title.js"
import SimpleContainer from "../components/SimpleContainer";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/authentication/authenticationSlice";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        if (currentUser) {
            console.log("Successfully logged in!")
            navigate('/management/boxes')
        }
    }, [currentUser, navigate])

    return (
        <div>
            <SimpleContainer>
                <Title/>
                <Picture/>
            </SimpleContainer>
        </div>
    );

}

export default HomePage;
