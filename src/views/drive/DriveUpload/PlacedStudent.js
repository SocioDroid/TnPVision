import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RoundService from '../../../services/RoundService';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import UserContext from '../../../UserContext'

const useStyles = makeStyles(theme => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    delete: {
        backgroundColor: 'red',
        marginLeft: '5px'
    },
    accepted: {
        backgroundColor: 'green',
        color: 'white'
    },
    pending: {
        backgroundColor: 'orange',
        color: 'white'
    },
    rejected: {
        backgroundColor: 'red',
        color: 'white'
    }
}));
const Results = props => {
    const classes = useStyles();
    const [students, setStudents] = useState([]);
    const [flag, setFlag] = useState(true);
    const driveId = props.driveId;

    const getAllStudentOfRound = useCallback((driveId) => {
        RoundService.getPlacedStudents(driveId)
            .then(res => {
                setStudents([...res.data.placed_students]);
            })
            .catch(err => {
                console.log(err);
            });
    });

    useEffect(() => {
        if (flag) {
            setFlag(!flag);
            getAllStudentOfRound(driveId);
        }
    }, [flag]);

    const deleteStudentFromRound = (studentId) => {
        // RoundService.deleteStudentFromRound(driveId)
        //   .then(res => {
        //     console.log('Done');
        //     setFlag(true);
        //   })
        //   .catch(res => {});
        console.log('delet clicked');
    };


    return (
        <Card style={{ minWidth: '100%' }}>
            <PerfectScrollbar>
                <MaterialTable
                    style={{
                        fontSize: '14px'
                    }}
                    className={classes.table}
                    title=""
                    columns={[
                        { title: 'ID', field: 'id' },
                        {
                            title: 'Full Name',
                            customFilterAndSearch: (term, rowData) =>
                                rowData.user.first_name
                                    .toLowerCase()
                                    .includes(term.toLowerCase()) ||
                                rowData.user.last_name
                                    .toLowerCase()
                                    .includes(term.toLowerCase()),
                            render: rowData =>
                                rowData.user.first_name + ' ' + rowData.user.last_name
                        },
                        { title: 'Email', field: 'user.email' },
                        {
                            title: 'Actions',
                            field: 'action',
                            filtering: false,
                            render: rowData => (
                                <React.Fragment>
                                    <Tooltip title="Delete student from round">
                                        <IconButton
                                            onClick={() => {
                                                deleteStudentFromRound(rowData.id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </React.Fragment>
                            )
                        }
                    ]}
                    data={students}
                    options={{
                        thirdSortClick: false,
                        emptyRowsWhenPaging: false,
                        filtering: true,
                        rowStyle: {
                            fontFamily: 'Roboto, Helvetica , Arial, sans-serif'
                        }
                    }}
                // isLoading={isDataLoading}
                />
            </PerfectScrollbar>
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string
};

export default Results;
