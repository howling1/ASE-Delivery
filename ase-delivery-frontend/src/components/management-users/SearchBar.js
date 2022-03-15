import React from "react";
import {makeStyles} from "@material-ui/styles";
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    paper: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
    },
    inputBase: {
        flex: 1,
        marginLeft: 10,
    },
    iconButton: {
        padding: 10,
    }
})

const SearchBar = (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper} component={"form"}>
            <InputBase className={classes.inputBase}
                       value={props.input}
                       onChange={props.handleChange}
                       onKeyPress={
                           (e) => {
                               if (e.key === 'Enter') {
                                   e.preventDefault();
                                   props.handleSearch();
                               }
                           }
                       }
                       placeholder={props.placeholder}/>
            <IconButton className={classes.iconButton} onClick={props.handleSearch}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;