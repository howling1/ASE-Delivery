import React from "react";
import LoginForm from "./LoginForm.js";
import Typography from '@mui/material/Typography';

const div = {
	marginLeft:"120px",
	backgroundColor: "aliceblue",
	width:"450px",
	height:"370px",
	float:"left",
	borderRight:"1px dashed dodgerblue",
	borderRadius: "10px",
	borderWidth:"1px"
};

const LoginBox = (props) => {
	return(
		<div align="center" style={div}>
			<br/>
			<Typography variant="h4">Login</Typography>
			<br/>
			<LoginForm
				loginEmail={props.loginEmail}
				loginPassword={props.loginPassword}
				onChangeEmail={props.onChangeEmail}
				onChangePassword={props.onChangePassword}
				onLogin={props.onLogin}
				error={props.error}
			/>
		</div>
	)
}


export default LoginBox