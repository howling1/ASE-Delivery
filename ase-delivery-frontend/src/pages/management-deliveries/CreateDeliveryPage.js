import React from "react";
import DrawerContainer from "../../components/DrawerContainer";
import CreateDelivery from "../../components/management-deliveries/CreateDelivery";

const CreateDeliveryPage = () => {
    return (
        <DrawerContainer>
            <h1>Create a new delivery</h1>
            <CreateDelivery/>
        </DrawerContainer>
    )

}

export default CreateDeliveryPage;
