import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const navigate = useNavigate();
const [isError, setIsError] = useState(false)
const [errorMessage, setErrorMessage] = useState("");
const changeError = () => {
setIsError(!isError);
};


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
        
        
<div>
        {isError && <CustomSnackbar changeError={changeError} severity="error" message={errorMessage} />}
</div>