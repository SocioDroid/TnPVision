import React from 'react'
import {Card, CardContent, Button, Box, Grid, Typography, MenuItem, Slider } from '@material-ui/core'
import { Formik, Form, Field, FieldArray } from "formik";
import {TextField} from 'formik-material-ui'

// export default function AfterDriveUpload() 
// {
    
//     return(
//         <div>
//             <Grid item container>
//             <Grid item xs={false} sm={1}/>
//             <Grid item xs={12} sm={10}>
//             <Card>   
//             <CardContent>
//                 <Typography variant= "h2" color="primary" >Drive</Typography>
//                 <Formik
//                     initialValues={{
//                         rounds:[{ type: '', date:''}]
//                     }}

//                     onSubmit={async (values) => {
//                         console.log(values);
//                         await new Promise((r) => setTimeout(r, 500));
//                         alert(JSON.stringify(values, null, 2));
//                     }}
//                 >  


//                     {({values, errors}) => (
                        
//                         <Form>
//                         <Grid container spacing={3}>
//                             <Grid item xs={6}>
//                                 <Box margin={1} paddingBottom={2}>
//                                     <FieldArray name="rounds">

//                                         {({push, remove,})=>(

                                            

//                                             <React.Fragment>

//                                                 {values.rounds.map((_,index) => (
//                                                     <Grid container item spacing={3}>
//                                                         <Grid item>
//                                                             <Field 
//                                                                 name={`rounds[${index}].type`}
//                                                                 component={TextField}
//                                                                 label="Round Type"
//                                                                 variant="outlined"
//                                                             />
//                                                         </Grid>
//                                                         <Grid item>
//                                                             <Field 
//                                                                 name={`rounds[${index}].date`}
//                                                                 component={TextField}
//                                                                 label="Round Date"
//                                                                 variant="outlined"
//                                                             />
//                                                         </Grid>
//                                                         <Grid item>
//                                                             <Button variant="contained" color="primary" onClick={() => remove(index)}>-</Button>
//                                                         </Grid>
//                                                         <Grid item>
//                                                             <Button variant="contained" color="primary" onClick={() => push({type:'', date:''})}>+</Button>
//                                                         </Grid>
//                                                     </Grid>
                                                    
                                                    
//                                                 ))}
                                                
//                                             </React.Fragment>
//                                         )}
//                                     </FieldArray>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                         <Button variant="contained" color="primary" type="submit">
//                             Submit
//                     </Button>
//                     <br/><br/>
                    
//                     </Form> 
                        
//                     )}
//                 </Formik>
//             </CardContent>
//             </Card>
//             <Grid item xs={false} sm={1}/>
//             </Grid>
//             </Grid>
//         </div>
//     )
// }

const AfterDriveUpload = () => (
    <div>
        <Grid item container>
             <Grid item xs={false} sm={1}/>
             <Grid item xs={12} sm={10}>
             <Card>   
             <CardContent>
                 <Typography variant= "h2" color="primary" >Drive</Typography>
                 <Formik
        initialValues={{ rounds: [{ type: '', date:''}] }}
        onSubmit={values =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
        render={({ values }) => (
          <Form>
            <FieldArray
              name="rounds"
              render={arrayHelpers => (
                <div>
                  {values.rounds && values.rounds.length > 0 ? (
                    values.rounds.map((round, index) => (
                      <div key={index}>
                          <Grid container item spacing={3}>
                                <Grid item>
                                    <Field 
                                        name={`rounds[${index}].type`}
                                        component={TextField}
                                        label="Round Type"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <Field 
                                        name={`rounds[${index}].date`}
                                        component={TextField}
                                        label="Round Date"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => arrayHelpers.remove(index)}>-</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => arrayHelpers.insert(index, "")}>+</Button>
                                </Grid>
                            </Grid>                                                                        
                      </div>
                    ))
                  ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={() => arrayHelpers.push("")}>
                            Add a Round
                            </Button>
                        </Grid>
                    </Grid>
                    
                  )}
                  <div>
                  <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
             </CardContent>
             </Card>
             </Grid>
             <Grid item xs={false} sm={1}/>
             </Grid>
      
    </div>
  );
  
  export default AfterDriveUpload;


