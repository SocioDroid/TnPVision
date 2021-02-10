import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
function GenerateErrorMessage(error){

    const data = error.response.data;
    const statuscode = error.response.status;

    // const navigate = useNavigate();
    // const redirectToLogin = () => {
    //     navigate('/login', { replace: true });
    // }


    // const errorMessage = () =>{
        switch (statuscode) {
            case 400:
                console.log("unauthentic!");
                navigate('/login', { replace: true });
                return "Please Login"
            //   break;
            case 401:
            case 403:
                console.log('Here')
                // redirectToLogin()
                break;
            default:
            // code block
        }
        console.log(error.response.status);
    // }
}
export default GenerateErrorMessage