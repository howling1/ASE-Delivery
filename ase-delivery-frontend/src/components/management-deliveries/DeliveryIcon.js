import React from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PropTypes from "prop-types";
import {Typography} from "@mui/material";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});

const DeliveryIcon = (props) => {
    const classes = useStyles();

    return (
        <div>
            {
                {
                    'CREATED':
                        <div className={classes.icon}>
                            <LocalShippingIcon style={{color: 'green', fontSize: 80}}/>
                            <Typography>
                                Created
                            </Typography>
                        </div>,
                    'INTRANSIT':
                        <div className={classes.icon}>
                            <LocalShippingIcon style={{color: '#ffea00', fontSize: 80}}/>
                            <Typography>
                                In Transit
                            </Typography>
                        </div>,
                    'INBOX':
                        <div className={classes.icon}>
                            <LocalShippingIcon style={{color: '#ff8400', fontSize: 80}}/>
                            <Typography>
                                In Box
                            </Typography>
                        </div>,
                    'FINISHED':
                        <div className={classes.icon}>
                            <LocalShippingIcon style={{color: '#8c8c8c', fontSize: 80}}/>
                            <Typography>
                                Finished
                            </Typography>
                        </div>,

                }[props.status] ||
                <div className={classes.icon}>
                    <LocalShippingIcon style={{fontSize: 80}}/>
                </div>
            }
        </div>
    )
}

DeliveryIcon.propTypes = {
    status: PropTypes.string,
}

export default DeliveryIcon;
