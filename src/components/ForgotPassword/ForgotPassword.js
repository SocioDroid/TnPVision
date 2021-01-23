import React from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, Link} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../services/LoginService';

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: theme.spacing(2),
        alignSelf: 'center'
    }
}));

function ForgotPassword(){ 

	const classes = useStyles();
    const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

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
				.catch(error =>{
					console.log(error);
					setSubmitting(false);
				})
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
        </div>
    );
}

export default ForgotPassword;