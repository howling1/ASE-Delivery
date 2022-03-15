import React from "react";
import {Drawer, Toolbar, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider} from "@mui/material";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const drawerWidth = 300;

//modify the expanded items here if needed
const boxList = {
    DISPATCHER: [
    {
        name: "List All",
        to: "/management/boxes/",
    },
    {
        name: "Create New",
        to: "/management/boxes/create",
    }],
    CUSTOMER: [
        {
            name: "My Boxes",
            to: "/management/boxes/",
        },
    ],
    DELIVERER: [
        {
            name: "List All",
            to: "/management/boxes/",
        },
    ]
};
const userList = {
    DISPATCHER: [
        {
        name: "User List",
        to: "/management/users",
    },
    {
        name: "New Requests",
        to: "/management/users/requests",
    },
],
CUSTOMER: [],
DELIVERER: [],
};

//TODO: update to view history and also track deliveries
const deliveryList = {
    DISPATCHER: [     
    {
        name: "List All",
        to: "/management/deliveries/all"
    },
    {
        name: "Create New",
        to: "/management/deliveries/create"
    },
    {
        name: "Active Deliveries",
        to: "/management/deliveries/active"
    },{
        name: "Past Deliveries",
        to: "/management/deliveries/past"
    }
],
CUSTOMER: [ {
    name: "List All",
    to: "/management/deliveries/all"
},
{
    name: "Active Deliveries",
    to: "/management/deliveries/active"
},{
    name: "Past Deliveries",
    to: "/management/deliveries/past"
}],
DELIVERER: [ {
    name: "List All",
    to: "/management/deliveries/all"
}],
}

const ManagementDrawer = (props) => {

    const navigate = useNavigate();

    const [openBox, setOpenBox] = React.useState(true);
    const [openUser, setOpenUser] = React.useState(true);
    const [openDelivery, setOpenDelivery] = React.useState(true);
    

    const roleList = (role, list) => {
        switch (role) {
            case "DISPATCHER":
                return list.DISPATCHER;
            case "CUSTOMER":
                return list.CUSTOMER;
            case "DELIVERER":
                return list.DELIVERER;
            default:
                return [];
        }
    }

    const handleClickBox = () => {
        setOpenBox(!openBox);
    };

    const handleClickUser = () => {
        setOpenUser(!openUser);
    };

    const handleClickDelivery = () => {
        setOpenDelivery(!openDelivery);
    }

    return (
        <Drawer
            variant={"permanent"}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: "auto"}}>
                <List>
                    <ListItemButton onClick={handleClickBox}>
                        <ListItemIcon>
                            <AllInboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Boxes"}/>
                        {openBox ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                 
                    <Collapse in={openBox} timeout={"auto"} unmountOnExit>
                        <List component={"div"} disablePadding>
                            {roleList(props.role, boxList).map((item, i) => (
                                <ListItemButton key={i} sx={{pl: 4}} onClick={() => navigate(item.to)}>
                                    <ListItemIcon>
                                        <HorizontalRuleIcon sx={{fontSize: 16}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                    <Divider/>
                    {props.role === "DISPATCHER" ?
                    <><ListItemButton onClick={handleClickUser}>
                        <ListItemIcon>
                            <PeopleAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Users"}/>
                        {openUser ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={openUser} timeout={"auto"} unmountOnExit>
                        <List component={"div"} disablePadding>
                            {roleList(props.role,userList).map((item, i) => (
                                <ListItemButton key={i} sx={{pl: 4}} onClick={() => navigate(item.to)}>
                                    <ListItemIcon>
                                        <HorizontalRuleIcon sx={{fontSize: 16}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            ))}
                        </List> 
                    </Collapse> </>: null}
                    <Divider/>
                    <ListItemButton onClick={handleClickDelivery}>
                        <ListItemIcon>
                            <DeliveryDiningIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Deliveries"}/>
                        {openDelivery ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={openDelivery} timeout={"auto"} unmountOnExit>
                        <List component={"div"} disablePadding>
                            {roleList(props.role,deliveryList).map((item, i) => (
                                <ListItemButton key={i} sx={{pl: 4}} onClick={() => navigate(item.to)}>
                                    <ListItemIcon>
                                        <HorizontalRuleIcon sx={{fontSize: 16}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Box>
        </Drawer>
    )
}

export default ManagementDrawer;