import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import DriveService from '../../../services/DriveService';

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

 const initialFValues = {
    id: 0,
    assigned_volunteers: [],
    assigned_coordinators: [],
 }


export default function ProfileDetails(props) {

  const {staffForEdit, studentForEdit ,recordForEdit } = props

   //---------------------------------------------------Volunteers Search--------------------------------------------------------------------------
   const fixedOptions1 = [];
   const [branchvalue1, setBranchvalue1] = useState([...fixedOptions1,
                                                      {
                                                        "id": 0,
                                                        "first_name": "test",
                                                        "last_name": "test"
                                                      },
                                                   
                                                    ]);

   const [options1, setOptions1] = useState([]);
   const [open1, setOpen1] = React.useState(false);
   const loading1 = open1 && options1.length === 0;
   const [volunteers, setVolunteers] = useState([]);
   const [inputValue1, setInputValue1] = useState("");
   const [inputSearch1, setInputSearch1] = useState("");
   const debounceOnChange = React.useCallback(
       debounce(value => {
           setInputSearch1(value);
       }, 400),
       []
   );

   function handleChange1(value) {
       setInputValue1(value);
       debounceOnChange(value);
   }
   const AllVolunteers = []
   function handleResult1() {
       for (let i = 0; i < volunteers.length; i++) {
           const item = volunteers[i].id;
           AllVolunteers[i] = item;
       }
       //console.log("All Volunteers: ",AllVolunteers)
   }
   useEffect(() => {
       let active1 = true;
       (async () => {
           const response = await axios.get(
               "http://20.37.50.140:8000/api/volunteer/search/?q=" + inputValue1
           );

           if (active1) {
              console.log("Response of search value", response.data)
               setOptions1(response.data);
           }
       })();
   }, [inputSearch1]);


  //---------------------------------------------------------Coordinator Search--------------------------------------------------------------------
 
 
  const fixedOptions = [];
  const [branchvalue, setBranchvalue] = useState([...fixedOptions,
                                                      {
                                                        "id": 0,
                                                        "first_name": "test",
                                                        "last_name": "test"
                                                      },
                                                   
                                                    ]);
  
  const [inputValue2, setInputValue2] = useState("");
  const [inputSearch2, setInputSearch2] = useState("");
  const [options2, setOptions2] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const loading2 = open2 && options2.length === 0;
  const [coordinators, setCoordinators] = useState([]);
  const debounceOnChange2 = React.useCallback(
    debounce(value => {
        setInputSearch2(value);
    }, 400),
    []
);

  function handleChange2(value) {
      setInputValue2(value);
      debounceOnChange2(value);
  }
  const AllCoordinators = []
  function handleResult2() {
      for (let i = 0; i < coordinators.length; i++) {
          const item = coordinators[i].id;
          AllCoordinators[i] = item;
      }
      //console.log("All Coordinators: ", AllCoordinators)
  }
  useEffect(() => {
      let active2 = true;
      (async () => {
          const response = await axios.get(
              "http://20.37.50.140:8000/api/employee/search/?q=" + inputValue2
          );
          if (active2) {
              //console.log(response.data);
              setOptions2(response.data);
          }
      })();
  }, [inputSearch2]);

 //----------------------------------------------------------value------------------------------------------------------------------------- 
   const [values, setValues] = useState({
     id: 0,
  });

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors }

  //   setErrors({
  //     ...temp
  //   })

  //   if (fieldValues === values)
  //     return Object.values(temp).every(x => x === "")
  // }
  // const {
  //   errors,
  //   setErrors,
  //   resetForm
  // } = useForm(initialFValues, true, validate);

  // const handleChange = (event) => {
   
  //   console.log("event value: ",event.target.value)
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  
  // };

   const handleSubmit = e => {
    e.preventDefault()
      console.log("coordinators service", staffForEdit)
      console.log("volunteers service",studentForEdit)
     
      console.log("volunteer finally selected", volunteers)
      console.log("coordinator finally selected", coordinators)

  //   if (validate()) {
      const data1 = {
        "assigned_coordinators": coordinators.length !== 0 ? coordinators: staffForEdit,
      }

      const data2 = {
        "assigned_volunteers": volunteers.length !== 0 ? volunteers: studentForEdit,
      }
      // axios.patch("http://20.37.50.140:8000/api/drive/" + values.id+"/", data)
      //   .then(res =>{
      //     console.log("res", res);
      //     alert("Drive Updated Sucessfully");
      //     setTimeout(window.location.reload(false), 5000);
      //   }).catch(error => {
      //     console.log(error);
      //     alert("Operation Failed");
      //     setTimeout(window.location.reload(false), 5000);
      //   });

        console.log("updated coordinators",data1)
        console.log("updated volunteers",data2)
  //   }
   }
  useEffect(() => {

    if (recordForEdit != null && studentForEdit != null && staffForEdit !=null) {
  
      console.log("drive id to be edited", recordForEdit.id);
      console.log("staff to be edited", staffForEdit);
      console.log("student to be edited", studentForEdit);
      

      setBranchvalue(staffForEdit)  
      
      setBranchvalue1(studentForEdit)
     
      setValues({
        ...values,
        "id": recordForEdit.id,
      });
    }
    else{
      console.log("either staffforedit or studentforedit is null")
    }
  }, [recordForEdit, staffForEdit, studentForEdit])
  

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
     <form
       onSubmit={handleSubmit}
       autoComplete="off"
       noValidate
     >
       <Card>
         <CardHeader
          //subheader="The information can be edited"
          title="Drive Volunteers and Co-ordinators Details"
        />
       <Divider />
       <CardContent>
          <Typography variant="h6">Drive ID: {values.id}</Typography><br/><br/>
           <Grid
             container
             spacing={3}
           >                                       
            <Grid
              item
              md={6}
              xs={12}
            >
                 <Autocomplete
                    fullWidth
                    multiple
                    filterSelectedOptions
                    options={options2}          
                    value={branchvalue}
                    onChange={(event, newValue) => {
                        setBranchvalue([
                          ...fixedOptions,
                          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                        ]); 
                        setCoordinators(newValue); 
                        console.log("selected value",newValue);
                    }}
                    //onChange={(event, newValue) => { console.log(newValue) }}
                    getOptionLabel={option => option.first_name + " " + option.last_name}
                    open={open2}
                    onOpen={() => {
                        setOpen2(true);
                    }}
                    onClose={() => {
                        setOpen2(false);
                        handleChange2('');
                    }}
                    autoComplete
                    loading={loading2}
                    inputValue={inputValue2}
                    includeInputInList
                    //disableOpenOnFocus
                    onInputChange={(event, newInputValue) => {
                        setInputValue2(newInputValue);
                    }}
                    //onSelect={handleResult2}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Search Coordinator"
                            variant="outlined"
                            onChange={event => handleChange2(event.target.value)}
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                    renderOption={option => {
                        return <div>{option.first_name + " " + option.last_name}</div>;        
                    }} 
                /> 
            </Grid> 



            <Grid item md={6} xs={12}>
               <Autocomplete
                  fullWidth
                  multiple
                  filterSelectedOptions                
                  value={branchvalue1}
                  onChange={(event, newValue) => {                   
                    setBranchvalue1([
                      ...fixedOptions1,
                      ...newValue.filter((option) => fixedOptions1.indexOf(option) === -1),
                    ]);
                    setVolunteers(newValue); 
                    console.log("selected value",studentForEdit);
                  }}
                 
                  options={options1}            
                  getOptionLabel={option => option.first_name + " " + option.last_name}
                  open={open1}
                  onOpen={() => {
                      setOpen1(true);
                  }}
                  onClose={() => {
                      setOpen1(false);
                      handleChange1('');
                  }}
                  autoComplete
                  loading={loading1}
                  inputValue={inputValue1}
                  includeInputInList
                  //disableOpenOnFocus                
                  //onSelect={handleResult1}
                  renderInput={params => (
                      <TextField
                          {...params}
                          label="Search Volunteer"
                          variant="outlined"
                          onChange={event => handleChange1(event.target.value)}
                          fullWidth
                      />
                  )}
                  renderOption={option => {
                      return <div>{option.first_name + " " + option.last_name}</div>;
                  }} 
              />
            </Grid>
           </Grid>
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
            type="submit"
          >
            Save details
          </Button>
        </Box>
       </Card>
     </form>
    

    </div>
  );
};

// ProfileDetails.propTypes = {
//   className: PropTypes.string
// };
