import React, { useState} from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, Link} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: theme.spacing(2),
        alignSelf: 'center'
    }
}));

function ForgotPassword(){ 
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("");
	const changeError = () => {
	setIsError(!isError);
	};
	const classes = useStyles();
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

	const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true);
	};
	const handleForgotPasswordClose = () => {
		setForgotPasswordOpen(false);
	};


	const formik = useFormik({
		initialValues:{
			email:''
		},
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(true);
			LoginService.forgotPassword({email:values.email})
				.then(result=> {
					console.log(result);
					console.log("Forgot password")
				})
				.catch(error => {
					const data = error.response.data?JSON.stringify(error.response.data):"Error!";
					const statuscode = error.response.status;
		  
					switch (statuscode) {
					  case 400:
						console.log(data)
						setErrorMessage(data);
						console.log("400 ERRORRR")
						break;
					  case 401:
						setErrorMessage("Unauthenticated ! Please login to continue "+data);
						console.log("401 ERRORRR")
						navigate('/login', { replace: true });
						break;  
					  case 403:
						console.log('403 error! '+data);
						setErrorMessage("403 Error. Please try again "+data);
						break;
					  case 500:
						console.log("500 ERROR "+data);
						setErrorMessage("Server Error. Please try again "+data);
						break
					  default:
						console.log("Navin Error "+data);
						setErrorMessage("New Error, add it to catch block "+data);              
					}
					setIsError(true);
				  });
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid Email').required('Required'),
		})
	});


    return(
        <div >
			<React.Fragment>
            <Link onClick={handleForgotPasswordOpen}>
	        	Forgot Password
	        </Link>
            <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose} maxWidth='xl' >
                <DialogTitle>Forgot Password</DialogTitle>
					<form onSubmit={formik.handleSubmit}>
						<Box border= {1} borderColor= "grey.500" margin= '10px' borderRadius= '5px'>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									id="email"
									name="email"
									label="Email Address"
									type="email"
									variant="outlined"
									fullWidth
									required
									onChange={formik.handleChange}
									onBlur= {formik.handleBlur}
									error={formik.errors.email && formik.touched.email}
									helperText= {(formik.errors.email && formik.touched.email) && formik.errors.email}
									value={formik.values.email}
								/>
								</DialogContent>
						</Box>
						<DialogActions className={classes.textField}>
							<Button onClick={handleForgotPasswordClose} color="primary" variant='outlined'>
								Back
							</Button>
							<Button type="submit" onClick={handleForgotPasswordClose} color="primary" variant='outlined'>
								Send Mail
							</Button>
						</DialogActions>
					</form>
	        	</Dialog>
			</React.Fragment>
			<div>
					{isError && <CustomSnackbar changeError={changeError} severity="error" message={errorMessage} />}
			</div>
        </div>
    );
}

export default ForgotPassword;