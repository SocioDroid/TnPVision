import React from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button, Link} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: theme.spacing(2),
        alignSelf: 'center'
    }
}));

function Login(){ 

    const classes = useStyles();

    //const [loginOpen, setLoginOpen] = React.useState(false);
    // const [registerOpen, setRegisterOpen] = React.useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

	const handleForgotPasswordOpen = () => {
        setForgotPasswordOpen(true);
	};
	const handleForgotPasswordClose = () => {
		setForgotPasswordOpen(false);
	};

	const formik = useFormik({
		initialValues:{
			email:'', 
			password: ''
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
					<form>
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
							<Button onClick={handleForgotPasswordClose} color="primary" variant='outlined'>
								Send Mail
							</Button>
						</DialogActions>
					</form>
	        	</Dialog>
			</React.Fragment>
        </div>
    );
}

export default Login;