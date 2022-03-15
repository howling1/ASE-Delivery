import React from "react";
import {Container, Toolbar} from "@mui/material";

const SimpleContainer = (props) => {
    return (
        <Container maxWidth={"lg"}>
            <Toolbar />
            {props.children}
        </Container>
    );
};

export default SimpleContainer;