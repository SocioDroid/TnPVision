import React, { useState} from 'react';
import { Container, Box, Grid, Card, Button, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImportSingleStud from './SingleStudImport'
import StudentService from '../../services/StudentService'
const useStyles = makeStyles((theme) => ({
    box:{
        margin: '10px',
        borderStyle: 'dashed',
    },
    uploadArea:{
        padding: '25px',
        backgroundColor: '#eeeeee',
        textAlign:'center'
    },
    card:{
        marginBottom: '15px'
    },
    scrollCard:{
        marginBottom: '15px',
        height: '80vh',
        padding: '1rem'
    },
    alignButton:{
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            margin: 'auto',
        },
        [theme.breakpoints.up('xs')]: {
            marginBottom: '25px',
        }
    },
    outerBox:{
        borderColor: "grey.500",
        borderRadius: '5px',
        margin: '10px',
    }
}));

const App = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) =>{
        setSelectedFile(event.target.files[0])
    }
    const handleClick = () => {
        const data = new FormData() 
        data.append('file', selectedFile);
        StudentService.uploadStudents(data)
        .then(res=>{
            console.log(res);
        })
        .catch(error =>{
            console.log(error);
            
        })
    }


    return (
        <Container>
            <Grid container direction='row' spacing={2}>
            <Grid item xs={12} sm={3}>
                <Card elevation={2} className={classes.card}>
                    <CardHeader title='Import Multiple Student'/>
                    <Box border= {1} className={classes.outerBox} >
                    <Grid container direction='column' spacing={2}>
                        <Grid item xs={12} sm={12}> 
                            <Box border={1} className={classes.box} >
                                <div className="container text-center mt-5">
                                    <div className={classes.uploadArea} >
                                       <input type="file" name="file" onChange={handleChange} />
                                    </div>
                                </div>
                                
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.alignButton} >
                            <Button type="button" onClick={handleClick} variant='contained' color='primary' className={classes.button}> Upload</Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                <Card elevation={2} className={classes.scrollCard}>
                    <Grid item xs={false} sm={false}>
                    <CardHeader title='Import Single Student'/>
                        <ImportSingleStud  />
                    </Grid>
                </Card>
                </Grid>
            </Grid>
      </Container>
    )  
}

export default App;

