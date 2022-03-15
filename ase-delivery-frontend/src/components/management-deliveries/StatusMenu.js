import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function StatusMenu( {status, setStatus }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const clickCreated = () => {
        setStatus("CREATED")
        handleClose();
    };
    const clickInTransit = () => {
        setStatus("INTRANSIT")
        handleClose();
    };
    const clickInBox = () => {
        setStatus("INBOX")
        handleClose();
    };
    const clickFinished = () => {
        setStatus("FINISHED")
        handleClose();
    };
    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {status}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={clickCreated}>Created</MenuItem>
                <MenuItem onClick={clickInTransit}>In transit</MenuItem>
                <MenuItem onClick={clickInBox}>In box</MenuItem>
                <MenuItem onClick={clickFinished}>Finished</MenuItem>
            </Menu>
        </div>
    );
}
