import React, { useState, useEffect } from 'react';

import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography} from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';
import Certificates from './Certificates';
import ExtraCurricular from './ExtraCurricular';

 const initialFValues = {
    certificate :{
         "name" : "",
         "issuedBy" : "",
         "issuedDate" : "",
         "description" : ""
    },
    project:{
        "name" : "",
        "startDate" : "",
        "endDate" : "",
        "url" : "",
        "description" : "",
        "groupCount" : "",
    },
    workexperience:{
        "position" : "",
        "companyName" : "",
        "startDate" : "",
        "endDate" : "",
        "description" : "",
    },
    extracurricular:{
        
    }

}

const ExtraDetails = ({ userData }) => {

//   const [values, setValues] = useState({
//     certificate :{
//         "name" : "",
//         "issuedBy" : "",
//         "issuedDate" : "",
//         "description" : ""
//     },
//     project:{
//         "name" : "",
//         "startDate" : "",
//         "endDate" : "",
//         "url" : "",
//         "description" : "",
//         "groupCount" : ""
//     },
//     workexperience:{
//         "position" : "",
//         "companyName" : "",
//         "startDate" : "",
//         "endDate" : "",
//         "description" : ""
//     },
//     extracurricular:{
//         "name" : "",
//         "date" : "",
//         "description" : ""
//     }
//   });

//   const validate = (fieldValues = values) => {
//     let temp = { ...errors }
//     if (fieldValues === values)
//       return Object.values(temp).every(x => x === "")
//   }

//   const {
//     errors,
//     setErrors,
//   } = useForm(initialFValues, true, validate);

//   const handleChange = (event) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = e => {
//     console.log(values);
//     e.preventDefault()
//     console.log("e", e);

//     if (validate()) {
//         const certificate = {
//             "name" : values.certificate.name,
//             "issuedBy" : values.certificate.issuedBy,
//             "issuedDate" : values.certificate.issuedDate,
//             "description" :values.certificate.description,
//         },
//         const project ={
//             "name" : values.project.name,
//             "startDate" : values.project.startDate,
//             "endDate" : values.project.endDate,
//             "url" : values.project.url,
//             "description" : values.project.description,
//             "groupCount" : values.project.groupCount,
//         },
//         workexperience:{
//             "position" : values.workexperience.position,
//             "companyName" : values.workexperience.companyName,
//             "startDate" : values.workexperience.startDate,
//             "endDate" : values.workexperience.endDate,
//             "description" : values.workexperience.description,
//         },
//         extracurricular:{
//             "name" : values.extracurricular.name,
//             "date" : values.extracurricular.date,
//             "description" : values.extracurricular.description,
//         }
//     }
//       axios.put("http://20.37.50.140:8000/api/user/", pastAcadData, {
//         headers: {
//           "Content-type": "application/json",
//           "X-Requested-With": "XMLHttpRequest",
//           //'Cache-Control': 'no-cache',
//           "Authorization": "Token " + Auth.getToken()
//         }
//       })
//         .then(res => {
//           console.log("res", res);
//         }).catch(error => {
//           console.log(error);
//         });

      
//     }
//   }

//   useEffect(() => {
//     if (userData != null) {
//       setValues({
//         ...values,
//         "tenthPercentage": userData.tenthPercentage,
//         "tenthBoardOfExamination": userData.tenthBoardOfExamination,
//         "tenthYearOfPassing": userData.tenthYearOfPassing,
//         "twelthPercentage": userData.twelthPercentage,
//         "twelfthBoardOfExamination": userData.twelfthBoardOfExamination,
//         "twelfthYearOfPassing": userData.twelfthYearOfPassing,
//         "isDiploma": userData.isDiploma,
//         "diplomaPercentage": userData.diplomaPercentage,
//         "diplomaBoardOfExamination": userData.diplomaBoardOfExamination,
//         "diplomaYearOfPassing": userData.diplomaYearOfPassing,
//         "EnggQualifyingExamYear": userData.EnggQualifyingExamYear,
//         "EnggQualifyingExamScore": userData.EnggQualifyingExamScore,
//         "isDeleted": userData.isDeleted,
//         "isVolunteer": userData.isVolunteer,
//         "isProfileComplete": userData.isProfileComplete,
//       })
//     }
//   }, [userData])

  return (
    <div>
      <Certificates userData={userData}/>
      <ExtraCurricular userData={userData}/>

    </div>
  )
}

export default ExtraDetails;