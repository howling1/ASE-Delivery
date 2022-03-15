import React from "react";
import {makeStyles} from "@material-ui/styles";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    select: {
        "& .MuiInputBase-input": {
            padding: "16px 20px 10px 12px",
        },
    }
});

const Filter = (props) => {

    const classes = useStyles();

    const [value, setValue] = React.useState("");

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <FormControl sx={{mr: 1, minWidth: 120}}>
            <InputLabel id="label-id">{props.name}</InputLabel>
            <Select
                className={classes.select}
                variant={"outlined"}
                labelId="label-id"
                label={props.name}
                value={value}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.options.map((option, i) => (
                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    )
}

Filter.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default Filter;