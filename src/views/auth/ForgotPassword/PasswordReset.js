import React, { useState } from 'react';
import clsx from 'clsx';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    makeStyles
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../../services/LoginService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(2),
        alignSelf: 'center'
    }
}));

const PasswordReset = ({ route, className, ...rest }) => {
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const changeError = () => {
    setIsError(!isError);
    };
    const classes = useStyles();
    const [value, setValue] = useState({
        confirm: ''
    });

    const [isSubmitting, setSubmitionCompleted] = React.useState(false);

    const handleChange = (event) => {
        setValue({
            confirm: event.target.value
        });
    };

    const formik = useFormik({
        initialValues: {
            new_password: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("Change Password");
            console.log("New Password", values.new_password);
            console.log("New Password", value.confirm);
            if (value.confirm === values.new_password) {
                // await
                LoginService.updateForgotPassword({ token: token, password: values.new_password })
                    .then(result => {
                        console.log("Password Changes successfully");
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
            }
            else {
                console.log("Password not matching")
                setSubmitionCompleted(false);
                setSubmitting(false);
            }

        },
        validationSchema: Yup.object({
            // email: Yup.string().email('Invalid Email').required('Required'),
            // password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
            // password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
        })
    });
    (async () => {
        await
            LoginService.validateForgotPasswordToken({ token: token })
                .then(res => {
                    console.log("Token validated")
                    setIsLoading(false);
                    setIsTokenValid(true)
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
                    setIsLoading(false);
                    setIsTokenValid(false)
                  });

    })();

    if (isLoading) {
        return (
            <div>
                Loading

            </div>
        )
    }
    if (isTokenValid)
        return (
            <div>
            <form onSubmit={formik.handleSubmit} className={clsx(classes.root, className)} {...rest}>
                <Card>
                    <CardHeader
                        subheader="Update password"
                        title="Password"
                    />
                    <Divider />
                    <CardContent>
                        <TextField
                            fullWidth
                            label="New Password"
                            margin="normal"
                            name="new_password"
                            id="new_password"
                            onChange={formik.handleChange}
                            type="password"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Confirm password"
                            margin="normal"
                            name="confirm"
                            onChange={handleChange}
                            type="password"
                            value={value.confirm}
                            variant="outlined"
                        />
                    </CardContent>
                    <Divider />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            // onClick = {changePassword}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Update
                </Button>
                    </Box>
                </Card>
            </form>
            <div>
                    {isError && <CustomSnackbar changeError={changeError} severity="error" message={errorMessage} />}
            </div>
            </div>
        );
    else {
        return (
            <div>
                Token is invalid
                <div>
                        {isError && <CustomSnackbar changeError={changeError} severity="error" message={errorMessage} />}
                </div>
            </div>
        )
    }
}

export default PasswordReset;

