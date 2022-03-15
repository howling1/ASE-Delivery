import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Box, CssBaseline} from "@mui/material";
import Header from "./components/Header";
import routes from "./routes";

function App() {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <React.Fragment>
                <Header/>
                <Routes>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Routes>
            </React.Fragment>
        </Box>
    );
}

export default App;
