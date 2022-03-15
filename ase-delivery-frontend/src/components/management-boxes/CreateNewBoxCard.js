import React ,{useEffect} from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography, TextField} from "@mui/material";
import {makeStyles} from "@material-ui/styles";
import {useNavigate} from "react-router-dom";
import {createBoxAsync,createdBox, creationError, clearCreatedBox,clearCreationError} from "../../features/box/boxesSlice"
import { useDispatch,useSelector } from "react-redux";



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

const CreateNewBoxCard = (props) => {

    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [boxName, setBoxName] = React.useState("");
    const [boxStation, setBoxStation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [raspberry, setRaspberry] = React.useState("");
    const [error, setError] = React.useState('');
    const createdbox = useSelector(createdBox);
    const cre_error = useSelector(creationError);

    const handleSubmit = () => {
        if (!boxName || !boxStation || !address || !raspberry) {
            setError('Please fill all the form!')
            return
        }
        if(cre_error){
            setError(cre_error);
            return;
        }

        dispatch(createBoxAsync({
			name: boxName,
			stationName: boxStation,
            address:address,
            raspberry:raspberry,
            status: "AVAILABLE",
		}))
      }

      useEffect(() => {
        dispatch(clearCreationError())
    }, [dispatch])


      useEffect(() => {
        setError(cre_error);
    }, [cre_error, dispatch])

    useEffect(() => {
        setError(cre_error);
    }, [cre_error, dispatch])


      useEffect(() => {
        if (createdbox) {
            dispatch(clearCreatedBox())
            navigate('/management/boxes')
        }
    }, [createdbox, dispatch, navigate])


    return (
        <Card className={classes.boxCard}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={"Box"}
                        src={"/images/box.svg"}
                        variant={"rounded"}
                    />
                }
            title = "New Box"

            />
            <CardContent className={classes.boxInfo}>
                <Typography className={classes.label}>
                    Name: 
                    <TextField label="Please enter the name for the box" id="box_name" onChange={e => {setBoxName(e.target.value) 
                        setError('')
                        dispatch(clearCreationError()) }}/>
                </Typography>
                <Typography className={classes.label}>
                    Station:    
                    <TextField label="Please enter the station for the box" id="station_name" onChange={e => {setBoxStation(e.target.value) 
                        setError('')}}/>
                </Typography>
                <Typography className={classes.label}>
                    Address: 
                    <TextField label="Please enter the address for the box" id="address" onChange={e => {setAddress(e.target.value) 
                        setError('')}}/>
                </Typography>
                <Typography className={classes.label}>
                 Raspberry:   
                 <TextField label="Please add the raspberry ID for the box" id="raspberry_id" onChange={e => {setRaspberry(e.target.value) 
                    setError('')}}/>
                </Typography>
                <Typography sx={{ml: 2}} color={'error'}>{error}</Typography>
                </CardContent>
            <CardActions className={classes.buttons}>

                <Button variant={"contained"} color="success" onClick={handleSubmit}>Submit</Button>
                <Button variant={"outlined"} color="secondary" onClick={() => navigate("/management/boxes/")}>Cancel</Button>
            </CardActions>
        </Card>
    )
};

export default CreateNewBoxCard ;