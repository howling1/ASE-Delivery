import React, {useEffect} from "react";
import {Avatar, Card, CardContent, CardHeader, Typography, Chip, Box, TextField, Button} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import { updateBoxAsync, deleteBoxAsync, creationError, clearCreationError, clearCreatedBox, createdBox} from "../../features/box/boxesSlice";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

const useStyles = makeStyles({
    boxCard: {
        display: "flex",
        flexDirection: "column",
        margin: "1rem 0 1rem 0",
        padding: "1rem",
    },
    boxInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    label: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",

    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "auto",
    }
 
});

const BoxDetailCard = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {id} = useParams()
    const navigate = useNavigate()
    const [editMode, setEditMode] = React.useState(false);
    const [error, setError] = React.useState('');

    const [name, setName] = React.useState(props.boxName ? props.boxName: '');
    const [station, setStation] = React.useState(props.stationName ? props.stationName: '');
    const [address, setAddress] = React.useState(props.address ? props.address : '');
    const [raspberry, setRaspberry] = React.useState(props.raspberry ? props.raspberry : '');

    const cre_error = useSelector(creationError);
    const creBox = useSelector(createdBox);


    useEffect(() => {
        setError(cre_error);
    }, [cre_error, dispatch])


    useEffect(() => {
        if (creBox) {
            dispatch(clearCreatedBox())
            setEditMode(false)
        }
    }, [creBox, dispatch])

    useEffect(() => {
        dispatch(clearCreationError())
    }, [dispatch])

    const onClickSave = () => {
        if (!name || !station || !address || !raspberry) {
            setError('Please fill out all the information!')
            return
        }
        if(cre_error){
            setError(cre_error)
            return
        }
        const updatedBox = {
            id: props.boxId,
            name: name,
			stationName: station,
            status: props.status,
            address:address,
            raspberry:raspberry,
        }
        dispatch(updateBoxAsync(updatedBox))   
    }

    const onDeleteBox = () => {
        if (id) {
            dispatch(deleteBoxAsync(props.boxId))
            navigate('/management/boxes')
        }
    }


    return (
        <Card className={classes.boxCard}>
            <CardHeader
                avatar={<Avatar
                    alt={"Box"}
                    src={"/images/box.svg"}
                    variant={"rounded"} />}
                title='detail information' />
            <CardContent className={classes.boxInfo}>
                <Typography className={classes.label}>
                    ID: {props.boxId}
                </Typography>
                <Typography>
                    Status: &nbsp;
                    <Chip label={props.status} color={props.status === "AVAILABLE"? "success" : "error"} />
                </Typography>
                {editMode ?
                    (
                        <>                       
                        <TextField
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError('')
                                dispatch(clearCreationError())
                            }}
                            sx={{m: 2}}
                            label={'Name'}
                            focused
                        />
                        <TextField
                            value={station}
                            onChange={(e) => {
                                setStation(e.target.value)
                                setError('')
                            }}
                            sx={{m: 2}}
                            label={'StationName'}
                            focused
                        />
                        <TextField
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                                setError('')
                            }}
                            sx={{m: 2}}
                            label={'Address'}
                            focused
                        />
                         <TextField
                            value={raspberry}
                            onChange={(e) => {
                                setRaspberry(e.target.value)
                                setError('')
                            }}
                            sx={{m: 2}}
                            label={'Raspberry'}
                            focused
                        />
                        <Typography sx={{ml: 2}} color={'error'}>{error}</Typography>
                        <Box sx={{ml: 'auto'}}>
                            <Button sx={{color: "gray"}} onClick={() => {
                                setEditMode(false)
                                setError('')
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={onClickSave} >Save</Button>
                        </Box>
                    </>
                ) :
                        
                  (<>
                    <Typography className={classes.label}>
                    
                    Name: {props.boxName}

                </Typography>
        
                <Typography className={classes.label}>
                    Station: {props.stationName}

                </Typography>
                <Typography className={classes.label}>
                    Address: {props.address}

                </Typography>
                <Typography className={classes.label}>
                    Raspberry: {props.raspberry}

                </Typography>
                {props.userRole === "DISPATCHER"? 
                   <Box sx={{ml: 'auto'}}>
                   <Button onClick={() => setEditMode(true)}>Edit</Button>
                   <Button disabled = {props.status !== "AVAILABLE"} onClick ={onDeleteBox}>Delete</Button>
               </Box>  : null}  
               </>
                  )     
                    }
               
                
            </CardContent>

        </Card>
    )
};

BoxDetailCard.propTypes = {

}

export default BoxDetailCard ;