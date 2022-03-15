import React from "react";
import RegisterForm from "./RegisterForm.js";
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";

const div = {
	width:"450px",
	height:"370px",
	float:"left",
	backgroundColor: "aliceblue",
	borderLeft:"1px dashed dodgerblue",
	borderRadius: "10px",
	borderWidth:"1px"
};

const RegisterBox = (props) => {
	return(
		<div align="center" style={div}>
			<br/>
			<Typography variant="h4">Register</Typography>
			<br/>
			<RegisterForm
				email={props.email}
				role={props.role}
				onChangeEmail={props.onChangeEmail}
				onChangeRole={props.onChangeRole}
				onRegister={props.onRegister}
				error={props.error}
			/>
			<br />
			<Typography variant="body2">By signing up you agree to our</Typography>
			<Typography variant="body2">Terms & Conditions</Typography>
		</div>
	)
}

RegisterBox.propTypes = {
	email: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	onChangeEmail: PropTypes.func.isRequired,
	onChangeRole: PropTypes.func.isRequired,
	onRegister: PropTypes.func.isRequired,
	error: PropTypes.string,
}

export default RegisterBox;