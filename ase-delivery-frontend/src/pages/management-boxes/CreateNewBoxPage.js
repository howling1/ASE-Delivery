import React from "react";
import DrawerContainer from "../../components/DrawerContainer";
import CreateNewBoxCard from "../../components/management-boxes/CreateNewBoxCard";

const CreateNewBoxPage = () => {
    return (
        <DrawerContainer>
            <h1>Create New Box</h1>
            <CreateNewBoxCard/>
        </DrawerContainer>
    )
}

export default CreateNewBoxPage;