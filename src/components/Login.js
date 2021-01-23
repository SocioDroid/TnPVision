import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, DialogContentText, Button, Grid, ButtonBase } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Snackbar from '@material-ui/core/Snackbar';
//import MuiAlert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';
import loginpage from '../static/images/loginpage.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import DataServices from '../../services/Services'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import CustomSnackbar from './Snackbar/snackbar';
// function Alert(props) {
// 	return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	textField: {
		margin: theme.spacing(2),
		justifyContent: 'flex-start',
		marginTop: theme.spacing(-2)

	},
	button: {
		marginLeft: '15px',
		height: 'auto',
		marginTop: '6px',
		marginBottom: 'auto',
	},
	dialogEffect: {
		maxWidth: 'xl',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			variant: 'text'
		}
	}
}));

function Login(props) {
	const classes = useStyles();
	const [isLogin, setIsLogin] = useState(false)

	//===================================== Dialog Box =====================================
	const [loginOpen, setLoginOpen] = React.useState(false);
	const [isSubmitionCompleted, setSubmitionCompleted] = React.useState(false);

	const handleLoginOpen = () => {
		setSubmitionCompleted(false);
		setLoginOpen(true);
	};
	const handleLoginClose = () => {
		setLoginOpen(false);
	};

	//===================================== SnackBar =====================================
	const [open, setOpen] = React.useState(false);


	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleClick = () => {
		setOpen(true);
	};

	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (values, { setSubmitting }) => {
			
			setSubmitting(true);
			LoginService.login({ username: values.email, password: values.password })
				.then(result => {
					console.log(result.data.data);
					if (result.status === 200 && result.data.data.token !== "") {
						localStorage.setItem("token", result.data.data.token);
						setIsLogin(true)
						if (result.data.data.group === 1)
							navigate('/student/dashboard', { replace: true });
						else if (result.data.data.group === 2 || result.data.data.group === 3 || result.data.data.group === 4)
							navigate('/employee/dashboard', { replace: true });
					}
					setSubmitionCompleted(true);
				})
				.catch(error => {
					console.log(error);
					setIsLogin(false)
					alert("Wrong Username or Password");
					setSubmitting(false)

				})
	
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid Email').required('Required'),
			password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
		})
	});

	return (
		<div>
			<React.Fragment>
				<Button className={classes.button} variant='outlined' style={{ color: "white" }} onClick={handleLoginOpen}>Login</Button>
				<Dialog open={loginOpen} onClose={handleLoginClose} className={classes.dialogEffect} fullWidth component={'span'}>

					{!isSubmitionCompleted && <React.Fragment>
						<DialogTitle>
							<Grid container>
								<Grid item xs={false} sm={11}>
									Login
						</Grid>
								<Grid item xs={false} sm={1} style={{ textAlign: 'end' }}>
									<CancelIcon onClick={handleLoginClose} variant='contained' color="primary" />
								</Grid>
							</Grid>
						</DialogTitle>
						<Grid container justify='center' style={{ marginBottom: '10px' }}>
							<Grid item xs={false} sm={6}>
								<ButtonBase className={classes.image} >
									<img className={classes.img} alt="complex" src={loginpage} />
								</ButtonBase>
							</Grid>
							<Grid item xs={false} sm>
								<form onSubmit={formik.handleSubmit}>
									<Box border={1} borderColor="grey.500" margin='10px' borderRadius='5px'>
										<DialogContent>
											<TextField
												autoFocus
												margin="dense"
												id="email"
												name="email"
												label="Email Address"
												type="text"
												variant="outlined"
												fullWidth
												required
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.errors.email && formik.touched.email}
												helperText={(formik.errors.email && formik.touched.email) && formik.errors.email}
												value={formik.values.email}
											/>
											<TextField
												margin="dense"
												id="password"
												name="password"
												label="Password"
												type="password"
												variant="outlined"
												fullWidth
												required
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.errors.password && formik.touched.password}
												helperText={(formik.errors.password && formik.touched.password) && formik.errors.password}
												value={formik.values.password}
											/>
											<DialogContentText style={{ marginTop: '8px' }} component={'div'}>
												<ForgotPassword  />
											</DialogContentText>
										</DialogContent>
										<DialogActions className={classes.textField}>
											<Button onClick={handleClick} type="submit" color="primary" variant='contained' disabled={formik.isSubmitting}>
												Login
										</Button>
										</DialogActions>
									</Box>
								</form>
							</Grid>
						</Grid>
					</React.Fragment>
					}
				</Dialog>
			</React.Fragment>
			<div className={classes.root}>
				{isLogin &&
				<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
					<CustomSnackbar onClose={handleClose} severity="success" message="You are Logged In" />
				</Snackbar>}
			</div>
		</div>

	);
}

export default Login;