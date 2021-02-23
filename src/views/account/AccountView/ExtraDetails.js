import React from 'react';
import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import Certificates from './Certificates';
import ExtraCurricular from './ExtraCurricular';
import Projects from './Projects';
import WorkExperience from './WorkExperience';
import Achievement from './Achievement';


const ExtraDetails = ({ userData }) => {

    return (
        <div>
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Student Profile"
                />
                <Divider />
                <CardContent>
                    <Certificates />
                    <ExtraCurricular />
                    <Projects />
                    <WorkExperience />
                    <Achievement />
                </CardContent>
            </Card>
        </div>
    )
}

export default ExtraDetails;