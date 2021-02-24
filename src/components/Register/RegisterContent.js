import React from 'react';
import { Button, MenuItem } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RegisterService from '../../services/RegisterService';

import CustomSnackbar from '../Snackbar/CustomSnackbar';
import Auth from '../../auth.js'

const roles = [
    {
        value: 'none',
        label: 'None',
    },
    {
        value: 'asst. professor',
        label: 'Asst. Professor',
    },
    {
        value: 'principal',
        label: 'Principal',
    },
];

const college = [
    {
        value: 'none',
        label: 'None',
    },
    {
        value: 'DYPCOE',
        label: 'DYPCOE',
    },
    {
        value: 'DYPIEMR',
        label: 'DYPIEMR',
    },
];


class RegisterContent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: "",
            name: "React",
            showHideGender: false,
            showHideCollege: false,
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                repeatPassword: '',
                gender: '',
                college: 'none',
                type: '',
                mobile: '',
                doj: '',
                department: '',
                designation: 'none'
            },

        };
        this.hideComponent = this.hideComponent.bind(this);
        this.changeError = this.changeError.bind(this); 
        this.navigate = this.props.navigate;
    }
    

    changeError = () => {
        this.setState({ isError: !this.state.isError });
    };
    
    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }
    handleSelect = (event) => {
        let user = this.state.user;
        user.type = event.target.value;
        this.setState({user: user});
        this.hideComponent(event.target.value);
    }
    hideComponent(name) {
        console.log("Hiding : " + name);
        switch (name) {
            case "student":
                this.setState({ showHideGender: true });
                this.setState({ showHideCollege: false });
                break;
            case "faculty":
                this.setState({ showHideGender: false });
                this.setState({ showHideCollege: true });
                break;
            default:
                break;
        }
    }
    handleChange = (event) => {
        console.log("Selected : " + event.target.value);
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }


    handleSubmit = () => {
        Auth.deauthenticateUser();
        const { user } = this.state;



        console.log("Registering" + user.type);
        if (user.type === "student") {
            const data =
            {
                "first_name": user.firstname,
                "last_name": user.lastname,
                "email": user.email,
                "password": user.password,
                "studentProfile": {
                    "gender": user.gender,
                    "mobile": user.mobile,
                    "doj": user.doj,
                    "department": user.department,
                    "designation": user.designation
                }
            }
            console.log(data);

            RegisterService.registerStudent(data)
                .then((result) => {
                    console.log(result);
                    alert("Registration Successfull, Please login!");

                })
                .catch(error => {
                    const data = error.response.data ? JSON.stringify(error.response.data) : "Error!";
                    const statuscode = error.response.status;

                    switch (statuscode) {
                        case 400:
                            console.log(data)
                            this.setState({ errorMessage: data });
                            console.log("400 ERRORRR")
                            break;
                        case 401:
                            this.setState({ errorMessage: "Unauthenticated ! Please login to continue " + data });
                            console.log("401 ERRORRR")
                            this.navigate('/login', { replace: true });
                            break;
                        case 403:
                            console.log('403 error! ' + data);
                            this.setState({ errorMessage: "403 Error. Please try again " + data });
                            break;
                        case 500:
                            console.log("500 ERROR " + data);
                            this.setState({ errorMessage: "Server Error. Please try again " + data });
                            break
                        default:
                            console.log("Navin Error " + data);
                            this.setState({ errorMessage: "New Error, add it to catch block " + data });
                    }
                    this.setState({ isError: true });
                });
        }
        else if (user.type === "faculty") {
            const data =
            {
                "first_name": user.firstname,
                "last_name": user.lastname,
                "email": user.email,
                "password": user.password,
                "employeeProfile": {
                    "college": user.college,
                    'mobile': user.mobile,
                    'doj': user.doj,
                    'department': user.department,
                    'designation': user.designation
                }
            }
            console.log(data);

            RegisterService.registerEmployee(data)
                .then((result) => {
                    console.log(result);
                    alert("Registration Successfull, Please verify your email!");
                })
                .catch(error => {
                    const data = error.response.data ? JSON.stringify(error.response.data) : "Error!";
                    const statuscode = error.response.status;

                    switch (statuscode) {
                        case 400:
                            console.log(data)
                            this.setState({ errorMessage: data });
                            console.log("400 ERRORRR")
                            break;
                        case 401:
                            this.setState({ errorMessage: "Unauthenticated ! Please login to continue " + data });
                            console.log("401 ERRORRR")
                            this.navigate('/login', { replace: true });
                            break;
                        case 403:
                            console.log('403 error! ' + data);
                            this.setState({ errorMessage: "403 Error. Please try again " + data });                        
                            break;
                        case 500:
                            console.log("500 ERROR " + data);
                            this.setState({ errorMessage: "Server Error. Please try again " + data });
                            break
                        default:
                            console.log("Navin Error " + data);
                            this.setState({ errorMessage: "New Error, add it to catch block " + data });
                    }
                    this.setState({ isError: true });
                });
        }

    }

    handleRegister = () => {
        const { user } = this.state;

        const selectedRole = user.role;

        if (selectedRole === 'student') {
            const { history } = this.props;
            history.push('/StudentRegistration')
        }
        else if (selectedRole === 'employee') {
            const { history } = this.props;
            history.push('/FacultyRegistration')
        }
        // else if(selectedRole==='tnpofficer'){
        //     const {history} = this.props;
        //     history.push('/TPORegistration')
        // }
    }


    render() {
        const { user } = this.state;
        return (
            <div>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <FormLabel component="legend">Register As:</FormLabel>
                    <RadioGroup aria-label="type" name="type" >
                        <FormControlLabel value="student" control={<Radio />} label="Student" onClick={this.handleSelect} />
                        <FormControlLabel value="faculty" control={<Radio />} label="Faculty" onClick={this.handleSelect} />
                    </RadioGroup>
                    <TextValidator
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="First Name"
                        onChange={this.handleChange}
                        name="firstname"
                        type="text"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        value={user.firstname}
                    />
                    <br />
                    <TextValidator
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Last Name"
                        onChange={this.handleChange}
                        name="lastname"
                        type="text"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        value={user.lastname}
                    />
                    <br />
                    <TextValidator
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email Address"
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        validators={['isEmail', 'required']}
                        errorMessages={['Invalid Email Address', 'This field is required']}
                        value={user.email}
                    />
                    <br />
                    <TextValidator
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        validators={['required']}
                        errorMessages={['This field is required']}
                        value={user.password}
                    />
                    <br />
                    <TextValidator
                        required
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Repeat password"
                        onChange={this.handleChange}
                        name="repeatPassword"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Password mismatch', 'This field is required']}
                        value={user.repeatPassword}
                    />
                    <br />

                    {this.state.showHideGender &&
                        <div >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" onChange={this.handleChange} >
                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                            </RadioGroup><br /> </div>}

                    {this.state.showHideCollege &&
                        <div>
                            <SelectValidator
                                fullWidth
                                required
                                size="small"
                                variant="outlined"
                                name="college"
                                Label="College"
                                value={user.college}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                                onChange={this.handleChange}
                            >
                                {college.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                            {/* <TextValidator
                                fullWidth
                                variant="outlined"
                                size="small"
                                label="College"
                                onChange={this.handleChange}
                                name="college"
                                type="text"
                                value={user.college}
                            /> */}
                            <br />
                            <TextValidator
                                fullWidth
                                variant="outlined"
                                size="small"
                                label="Mobile"
                                onChange={this.handleChange}
                                name="mobile"
                                type="text"
                                value={user.mobile}
                            />
                            <br />
                            <TextValidator
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={this.handleChange}
                                name="doj"
                                type="date"
                                value={user.doj}
                            />
                            <br />
                            <TextValidator
                                fullWidth
                                variant="outlined"
                                size="small"
                                label="Department"
                                onChange={this.handleChange}
                                name="department"
                                type="text"
                                value={user.department}
                            />
                            <br />
                            <SelectValidator
                                fullWidth
                                required
                                size="small"
                                variant="outlined"
                                name="designation"
                                Label="Designation"
                                value={user.designation}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                                onChange={this.handleChange}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                            <br />
                        </div>
                    }
                    <Button color="primary" variant="contained" type="submit">Register</Button>
                    <br />
                </ValidatorForm>
                <div>
                    {this.state.isError && <CustomSnackbar changeError={this.changeError} severity="error" message={this.state.errorMessage} />}
                </div>
            </div>
        );
    }
}

export default RegisterContent;